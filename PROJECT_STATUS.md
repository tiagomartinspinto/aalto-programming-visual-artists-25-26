# Project Status

## Completed This Pass

- Synced local `main` with `origin/main` before editing.
- Added real source-HTML slide links inside `.slide-controls` for both year pages.
- Added 8 fallback PDF links for `2024-2025`, Session 01 through Session 08.
- Added 6 fallback PDF links for `2025-2026`, Session 01 through Session 06.
- Kept every fallback PDF link as a direct new-tab link with `target="_blank" rel="noopener noreferrer"`.
- Kept the Vivaldi-compatible PDF panel and did not restore embedded PDF iframes.
- Updated the year-page JavaScript so it enhances the fallback list only after loading successfully.
- Hid Previous / Next buttons until JavaScript enhancement is active, so the no-JS baseline stays usable.
- Matched the Slides Reader structure across both years: same reader shell, same 300px control column, same selector-first controls, same PDF panel, same fallback message behavior, and no horizontal overflow.
- Kept 2024-2025 compact after enhancement because it has 8 slide decks.
- Kept 2025-2026 on the same logic with visible shortcut buttons because it has 6 slide decks.
- Updated `tools/new-year.mjs` so future year pages do not start with empty `.slide-controls`.
- Added site checks that year pages have non-empty `.slide-controls`, exact fallback PDF counts, expected Session PDF links, and safe new-tab attributes.
- Expanded browser smoke tests to verify the no-JavaScript fallback lists, enhanced slide selects, safe direct PDF links, mobile slide controls, and session PDF panels.

## Files Changed

- `PROJECT_STATUS.md`
- `assets/year.js`
- `tools/check-site.mjs`
- `tools/new-year.mjs`
- `tools/smoke-test.mjs`
- `years/2024-2025/index.html`
- `years/2024-2025/year.css`
- `years/2025-2026/index.html`
- `years/2025-2026/year.css`

## Checks Run

- `npm run check` - passed:
  - `npm run build:index`
  - `npm run check:site`
  - `npm run check:assets`
- `npm run smoke:browser` - passed against `http://127.0.0.1:8123/`.
- Browser-side layout comparison against `http://127.0.0.1:8123/` - passed:
  - `2024-2025`: 8 options, compact enhanced controls, 0 PDF iframes, direct PDF link safe, no horizontal overflow.
  - `2025-2026`: 6 options, enhanced controls, 0 PDF iframes, direct PDF link safe, no horizontal overflow.
- Removed coursework trace scan - no matches.

## Visual And Browser Tests Performed

1. Verified both year pages with JavaScript disabled through the smoke test:
   - `2024-2025` has 8 visible fallback PDF links.
   - `2025-2026` has 6 visible fallback PDF links.
   - The enhanced select does not exist before JavaScript runs.
2. Verified both year pages after JavaScript enhancement:
   - The slide select is visible.
   - The direct PDF link stays visible.
   - The fallback PDF panel message remains visible.
   - No embedded PDF iframe exists.
3. Verified mobile slide controls for both years:
   - The slide select remains visible.
   - The reader and control column do not overflow horizontally.
4. Compared both year readers in the browser:
   - Both use a 300px control column and a matching PDF panel layout.
   - 2024-2025 is compact because of 8 decks.
   - 2025-2026 uses the same layout logic with 6 decks.

## Remaining Tasks

- After pushing, check the live GitHub Pages deployment once Actions finishes.
- If possible, open the live site in Vivaldi and confirm that no blocked embedded PDF reader message appears.

## Known Issues

- The Slides Reader intentionally opens PDFs in the browser PDF reader instead of rendering them inline. This remains the compatibility choice for Vivaldi and other stricter browsers.
- `PROJECT_STATUS.md` cannot contain the hash of the commit that creates it without changing that hash. The final pushed commit hash is recorded in the handoff response after commit and push.

## Latest Commit Hash

- Pending final commit. The final response records the exact pushed hash.
