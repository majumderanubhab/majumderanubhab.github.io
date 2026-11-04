/* Renders the website from data/content.js. You normally don't need to edit this file. */
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
  const shortTitle = (r) => r.title.split(":")[0];
  const papersIn = (r) => r.publications.filter((id) => pubById[id]).length;
  const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

  /* ---------- Sidebar ---------- */
  $("#avatar").src = P.photo;
  $("#avatar").alt = "Portrait of " + P.name;
  $("#name").textContent = P.name;
  $("#handle").textContent = P.position;
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

  /* ---------- Overview: pinned research lines ---------- */
  const firstSentence = (t) => (t.match(/^.*?[.!?](\s|$)/) || [t])[0].trim();
  $("#pinned").innerHTML = S.research.map((r) => `
    <li class="box pin">
      <a class="pin-title" href="#project-${esc(r.id)}"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i>${esc(shortTitle(r))}</a>
      <p class="pin-text">${esc(firstSentence(r.summary))}</p>
      <p class="pin-meta">${dot(r.color)}<span>${esc(r.period)}</span><span><i class="fa-regular fa-file-lines" aria-hidden="true"></i>${plural(papersIn(r), "paper")}</span></p>
    </li>`).join("");

  /* ---------- Overview: publication graph ---------- */
  const years = S.publications.map((p) => p.year);
  const gy0 = Math.min(...years), gy1 = Math.max(...years);
  $("#graph-h").textContent = `${S.publications.length} publications from ${gy0} to ${gy1}`;
  const cols = [];
  for (let y = gy0; y <= gy1; y++) {
    const ps = S.publications.filter((p) => p.year === y)
      .sort((a, b) => S.research.indexOf(projectOf[a.id]) - S.research.indexOf(projectOf[b.id]));
    cols.push(`<div class="g-col"><div class="g-cells">${ps.map((p) => {
      const r = projectOf[p.id];
      return `<a class="g-cell" href="${esc(pubUrl(p))}" target="_blank" rel="noopener" style="--c:${esc((r && r.color) || "var(--muted)")}" title="${esc(p.title)} (${p.year})${r ? "\n" + esc(shortTitle(r)) : ""}"><span class="vh">${esc(p.title)}</span></a>`;
    }).join("") || '<span class="g-empty"></span>'}</div><span class="g-year">${y}</span></div>`);
  }
  $("#graph").innerHTML = `<div class="g-cols">${cols.join("")}</div>
    <ul class="g-legend">${S.research.map((r) => `<li>${dot(r.color)}${esc(shortTitle(r))}</li>`).join("")}</ul>`;

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

  const state = { type: "all", q: "" };
  function renderPubs() {
    const q = state.q.toLowerCase();
    const list = pubs.filter((p) =>
      (state.type === "all" || p.type === state.type) &&
      (!q || (p.title + " " + p.authors + " " + p.venue + " " + p.year).toLowerCase().includes(q)));
    $("#pub-list").innerHTML = list.length
      ? list.map(pubHtml).join("")
      : `<li class="row empty">No publications match “${esc(state.q)}”. Try a shorter search or another filter.</li>`;
    $("#pub-count").innerHTML = `<strong>${list.length}</strong> of ${pubs.length} publications`;
  }
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
  $("#experience-list").innerHTML = S.experience.map((x) => {
    const now = /present/i.test(x.period);
    return `<li class="${now ? "now" : ""}"><span class="tl-dot" aria-hidden="true"></span><div class="box tl-box">
      <p class="tl-period">${esc(x.period)}${now ? ' <span class="label label-accent">Current</span>' : ""}</p>
      <h3 class="tl-role">${esc(x.role)}</h3>
      <p class="tl-org">${esc(x.org)}<span>${esc(x.place)}</span></p>
      ${x.text ? `<p class="tl-text">${esc(x.text)}</p>` : ""}</div></li>`;
  }).join("");
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
  window.addEventListener("hashchange", () => route(true));
  route(!!location.hash);
})();
