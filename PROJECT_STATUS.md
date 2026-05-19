# Project Status

## Completed This Pass

- Synced local `main` with `origin/main` before editing.
- Replaced the year-level embedded PDF iframe Slides Reader with a browser-compatible PDF panel on both academic year pages.
- Kept the selected slide title visible and updated the direct `Open PDF` link as the slide deck changes.
- Added a fallback message explaining that some browsers block embedded PDF readers.
- Removed PDF iframe embeds from individual session pages and replaced them with direct PDF panels.
- Kept direct PDF links working with `target="_blank" rel="noopener noreferrer"`.
- Tidied the Slides Reader controls so 2024-2025 uses a compact selector-first layout for its 8 slide decks.
- Kept 2025-2026 on the same selector-first Slides Reader architecture.
- Updated the new-year template so future years inherit the safer PDF panel instead of the old embedded reader.
- Added a homepage and README authorship / responsibility note: the site and materials are authored and maintained by Tiago Martins Pinto, used in teaching at Aalto University, and are not an official Aalto University publication.
- Added regression checks for safe Slides Reader links, fallback messages, and avoiding year-level PDF iframes.
- Expanded the browser smoke test to cover 2024-2025 slide controls, 2025-2026 slide controls, direct PDF links, fallback messages, and session PDF panels.
- Confirmed no removed coursework traces were reintroduced by the project checks.

## Files Changed

- `README.md`
- `PROJECT_STATUS.md`
- `assets/ascii-skin.css`
- `assets/home.css`
- `assets/year.js`
- `index.html`
- `tools/check-site.mjs`
- `tools/new-year.mjs`
- `tools/smoke-test.mjs`
- `years/2024-2025/index.html`
- `years/2024-2025/sessions/session-01/index.html`
- `years/2024-2025/sessions/session-02/index.html`
- `years/2024-2025/sessions/session-03/index.html`
- `years/2024-2025/sessions/session-04/index.html`
- `years/2024-2025/sessions/session-05/index.html`
- `years/2024-2025/sessions/session-06/index.html`
- `years/2024-2025/sessions/session-07/index.html`
- `years/2024-2025/sessions/session-08/index.html`
- `years/2024-2025/sessions/session.css`
- `years/2024-2025/year.css`
- `years/2025-2026/index.html`
- `years/2025-2026/sessions/session-01/index.html`
- `years/2025-2026/sessions/session-02/index.html`
- `years/2025-2026/sessions/session-03/index.html`
- `years/2025-2026/sessions/session-04/index.html`
- `years/2025-2026/sessions/session-05/index.html`
- `years/2025-2026/sessions/session-06/index.html`
- `years/2025-2026/sessions/session.css`
- `years/2025-2026/year.css`

## Checks Run

- `npm run check` - passed:
  - `npm run build:index`
  - `npm run check:site`
  - `npm run check:assets`
- `npm run smoke:browser` - passed against `http://127.0.0.1:8123/`.
- In-app browser verification against `http://127.0.0.1:8123/` - passed for homepage ownership note, 2024-2025 Slides Reader, 2025-2026 Slides Reader, and a 2025-2026 session PDF panel.
- Removed coursework trace scan - no matches outside this status file and bundled p5 vendor runtime files.

## Manual Tests Performed

1. Loaded the homepage locally and confirmed the authorship / responsibility note is present.
2. Loaded `years/2024-2025/`, selected Session 08 from the slide dropdown, and confirmed:
   - 8 slide options are present.
   - Compact slide controls are active.
   - No PDF iframe is present.
   - The direct PDF link updates to `slides/session-08.pdf`.
   - The link opens in a new tab with `noopener noreferrer`.
   - The fallback message explains blocked embedded PDF readers.
3. Loaded `years/2025-2026/` and confirmed:
   - 6 slide options are present.
   - No PDF iframe is present.
   - The direct PDF link opens in a new tab with `noopener noreferrer`.
   - The fallback message is visible.
4. Loaded `years/2025-2026/sessions/session-06/` and confirmed:
   - The session uses a PDF panel instead of an embedded PDF iframe.
   - The direct PDF link points to `../../slides/session-06.pdf`.
   - The link opens in a new tab with `noopener noreferrer`.
5. Ran the browser smoke test, which also confirmed sketch preview animation, the Sketch Lab edited-code run path, and mobile navigation.

## Remaining Tasks

- After pushing, check the live GitHub Pages site in Vivaldi specifically. The embedded PDF iframe path has been removed, but the exact Vivaldi message can only be ruled out in Vivaldi itself.
- Re-check the GitHub Pages deployment after Actions finishes.

## Known Issues

- The Slides Reader now deliberately opens PDFs in the browser PDF reader instead of trying to render them inline. This is the intended compatibility tradeoff for Vivaldi and other stricter browsers.
- `PROJECT_STATUS.md` cannot contain the hash of the commit that creates it. The final pushed commit hash is recorded in the handoff response after commit and push.

## Latest Commit Hash

- Pending final commit. The final response records the exact pushed hash.
