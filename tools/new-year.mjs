import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const year = process.argv[2];
if (!/^\d{4}-\d{4}$/.test(year || "")) {
  console.error("Usage: npm run new:year -- YYYY-YYYY");
  process.exit(1);
}

const root = process.cwd();
const target = path.join(root, "years", year);
if (existsSync(target)) {
  console.error(`years/${year} already exists.`);
  process.exit(1);
}

for (const directory of ["sessions", "slides", "source", "web", "preview-assets"]) {
  mkdirSync(path.join(target, directory), { recursive: true });
}

writeFileSync(path.join(target, "README.md"), `# ${year}

Programming for Visual Artists course material for ${year}.

Run \`npm run build:index\` after adding sessions, slides, or sketches.
`);

writeFileSync(path.join(target, "course-data.js"), `// Source of truth for the ${year} year page.
// assets/year.js renders session cards, sketch cards, slide controls, and search
// from this data. Update this file before editing repeated markup by hand, then
// run npm run build:index and npm run check.
window.COURSE_DATA = {
  year: "${year}",
  currentSession: null,
  sessions: [],
  sketches: [],
  slides: [],
  searchExtras: [],
};
`);

const baseYearCss = readFileSync(path.join(root, "years", "2025-2026", "year.css"), "utf8")
  .replaceAll("/pva/2025-2026", `/pva/${year}`);
writeFileSync(path.join(target, "year.css"), baseYearCss);

writeFileSync(path.join(target, "index.html"), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="../../favicon.svg" type="image/svg+xml">
    <title>${year} - Programming for Visual Artists</title>
    <meta name="description" content="Programming for Visual Artists ${year} course materials at Aalto University.">
    <meta name="theme-color" content="#090b0f">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; frame-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none';">
    <link rel="stylesheet" href="year.css">
    <link rel="stylesheet" href="../../assets/ascii-skin.css">
  </head>
  <body>
    <a class="skip-link" href="#web-sketches">Skip to course materials</a>
    <header class="topbar">
      <div class="brand">Programming for Visual Artists</div>
      <nav aria-label="${year} directory">
        <a href="../../index.html">all-years</a>
        <a href="./" aria-current="page">${year}</a>
        <a href="#web-sketches">sketches</a>
        <a href="#lab">lab</a>
        <a href="#slides">slides</a>
        <a href="#assignments">projects</a>
        <a href="#sessions">sessions</a>
      </nav>
    </header>
    <main>
      <section class="course-header" aria-labelledby="course-title">
        <p class="eyebrow">Aalto University, ${year}</p>
        <h1 id="course-title">${year} Course Materials</h1>
        <p class="lede">Add sessions, web sketches, PDF slides, Processing source links, and project material as the course develops.</p>
        <div class="byline">
          <span>Teacher: <strong>Tiago Martins Pinto</strong></span>
          <span><a href="mailto:tiago.martinspinto@aalto.fi">tiago.martinspinto@aalto.fi</a></span>
        </div>
      </section>
      <section id="current-session" class="course-tools" aria-labelledby="current-session-title">
        <article class="current-session-card">
          <span class="course-tool-label">Session Shortcut</span>
          <h2 id="current-session-title">No current session yet</h2>
          <p>Add one in course-data.js.</p>
        </article>
        <article class="course-search" aria-labelledby="course-search-title">
          <span class="course-tool-label">Find Course Material</span>
          <h2 id="course-search-title">Course Search</h2>
          <div class="search-controls">
            <input id="course-search-input" type="search" aria-label="Search course materials">
            <div class="search-filters">
              <button class="search-filter" type="button" data-search-type="all" aria-pressed="true">All</button>
              <button class="search-filter" type="button" data-search-type="session" aria-pressed="false">Sessions</button>
              <button class="search-filter" type="button" data-search-type="sketch" aria-pressed="false">Sketches</button>
              <button class="search-filter" type="button" data-search-type="slide" aria-pressed="false">Slides</button>
            </div>
          </div>
          <p class="search-count" id="course-search-count" aria-live="polite"></p>
          <ul class="search-results" id="course-search-results"></ul>
          <p class="search-empty" id="course-search-empty" hidden>No course materials match that search.</p>
        </article>
      </section>
      <section id="web-sketches">
        <div class="section-heading">
          <h2>Web Sketches</h2>
          <p>Add p5.js companion sketches to course-data.js when they are ready to run in the page.</p>
        </div>
        <div class="notice">
          <strong>Web-first where possible</strong>
          <p>Use embedded sketches first. PDF decks and Processing files remain available when original classroom material is needed.</p>
        </div>
        <div class="web-grid"></div>
      </section>
      <section id="lab">
        <div class="section-heading">
          <h2>Sketch Lab</h2>
          <p>Add Lab files after the year has browser sketches to edit.</p>
        </div>
        <div class="feature-grid">
          <article class="feature-card">
            <h3>Run Code in Place</h3>
            <p>Choose a sketch, change its JavaScript, and run the edited version in the same page.</p>
          </article>
          <article class="feature-card">
            <h3>Change One Thing at a Time</h3>
            <p>Use the Lab for small experiments with color, size, speed, loop counts, and function parameters.</p>
          </article>
          <article class="feature-card">
            <h3>Privacy</h3>
            <p>Code edits run locally in your browser and are not uploaded.</p>
          </article>
        </div>
      </section>
      <section id="comparison">
        <div class="section-heading">
          <h2></h2>
          <p></p>
        </div>
        <div class="feature-grid"></div>
      </section>
      <section id="slides">
        <div class="section-heading">
          <h2>Slides Reader</h2>
          <p>Choose a deck, then open the PDF in your browser's reader. This avoids blocked embedded PDF views in stricter browsers.</p>
        </div>
        <div class="slides-reader" aria-label="PDF slides selector">
          <div class="slide-controls"></div>
          <div class="slide-viewer">
            <div class="slide-viewer-bar">
              <strong id="slide-title">No slides yet</strong>
              <div class="slide-actions">
                <button class="reader-button" id="prev-slide-deck" type="button">Previous deck</button>
                <button class="reader-button" id="next-slide-deck" type="button">Next deck</button>
                <a id="slide-direct-link" class="slide-open-link" href="#" target="_blank" rel="noopener noreferrer">Open PDF</a>
              </div>
            </div>
            <div class="pdf-panel" id="slide-panel" role="region" aria-labelledby="slide-title">
              <span class="pdf-kicker">PDF slides</span>
              <p id="slide-panel-message">Some browsers block embedded PDF readers. Use the Open PDF button to read the selected deck in a regular browser tab.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="assignments">
        <div class="section-heading">
          <h2>Projects</h2>
          <p>Add project material only when it belongs on the public course site.</p>
        </div>
        <div class="feature-grid"></div>
      </section>
      <section id="sessions">
        <div class="section-heading">
          <h2>Sessions</h2>
          <p>Use a session page when the week's slides, runnable sketches, and Processing material are ready together.</p>
        </div>
        <div class="sessions"></div>
      </section>
      <footer class="footer"><span>Programming for Visual Artists, Aalto University. Course material by Tiago Martins Pinto.</span><span data-last-updated>Last updated: automatic</span></footer>
    </main>
    <script src="course-data.js"></script>
    <script src="../../assets/year.js"></script>
    <script src="../../assets/site-meta.js"></script>
  </body>
</html>
`);

console.log(`Created years/${year}. Add content to course-data.js, link the year from the root pages, then run npm run build:index and npm run check.`);
