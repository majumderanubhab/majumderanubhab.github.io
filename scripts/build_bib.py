#!/usr/bin/env python3
"""Validate data/content.js and regenerate references.bib from it.

Usage (from the repo root):  python3 scripts/build_bib.py
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "data" / "content.js"
OUT = ROOT / "references.bib"


def load():
    text = SRC.read_text(encoding="utf-8")
    start = re.search(r"^window\.SITE\s*=", text, re.M).end()
    body = text[start:].strip().rstrip(";")
    try:
        return json.loads(body)
    except json.JSONDecodeError as e:
        line = text[:start].count("\n") + body[: e.pos].count("\n") + 1
        sys.exit(f"content.js is not valid JSON near line {line}: {e.msg}\n"
                 "(check for missing quotes/commas or a trailing comma)")


def check(site):
    errors = []
    for i, p in enumerate(site["publications"]):
        for k in ("type", "year", "authors", "title", "venue"):
            if not p.get(k):
                errors.append(f"publication #{i + 1} is missing '{k}'")
        if p.get("type") not in ("journal", "conference", "thesis"):
            errors.append(f"publication #{i + 1} has unknown type {p.get('type')!r}")
    images = [i.get("image") for i in site["workshops"] + site["awards"]]
    images += [g.get("src") for g in site.get("gallery", [])]
    images += [f.get("src") for r in site["research"] for f in r.get("figures", [])]
    for img in images:
        if img and not (ROOT / img).exists():
            errors.append(f"missing image file: {img}")
    ids = [p.get("id") for p in site["publications"]]
    if None in ids:
        errors.append("every publication needs an 'id'")
    dup = {i for i in ids if ids.count(i) > 1}
    if dup:
        errors.append(f"duplicate publication ids: {sorted(dup)}")
    mapped = set()
    for r in site["research"]:
        for pid in r.get("publications", []):
            if pid not in ids:
                errors.append(f"research '{r['title']}' lists unknown publication id '{pid}'")
            mapped.add(pid)
    unmapped = [i for i in ids if i not in mapped]
    if unmapped:
        print("Note: publications not linked to any research project:", ", ".join(unmapped))
    fp = site.get("footprint", {})
    names = {i["name"] for i in fp.get("institutions", [])}
    for i in fp.get("institutions", []):
        if not 0 <= i.get("from", -1) < len(fp.get("journey", [])):
            errors.append(f"institution '{i['name']}' has an invalid 'from' journey step")
    for a in fp.get("coauthors", []):
        if a["institution"] not in names:
            errors.append(f"co-author '{a['name']}' has unknown institution '{a['institution']}'")
        for pid in a["papers"]:
            if pid not in ids:
                errors.append(f"co-author '{a['name']}' lists unknown publication id '{pid}'")
    if errors:
        sys.exit("Problems found:\n  - " + "\n  - ".join(errors))


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
    fields = [
        ("title", p["title"]),
        ("author", " and ".join(authors)),
        (venue_field, re.sub(r"^PhD thesis, ", "", p["venue"])),
        ("year", p["year"]),
    ]
    if p.get("details"):
        fields.append(("note", p["details"]))
    if p.get("doi"):
        fields.append(("doi", p["doi"]))
    if p.get("url"):
        fields.append(("url", p["url"]))
    def clean(v):
        return str(v).replace("&", "\\&")
    inner = ",\n".join("  %s = {%s}" % (k, clean(v)) for k, v in fields)
    return f"@{kind}{{{bib_key(p, used)},\n{inner}\n}}"


def main():
    site = load()
    check(site)
    pubs = sorted(site["publications"], key=lambda p: -p["year"])
    used = set()
    OUT.write_text("\n\n".join(to_bib(p, used) for p in pubs) + "\n", encoding="utf-8")
    print(f"OK: content.js is valid. Wrote {len(pubs)} entries to {OUT.name}.")


if __name__ == "__main__":
    main()
