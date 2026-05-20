# Project Status

## Completed This Pass

- Synced local `main` with `origin/main` before editing.
- Removed the deck-count-based Slides Reader interface difference between `2024-2025` and `2025-2026`.
- Removed the JavaScript logic that put `2024-2025` into compact mode because it has 8 decks.
- Removed the generated per-session shortcut button layout entirely.
- Kept the select/dropdown as the only slide-deck chooser after JavaScript enhancement in both years.
- Kept the same Previous / Next buttons, Open PDF button, PDF fallback panel, and no-JavaScript fallback PDF list in both years.
- Kept direct PDF links with `target="_blank" rel="noopener noreferrer"`.
- Kept the Vivaldi-compatible no-iframe PDF behavior.
- Removed dormant shortcut-button styling from the ASCII skin.
- Updated site checks so `assets/year.js` fails if count-based shortcut controls return.
- Updated browser smoke tests so both years must have the same enhanced Slides Reader DOM/control pattern and the same no-JavaScript fallback pattern.
- Expanded the smoke test expectation so `.slide-buttons` / `.slide-picker` must not render in either year.

## Exact Slides Reader Behavior

- With JavaScript enabled:
  - Both years show one slide-deck select/dropdown.
  - Both years show Previous, Next, and Open PDF controls.
  - Both years show the same PDF panel and fallback message.
  - No per-session shortcut buttons are rendered.
  - No `is-compact` / deck-count mode is used.
- With JavaScript disabled:
  - Both years show the source-HTML fallback PDF list inside `.slide-controls`.
  - `2024-2025` lists 8 PDF links.
  - `2025-2026` lists 6 PDF links.
  - The structure and link safety attributes are the same in both years.
- The only interface difference is the number of dropdown options and fallback links because the years have different numbers of slide decks.

## Files Changed

- `PROJECT_STATUS.md`
- `assets/ascii-skin.css`
- `assets/year-common.css`
- `assets/year.js`
- `tools/check-site.mjs`
- `tools/smoke-test.mjs`

## Checks Run

- `node --check tools/smoke-test.mjs` - passed.
- `node --check tools/check-site.mjs` - passed.
- `node --check assets/year.js` - passed.
- `npm run check` - passed:
  - `npm run build:index`
  - `npm run check:site`
  - `npm run check:assets`
- Browser smoke test - passed against `http://127.0.0.1:8123/`.
- Removed coursework trace scan - no matches.
- PDF iframe scan across year HTML files - no matches.
- Browser-side computed-style comparison - passed:
  - Both years use `.slides-reader.is-enhanced`.
  - Both years show the select, Previous, Next, and Open PDF controls.
  - Both years have 0 shortcut button elements.
  - Both years have no `is-compact` class and no horizontal overflow.

## Browser And Interface Tests

- The smoke test now compares `2024-2025` and `2025-2026` with JavaScript enabled and disabled.
- It checks desktop, tablet, and mobile viewports.
- It checks that both enhanced readers use the same DOM/control pattern.
- It checks that both fallback readers use the same source-HTML pattern.
- It checks that shortcut slide buttons are absent in both years.
- It checks that no horizontal overflow is introduced.

## Remaining Tasks

- After pushing, check the live GitHub Pages deployment once Actions finishes.
- If possible, open the live site in Vivaldi and confirm that no blocked embedded PDF reader message appears.

## Known Issues

- The Slides Reader intentionally opens PDFs in the browser PDF reader instead of rendering them inline. This remains the compatibility choice for Vivaldi and other stricter browsers.
- `PROJECT_STATUS.md` cannot contain the hash of the commit that creates it without changing that hash. The final pushed commit hash is recorded in the handoff response after commit and push.

## Latest Commit Hash

- Pending final commit. The final response records the exact pushed hash.
