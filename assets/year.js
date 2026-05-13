(function () {
  const data = window.COURSE_DATA;
  if (!data) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const byId = (id) => document.getElementById(id);
  const html = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  let activeSlideIndex = 0;
  let activeSearchType = "all";
  let navTicking = false;
  let previewTicking = false;
  let activeNavHoldId = "";
  let activeNavHoldUntil = 0;

  function linksTemplate(links) {
    return `<div class="links">${(links || []).map((link) => {
      const attrs = [
        `href="${html(link.href)}"`,
        link.primary ? 'class="primary"' : "",
        link.pdf ? `data-pdf="${html(link.pdf)}" data-title="${html(link.title)}"` : "",
        link.external ? 'target="_blank" rel="noopener noreferrer"' : "",
      ].filter(Boolean).join(" ");
      return `<a ${attrs}>${html(link.label)}</a>`;
    }).join("")}</div>`;
  }

  function tagList(tags) {
    return `<div class="tags">${(tags || []).map((tag) => `<span class="tag">${html(tag)}</span>`).join("")}</div>`;
  }

  function renderCurrentSession() {
    const card = document.querySelector(".current-session-card");
    if (!card || !data.currentSession) return;
    const session = data.sessions.find((item) => item.id === data.currentSession.id) || data.currentSession;
    card.innerHTML = [
      '<span class="course-tool-label">Session Shortcut</span>',
      `<h2 id="current-session-title">${html(session.kicker)}: ${html(session.title)}</h2>`,
      `<p>${html(data.currentSession.description || session.description)}</p>`,
      linksTemplate(data.currentSession.links || session.links),
    ].join("");
  }

  function renderSketches() {
    const grid = document.querySelector(".web-grid");
    if (!grid) return;
    grid.innerHTML = data.sketches.map((sketch) => `
      <article class="web-card" data-sketch-id="${html(sketch.id)}">
        <div class="preview">
          <iframe loading="lazy" scrolling="no" src="about:blank" data-src="${html(sketch.page)}" title="${html(sketch.title)} preview" sandbox="allow-scripts" allowfullscreen></iframe>
        </div>
        <div class="web-card-content">
          <h3>${html(sketch.title)}</h3>
          <p>${html(sketch.description)}</p>
          ${tagList([sketch.session, ...(sketch.tags || []), sketch.difficulty ? `Difficulty: ${sketch.difficulty}` : ""].filter(Boolean))}
          <div class="details"><span>You can:</span> ${html(sketch.try)}</div>
          ${sketch.related?.length ? `<div class="details"><span>Related:</span> ${sketch.related.map((id) => {
            const related = data.sketches.find((item) => item.id === id);
            return related ? `<a href="web/lab.html?sketch=${html(related.id)}">${html(related.title)}</a>` : "";
          }).filter(Boolean).join(", ")}</div>` : ""}
          ${linksTemplate([
            { label: "Edit in the Lab", href: `web/lab.html?sketch=${sketch.id}`, primary: true },
            { label: "Open sketch only", href: sketch.page },
            { label: "Fullscreen", href: sketch.page, external: true },
            { label: "Compare Processing code", href: sketch.source },
          ])}
        </div>
      </article>
    `).join("");
  }

  function renderSlides() {
    const controls = document.querySelector(".slide-controls");
    const title = byId("slide-title");
    const frame = byId("slide-frame");
    const direct = byId("slide-direct-link");
    if (!controls || !title || !frame || !direct) return;
    if (!data.slides?.length) {
      controls.innerHTML = '<p class="slide-list-label">No slide decks have been added yet.</p>';
      frame.src = "about:blank";
      direct.removeAttribute("href");
      return;
    }

    controls.innerHTML = [
      '<p class="slide-list-label">Choose a slide deck</p>',
      '<label class="slide-select-label" for="slide-select">Choose a slide deck</label>',
      `<select class="slide-select" id="slide-select" aria-label="Choose a slide deck">${data.slides.map((slide, index) => `<option value="${index}">${html(slide.title)}</option>`).join("")}</select>`,
      ...data.slides.map((slide, index) => `<button class="slide-picker" type="button" aria-pressed="${index === 0 ? "true" : "false"}" data-index="${index}">${html(slide.kicker)}</button>`),
    ].join("");

    function setSlide(index) {
      const safeIndex = (index + data.slides.length) % data.slides.length;
      const slide = data.slides[safeIndex];
      activeSlideIndex = safeIndex;
      title.textContent = slide.title;
      frame.src = slide.pdf;
      frame.title = `${slide.title} slides`;
      direct.href = slide.pdf;
      byId("slide-select").value = String(safeIndex);
      document.querySelectorAll(".slide-picker").forEach((button, buttonIndex) => {
        button.setAttribute("aria-pressed", String(buttonIndex === safeIndex));
      });
    }

    document.querySelectorAll(".slide-picker").forEach((button) => {
      button.addEventListener("click", () => setSlide(Number(button.dataset.index)));
    });
    byId("slide-select").addEventListener("change", (event) => setSlide(Number(event.target.value)));
    byId("prev-slide-deck")?.addEventListener("click", () => setSlide(activeSlideIndex - 1));
    byId("next-slide-deck")?.addEventListener("click", () => setSlide(activeSlideIndex + 1));
    setSlide(0);
  }

  function renderSessions() {
    const grid = document.querySelector(".sessions");
    if (!grid) return;
    grid.innerHTML = data.sessions.map((session) => `
      <article class="session-card">
        <div class="session-kicker"><span>${html(session.kicker)}</span>${session.duration ? `<span>${html(session.duration)}</span>` : ""}</div>
        <h3>${html(session.title)}</h3>
        <p>${html(session.description)}</p>
        ${tagList(session.tags)}
        ${linksTemplate(session.links)}
      </article>
    `).join("");
  }

  function searchItems() {
    const slideItems = data.slides.map((slide) => ({
      type: "slide",
      title: `Slides - ${slide.kicker}`,
      href: "#slides",
      pdf: slide.pdf,
      slideTitle: slide.title,
      description: slide.title,
      keywords: [slide.title, slide.kicker, ...(slide.tags || [])].join(" "),
    }));
    const sessionItems = data.sessions.map((session) => ({
      type: "session",
      title: `${session.kicker} - ${session.title}`,
      href: session.href,
      description: session.description,
      keywords: [session.title, session.description, ...(session.tags || [])].join(" "),
    }));
    const sketchItems = data.sketches.map((sketch) => ({
      type: "sketch",
      title: sketch.title,
      href: `web/lab.html?sketch=${sketch.id}`,
      description: sketch.description,
      keywords: [sketch.title, sketch.description, sketch.session, ...(sketch.tags || [])].join(" "),
    }));
    return [...sessionItems, ...sketchItems, ...slideItems, ...(data.searchExtras || [])];
  }

  function renderCourseSearch() {
    const input = byId("course-search-input");
    const results = byId("course-search-results");
    const count = byId("course-search-count");
    const empty = byId("course-search-empty");
    if (!input || !results || !count || !empty) return;

    const query = input.value.trim().toLowerCase();
    const matches = searchItems().filter((item) => {
      const typeMatch = activeSearchType === "all" || item.type === activeSearchType;
      const haystack = [item.type, item.title, item.description, item.keywords].join(" ").toLowerCase();
      return typeMatch && (!query || haystack.includes(query));
    });

    results.innerHTML = matches.map((item) => {
      const pdfAttrs = item.pdf ? ` data-pdf="${html(item.pdf)}" data-title="${html(item.slideTitle || item.title)}"` : "";
      return `<li><a class="search-result-link" href="${html(item.href)}"${pdfAttrs}><span class="search-result-type">${html(item.type)}</span><strong>${html(item.title)}</strong><span>${html(item.description)}</span></a></li>`;
    }).join("");
    count.textContent = `${matches.length} course ${matches.length === 1 ? "item" : "items"} shown`;
    empty.hidden = matches.length !== 0;
  }

  function setupSearch() {
    byId("course-search-input")?.addEventListener("input", renderCourseSearch);
    document.querySelectorAll("[data-search-type]").forEach((button) => {
      button.addEventListener("click", () => {
        activeSearchType = button.dataset.searchType;
        document.querySelectorAll("[data-search-type]").forEach((filter) => {
          filter.setAttribute("aria-pressed", String(filter === button));
        });
        renderCourseSearch();
      });
    });
    renderCourseSearch();
  }

  function scrollToSection(selector) {
    let target = null;
    try {
      target = document.querySelector(selector);
    } catch {
      return;
    }
    if (!target) return;
    const topbarHeight = document.querySelector(".topbar")?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - topbarHeight - 18;
    window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion.matches ? "auto" : "smooth" });
  }

  function setActiveNav(activeId) {
    document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
      const active = link.getAttribute("href") === `#${activeId}`;
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }

  function updateActiveNav() {
    if (activeNavHoldId && performance.now() < activeNavHoldUntil) {
      setActiveNav(activeNavHoldId);
      return;
    }
    activeNavHoldId = "";
    const sections = [...document.querySelectorAll('nav a[href^="#"]')]
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    const line = Math.min(window.innerHeight * 0.36, 280);
    let activeId = sections[0]?.id;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= line) activeId = section.id;
    });
    if (activeId) setActiveNav(activeId);
  }

  function requestActiveNavUpdate() {
    if (navTicking) return;
    navTicking = true;
    requestAnimationFrame(() => {
      updateActiveNav();
      navTicking = false;
    });
  }

  function updateSketchPreviews() {
    const margin = reducedMotion.matches ? 250 : 650;
    document.querySelectorAll(".preview iframe").forEach((frame, index) => {
      const preview = frame.closest(".preview");
      const source = frame.dataset.src;
      const rect = frame.getBoundingClientRect();
      const near = rect.bottom > -margin && rect.top < window.innerHeight + margin;
      const keepLeading = window.location.hash === "#web-sketches" && index < 4;
      if (near || keepLeading) {
        if (source && frame.getAttribute("src") !== source) frame.setAttribute("src", source);
        preview?.classList.remove("is-paused");
      } else {
        if (source && frame.getAttribute("src") !== "about:blank") frame.setAttribute("src", "about:blank");
        preview?.classList.add("is-paused");
      }
    });
  }

  function requestSketchPreviewUpdate() {
    if (previewTicking) return;
    previewTicking = true;
    requestAnimationFrame(() => {
      updateSketchPreviews();
      previewTicking = false;
    });
  }

  function setupClicks() {
    document.addEventListener("click", (event) => {
      const pdfTrigger = event.target.closest("[data-pdf]");
      if (pdfTrigger) {
        event.preventDefault();
        const index = data.slides.findIndex((slide) => slide.pdf === pdfTrigger.dataset.pdf);
        if (index >= 0) {
          document.querySelectorAll(".slide-picker")[index]?.click();
        }
        history.pushState(null, "", "#slides");
        activeNavHoldId = "slides";
        activeNavHoldUntil = performance.now() + 900;
        setActiveNav("slides");
        scrollToSection("#slides");
        return;
      }

      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = anchor.getAttribute("href");
      if (!target || target === "#" || !document.querySelector(target)) return;
      event.preventDefault();
      history.pushState(null, "", target);
      activeNavHoldId = target.slice(1);
      activeNavHoldUntil = performance.now() + 900;
      setActiveNav(activeNavHoldId);
      scrollToSection(target);
      updateSketchPreviews();
    });
  }

  function init() {
    renderCurrentSession();
    renderSketches();
    renderSlides();
    renderSessions();
    setupSearch();
    setupClicks();
    updateActiveNav();
    updateSketchPreviews();
    window.addEventListener("scroll", requestActiveNavUpdate, { passive: true });
    window.addEventListener("scroll", requestSketchPreviewUpdate, { passive: true });
    window.addEventListener("resize", () => {
      requestActiveNavUpdate();
      requestSketchPreviewUpdate();
    });
    window.addEventListener("hashchange", requestActiveNavUpdate);
    window.addEventListener("load", () => {
      if (window.location.hash) scrollToSection(window.location.hash);
      updateActiveNav();
      updateSketchPreviews();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
