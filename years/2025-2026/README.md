# Programming for Visual Artists 2025-2026

Aalto University course materials for Programming for Visual Artists.

## Start Here

1. Open the [year landing page](index.html).
2. Choose a session from the course path.
3. Use the [Sketch Lab](web/lab.html) to edit p5.js code directly in the browser.
4. Compare the p5.js web sketch with the original Processing `.pde` file when useful.

## Course Map

| Session | Topics | Slides | Exercises and Sketches |
| --- | --- | --- | --- |
| 01 | Drawing basics, coordinates, shapes, color, first functions | [PDF](slides/session-01.pdf) | [Face exercise](source/session-01/face_exercise/face_exercise.pde), [annotated face](source/session-01/face_exercise_annotated/face_exercise_annotated.pde), [follow the mouse](source/session-01/extra_followthemouse/extra_followthemouse.pde) |
| 02 | Mouse interaction, dynamic background, mapping values | [PDF](slides/session-02.pdf) | [Mouse shapes](source/session-02/mouseshapes/mouseshapes.pde), [color on mouse press](source/session-02/extra1_coloronmousepress/extra1_coloronmousepress.pde), [smooth drag](source/session-02/extra2_smoothdrag/extra2_smoothdrag.pde) |
| 03 | Conditionals, loops, movement, state variables | [PDF](slides/session-03.pdf) | [Hover is red](source/session-03/hoverisred/hoverisred.pde), [bouncing ball color](source/session-03/extra_bouncingballcolor/extra_bouncingballcolor.pde), [slide examples](source/session-03/slidescodeexamples/) |
| 04 | Nested loops, waves, random walks, recursion, noise | [PDF](slides/session-04.pdf) | [Generative grid](source/session-04/generativegrid/generativegrid.pde), [simple waves](source/session-04/extra_simplewaves/extra_simplewaves.pde), [slide examples](source/session-04/slidecodeexamples/) |
| 05 | Functions, parameters, reuse, recursion | [PDF](slides/session-05.pdf) | [Shapes function](source/session-05/shapesfunction/shapesfunction.pde), [spiral spins](source/session-05/extra_spiralspins/extra_spiralspins.pde), [slide examples](source/session-05/slidescodeexamples/) |
| 06 | Arrays, objects, particles, following behavior | [PDF](slides/session-06.pdf) | [Particles follow](source/session-06/particlesfollow/particlesfollow.pde), [particles Perlin noise](source/session-06/extra_particles_perlin_noise/extra_particles_perlin_noise.pde), [slide examples](source/session-06/slidescodeexamples/) |

## Web Sketches

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

## Repository Structure

- `slides/session-XX.pdf` contains lecture slides.
- `source/session-XX/` contains Processing `.pde` files and instruction text files.
- `web/` contains browser-friendly p5.js companion sketches.
- `web/lab.html` contains the in-browser code editor.
- `sessions/` contains focused landing pages for each session.
- `preview-assets/` contains guidance and a place for exported screenshots or GIFs.

Older typo-prone filenames have been standardized. See [FILENAME_NOTES.md](FILENAME_NOTES.md) for the rename map.
