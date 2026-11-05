#!/usr/bin/env python3
"""Build the website data from the YAML files in content/.

  content/*.yml  ->  data/content.js   (what the site reads)
                 ->  references.bib    (BibTeX of all publications)

It also checks the content and stops with a clear message if something is
wrong (a missing field, an unknown paper id, an image that doesn't exist...).

Usage (from the repo root):
    pip install pyyaml          # once
    python3 scripts/build.py

On GitHub this runs automatically on every push (.github/workflows/deploy.yml),
so you only need it locally if you want to preview the site on your computer.
"""
import datetime
import json
import pathlib
import re
import sys

try:
    import yaml
except ImportError:
    sys.exit("This script needs PyYAML. Install it once with:  pip install pyyaml")

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
OUT_JS = ROOT / "data" / "content.js"
OUT_BIB = ROOT / "references.bib"

# file -> {key in the file: key the site expects}
FILES = {
    "profile.yml": {"profile": "profile"},
    "news.yml": {"news": "news"},
    "research.yml": {"research": "research"},
    "publications.yml": {"publications": "publications"},
    "experience.yml": {"positions": "experience", "teaching": "teaching", "education": "education"},
    "recognition.yml": {"awards": "awards", "gallery": "gallery"},
    "activities.yml": {"workshops": "workshops", "talks": "talks", "summerSchools": "summerSchools", "service": "service"},
    "network.yml": {"journey": "footprint.journey", "institutions": "footprint.institutions", "coauthors": "footprint.coauthors"},
}
ORDER = ["profile", "news", "research", "publications", "experience", "teaching", "education",
         "awards", "gallery", "workshops", "talks", "summerSchools", "service", "footprint", "lastUpdated"]

errors = []


def fail(where, msg):
    errors.append(f"{where}: {msg}")


def load():
    site = {}
    for name, keys in FILES.items():
        path = CONTENT / name
        if not path.exists():
            sys.exit(f"Missing file: content/{name}")
        try:
            data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        except yaml.YAMLError as e:
            mark = getattr(e, "problem_mark", None)
            where = f" (line {mark.line + 1}, column {mark.column + 1})" if mark else ""
            sys.exit(f"content/{name} is not valid YAML{where}:\n  {getattr(e, 'problem', e)}\n"
                     "Tip: check the indentation, and put text containing ': ' or starting with a quote in quotes.")
        for key, target in keys.items():
            value = data.get(key, [] if key != "profile" else {})
            if "." in target:
                outer, inner = target.split(".")
                site.setdefault(outer, {})[inner] = value
            else:
                site[target] = value
    return site


def text(value):
    """YAML turns 2026 into a number and 'no' into False; the site wants text."""
    if value is None:
        return ""
    if isinstance(value, float) and value.is_integer():
        value = int(value)
    return str(value)


def normalise(site):
    for item in site["news"]:
        item["date"] = text(item.get("date"))
    for r in site["research"]:
        for k in ("period", "since"):
            if k in r:
                r[k] = text(r[k])
    for p in site["publications"]:
        try:
            p["year"] = int(p.get("year"))
        except (TypeError, ValueError):
            fail("publications.yml", f"'{p.get('id', p.get('title'))}' needs a year like 2026")
        if "details" in p and p["details"] is None:
            p["details"] = ""
    for k in ("experience", "teaching", "education"):
        for x in site[k]:
            x["period"] = text(x.get("period"))
    for a in site["awards"]:
        a["year"] = text(a.get("year"))
    for g in site["gallery"]:
        g["year"] = text(g.get("year"))
        g["place"] = text(g.get("place"))
    for k in ("talks", "summerSchools", "workshops"):
        for x in site[k]:
            if "date" in x:
                x["date"] = text(x["date"])
    fp = site["footprint"]
    for x in fp["journey"] + fp["institutions"]:
        if isinstance(x.get("cc"), bool):
            fail("network.yml", f"'{x.get('name')}': put the country code in quotes, e.g. cc: \"no\"")
        x["cc"] = text(x.get("cc")).lower()
        if "period" in x:
            x["period"] = text(x["period"])
    return site


