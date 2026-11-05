/* Renders the website from data/content.js, which scripts/build.py generates from content/*.yml. You normally don't need to edit this file. */
(function () {
  "use strict";
  const S = window.SITE;
  const P = S.profile;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const scholarSearch = (t) => "https://scholar.google.com/scholar?q=" + encodeURIComponent('"' + t + '"');
  const pubUrl = (p) => p.url || (p.doi ? "https://doi.org/" + p.doi : scholarSearch(p.title));
  const ME = /\bA(?:nubhab)? Majumder\b/g;
  const dot = (c) => `<span class="dot" style="--c:${esc(c || "var(--muted)")}"></span>`;

  /* ---------- Shared lookups ---------- */
  const pubById = Object.fromEntries(S.publications.map((p) => [p.id, p]));
  const projectOf = {};
  S.research.forEach((r) => r.publications.forEach((id) => (projectOf[id] = r)));
  const shortTitle = (r) => r.short || r.title.split(":")[0];
  const papersIn = (r) => r.publications.filter((id) => pubById[id]).length;
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

  /* ---------- Sidebar ---------- */
  $("#avatar").src = P.photo;
  $("#avatar").alt = "Portrait of " + P.name;
  $("#name").textContent = (P.prefix ? P.prefix + " " : "") + P.name;
  $("#handle").innerHTML = (P.positionIcon ? `<i class="fa-solid ${esc(P.positionIcon)}" aria-hidden="true"></i>` : "") + esc(P.position);
  if (P.status && P.status.text) {
    $("#status").innerHTML = `<i class="fa-solid ${esc(P.status.icon || "fa-circle")}" aria-hidden="true"></i><span>${esc(P.status.text)}</span>`;
    $("#status").hidden = false;
  }
  $("#tagline").textContent = P.tagline || "";
  $("#email-btn").href = "mailto:" + P.emails[0];

  const facts = [
    ["fa-regular fa-building", P.affiliations[0]],
    ["fa-solid fa-building-columns", P.affiliations[1]],
    ["fa-solid fa-location-dot", P.location],
    ...P.emails.map((e) => ["fa-regular fa-envelope", `<a href="mailto:${esc(e)}">${esc(e)}</a>`, true])
  ];
  $("#side-facts").innerHTML = facts.filter((f) => f[1])
    .map(([i, t, raw]) => `<li><i class="${i}" aria-hidden="true"></i><span>${raw ? t : esc(t)}</span></li>`).join("");

  const ICONS = {
    scholar: ["ai ai-google-scholar", "Google Scholar"],
    orcid: ["ai ai-orcid", "ORCID"],
    linkedin: ["fa-brands fa-linkedin-in", "LinkedIn"],
    researchgate: ["ai ai-researchgate", "ResearchGate"],
    pure: ["fa-solid fa-building-columns", "Aarhus University profile"],
    github: ["fa-brands fa-github", "GitHub"]
  };
  $("#side-links").innerHTML = Object.entries(P.links).filter(([k, v]) => v && ICONS[k])
    .map(([k, v]) => `<li><i class="${ICONS[k][0]}" aria-hidden="true"></i><a href="${esc(v)}" target="_blank" rel="noopener">${ICONS[k][1]}</a></li>`).join("");

  $("#side-awards").innerHTML = S.awards.slice(0, 6)
    .map((a) => `<li><a href="#awards" title="${esc(a.title)}, ${esc(a.by)}"><i class="fa-solid fa-award" aria-hidden="true"></i><span>${esc(a.title)}</span><span class="yr">${esc(a.year)}</span></a></li>`).join("");

  /* ---------- Overview: README ---------- */
  $("#bio").innerHTML = P.bio.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#interests").innerHTML = P.interests.map((t) => `<li>${esc(t)}</li>`).join("");

  /* ---------- Overview: pinned research thrusts ---------- */
  const firstSentence = (t) => (t.match(/^.*?[.!?](\s|$)/) || [t])[0].trim();
  $("#pinned").innerHTML = S.research.map((r) => `
    <li class="box pin">
      <a class="pin-title" href="#project-${esc(r.id)}"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i>${esc(shortTitle(r))}</a>
      <p class="pin-text">${esc(firstSentence(r.summary))}</p>
      <p class="pin-meta">${dot(r.color)}<span>${esc(r.period)}</span><span><i class="fa-regular fa-file-lines" aria-hidden="true"></i>${plural(papersIn(r), "paper")}</span></p>
    </li>`).join("");

  /* ---------- Overview: publication heatmap (thrust × year) ---------- */
  const years = S.publications.map((p) => p.year);
  const gy0 = Math.min(...years), gy1 = Math.max(...years);
  const yearList = Array.from({ length: gy1 - gy0 + 1 }, (_, i) => gy0 + i);
  const journey = S.research.slice().sort((a, b) => String(a.since || a.period).localeCompare(String(b.since || b.period)));
  const shade = (n) => [0, 40, 65, 85, 100][Math.min(n, 4)];
  const span = (r) => r.period.replace(/\s*–\s*/, "–").replace(/–\s*present$/i, "–").replace(/(\d{4})–\d{2}(\d{2})$/, "$1–$2");
  $("#graph-h").textContent = `${S.publications.length} publications across ${S.research.length} research thrusts, ${gy0}–${gy1}`;
  const hmCell = (r, y) => {
    const ps = r.publications.map((id) => pubById[id]).filter((p) => p && p.year === y);
    const label = `${shortTitle(r)}, ${y}: ${plural(ps.length, "paper")}`;
    if (!ps.length) return `<span class="hm-cell" title="${esc(label)}"></span>`;
    const tip = label + ps.map((p) => "\n• " + p.title).join("");
    return `<a class="hm-cell" href="#pub-count" data-r="${esc(r.id)}" data-y="${y}" style="--c:${esc(r.color)};--p:${shade(ps.length)}%" title="${esc(tip)}" aria-label="${esc(label)}. Show these publications"></a>`;
  };
  $("#graph").innerHTML = `<div class="hm" style="--n:${yearList.length}">
    ${journey.map((r) => `<a class="hm-name" href="#project-${esc(r.id)}">${dot(r.color)}<span>${esc(shortTitle(r))}</span></a>
      <span class="hm-period">${esc(span(r))}</span>
      ${yearList.map((y) => hmCell(r, y)).join("")}
      <span class="hm-total">${papersIn(r)}</span>`).join("")}
    <span></span><span class="hm-period"></span>${yearList.map((y) => `<span class="hm-year"><span class="hm-cent">${String(y).slice(0, 2)}</span>${String(y).slice(2)}</span>`).join("")}<span></span>
  </div>`;
  $("#graph-key").innerHTML = "Less" + [0, 1, 2, 3, 4].map((n) => `<span class="hm-key" style="--p:${shade(n)}%"${n ? "" : ' data-empty=""'}></span>`).join("") + "More";

  /* ---------- Overview: academic journey and collaborator map ---------- */
  const FP = S.footprint, LAND = window.LAND;
  const flag = (cc, name) => `<span class="fi fi-${esc(cc)} fp-flag" role="img" aria-label="${esc(name)}" title="${esc(name)}"></span>`;
  const fpInst = FP ? FP.institutions.map((inst) => {
    const people = FP.coauthors.filter((a) => a.institution === inst.name).sort((a, b) => b.papers.length - a.papers.length);
    return Object.assign({}, inst, { people, papers: [...new Set(people.flatMap((a) => a.papers))].filter((id) => pubById[id]) });
  }) : [];
  const fpLevel = (n) => (n >= 7 ? 1 : n >= 3 ? 0.75 : n >= 2 ? 0.55 : 0.38);
  const fpState = { view: "world", layer: "both", cells: {}, open: null };
  function fpDraw(map = $("#fp-map"), view = fpState.view, layer = fpState.layer, mini = false) {
    const v = LAND[view], H = v.rows.length, W = v.rows[0].length, S = 960 / W;
    const [w, e] = v.lon, [n, s] = v.lat;
    const cellOf = (lat, lon) => {
      const c = Math.floor((lon - w) / (e - w) * W), r = Math.floor((n - lat) / (n - s) * H);
      return c < 0 || c >= W || r < 0 || r >= H ? null : [r, c];
    };
    const mid = (p) => [p[1] * S + S / 2, p[0] * S + S / 2];
    let svg = "";
    v.rows.forEach((row, r) => { for (let c = 0; c < W; c++) if (row[c] === "1") svg += `<rect class="fp-land" x="${c * S}" y="${r * S}" width="${S - S / 5}" height="${S - S / 5}" rx="${S / 6}"/>`; });
    const jCells = FP.journey.map((j) => cellOf(j.lat, j.lon));
    const showJ = layer !== "collab", showC = layer !== "journey";
    if (showC) fpInst.forEach((inst) => {
      const a = jCells[inst.from], b = cellOf(inst.lat, inst.lon);
      if (!a || !b) return;
      const [x1, y1] = mid(a), [x2, y2] = mid(b), d = Math.hypot(x2 - x1, y2 - y1);
      if (d < S * 1.5) return;
      svg += `<path class="fp-link" d="M${x1} ${y1}Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - d * 0.18} ${x2} ${y2}" stroke-width="${S / 8}" stroke-dasharray="${S / 3} ${S / 4}"/>`;
    });
    if (showJ) {
      const pts = jCells.filter(Boolean).map(mid);
      if (pts.length > 1) svg += `<polyline class="fp-path" points="${pts.map((p) => p.join(",")).join(" ")}" stroke-width="${S / 4}"/>`;
    }
    const cells = {};
    const add = (p, kind, i) => { if (p) (cells[p.join(",")] = cells[p.join(",")] || { j: [], c: [] })[kind].push(i); };
    if (showC) fpInst.forEach((inst, i) => add(cellOf(inst.lat, inst.lon), "c", i));
    if (showJ) FP.journey.forEach((j, i) => { add(jCells[i], "j", i); (j.also || []).forEach(([la, lo]) => add(cellOf(la, lo), "j", i)); });
    for (const k in cells) {
      const [r, c] = k.split(",").map(Number), o = cells[k], z = S * 1.25, x = c * S - S * 0.125, y = r * S - S * 0.125;
      if (o.j.length) {
        svg += `<rect class="fp-sq fp-j" data-k="${k}" x="${x}" y="${y}" width="${z}" height="${z}" rx="${S / 4}"/>`;
        if (o.c.length) svg += `<rect class="fp-ring" x="${x - S * 0.2}" y="${y - S * 0.2}" width="${z + S * 0.4}" height="${z + S * 0.4}" rx="${S / 3}" stroke-width="${S / 7}"/>`;
      } else {
        const papers = new Set(o.c.flatMap((i) => fpInst[i].papers)).size;
        svg += `<rect class="fp-sq fp-c" data-k="${k}" style="opacity:${fpLevel(papers)}" x="${x}" y="${y}" width="${z}" height="${z}" rx="${S / 4}"/>`;
      }
    }
    map.setAttribute("viewBox", `0 0 960 ${H * S}`);
    map.innerHTML = mini ? svg.replace(/ class="fp-sq/g, ' class="fp-dot') : svg;
    if (!mini) fpState.cells = cells;
  }
  const fpSummary = (inst) => `${plural(inst.people.length, "co-author")}, ${plural(inst.papers.length, "paper")}`;
  function fpOpen(ids) {
    fpState.open = ids;
    const paper = (id) => {
      const p = pubById[id];
      return `<li><span class="fp-y">${p.year}</span>${p.url || p.doi ? `<a href="${esc(pubUrl(p))}" target="_blank" rel="noopener">${esc(p.title)}</a>` : `<span>${esc(p.title)} <span class="fp-y">${esc(p.details || "")}</span></span>`}</li>`;
    };
    $("#fp-panel").innerHTML = ids.map((i) => {
      const inst = fpInst[i];
      return `<section><h3 class="fp-panel-h"><span>${flag(inst.cc, inst.country)}${esc(inst.name)} · ${esc(inst.city)}, ${esc(inst.country)}</span><span class="fp-y">${fpSummary(inst)}</span></h3>
        ${inst.people.map((a, k) => `<details class="fp-person"${k === 0 ? " open" : ""}><summary><strong>${esc(a.name)}</strong> <span class="fp-y">· ${plural(a.papers.length, "paper")}</span></summary>
          <ol>${a.papers.map((id) => pubById[id]).filter(Boolean).sort((x, y) => y.year - x.year).map((p) => paper(p.id)).join("")}</ol></details>`).join("")}</section>`;
    }).join("") + `<p class="fp-actions"><a href="#pub-count" class="muted-link" data-fp-pubs>Show in Publications</a><button type="button" class="btn btn-sm" data-fp-close>Close</button></p>`;
    $("#fp-panel").hidden = false;
    $("#fp-inst").querySelectorAll("[data-i]").forEach((b) => b.setAttribute("aria-pressed", ids.includes(+b.dataset.i)));
  }
  function fpClose() {
    fpState.open = null; $("#fp-panel").hidden = true;
    $("#fp-inst").querySelectorAll("[data-i]").forEach((b) => b.setAttribute("aria-pressed", "false"));
  }
  if (FP && LAND) {
    const fpCountries = [...new Map(fpInst.map((i) => [i.country, i.cc])).entries()];
    const fpStats = `${plural(FP.coauthors.length, "co-author")} · ${plural(fpInst.length, "institution")} · ${fpCountries.length} countries`;
    $("#fp-stat").textContent = fpStats;
    $("#c-network").textContent = FP.coauthors.length;
    $("#net-stat").textContent = fpStats;
    $("#net-flags").innerHTML = fpCountries.map(([name, cc]) => flag(cc, name)).join("");
    fpDraw($("#net-mini"), "world", "both", true);

    $("#fp-journey").innerHTML = FP.journey.map((j) => `<li><span class="fp-key fp-j" aria-hidden="true"></span>${flag(j.cc, "")}<span><strong>${esc(j.name)}</strong> · ${esc(j.role)} · ${esc(j.period)}</span></li>`).join("");
    $("#fp-inst").innerHTML = fpInst.map((inst, i) => `<li><button type="button" class="fp-row" data-i="${i}" aria-pressed="false"><span class="fp-key fp-c" style="opacity:${fpLevel(inst.papers.length)}" aria-hidden="true"></span>${flag(inst.cc, inst.country)}<span><strong>${esc(inst.name)}</strong>, ${esc(inst.country)} · ${fpSummary(inst)}</span></button></li>`).join("");
    fpDraw();
    const seg = (id, key) => $(id).addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $(id).querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      fpState[key] = b.dataset.v; fpDraw();
    });
    seg("#fp-zoom", "view"); seg("#fp-layer", "layer");
    $("#fp-map").addEventListener("mouseover", (e) => {
      const sq = e.target.closest(".fp-sq"); if (!sq) return;
      const o = fpState.cells[sq.dataset.k];
      $("#fp-tip").textContent = [...new Set(o.j)].map((i) => `${FP.journey[i].name} (${FP.journey[i].period})`)
        .concat(o.c.map((i) => `${fpInst[i].name}: ${fpSummary(fpInst[i])}`)).join("  |  ");
    });
    $("#fp-map").addEventListener("click", (e) => {
      const sq = e.target.closest(".fp-sq"); if (!sq) return;
      const o = fpState.cells[sq.dataset.k];
      if (o.c.length) fpOpen(o.c);
    });
    $("#fp-inst").addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (b) fpOpen([+b.dataset.i]); });
    $("#fp-panel").addEventListener("click", (e) => {
      if (e.target.closest("[data-fp-close]")) fpClose();
      if (e.target.closest("[data-fp-pubs]")) {
        const insts = fpState.open.map((i) => fpInst[i]);
        state.only = { ids: new Set(insts.flatMap((i) => i.papers)), html: insts.map((i) => flag(i.cc, i.country) + esc(i.name)).join(", ") };
        renderPubs();
        if (location.hash === "#pub-count") window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    });
  } else {
    $("#fp-h").closest(".block").hidden = true;
  }

  /* ---------- Overview: activity ---------- */
  const NEWS_SHOWN = 5;
  const newsHtml = (items) => items.map((n) => `<li><span class="feed-dot" aria-hidden="true"></span><div><p class="feed-date">${esc(n.date)}</p><p class="feed-text">${n.text}</p></div></li>`).join("");
  $("#news-list").innerHTML = newsHtml(S.news.slice(0, NEWS_SHOWN));
  if (S.news.length > NEWS_SHOWN) {
    const btn = $("#news-more");
    btn.hidden = false;
    btn.onclick = () => { $("#news-list").innerHTML = newsHtml(S.news); btn.hidden = true; };
  }

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const openLightbox = (src, alt, capHtml) => {
    if (!lb.showModal) return;
    lb.querySelector("img").src = src; lb.querySelector("img").alt = alt || "";
    lb.querySelector("figcaption").innerHTML = capHtml || "";
    lb.showModal();
  };
  lb.addEventListener("click", () => lb.close());

  /* ---------- Research ---------- */
  $("#c-research").textContent = S.research.length;
  const capHtml = (f) => `<span class="cap">${esc(f.caption)}</span>${f.credit ? `<span class="credit">${esc(f.credit)}</span>` : ""}`;
  const figureHtml = (r) => {
    const f = r.figures || [];
    if (!f.length) return "";
    return `<div class="project-figs">
      <figure class="fig-main">
        <button class="fig-open" type="button" aria-label="Enlarge figure"><img src="${esc(f[0].src)}" alt="${esc(f[0].caption)}" loading="lazy"></button>
        <figcaption>${capHtml(f[0])}</figcaption>
      </figure>
      ${f.length > 1 ? `<div class="thumbs">${f.map((x, i) => `<button type="button" class="thumb" data-i="${i}" aria-pressed="${i === 0}" aria-label="Show figure ${i + 1} of ${f.length}"><img src="${esc(x.src)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
    </div>`;
  };
  $("#research-list").innerHTML = S.research.map((r) => {
    const rp = r.publications.map((id) => pubById[id]).filter(Boolean);
    return `
    <article class="box project" id="project-${esc(r.id)}">
      <header class="box-head project-head">
        <h3>${dot(r.color)}${esc(r.title)}</h3>
        <p class="project-meta"><span>${esc(r.period)}</span>${r.context ? `<span>${esc(r.context)}</span>` : ""}</p>
      </header>
      <div class="box-body project-body${(r.figures || []).length ? "" : " no-fig"}">
        <div class="project-text">
          <p>${esc(r.summary)}</p>
          ${r.highlights && r.highlights.length ? `<ul class="highlights">${r.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>` : ""}
        </div>
        ${figureHtml(r)}
      </div>
      ${rp.length ? `<details class="project-pubs"><summary>${plural(rp.length, "related publication")}</summary><ol>${rp.map((p) =>
        `<li><a href="${esc(pubUrl(p))}" target="_blank" rel="noopener">${esc(p.title)}</a><span>${esc(p.venue)}, ${p.year}</span></li>`).join("")}</ol></details>` : ""}
    </article>`;
  }).join("");

  const projById = Object.fromEntries(S.research.map((r) => [r.id, r]));
  $("#research-list").addEventListener("click", (e) => {
    const t = e.target.closest(".thumb");
    if (t) {
      const card = t.closest(".project"), r = projById[card.id.replace("project-", "")], f = r.figures[+t.dataset.i];
      card.querySelectorAll(".thumb").forEach((x) => x.setAttribute("aria-pressed", x === t));
      const img = card.querySelector(".fig-main img"); img.src = f.src; img.alt = f.caption;
      card.querySelector(".fig-main figcaption").innerHTML = capHtml(f);
      return;
    }
    const o = e.target.closest(".fig-open");
    if (o) {
      const img = o.querySelector("img");
      openLightbox(img.src, img.alt, o.parentElement.querySelector("figcaption").innerHTML);
    }
  });

  /* ---------- Publications ---------- */
  const TYPE = { journal: "Journal", conference: "Conference", thesis: "Thesis" };
  const pubs = S.publications.slice().sort((a, b) => b.year - a.year);
  pubs.forEach((p, i) => (p._id = i));
  $("#c-pubs").textContent = pubs.length;

  const usedKeys = new Set();
  const bibKey = (p) => {
    const first = (p.authors.split(",")[0].trim().split(" ").pop() || "anon").toLowerCase().replace(/[^a-z]/g, "");
    const word = (p.title.toLowerCase().match(/[a-z]{4,}/) || ["paper"])[0];
    let key = first + p.year + word, n = 2;
    while (usedKeys.has(key)) key = first + p.year + word + n++;
    usedKeys.add(key);
    return key;
  };
  const toBib = (p) => {
    const kind = p.type === "journal" ? "article" : p.type === "thesis" ? "phdthesis" : "inproceedings";
    const venueField = p.type === "journal" ? "journal" : p.type === "thesis" ? "school" : "booktitle";
    const f = [
      ["title", p.title],
      ["author", p.authors.replace(/, et al\.$/, " and others").split(", ").join(" and ")],
      [venueField, p.venue.replace(/^PhD thesis, /, "")],
      ["year", p.year]
    ];
    if (p.details) f.push(["note", p.details]);
    if (p.doi) f.push(["doi", p.doi]);
    return `@${kind}{${p._key},\n` + f.map(([k, v]) => `  ${k} = {${String(v).replace(/&/g, "\\&")}}`).join(",\n") + "\n}";
  };
  pubs.forEach((p) => (p._key = bibKey(p)));

  const pubHtml = (p) => {
    const r = projectOf[p.id];
    return `
    <li class="row pub">
      <div class="row-main">
        <a class="pub-title" href="${esc(pubUrl(p))}" target="_blank" rel="noopener">${esc(p.title)}</a>
        <span class="label">${TYPE[p.type] || p.type}</span>
        <p class="pub-authors">${esc(p.authors).replace(ME, (m) => "<strong>" + m + "</strong>")}</p>
        <p class="pub-venue">${esc(p.venue)}${p.details ? ", " + esc(p.details) : ""}</p>
        <p class="pub-meta">
          ${r ? `<a class="proj" href="#project-${esc(r.id)}">${dot(r.color)}${esc(shortTitle(r))}</a>` : ""}
          <span>${p.year}</span>
          ${p.doi ? `<span class="mono">doi:${esc(p.doi)}</span>` : ""}
          ${p.award ? `<span class="award"><i class="fa-solid fa-award" aria-hidden="true"></i>${esc(p.award)}</span>` : ""}
        </p>
      </div>
      <button class="btn btn-sm" type="button" data-bib="${p._id}" aria-expanded="false">Cite</button>
    </li>`;
  };

  /* state.only = { ids: Set of publication ids, html: chip label } narrows the list
     (set by the heatmap and the collaborator map). */
  const state = { type: "all", q: "", only: null };
  function renderPubs() {
    const q = state.q.toLowerCase(), o = state.only;
    const list = pubs.filter((p) =>
      (state.type === "all" || p.type === state.type) &&
      (!o || o.ids.has(p.id)) &&
      (!q || (p.title + " " + p.authors + " " + p.venue + " " + p.year).toLowerCase().includes(q)));
    $("#pub-list").innerHTML = list.length
      ? list.map(pubHtml).join("")
      : `<li class="row empty">No publications match these filters. Try a shorter search or another filter.</li>`;
    $("#pub-count").innerHTML = `<strong>${list.length}</strong> of ${pubs.length} publications` + (o
      ? ` <span class="label filter-chip">${o.html}<button type="button" class="chip-x" aria-label="Clear this filter">×</button></span>`
      : "");
  }
  $("#graph").addEventListener("click", (e) => {
    const a = e.target.closest("[data-y]"); if (!a) return;
    const r = S.research.find((x) => x.id === a.dataset.r), y = +a.dataset.y;
    state.only = { ids: new Set(r.publications.filter((id) => pubById[id] && pubById[id].year === y)), html: `${dot(r.color)}${esc(shortTitle(r))}, ${y}` };
    renderPubs();
    if (location.hash === "#pub-count") window.dispatchEvent(new HashChangeEvent("hashchange"));
  });
  $("#pub-count").addEventListener("click", (e) => {
    if (!e.target.closest(".chip-x")) return;
    state.only = null; renderPubs();
  });
  const pf = $("#pub-filters");
  const counts = pubs.reduce((c, p) => ((c[p.type] = (c[p.type] || 0) + 1), c), {});
  pf.innerHTML = [["all", "All"]].concat(Object.entries(TYPE).filter(([k]) => counts[k]))
    .map(([k, l]) => `<button type="button" data-type="${k}" aria-pressed="${k === "all"}">${l}${k === "all" ? "" : ` <span class="count">${counts[k]}</span>`}</button>`).join("");
  pf.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    pf.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    state.type = b.dataset.type; renderPubs();
  });
  $("#pub-search").addEventListener("input", (e) => { state.q = e.target.value.trim(); renderPubs(); });
  $("#pub-list").addEventListener("click", (e) => {
    const b = e.target.closest("[data-bib]"); if (!b) return;
    const li = b.closest(".pub"), open = li.querySelector(".bib");
    if (open) { open.remove(); b.setAttribute("aria-expanded", "false"); return; }
    li.insertAdjacentHTML("beforeend", `<pre class="bib">${esc(toBib(pubs[+b.dataset.bib]))}</pre>`);
    b.setAttribute("aria-expanded", "true");
  });
  $("#bib-all").addEventListener("click", () => {
    const blob = new Blob([pubs.map(toBib).join("\n\n") + "\n"], { type: "application/x-bibtex" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "majumder-publications.bib" });
    document.body.appendChild(a); a.click(); a.remove();
  });
  renderPubs();

  /* ---------- Experience & education ---------- */
  const roleHtml = (x) => {
    const now = /present/i.test(x.period);
    return `<li class="${now ? "now" : ""}"><span class="tl-dot" aria-hidden="true"></span><div class="box tl-box">
      <p class="tl-period">${esc(x.period)}${now ? ' <span class="label label-accent">Current</span>' : ""}</p>
      <h3 class="tl-role">${esc(x.role)}</h3>
      <p class="tl-org">${esc(x.org)}<span>${esc(x.place)}</span></p>
      ${x.text ? `<p class="tl-text">${esc(x.text)}</p>` : ""}</div></li>`;
  };
  $("#experience-list").innerHTML = S.experience.map(roleHtml).join("");
  $("#teaching-list").innerHTML = (S.teaching || []).map(roleHtml).join("");
  $("#education-list").innerHTML = S.education.map((x) => `
    <li><span class="tl-dot" aria-hidden="true"></span><div class="box tl-box">
      <p class="tl-period">${esc(x.period)}</p>
      <h3 class="tl-role">${esc(x.degree)}</h3>
      <p class="tl-org">${esc(x.org)}</p>
      ${x.text ? `<p class="tl-text">${esc(x.text)}</p>` : ""}</div></li>`).join("");

  /* ---------- Awards & workshops ---------- */
  $("#awards-list").innerHTML = S.awards.map((a, i) => `
    <li class="row award-row">
      <i class="fa-solid fa-award row-icon" aria-hidden="true"></i>
      <div class="row-main"><p class="row-title">${esc(a.title)}</p><p class="row-sub">${esc(a.by)}</p></div>
      <span class="row-year">${esc(a.year)}</span>
      ${a.image ? `<button type="button" class="photo" data-award="${i}" aria-label="View photo: ${esc(a.title)}"><img src="${esc(a.image)}" alt="" loading="lazy"></button>` : '<span class="photo-gap"></span>'}
    </li>`).join("");
  $("#awards-list").addEventListener("click", (e) => {
    const b = e.target.closest("[data-award]"); if (!b) return;
    const a = S.awards[+b.dataset.award];
    openLightbox(a.image, a.title, `<span class="cap">${esc(a.title)}, ${esc(a.by)}</span>`);
  });

  $("#workshops-list").innerHTML = S.workshops.map((w, i) => `
    <article class="box ws">
      ${w.image ? `<button type="button" class="photo" data-ws="${i}" aria-label="View photo: ${esc(w.title)}"><img src="${esc(w.image)}" alt="" loading="lazy"></button>` : ""}
      <div class="ws-body"><h3>${esc(w.title)}</h3><p class="ws-when">${esc(w.date)}, ${esc(w.where)}</p>${w.with ? `<p class="ws-with">With ${esc(w.with)}</p>` : ""}</div>
    </article>`).join("");
  $("#workshops-list").addEventListener("click", (e) => {
    const b = e.target.closest("[data-ws]"); if (!b) return;
    const w = S.workshops[+b.dataset.ws];
    openLightbox(w.image, w.title, `<span class="cap">${esc(w.title)}</span><span class="credit">${esc(w.where)}, ${esc(w.date)}</span>`);
  });

  /* ---------- Activities: talks, service, summer schools ---------- */
  const dated = (x, icon) => `<li class="row dated"><i class="fa-solid ${icon} row-icon" aria-hidden="true"></i><div class="row-main">
      <p class="row-title">${esc(x.title)}</p><p class="row-sub">${esc([x.event, x.place].filter(Boolean).join(" · "))}</p></div>
      <span class="row-year">${esc(x.date)}</span></li>`;
  $("#talks-list").innerHTML = (S.talks || []).map((x) => dated(x, "fa-microphone-lines")).join("");
  $("#schools-list").innerHTML = (S.summerSchools || []).map((x) => dated(x, "fa-school")).join("");
  $("#service-list").innerHTML = (S.service || []).map((g) => `<article class="box service-group"><header class="box-head">${esc(g.group)}</header>
      <ul>${g.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul></article>`).join("");

  /* ---------- Recognition: GitHub-style photo gallery ---------- */
  const G = S.gallery || [];
  const gTags = ["All"].concat([...new Set(G.map((g) => g.tag).filter(Boolean))]);
  let gTag = "All";
  const gMeta = (g) => [g.place, g.year].filter(Boolean).join(" · ");
  function renderGallery() {
    const list = G.map((g, i) => [g, i]).filter(([g]) => gTag === "All" || g.tag === gTag);
    $("#gallery").innerHTML = list.map(([g, i]) => `<li><button type="button" class="g-item" data-g="${i}" aria-label="View photo: ${esc(g.caption)}">
        <img src="${esc(g.src)}" alt="" loading="lazy"><span class="g-cap"><strong>${esc(g.caption)}</strong>${gMeta(g) ? `<span>${esc(gMeta(g))}</span>` : ""}</span></button></li>`).join("");
    $("#gallery-count").textContent = plural(list.length, "photo");
  }
  $("#gallery-filters").innerHTML = gTags.map((t) => `<button type="button" data-tag="${esc(t)}" aria-pressed="${t === gTag}">${esc(t)}</button>`).join("");
  $("#gallery-filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tag]"); if (!b) return;
    gTag = b.dataset.tag;
    $("#gallery-filters").querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderGallery();
  });
  $("#gallery").addEventListener("click", (e) => {
    const b = e.target.closest("[data-g]"); if (!b) return;
    const g = G[+b.dataset.g];
    openLightbox(g.src, g.caption, `<span class="cap">${esc(g.caption)}</span>${gMeta(g) ? `<span class="credit">${esc(gMeta(g))}</span>` : ""}`);
  });
  renderGallery();

  /* ---------- Footer ---------- */
  $("#contact-address").innerHTML = P.address.map(esc).join(", ");
  $("#year").textContent = new Date().getFullYear();
  $("#updated").textContent = S.lastUpdated;

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement, tbtn = $("#theme-toggle");
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const label = () => tbtn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
  tbtn.onclick = () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    label();
  };
  label();

  /* ---------- Tabs, driven by the URL hash ---------- */
  const panels = [...document.querySelectorAll(".panel")];
  const tabs = [...document.querySelectorAll(".tabs a")];
  function route(scroll) {
    const id = decodeURIComponent(location.hash.slice(1)) || "overview";
    const target = document.getElementById(id);
    const panel = target ? (target.classList.contains("panel") ? target : target.closest(".panel")) : null;
    const show = panel || panels[0];
    panels.forEach((p) => (p.hidden = p !== show));
    tabs.forEach((t) => {
      const on = t.dataset.tab === show.id;
      t.setAttribute("aria-selected", on);
      t.classList.toggle("active", on);
    });
    if (!scroll) return;
    if (target && target !== show) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    else window.scrollTo({ top: 0 });
  }
  window.addEventListener("hashchange", () => { route(true); layoutTabs(); closeMore(); });
  route(!!location.hash);

  /* ---------- GitHub-style overflow: tabs that don't fit go into "More" ---------- */
  const tabsIn = $(".tabs-in"), moreWrap = $(".tabs-more"), moreBtn = $(".more-btn"), moreMenu = $("#tabs-menu");
  function closeMore() { moreMenu.hidden = true; moreBtn.setAttribute("aria-expanded", "false"); }
  function layoutTabs() {
    tabs.forEach((t) => (t.hidden = false));
    moreWrap.hidden = true;
    const avail = tabsIn.clientWidth;
    const widths = tabs.map((t) => t.getBoundingClientRect().width + 4);
    if (widths.reduce((a, b) => a + b, 0) <= avail) { moreMenu.innerHTML = ""; return; }
    moreWrap.hidden = false;
    const room = avail - moreWrap.getBoundingClientRect().width - 8;
    let used = 0, fit = 0;
    while (fit < tabs.length && used + widths[fit] <= room) used += widths[fit++];
    const keep = tabs.slice(0, fit);
    const active = tabs.find((t) => t.classList.contains("active"));
    if (active && !keep.includes(active)) {
      used += widths[tabs.indexOf(active)];
      while (keep.length && used > room) used -= widths[tabs.indexOf(keep.pop())];
      keep.push(active);
    }
    const shown = new Set(keep);
    const hidden = tabs.filter((t) => !shown.has(t));
    hidden.forEach((t) => (t.hidden = true));
    moreMenu.innerHTML = hidden.map((t) => `<a href="${t.getAttribute("href")}" role="menuitem">${t.innerHTML}</a>`).join("");
  }
  moreBtn.addEventListener("click", () => {
    const open = moreMenu.hidden;
    moreMenu.hidden = !open; moreBtn.setAttribute("aria-expanded", String(open));
    if (open) { const f = moreMenu.querySelector("a"); if (f) f.focus(); }
  });
  moreMenu.addEventListener("keydown", (e) => {
    const items = [...moreMenu.querySelectorAll("a")], i = items.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    if (e.key === "Escape") { closeMore(); moreBtn.focus(); }
  });
  moreMenu.addEventListener("click", (e) => { if (e.target.closest("a")) closeMore(); });
  document.addEventListener("click", (e) => { if (!moreWrap.contains(e.target)) closeMore(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !moreMenu.hidden) { closeMore(); moreBtn.focus(); } });
  if (window.ResizeObserver) new ResizeObserver(layoutTabs).observe(tabsIn); else window.addEventListener("resize", layoutTabs);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutTabs);
  layoutTabs();
})();
