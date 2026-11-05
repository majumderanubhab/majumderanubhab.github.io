#!/usr/bin/env python3
"""Find new publications on your ORCID (via OpenAlex) and add them to the site.

For every work on the ORCID that isn't in content/publications.yml yet, it:
  - adds the paper to content/publications.yml,
  - adds its co-authors to content/network.yml (linking them to an existing
    institution, or adding the institution with its city, country, flag and
    coordinates from OpenAlex),
  - fills in a DOI for an existing entry that didn't have one yet (matched by title),
and writes a summary for the pull request.

It never publishes anything itself: on GitHub it runs weekly and opens a pull
request (.github/workflows/orcid-import.yml) that you review and merge.

Usage (from the repo root):
    pip install pyyaml
    python3 scripts/import_orcid.py [--summary FILE] [--dry-run]

Set OPENALEX_API_KEY in the environment to use an OpenAlex API key.
Works you never want imported can be listed in content/import-ignore.yml.
"""
import argparse
import json
import os
import pathlib
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request

try:
    import yaml
except ImportError:
    sys.exit("This script needs PyYAML. Install it once with:  pip install pyyaml")

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
API = "https://api.openalex.org"
SKIP_TYPES = {"dataset", "peer-review", "paratext", "erratum", "retraction", "editorial", "letter", "preprint", "other", "supplementary-materials"}
STOP = {"a", "an", "the", "of", "on", "in", "for", "and", "to", "with", "using", "from", "towards", "toward", "study", "into", "via"}


# ---------- YAML files: keep the explanatory header, rewrite the data ----------
class Dumper(yaml.SafeDumper):
    def ignore_aliases(self, data):
        return True

    def increase_indent(self, flow=False, indentless=False):
        return super().increase_indent(flow, False)


def read_yaml(name):
    text = (CONTENT / name).read_text(encoding="utf-8")
    m = re.search(r"^[A-Za-z]", text, re.M)
    header = text[: m.start()] if m else ""
    return header, (yaml.safe_load(text) or {})


def write_yaml(name, header, data):
    body = yaml.dump(data, Dumper=Dumper, sort_keys=False, allow_unicode=True, width=10000, default_flow_style=False, indent=2)
    (CONTENT / name).write_text(header + body, encoding="utf-8")


# ---------- OpenAlex ----------
def get(path, **params):
    key = os.environ.get("OPENALEX_API_KEY")
    if key:
        params["api_key"] = key
    url = f"{API}{path}?{urllib.parse.urlencode(params)}"
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "academic-site-orcid-import"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except Exception as e:  # network hiccup or rate limit: wait and retry
            if attempt == 3:
                sys.exit(f"Could not reach OpenAlex ({e}). Try again later.")
            time.sleep(2 ** attempt * 3)


def works_for(orcid):
    out, cursor = [], "*"
    fields = "id,doi,title,publication_year,type,primary_location,authorships,biblio"
    while cursor:
        page = get("/works", filter=f"author.orcid:{orcid}", select=fields, **{"per-page": 100, "cursor": cursor})
        out += page.get("results", [])
        cursor = page.get("meta", {}).get("next_cursor")
        if not page.get("results"):
            break
    return out


# ---------- helpers ----------
def norm(s):
    s = unicodedata.normalize("NFKD", str(s or "")).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "", s)


def bare_doi(doi):
    return re.sub(r"^https?://(dx\.)?doi\.org/", "", doi or "", flags=re.I).lower()


def short_author(name):
    parts = [p for p in re.split(r"\s+", name.strip()) if p]
    if len(parts) < 2:
        return name
    initials = "".join(p[0].upper() for p in parts[:-1] if p[0].isalpha())
    return f"{initials} {parts[-1]}"


def tidy_title(t):
    t = re.sub(r"\s+", " ", (t or "").strip())
    if t.isupper():  # some publishers send titles in capitals
        t = t[0] + t[1:].lower()
    return t


def make_id(venue, year, title, taken):
    words = [w for w in re.findall(r"[A-Za-z]+", venue or "") if w[0].isupper() and w.lower() not in STOP]
    abbr = "".join(w[0] for w in words[:5]).lower() or "paper"
    word = next((w.lower() for w in re.findall(r"[A-Za-z]{4,}", title) if w.lower() not in STOP), "paper")
    base = f"{abbr}{year}-{word}"
    pid, n = base, 2
    while pid in taken:
        pid, n = f"{base}{n}", n + 1
    taken.add(pid)
    return pid


def pub_type(work, venue):
    v = (venue or "").lower()
    if work.get("type") == "dissertation":
        return "thesis"
    if work.get("type") in ("conference-paper", "proceedings-article") or "proceedings" in v or "conference" in v:
        return "conference"
    return "journal"


def details(work):
    b = work.get("biblio") or {}
    vol = b.get("volume") or ""
    if vol and b.get("issue"):
        vol += f"({b['issue']})"
    first, last = b.get("first_page"), b.get("last_page")
    pages = first if (first and (not last or last == first)) else "–".join(p for p in (first, last) if p)
    return ", ".join(x for x in (vol, pages) if x)


