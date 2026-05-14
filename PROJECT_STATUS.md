# Project Status

## Just Completed

- Published the embed/security pass to `main`.
- Added sandboxing and lazy loading for sketch, removed-coursework, and PDF iframes.
- Removed same-origin permission from runnable sketch/removed-coursework preview iframes; PDF iframes keep `allow-same-origin allow-downloads` so the browser PDF reader can work.
- Added the visible Lab privacy note: "Code edits run locally in your browser and are not uploaded."
- Added automatic `Last updated` text through `assets/site-meta.js`.
- Fixed the 2025-2026 removed coursework count mismatch from 22 to 23.
- Added `SECURITY.md` with public-repository handling guidance.
- Added a browser smoke test script and installed the Playwright dev dependency so the script is runnable.
- Generalized the repository private-token scan so it no longer names a vendor-specific key.
- Added a guard for malformed anchor URLs so course-page scrolling fails quietly instead of throwing.

## Latest Commit Hash

- Latest implementation commit before this status note: `6225bbb6f6f861ae36171af4c3b9e4773e656ac2`.
- The final status-note commit hash is shown in the handoff response. A commit cannot contain its own final hash without changing that hash.

## Files Changed

Current status/checking pass:

- `.gitignore`
- `package.json`
- `package-lock.json`
- `tools/check-site.mjs`
- `PROJECT_STATUS.md`

Recent embed/security implementation:

- `MAINTAINING.md`
- `README.md`
- `SECURITY.md`
- `assets/site-meta.js`
- `assets/year.js`
- `index.html`
- `package.json`
- `tools/check-site.mjs`
- `tools/new-year.mjs`
- `tools/smoke-test.mjs`
- `years/2024-2025/case-coursework/index.html`
- `years/2024-2025/course-data.js`
- `years/2024-2025/index.html`
- `years/2024-2025/sessions/session-01/index.html`
- `years/2024-2025/sessions/session-02/index.html`
- `years/2024-2025/sessions/session-03/index.html`
- `years/2024-2025/sessions/session-04/index.html`
- `years/2024-2025/sessions/session-05/index.html`
- `years/2024-2025/sessions/session-06/index.html`
- `years/2024-2025/sessions/session-07/index.html`
- `years/2024-2025/sessions/session-08/index.html`
- `years/2024-2025/web/lab.html`
- `years/2025-2026/case-coursework/index.html`
- `years/2025-2026/course-data.js`
- `years/2025-2026/index.html`
- `years/2025-2026/sessions/session-01/index.html`
- `years/2025-2026/sessions/session-02/index.html`
- `years/2025-2026/sessions/session-03/index.html`
- `years/2025-2026/sessions/session-04/index.html`
- `years/2025-2026/sessions/session-05/index.html`
- `years/2025-2026/sessions/session-06/index.html`
- `years/2025-2026/web/lab.html`

## Checks Run

- `npm run check` passed.
- `npm run smoke:browser` passed after installing Chromium with `npx playwright install chromium`.
- `npm audit` passed with 0 vulnerabilities.

## Manual Live Tests Performed

Against GitHub Pages:

- Homepage loaded with one main heading.
- 2025-2026 page loaded with 6 session cards, 10 sketch cards, `course-data.js`, `assets/year.js`, `assets/site-meta.js`, and a CSP meta tag.
- p5 sketch previews loaded into 10 sandboxed, lazy iframes; the first two preview sources resolved to `web/face-exercise/index.html` and `web/mouse-shapes/index.html`.
- Course search found sketch, session, slide, and removed-coursework results.
- PDF slides opened in the embedded reader with `loading="lazy"` and `sandbox="allow-same-origin allow-downloads"`.
- Sketch Lab opened from the bouncing-ball sketch, accepted edited code, and produced a running canvas after pressing Run.
- Direct p5 sketch sweep passed: 19 of 19 sketch pages created a canvas.

## Requested Tooling-Name Scan

- Tracked source/docs were scanned for the requested assistant/editor product names and generic assistant-tooling phrases.
- No direct public references to those products remain in tracked source/docs.
- Remaining matches for the ambiguous pointer-related word are actual pointer/canvas usage in CSS, sketch code, course instructions, and vendored Processing/p5 code; these are not editor/tooling references.

## Remaining Tasks

- Decide whether GitHub Actions should install Playwright browsers and run `npm run smoke:browser`, or keep that as a local/manual smoke test.
- Add a future-year workflow that copies the current shared structure and updates `course-data.js` first.
- Keep removed-coursework attribution and public-sharing permissions reviewed as more years are added.
- Add more metadata to removed coursework if the coursework listing needs filtering by concept, technique, or difficulty.
- Consider PDF compression if repository size becomes a problem.

## Known Issues

- Sandboxed preview iframes intentionally do not grant same-origin access, so parent-page tests cannot inspect their internal canvases directly. The practical verification is the preview iframe source plus direct sketch-page canvas checks.
- Playwright browser binaries are not committed. A fresh machine must run `npm install` and then `npx playwright install chromium` before `npm run smoke:browser`.
- The status file records the latest implementation commit before the status commit; the final status commit hash must be read from Git or the handoff response.

## Manual Tests To Do Next

- Open the GitHub Pages site in a normal browser and check the visual appearance of the first viewport on desktop and mobile.
- Click several top navigation anchors and confirm the animated scroll feels right.
- Open the removed coursework coursework listing and try a few filters.
- Open one PDF deck in the reader, then use Previous deck and Next deck.
- Edit a sketch in the Lab, run it, then reload to confirm the edit was not uploaded or persisted unexpectedly.
