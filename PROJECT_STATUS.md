# Project Status

## Completed This Pass

- Synced local `main` with `origin/main` before editing.
- Extracted the duplicated Lab runtime from both year Lab pages into `assets/lab.js`.
- Kept year-specific Lab defaults in `years/2024-2025/course-data.js` and `years/2025-2026/course-data.js`.
- Confirmed Lab pages load `vendor/p5.min.js`, then `../course-data.js`, then `../../../assets/lab.js`.
- Centralized the repeated Processing/p5.js comparison cards in `assets/year.js`.
- Updated both current year pages and `tools/new-year.mjs` to use the shared comparison renderer.
- Reduced year landing-page link density by keeping one primary session action plus slide access in current/session cards. Sketch entry points remain in Web Sketches and the Lab.
- Simplified the homepage Course Directory copy to `Choose an academic year.`
- Documented in `MAINTAINING.md` that the "Before class / During class / After class" rhythm cards intentionally remain inline so session pages stay readable before JavaScript runs.
- Added a current-tree guard in `tools/check-site.mjs` for removed coursework trace terms while preserving CSP, iframe sandbox, local-link, labeled-control, skip-link, standard year-section-order, and privacy-note checks.

## Files Changed

- `MAINTAINING.md`
- `PROJECT_STATUS.md`
- `assets/lab.js`
- `assets/year.js`
- `index.html`
- `tools/check-site.mjs`
- `tools/new-year.mjs`
- `years/2024-2025/course-data.js`
- `years/2024-2025/index.html`
- `years/2024-2025/web/lab.html`
- `years/2025-2026/course-data.js`
- `years/2025-2026/index.html`
- `years/2025-2026/web/lab.html`

## Checks Run

- `npm run check` - attempted, but `npm` is not available in this local PATH.
- Bundled Node equivalent of `npm run check`:
  - `node tools/build-course-index.mjs` - completed.
  - `node tools/check-site.mjs` - passed.
  - `node tools/check-assets.mjs` - completed.
- `git diff --check` - passed; Git reported expected CRLF normalization warnings.
- `node tools/smoke-test.mjs` - attempted directly, but Playwright is not installed in this checkout.
- Current-tree tooling-name scan - no matches outside this audit file.
- Current-tree removed-coursework trace scan - no matches outside this audit file and bundled p5 vendor runtime files.

## Manual Tests Performed

- Started a local static server at `http://127.0.0.1:8765/`.
- Loaded the homepage and verified the Course Directory copy is concise, no `.button` year links remain, and the central directory links keep accessible labels.
- Loaded `years/2025-2026/` and verified the shared Processing/p5.js comparison renders four cards from `assets/year.js`.
- Verified the 2025-2026 current-session shortcut renders two links: `Open Session 06` and `Read Session 06 slides`.
- Verified rendered session cards now max out at two links per card.
- Loaded `years/2025-2026/web/lab.html?sketch=bouncing-ball` and verified the shared Lab runtime selects `bouncing-ball`, loads code, creates one canvas, keeps the file-mode warning hidden on HTTP, and reports the sketch running.
- Loaded `years/2024-2025/web/lab.html` and verified the shared Lab runtime defaults to `smile-face`, loads code, creates one canvas, keeps the file-mode warning hidden on HTTP, and reports the sketch running.

## Known Issues

- `npm` is not installed or not available in this local PATH, so exact `npm run ...` commands could not run in this environment.
- The browser smoke script exists, but this checkout does not have Playwright installed locally.
- The local status file cannot contain the hash of the commit that creates it. The final commit hash is recorded in the handoff message after commit and push.