def crossref_affiliation(doi, name):
    """Affiliation text printed for this author in Crossref's record of the paper."""
    if not doi:
        return ""
    try:
        req = urllib.request.Request(f"https://api.crossref.org/works/{urllib.parse.quote(doi)}",
                                     headers={"User-Agent": "academic-site-orcid-import"})
        with urllib.request.urlopen(req, timeout=30) as r:
            authors = json.load(r)["message"].get("author", [])
    except Exception:
        return ""
    family = norm(name.split()[-1])
    for a in authors:
        if norm(a.get("family")) == family and a.get("affiliation"):
            return a["affiliation"][0].get("name", "")
    return ""


def find_institution(text):
    """Best OpenAlex institution for a printed affiliation like 'Dept. of X, Univ. of Y, City, Country'."""
    for part in sorted(re.split(r"[,;]", text), key=lambda s: -("univ" in s.lower() or "institut" in s.lower())):
        part = part.strip()
        if len(part) < 6:
            continue
        hits = get("/institutions", search=part, select="id,display_name", **{"per-page": 1}).get("results", [])
        if hits:
            return hits[0]
    return None


def years(period):
    """'2018 – 2025' -> (2018, 2025); '2025 – present' -> (2025, 9999); '2025' -> (2025, 2025)."""
    nums = [int(y) for y in re.findall(r"\d{4}", str(period))]
    if not nums:
        return None
    end = 9999 if re.search(r"present|now", str(period), re.I) else nums[-1]
    return nums[0], end


def is_me(authorship, orcid):
    a = authorship.get("author") or {}
    return (a.get("orcid") or "").endswith(orcid)


