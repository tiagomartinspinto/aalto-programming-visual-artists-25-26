# Programming for Visual Artists

Aalto University course materials maintained by Tiago Martins Pinto.

This repository is organized by school year so students can find sessions, sketches, slides, examples, and student work in one course home.

Live site: [tiagomartinspinto.github.io/aalto-programming-visual-artists](https://tiagomartinspinto.github.io/aalto-programming-visual-artists/)

## School Years

- [2025-2026](years/2025-2026/)
- [2024-2025](years/2024-2025/)
- [Generated course index](COURSE_INDEX.md)
- [Preview manifest](PREVIEW_MANIFEST.md)

## Structure

Each school year should stay self-contained:

```text
years/
  2025-2026/
  2024-2025/
```

When adding a new school year, create a new folder inside `years/`, add a year landing page, and link it from the root `index.html`.

## Maintenance

- Read [MAINTAINING.md](MAINTAINING.md) before adding a new year, session, sketch, or student study.
- Run `npm run build:index` after changing course material.
- Run `npm run check:site` before pushing. It checks local links, anchors, accessibility labels, visible counts, update markers, and typo-prone paths.
- Keep local scratch files, private exports, and operating-system metadata out of the repository.

## Publishing

GitHub Pages publishes the static site from `main`. The quality workflow checks the repository before deployment work continues.