def check(site):
    def need(where, item, *fields):
        for f in fields:
            if item.get(f) in (None, "", []):
                fail(where, f"'{item.get('id') or item.get('name') or item.get('title') or item}' is missing '{f}'")

    need("profile.yml", site["profile"], "name", "position", "photo", "emails", "bio")
    for n in site["news"]:
        need("news.yml", n, "date", "text")
    for p in site["publications"]:
        need("publications.yml", p, "id", "type", "year", "authors", "title", "venue")
        if p.get("type") not in ("journal", "conference", "thesis"):
            fail("publications.yml", f"'{p.get('id')}' has type {p.get('type')!r}; use journal, conference or thesis")
    ids = [p.get("id") for p in site["publications"]]
    for dup in sorted({i for i in ids if ids.count(i) > 1}):
        fail("publications.yml", f"the id '{dup}' is used more than once")

    for r in site["research"]:
        need("research.yml", r, "id", "title", "color", "summary", "period")
        for pid in r.get("publications", []):
            if pid not in ids:
                fail("research.yml", f"'{r.get('id')}' lists unknown publication id '{pid}'")
    mapped = {pid for r in site["research"] for pid in r.get("publications", [])}
    unmapped = [i for i in ids if i not in mapped]
    if unmapped:
        print("Note: publications not linked to any research thrust:", ", ".join(unmapped))

    images = [("profile.yml", site["profile"].get("photo"))]
    images += [("recognition.yml", a.get("image")) for a in site["awards"]]
    images += [("recognition.yml", g.get("src")) for g in site["gallery"]]
    images += [("activities.yml", w.get("image")) for w in site["workshops"]]
    images += [("research.yml", f.get("src")) for r in site["research"] for f in r.get("figures", [])]
    for where, img in images:
        if img and not (ROOT / img).exists():
            fail(where, f"image not found: {img}")

    fp = site["footprint"]
    names = {i.get("name") for i in fp["institutions"]}
    for i in fp["institutions"]:
        need("network.yml", i, "name", "city", "country", "cc", "lat", "lon")
        if not isinstance(i.get("from"), int) or not 0 <= i["from"] < len(fp["journey"]):
            fail("network.yml", f"institution '{i.get('name')}' has an invalid 'from' (use 0 to {len(fp['journey']) - 1})")
    for a in fp["coauthors"]:
        if a.get("institution") not in names:
            fail("network.yml", f"co-author '{a.get('name')}' has unknown institution '{a.get('institution')}'")
        for pid in a.get("papers", []):
            if pid not in ids:
                fail("network.yml", f"co-author '{a.get('name')}' lists unknown publication id '{pid}'")


def bib_key(p, used):
    first = re.sub(r"[^a-z]", "", p["authors"].split(",")[0].strip().split(" ")[-1].lower()) or "anon"
    word = (re.search(r"[a-z]{4,}", p["title"].lower()) or ["paper"])[0]
    key, n = f"{first}{p['year']}{word}", 2
    while key in used:
        key, n = f"{first}{p['year']}{word}{n}", n + 1
    used.add(key)
    return key


def to_bib(p, used):
    kind = {"journal": "article", "thesis": "phdthesis"}.get(p["type"], "inproceedings")
    venue_field = {"journal": "journal", "thesis": "school"}.get(p["type"], "booktitle")
    authors = re.sub(r", et al\.$", " and others", p["authors"]).split(", ")
    fields = [("title", p["title"]), ("author", " and ".join(authors)),
              (venue_field, re.sub(r"^PhD thesis, ", "", p["venue"])), ("year", p["year"])]
    for k, f in (("details", "note"), ("doi", "doi"), ("url", "url")):
        if p.get(k):
            fields.append((f, p[k]))
    inner = ",\n".join("  %s = {%s}" % (k, str(v).replace("&", "\\&")) for k, v in fields)
    return f"@{kind}{{{bib_key(p, used)},\n{inner}\n}}"


def main():
    site = normalise(load())
    check(site)
    if errors:
        sys.exit("Please fix these and run again:\n  - " + "\n  - ".join(errors))
    site["lastUpdated"] = datetime.date.today().strftime("%B %Y")
    ordered = {k: site[k] for k in ORDER if k in site}
    OUT_JS.write_text("/* Generated by scripts/build.py from the files in content/. Do not edit this file;\n"
                      "   edit content/*.yml instead. */\nwindow.SITE = "
                      + json.dumps(ordered, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
    pubs = sorted(site["publications"], key=lambda p: -p["year"])
    used = set()
    OUT_BIB.write_text("\n\n".join(to_bib(p, used) for p in pubs) + "\n", encoding="utf-8")
    print(f"OK: wrote data/content.js and {len(pubs)} entries to references.bib.")


if __name__ == "__main__":
    main()