# ---------- main ----------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--summary", help="write a Markdown summary to this file")
    ap.add_argument("--dry-run", action="store_true", help="only report, don't change files")
    args = ap.parse_args()

    _, prof = read_yaml("profile.yml")
    orcid_url = prof["profile"]["links"].get("orcid", "")
    orcid = orcid_url.rstrip("/").split("/")[-1]
    if not re.fullmatch(r"\d{4}-\d{4}-\d{4}-\d{3}[\dX]", orcid):
        sys.exit("No ORCID found in content/profile.yml (links.orcid).")

    pub_head, pub_data = read_yaml("publications.yml")
    net_head, net = read_yaml("network.yml")
    ignore_path = CONTENT / "import-ignore.yml"
    ignored = set()
    if ignore_path.exists():
        ignored = {norm(bare_doi(x)) for x in (yaml.safe_load(ignore_path.read_text()) or {}).get("ignore", []) or []}

    pubs = pub_data["publications"]
    by_doi = {norm(bare_doi(p.get("doi"))): p for p in pubs if p.get("doi")}
    by_title = {norm(p["title"]): p for p in pubs}
    taken = {p["id"] for p in pubs}
    insts, people = net["institutions"], net["coauthors"]
    inst_by_oa = {i["openalex"]: i for i in insts if i.get("openalex")}
    inst_by_name = {norm(i["name"]): i for i in insts}
    person_by_oa = {a["openalex"]: a for a in people if a.get("openalex")}
    person_by_name = {norm(a["name"]): a for a in people}
    current_step = len(net["journey"]) - 1
    journey = net["journey"]

    def journey_step(work):
        """Which journey step you were at for this paper, and why."""
        mine = next((a for a in work.get("authorships", []) if is_me(a, orcid)), {})
        ids = {(i.get("id") or "").split("/")[-1] for i in mine.get("institutions") or []}
        if not ids:  # try the affiliation text printed in the paper
            text = next(iter(mine.get("raw_affiliation_strings") or []), "")
            hit = find_institution(text) if text else None
            if hit:
                ids = {hit["id"].split("/")[-1]}
        for i, j in enumerate(journey):
            if ids & set(j.get("openalex") or []):
                return i, "your affiliation in the paper"
        year = work.get("publication_year") or 0
        for i, j in enumerate(journey):  # earliest step whose dates cover the year (allows for publication lag)
            span = years(j.get("period"))
            if span and span[0] <= year <= span[1]:
                return i, f"publication year {year}"
        return current_step, "no match; using your current position"

    added, doi_filled, new_people, new_insts, unplaced = [], [], [], [], []

    def link_coauthors(work, pid):
        step, why = journey_step(work)
        for au in work.get("authorships", []):
            if is_me(au, orcid):
                continue
            a = au.get("author") or {}
            name, a_id = a.get("display_name") or "", (a.get("id") or "").split("/")[-1]
            person = person_by_oa.get(a_id) or person_by_name.get(norm(name))
            if person:
                if pid not in person["papers"]:
                    person["papers"].append(pid)
                person.setdefault("openalex", a_id)
                continue
            oa_insts = au.get("institutions") or []
            oi = oa_insts[0] if oa_insts else None
            if not oi:  # fall back to the affiliation text printed in the paper
                text = next(iter(au.get("raw_affiliation_strings") or []), "") or crossref_affiliation(bare_doi(work.get("doi")), name)
                oi = find_institution(text) if text else None
                if not oi:
                    unplaced.append(f"{name} ({pid}): no affiliation found; add them to content/network.yml by hand")
                    continue
            i_id = (oi.get("id") or "").split("/")[-1]
            inst = inst_by_oa.get(i_id) or inst_by_name.get(norm(oi.get("display_name")))
            if not inst:
                info = get(f"/institutions/{i_id}", select="display_name,geo,country_code")
                geo = info.get("geo") or {}
                if geo.get("latitude") is None:
                    unplaced.append(f"{name} ({pid}): no location for {oi.get('display_name')}")
                    continue
                inst = {"name": info.get("display_name") or oi.get("display_name"), "city": geo.get("city") or "",
                        "country": geo.get("country") or "", "cc": (info.get("country_code") or geo.get("country_code") or "").lower(),
                        "lat": round(geo["latitude"], 2), "lon": round(geo["longitude"], 2), "from": step, "openalex": i_id}
                insts.append(inst)
                inst_by_oa[i_id] = inst
                inst_by_name[norm(inst["name"])] = inst
                new_insts.append((inst, journey[step]["name"], why))
            person = {"name": name, "institution": inst["name"], "papers": [pid], "openalex": a_id}
            people.append(person)
            person_by_oa[a_id] = person
            person_by_name[norm(name)] = person
            new_people.append(person)

    works = works_for(orcid)
    for w in works:
        doi = bare_doi(w.get("doi"))
        if w.get("type") in SKIP_TYPES or norm(doi) in ignored or norm(w.get("id", "").split("/")[-1]) in ignored:
            continue
        if doi and norm(doi) in by_doi:
            continue
        title = tidy_title(w.get("title"))
        existing = by_title.get(norm(title))
        if existing:  # same paper we already list, now with a DOI (e.g. an accepted paper got published)
            if doi and not existing.get("doi"):
                existing["doi"] = doi
                if existing.get("details") in (None, "", "accepted"):
                    existing["details"] = details(w)
                doi_filled.append(existing)
                by_doi[norm(doi)] = existing
            continue
        loc = w.get("primary_location") or {}
        venue = ((loc.get("source") or {}).get("display_name")) or ""
        year = w.get("publication_year")
        entry = {"id": make_id(venue, year, title, taken), "type": pub_type(w, venue), "year": year,
                 "authors": ", ".join(short_author((a.get("author") or {}).get("display_name", "")) for a in w.get("authorships", [])),
                 "title": title, "venue": venue, "details": details(w)}
        if doi:
            entry["doi"] = doi
        pubs.append(entry)
        by_doi[norm(doi)] = entry
        by_title[norm(title)] = entry
        added.append(entry)
        link_coauthors(w, entry["id"])

    for p in doi_filled:
        work = next((w for w in works if bare_doi(w.get("doi")) == p["doi"]), None)
        if work:
            link_coauthors(work, p["id"])

    if not (added or doi_filled):
        print("No new publications on ORCID.")
        if args.summary:
            pathlib.Path(args.summary).write_text("")
        return

    if not args.dry_run:
        write_yaml("publications.yml", pub_head, pub_data)
        write_yaml("network.yml", net_head, net)

    lines = [f"Found on ORCID [{orcid}](https://orcid.org/{orcid}) via OpenAlex. Nothing goes live until you merge.", ""]
    if added:
        lines += ["### New publications", ""]
        lines += [f"- **{p['title']}** ({p['year']}), {p['venue']}  \n  id `{p['id']}` · {p['type']}" + (f" · [doi](https://doi.org/{p['doi']})" if p.get("doi") else "") for p in added]
        lines += [""]
    if doi_filled:
        lines += ["### DOI added to an existing entry", ""] + [f"- `{p['id']}`: {p['title']}" for p in doi_filled] + [""]
    if new_insts:
        lines += ["### New institutions on the map", ""] + [f"- {i['name']}, {i['city']}, {i['country']}: linked to **{j}** ({why})" for i, j, why in new_insts] + [""]
    if new_people:
        lines += ["### New co-authors", ""] + [f"- {a['name']} ({a['institution']})" for a in new_people] + [""]
    if unplaced:
        lines += ["### Co-authors that could not be placed on the map", ""] + [f"- {u}" for u in unplaced] + [""]
    lines += ["### Before merging", "",
              "- [ ] Add each new paper's `id` under the right thrust in `content/research.yml` (edit the file in this pull request).",
              "- [ ] Check titles, author names and venue in `content/publications.yml`.",
              "- [ ] New institutions are linked to where you were for that paper (see above); adjust `from` in `content/network.yml` if needed.",
              "- [ ] Optional: add a news item in `content/news.yml`.",
              "", "Not your paper? Close this pull request and add its DOI to `content/import-ignore.yml`."]
    summary = "\n".join(lines)
    print(summary)
    if args.summary:
        pathlib.Path(args.summary).write_text(summary, encoding="utf-8")


if __name__ == "__main__":
    main()
