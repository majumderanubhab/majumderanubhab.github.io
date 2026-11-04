# majumderanubhab.github.io

Personal academic website, served by GitHub Pages from `main`.

## Updating content

All content is in **`data/content.js`**: profile, news, research, publications, experience, awards and workshops. The HTML stays untouched.

- **New paper:** add an entry to `publications` (copy an existing one). `type` must be `journal`, `conference` or `thesis`. `doi` or `url` are optional.
- **News item:** add an entry to the top of `news`.
- **New job:** add it to the top of `experience`, then update `profile.position` / `affiliations` / `bio`.
- **Images:** put them in `images/` and refer to them by path.

The data must be valid JSON (double quotes, no trailing commas). After editing, run:

```bash
python3 scripts/build_bib.py
```

This checks the file for mistakes and regenerates `references.bib`.

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Files

- `index.html`: page skeleton
- `css/style.css`: styles (light/dark)
- `js/site.js`: renders the page from the data
- `data/content.js`: **content**
