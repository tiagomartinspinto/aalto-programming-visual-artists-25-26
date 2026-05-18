# Project Status

## Completed This Pass

- Synced local `main` with `origin/main` before editing.
- Reduced repeated year-page entry points by removing duplicated header action buttons and explanatory status cards.
- Standardized both year pages around the same section order: current session, web sketches, Lab, Processing/p5.js comparison, slides, projects, and sessions.
- Kept year-specific palettes and course content different while aligning navigation logic, search/filter behavior, Lab/privacy wording, slide reader behavior, card behavior, footer/update markers, iframe sandboxing, and CSP coverage.
- Removed duplicate sketch-card links by keeping one Lab link, one sketch page link, and one Processing source link.
- Added CSP metadata to session pages, web sketch pages, and source example pages.
- Added skip links to session-style pages and expanded `tools/check-site.mjs` so future edits check CSP coverage, external runtime requests, standard year section order, search filters, iframe sandboxing, and local links.
- Updated `tools/smoke-test.mjs` to test both years, search, PDF sandboxing, animated p5 previews, the Lab run path, and mobile navigation.
- Improved the `npm run new:year -- YYYY-YYYY` template so future years start with the same archive structure without copied session metadata or stale live links.

## Files Changed

- `ARCHITECTURE.md`
- `MAINTAINING.md`
- `PROJECT_STATUS.md`
- `README.md`
- `assets/ascii-skin.css`
- `assets/home.css`
- `assets/year.js`
- `tools/check-site.mjs`
- `tools/new-year.mjs`
- `tools/smoke-test.mjs`
- `years/2024-2025/index.html`
- `years/2024-2025/year.css`
- `years/2024-2025/sessions/session-01/index.html` through `session-08/index.html`
- `years/2024-2025/source/session-07/testp5js.html`
- `years/2024-2025/web/*/index.html`
- `years/2025-2026/course-data.js`
- `years/2025-2026/index.html`
- `years/2025-2026/year.css`
- `years/2025-2026/web/lab.html`
- `years/2025-2026/sessions/session-01/index.html` through `session-06/index.html`
- `years/2025-2026/source/session-03` through `session-06` slide-code example pages
- `years/2025-2026/web/*/index.html`

## Checks Run

- `node tools/check-site.mjs` - passed.
- `node tools/build-course-index.mjs` - completed.
- `npm run check` - passed.
- `git diff --check` - passed.
- `npm run smoke:browser` - passed after expanding the smoke coverage.
- Current-tree tooling-name scan - no public documentation matches; ordinary pointer-related CSS terms remain.
- Current-tree removed-coursework-route scan, excluding bundled vendor runtime files - no matches.

## Manual Tests Performed

- Loaded the homepage locally through `http://127.0.0.1:8123/index.html`.
- Loaded both year pages through the local server.
- Verified both year pages render session cards and sketch cards from `course-data.js`.
- Verified 2024-2025 search finds a sketch result for `video`.
- Verified 2025-2026 search finds sketch results for `particles`.
- Verified the embedded PDF reader iframe exists and keeps `sandbox="allow-same-origin allow-downloads"`.
- Verified a 2025-2026 p5 preview animates when its card is in view.
- Verified the 2025-2026 Lab loads `bouncing-ball`, accepts an edit, and reports the edited sketch as running.
- Verified mobile-width navigation remains visible in the 2025-2026 year page.

## Remaining Tasks

- Test the live GitHub Pages URL after the final push and Pages deployment finish.
- When adding 2026-2027, run `npm run new:year -- 2026-2027`, add only real course content, then run `npm run build:index`, `npm run check`, and `npm run smoke:browser`.
- Keep checking live p5 previews after future CSP or sandbox changes, especially media examples that depend on browser permissions.

## Known Issues

- Browser console warnings from p5.js sensor-permission checks can appear inside sandboxed previews. They did not block the tested sketches.
- The local status file cannot contain the hash of the commit that creates it. The latest synced commit before this update was `97ff22d689baaa6ecf63947d90ee59be4f0660ba`; the final commit hash is recorded in the handoff message after commit and push.
