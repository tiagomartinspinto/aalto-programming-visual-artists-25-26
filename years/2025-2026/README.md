# Programming for Visual Artists

Aalto University, 2025-2026

Programming for Visual Artists is a beginner-friendly creative coding course for arts students. The course introduces programming as a tool for visual expression, interaction, and generative art through Processing and p5.js.

No prior programming experience is required. The emphasis is on sketching, play, observation, iteration, and building a personal visual language with code.

## Start Here

1. Start with the public course site: [Programming for Visual Artists](https://tiagomartinspinto.github.io/aalto-programming-visual-artists/).
2. Choose a session from the course path.
3. Use the [Sketch Lab](web/lab.html) to edit p5.js code directly in the browser.
4. Compare the p5.js web sketch with the original Processing `.pde` file when you are ready.
5. Install [Processing](https://processing.org/download) only when you want to edit or run the original Processing sketches locally.

The repository is set up to be web-first where possible. PDFs and Processing files are still available, but sketches that can run in the browser are linked before downloadable source files. The main website also includes an in-page slides reader so students can view PDF slides without leaving the course page.

## Instructor

Tiago Martins Pinto  
[tiago.martinspinto@aalto.fi](mailto:tiago.martinspinto@aalto.fi)

## Course Map

| Session | Topics | Slides | Exercises and Sketches |
| --- | --- | --- | --- |
| 01 | Drawing basics, coordinates, shapes, color, first functions | [PDF](slides/session-01.pdf) | [Face exercise](source/session-01/face_exercise/face_exercise.pde), [annotated face](source/session-01/face_exercise_annotated/face_exercise_annotated.pde), [follow the mouse](source/session-01/extra_followthemouse/extra_followthemouse.pde) |
| 02 | Mouse interaction, dynamic background, mapping values | [PDF](slides/session-02.pdf) | [Mouse shapes](source/session-02/mouseshapes/mouseshapes.pde), [color on mouse press](source/session-02/extra1_coloronmousepress/extra1_coloronmousepress.pde), [smooth drag](source/session-02/extra2_smoothdrag/extra2_smoothdrag.pde) |
| 03 | Conditionals, loops, movement, state variables | [PDF](slides/session-03.pdf) | [Hover is red](source/session-03/hoverisred/hoverisred.pde), [bouncing ball color](source/session-03/extra_bouncingballcolor/extra_bouncingballcolor.pde), [slide examples](source/session-03/slidescodeexamples/) |
| 04 | Nested loops, waves, random walks, recursion, noise | [PDF](slides/session-04.pdf) | [Generative grid](source/session-04/generativegrid/generativegrid.pde), [simple waves](source/session-04/extra_simplewaves/extra_simplewaves.pde), [slide examples](source/session-04/slidecodeexamples/) |
| 05 | Functions, parameters, reuse, recursion | [PDF](slides/session-05.pdf) | [Shapes function](source/session-05/shapesfunction/shapesfunction.pde), [spiral spins](source/session-05/extra_spiralspins/extra_spiralspins.pde), [slide examples](source/session-05/slidescodeexamples/) |
| 06 | Arrays, objects, particles, following behavior | [PDF](slides/session-06.pdf) | [Particles follow](source/session-06/particlesfollow/particlesfollow.pde), [particles Perlin noise](source/session-06/extra_particles_perlin_noise/extra_particles_perlin_noise.pde), [slide examples](source/session-06/slidescodeexamples/) |

Each session also has a focused browser page:

- [Session 01](sessions/session-01/)
- [Session 02](sessions/session-02/)
- [Session 03](sessions/session-03/)
- [Session 04](sessions/session-04/)
- [Session 05](sessions/session-05/)
- [Session 06](sessions/session-06/)

## Web Sketches

Several Processing examples have p5.js companion versions that run in the browser:

- [Face exercise](web/face-exercise/)
- [Mouse shapes](web/mouse-shapes/)
- [Generative grid](web/generative-grid/)
- [Hover grid](web/hover-grid/)
- [Bouncing ball color](web/bouncing-ball/)
- [Simple waves](web/simple-waves/)
- [Shapes function](web/shapes-function/)
- [Spiral spins](web/spiral-spins/)
- [Particles follow](web/particles-follow/)
- [Particles with noise](web/particles-noise/)

These are not replacements for the Processing sketches. They are small translation examples for students who want to compare Processing and p5.js syntax.

| Web sketch | Original idea | Good changes to try |
| --- | --- | --- |
| [Face exercise](web/face-exercise/) | Drawing with shapes and a custom function | Change proportions, colors, or draw several faces |
| [Mouse shapes](web/mouse-shapes/) | Mouse input and mapped color | Map mouse position to rotation, scale, or opacity |
| [Hover grid](web/hover-grid/) | Conditionals inside nested loops | Change grid size or make nearby cells react |
| [Bouncing ball color](web/bouncing-ball/) | State, velocity, and edge checks | Add more balls or change color rules |
| [Simple waves](web/simple-waves/) | Sine motion over time | Change amplitude, frequency, spacing, or draw lines |
| [Generative grid](web/generative-grid/) | Perlin noise and nested loops | Change noise scale, tile count, or shape |
| [Shapes function](web/shapes-function/) | Reusing a function with random parameters | Add shape types or constrain the palette |
| [Spiral spins](web/spiral-spins/) | Polar coordinates and interaction | Move the pointer, press `T`, or change curve/turns |
| [Particles follow](web/particles-follow/) | Arrays of objects | Change lifespan, velocity, size, or color by age |
| [Particles with noise](web/particles-noise/) | Particle systems and noise fields | Change particle count, speed, fade, or noise scale |

The p5.js pages use the local runtime at `web/vendor/p5.min.js`, so sketches and the Lab do not depend on a CDN. The Processing source files do not download automatically from the site; links are ordinary file links for students who choose to inspect or save them.

## Sketch Lab

[Sketch Lab](web/lab.html) is an in-browser editor for the p5.js companion sketches. Students can choose a sketch, edit the JavaScript, and run it immediately with the same local p5 runtime used by the standalone sketch pages. Changes stay local in the browser and are not uploaded or saved automatically.

Use it for quick experiments:

- Change color values, sizes, or speeds.
- Add another shape.
- Change a loop count.
- Break something intentionally, then read the error.
- Reset the sketch back to the original.

## Slides Reader

The course index includes an embedded PDF reader for all six slide decks. Students can switch sessions inside the page instead of opening each PDF as a separate browser page. A small fallback PDF link remains available in the reader for browsers that do not support embedded PDF viewing.

## Projects

The course page includes a small project area:

- Creative Study 1: interaction with mouse position, color, and at least one custom function.
- Creative Study 2: a generative composition using loops, randomness or noise.
- Final Project: an interactive or generative artwork with a personal visual direction.

## Student Studies Gallery

Student Study 1 and Study 2 sketches from the OpenProcessing curation are kept in `case-studies/` for classroom reference. The gallery runs the course copies in an in-page viewer, links to each source file, and keeps the original OpenProcessing pages available for attribution and backup.

## Repository Structure

Each year uses `sessions/` for student-facing pages, `source/` for original Processing material, and `slides/` for PDF decks:

- `slides/session-XX.pdf` contains the lecture slides.
- `source/session-XX/` contains Processing `.pde` files and, when available, instruction text files.
- `slidescodeexamples` or `slidecodeexamples` contains smaller code snippets from slides.
- `web/` contains browser-friendly p5.js companion sketches.
- `web/lab.html` contains the in-browser code editor.
- `web/vendor/p5.min.js` is the local p5.js runtime used by the Lab and web sketches.
- `case-studies/` contains the student studies gallery and course p5.js copies.
- `sessions/` contains focused landing pages for each session.
- `preview-assets/` contains guidance and a place for screenshots or GIFs.

Older typo-prone filenames have been standardized. See [FILENAME_NOTES.md](FILENAME_NOTES.md) for the rename map.

## Making Sketch Previews

Use the checklist in [preview-assets/README.md](preview-assets/README.md) to capture screenshots or short GIFs for exercises. Add final image files to `preview-assets/`, then link them from this README and `index.html`.

## GitHub Pages

This repository is published with GitHub Pages:

[https://tiagomartinspinto.github.io/aalto-programming-visual-artists/](https://tiagomartinspinto.github.io/aalto-programming-visual-artists/)

## Teaching Notes

The best way to use these examples is to make small changes and rerun often. Try changing one number at a time, then one color, then one behavior. When something breaks, read the error message slowly and use it as a clue.

Good experiments:

- Change canvas size.
- Replace one shape with another.
- Map mouse position to color, scale, rotation, or speed.
- Add randomness, then decide where randomness should be controlled.
- Turn repeated code into a function.
- Save versions as you go so you can compare ideas.
