/* Renders the website from data/content.js. You normally don't need to edit this file. */
(function () {
  "use strict";
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const scholarSearch = (t) => "https://scholar.google.com/scholar?q=" + encodeURIComponent('"' + t + '"');
  const pubUrl = (p) => p.url || (p.doi ? "https://doi.org/" + p.doi : scholarSearch(p.title));
  const ME = /\bA(?:nubhab)? Majumder\b/g;

  /* ---------- Profile / sidebar ---------- */
  const P = S.profile;
  $("#avatar").src = P.photo;
  $("#avatar").alt = P.name;
  $("#name").textContent = P.name;
  $("#position").innerHTML = "<span>" + esc(P.position) + "</span>" + P.affiliations.map((a) => "<span>" + esc(a) + "</span>").join("");

  const ICONS = {
    email: ["fa-solid fa-envelope", "Email"],
    scholar: ["ai ai-google-scholar", "Google Scholar"],
    orcid: ["ai ai-orcid", "ORCID"],
    linkedin: ["fa-brands fa-linkedin-in", "LinkedIn"],
    researchgate: ["ai ai-researchgate", "ResearchGate"],
    pure: ["fa-solid fa-building-columns", "Aarhus University profile"],
    github: ["fa-brands fa-github", "GitHub"]
  };
  const links = Object.assign({ email: "mailto:" + P.emails[0] }, P.links);
  $("#icons").innerHTML = Object.entries(links)
    .filter(([k, v]) => v && ICONS[k])
    .map(([k, v]) => `<a href="${esc(v)}" title="${ICONS[k][1]}" aria-label="${ICONS[k][1]}" ${k === "email" ? "" : 'target="_blank" rel="noopener"'}><i class="${ICONS[k][0]}"></i></a>`)
    .join("");

  /* ---------- About ---------- */
  $("#bio").innerHTML = P.bio.map((p, i) => `<p class="${i === 0 ? "lead" : ""}">${esc(p)}</p>`).join("");
  $("#interests").innerHTML = P.interests.map((t) => `<span class="chip">${esc(t)}</span>`).join("");

  /* ---------- News ---------- */
  const NEWS_SHOWN = 5;
  const newsHtml = (items) => items.map((n) => `<li><span class="date">${esc(n.date)}</span><span>${n.text}</span></li>`).join("");
  $("#news-list").innerHTML = newsHtml(S.news.slice(0, NEWS_SHOWN));
  if (S.news.length > NEWS_SHOWN) {
    const btn = $("#news-more");
    btn.hidden = false;
    btn.onclick = () => { $("#news-list").innerHTML = newsHtml(S.news); btn.hidden = true; };
  }

  /* ---------- Research ---------- */
  const themeLabel = Object.fromEntries(S.researchThemes.map((t) => [t.key, t.label]));
  const projectHtml = (r) => `
    <article class="project ${r.image ? "" : "noimg"}" data-themes="${esc(r.themes.join(" "))}">
      ${r.image ? `<img src="${esc(r.image)}" alt="" loading="lazy">` : ""}
      <div>
        <h3>${esc(r.title)}</h3>
        <div class="years">${esc(r.years)}</div>
        <p>${esc(r.summary)}</p>
        <div class="tags">
          ${r.themes.map((t) => `<span class="chip">${esc(themeLabel[t] || t)}</span>`).join("")}
          ${r.link ? `<a href="${esc(r.link)}" target="_blank" rel="noopener">Related paper →</a>` : ""}
        </div>
      </div>
    </article>`;
  $("#research-list").innerHTML = S.research.map(projectHtml).join("");

  const rf = $("#research-filters");
  rf.innerHTML = [{ key: "all", label: "All" }].concat(S.researchThemes)
    .map((t) => `<button class="filter" data-key="${t.key}" aria-pressed="${t.key === "all"}">${esc(t.label)}</button>`).join("");
  rf.addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    rf.querySelectorAll(".filter").forEach((x) => x.setAttribute("aria-pressed", x === b));
    document.querySelectorAll("#research-list .project").forEach((el) => {
      el.hidden = !(b.dataset.key === "all" || el.dataset.themes.split(" ").includes(b.dataset.key));
    });
  });

  /* ---------- Publications ---------- */
  const TYPE = { journal: "Journal", conference: "Conference", thesis: "Thesis" };
  const pubs = S.publications.slice().sort((a, b) => b.year - a.year);
  pubs.forEach((p, i) => (p._id = i));

  const bibKey = (p) => {
    const first = (p.authors.split(",")[0].trim().split(" ").pop() || "anon").toLowerCase().replace(/[^a-z]/g, "");
    const word = (p.title.toLowerCase().match(/[a-z]{4,}/) || ["paper"])[0];
    let key = first + p.year + word, n = 2;
    while (usedKeys.has(key)) key = first + p.year + word + n++;
    usedKeys.add(key);
    return key;
  };
  const usedKeys = new Set();
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

  const pubHtml = (p) => `
    <li class="pub" data-type="${p.type}">
      <a class="title" href="${esc(pubUrl(p))}" target="_blank" rel="noopener">${esc(p.title)}</a>
      <div class="authors">${esc(p.authors).replace(ME, (m) => "<strong>" + m + "</strong>")}</div>
      <div class="venue">${esc(p.venue)}${p.details ? ", " + esc(p.details) : ""}</div>
      <div class="meta">
        <span class="badge ${p.type}">${TYPE[p.type] || p.type}</span>
        ${p.award ? `<span class="badge">🏆 ${esc(p.award)}</span>` : ""}
        <button class="linkbtn" data-bib="${p._id}">BibTeX</button>
      </div>
    </li>`;

  const state = { type: "all", q: "" };
  function renderPubs() {
    const q = state.q.toLowerCase();
    const list = pubs.filter((p) =>
      (state.type === "all" || p.type === state.type) &&
      (!q || (p.title + " " + p.authors + " " + p.venue + " " + p.year).toLowerCase().includes(q)));
    const years = [...new Set(list.map((p) => p.year))];
    $("#pub-list").innerHTML = list.length
      ? years.map((y) => `<h3 class="pub-year">${y}</h3><ul class="pubs">${list.filter((p) => p.year === y).map(pubHtml).join("")}</ul>`).join("")
      : `<p class="muted">No publications match.</p>`;
    $("#pub-count").textContent = `${list.length} of ${pubs.length} publications`;
  }
  const pf = $("#pub-filters");
  const counts = pubs.reduce((c, p) => ((c[p.type] = (c[p.type] || 0) + 1), c), {});
  pf.insertAdjacentHTML("afterbegin",
    [["all", "All"]].concat(Object.entries(TYPE).filter(([k]) => counts[k]))
      .map(([k, l]) => `<button class="filter" data-type="${k}" aria-pressed="${k === "all"}">${l}${k === "all" ? "" : " (" + counts[k] + ")"}</button>`).join(""));
  pf.addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    pf.querySelectorAll(".filter").forEach((x) => x.setAttribute("aria-pressed", x === b));
    state.type = b.dataset.type; renderPubs();
  });
  $("#pub-search").addEventListener("input", (e) => { state.q = e.target.value.trim(); renderPubs(); });
  $("#pub-list").addEventListener("click", (e) => {
    const b = e.target.closest("[data-bib]"); if (!b) return;
    const li = b.closest(".pub"), open = li.querySelector(".bib");
    if (open) { open.remove(); return; }
    li.insertAdjacentHTML("beforeend", `<pre class="bib">${esc(toBib(pubs[+b.dataset.bib]))}</pre>`);
  });
  $("#bib-all").addEventListener("click", () => {
    const blob = new Blob([pubs.map(toBib).join("\n\n") + "\n"], { type: "application/x-bibtex" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "majumder-publications.bib" });
    document.body.appendChild(a); a.click(); a.remove();
  });
  renderPubs();

  /* ---------- Experience & education ---------- */
  $("#experience-list").innerHTML = S.experience.map((x) => `
    <li><div class="period">${esc(x.period)}</div>
      <div><div class="role">${esc(x.role)}</div><div class="org">${esc(x.org)} · <span class="muted">${esc(x.place)}</span></div>
      ${x.text ? `<p>${esc(x.text)}</p>` : ""}</div></li>`).join("");
  $("#education-list").innerHTML = S.education.map((x) => `
    <li><div class="period">${esc(x.period)}</div>
      <div><div class="role">${esc(x.degree)}</div><div class="org">${esc(x.org)}</div>
      ${x.text ? `<p>${esc(x.text)}</p>` : ""}</div></li>`).join("");

  /* ---------- Awards ---------- */
  $("#awards-list").innerHTML = S.awards.map((a) => `<li><span class="year">${esc(a.year)}</span><span><strong>${esc(a.title)}</strong>, ${esc(a.by)}</span></li>`).join("");
  $("#awards-gallery").innerHTML = S.awards.filter((a) => a.image).map((a) =>
    `<figure><img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy"><figcaption>${esc(a.title)}, ${esc(a.by.split(",")[0])}</figcaption></figure>`).join("");

  /* ---------- Workshops ---------- */
  $("#workshops-list").innerHTML = S.workshops.map((w) => `
    <article class="card">${w.image ? `<img src="${esc(w.image)}" alt="" loading="lazy">` : ""}
      <div class="body"><h3>${esc(w.title)}</h3><p>${esc(w.where)} · ${esc(w.date)}</p>${w.with ? `<p class="muted">With ${esc(w.with)}</p>` : ""}</div>
    </article>`).join("");

  /* ---------- Contact & footer ---------- */
  $("#contact-email").innerHTML = P.emails.map((e) => `<a href="mailto:${esc(e)}">${esc(e)}</a>`).join("<br>");
  $("#contact-address").innerHTML = P.address.map(esc).join("<br>");
  $("#contact-links").innerHTML = Object.entries(P.links).filter(([k, v]) => v && ICONS[k])
    .map(([k, v]) => `<a href="${esc(v)}" target="_blank" rel="noopener">${ICONS[k][1]}</a>`).join("<br>");
  $("#year").textContent = new Date().getFullYear();
  $("#updated").textContent = S.lastUpdated;

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement, tbtn = $("#theme-toggle");
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const label = () => (tbtn.textContent = isDark() ? "☀ Light mode" : "☾ Dark mode");
  tbtn.onclick = () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    label();
  };
  label();

  /* ---------- Active nav link ---------- */
  const navLinks = [...document.querySelectorAll(".nav a")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
      const act = navLinks.find((a) => a.classList.contains("active"));
      if (act && act.parentElement.scrollWidth > act.parentElement.clientWidth) act.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
  }, { rootMargin: "-30% 0px -65% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
})();
