# Project Status

## Just Completed

- Fixed the 2025-2026 removed-coursework count to 22 across the root page, 2025-2026 year page, generated course index, and coursework listing checks.
- Updated the course index generator so it reads `case-coursework/coursework.js` when that coursework listing data exists, instead of counting support folders as removed coursework.
- Strengthened `npm run check:site` with regression checks for CSP tags, iframe sandboxing, PDF iframe permissions, source-of-truth comments, Lab privacy notes, public-repository guidance, and removed-coursework counts.
- Added CSP tags to the removed-coursework galleries and Sketch Lab pages.
- Clarified the `course-data.js` maintenance comments for both years.
- Improved the future-year generator so a new year gets its own `year.css`, a blank data source, required page/security scaffolding, and a clearer next-step message.
- Documented the future-year workflow and count-source expectations in `README.md` and `MAINTAINING.md`.
- Added small mobile polish for the directory-style navigation and PDF reader controls without changing the visual identity.

## Files Changed

- `COURSE_INDEX.md`
- `MAINTAINING.md`
- `PROJECT_STATUS.md`
- `README.md`
- `assets/home.css`
- `index.html`
- `tools/build-course-index.mjs`
- `tools/check-site.mjs`
- `tools/new-year.mjs`
- `years/2024-2025/case-coursework/index.html`
- `years/2024-2025/course-data.js`
- `years/2024-2025/web/lab.html`
- `years/2024-2025/year.css`
- `years/2025-2026/case-coursework/index.html`
- `years/2025-2026/course-data.js`
- `years/2025-2026/index.html`
- `years/2025-2026/web/lab.html`
- `years/2025-2026/year.css`

## Checks Run

- `npm run build:index` passed.
- `npm run check` passed.
- `npm run smoke:browser` passed.
- `git diff --check` passed.
- `npm audit` passed with 0 vulnerabilities.
- Direct p5.js canvas sweep passed: 19 of 19 local sketch pages created a canvas.

## Manual Browser Tests Performed

Against the local server at `http://127.0.0.1:8123`:

- Homepage loaded, used the dark theme color, and showed the corrected 22-coursework count.
- 2025-2026 page loaded with CSP, `course-data.js`, `assets/year.js`, the Lab privacy note, 6 session cards, and 10 sketch cards.
- Sketch preview iframes were lazy-loaded and sandboxed with `allow-scripts`.
- Course search found sketches, sessions, slide entries, and removed-coursework entries.
- PDF reader iframe existed with `loading="lazy"` and `sandbox="allow-same-origin allow-downloads"`.
- Sketch Lab loaded with CSP, showed the privacy note, accepted edited code, and ran it in a canvas.
- Course participant coursework listing loaded with the corrected 22-coursework count, CSP, a lazy sandboxed viewer iframe, and working search.
- Mobile-width check kept the directory navigation and course search visible.

## Requested Tooling-Name Scan

- Tracked files were scanned for the requested assistant/editor product names and related tooling phrases.
- No direct product/tooling references were found.
- The ambiguous mouse-pointer term appears only in ordinary CSS, sketch-code, and course-instruction contexts, not as an editor/tool reference.

## Remaining Tasks

- After pushing, wait for GitHub Pages deployment and repeat the main course participant path on the live site.
- For future years, add real sessions, slides, sketches, and removed-coursework data before linking the year publicly.
- Keep reviewing removed copyed removed coursework for attribution, publishing permission, and absence of private data before each push.
- Consider adding the browser smoke test to CI only if the workflow installs browser binaries reliably.
- Consider PDF compression later if repository size becomes a problem.

## Known Issues

- This status file cannot contain the final commit's own hash; writing that hash would change the file and therefore change the hash. The exact final commit hash is shown in the handoff response.
- PDF iframes intentionally keep `allow-same-origin allow-downloads` so browser PDF readers and downloads work. Sketch and removed-coursework iframes remain more restricted with `allow-scripts`.
- Playwright browser binaries are not committed. A fresh machine may need `npm install` and `npx playwright install chromium` before `npm run smoke:browser`.
- GitHub Pages may take a short time to show the pushed commit after deployment starts.

## Manual Tests To Do Next

- Open the GitHub Pages homepage after deployment and check the first viewport on desktop and mobile.
- Open the 2025-2026 page, run a sketch preview, use search, and open the PDF reader.
- Open the Sketch Lab, edit a small line of code, and run it.
- Open the course participant coursework listing, search for a course participant, run a coursework in the viewer, and open source.

## Latest Commit Hash

- Latest commit before this status update: `1a875b6448b8d90489b3f8a0b43c0b867fab2daa`.
- Final pushed commit hash: shown in the handoff response.
