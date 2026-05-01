# Programming for Visual Artists

Aalto University, 2025-2026

Programming for Visual Artists is a beginner-friendly creative coding course for arts students. The course introduces programming as a tool for visual expression, interaction, and generative art through Processing and p5.js.

No prior programming experience is required. The emphasis is on sketching, play, observation, iteration, and building a personal visual language with code.

## Start Here

1. Start with the browser index at [index.html](index.html).
2. Open a web sketch and observe what it does.
3. Compare the p5.js web sketch with the original Processing `.pde` file when you are ready.
4. Install [Processing](https://processing.org/download) only when you want to edit or run the original Processing sketches locally.
5. Change one thing, run again, and observe what changed.

The repository is set up to be web-first where possible. PDFs and Processing files are still available, but sketches that can run in the browser are linked before downloadable source files.

## Instructor

Tiago Martins Pinto  
[tiago.martinspinto@aalto.fi](mailto:tiago.martinspinto@aalto.fi)

## Course Map

| Session | Topics | Slides | Exercises and Sketches |
| --- | --- | --- | --- |
| 01 - 23 Feb 2026 | Drawing basics, coordinates, shapes, color, first functions | [PDF](Session-01_23022026/programmingvisualartists_session1_2026.pdf) | [Face exercise](Session-01_23022026/face_exercise/face_exercise.pde), [annotated face](Session-01_23022026/face_exercise_annotated/face_exercise_annotated.pde), [follow the mouse](Session-01_23022026/extra_followthemouse/extra_followthemouse.pde) |
| 02 - 24 Feb 2026 | Mouse interaction, dynamic background, mapping values | [PDF](Session-02_24022026/programmingvisualartists_session2.pdf) | [Mouse shapes](Session-02_24022026/mouseshapes/mouseshapes.pde), [color on mouse press](Session-02_24022026/extra1_coloronmousepress/extra1_coloronmousepress.pde), [smooth drag](Session-02_24022026/extra2_smoothdrag/extra2_smoothdrag.pde) |
| 03 - 2 Mar 2026 | Conditionals, loops, movement, state variables | [PDF](Session-03_02032026/programmingvisualartists_session3.pdf) | [Hover is red](Session-03_02032026/hoverisred/hoverisred.pde), [bouncing ball color](Session-03_02032026/extra_bouncingballcolor/extra_bouncingballcolor.pde), [slide examples](Session-03_02032026/slidescodeexamples/) |
| 04 - 3 Mar 2026 | Nested loops, waves, random walks, recursion, noise | [PDF](Session-04_03032026/programmingvisualartists_session4.pdf) | [Generative grid](Session-04_03032026/generativegrid/generativegrid.pde), [simple waves](Session-04_03032026/extra_simplewaves/extra_simplewaves.pde), [slide examples](Session-04_03032026/slidecodeexamples/) |
| 05 - 9 Mar 2026 | Functions, parameters, reuse, recursion | [PDF](Session-05_09032026/programmingvisualartists_session5.pdf) | [Shapes function](Session-05_09032026/shapesfunction/shapesfunction.pde), [spiral spins](Session-05_09032026/extra_spiralspins/extra_spiralspins.pde), [slide examples](Session-05_09032026/slidescodeexamples/) |
| 06 - 10 Mar 2026 | Arrays, objects, particles, following behavior | [PDF](Session-06_10032026/programmingvisualartists_session6.pdf) | [Particles follow](Session-06_10032026/particlesfollow/particlesfollow.pde), [particles perlin noise](Session-06_10032026/extra_particlesperlinoise/extra_particlesperlinoise.pde), [slide examples](Session-06_10032026/slidescodeexamples/) |

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

The p5.js pages load p5.js from a CDN, so they need internet access the first time they are opened unless the library is cached by the browser. The Processing source files do not download automatically from the site; links are ordinary file links for students who choose to inspect or save them.

## Repository Structure

Each session folder follows the same general idea:

- `programmingvisualartists_session*.pdf` contains the lecture slides.
- Exercise folders contain Processing `.pde` files and, when available, instruction text files.
- `slidescodeexamples` or `slidecodeexamples` contains smaller code snippets from slides.
- `web/` contains browser-friendly p5.js companion sketches.
- `preview-assets/` contains guidance and a place for screenshots or GIFs.

Some original filenames include small typos such as `isntructions` or `animted`. They are currently preserved so existing links do not break. See [FILENAME_NOTES.md](FILENAME_NOTES.md) for a readable map.

## Making Sketch Previews

Use the checklist in [preview-assets/README.md](preview-assets/README.md) to capture screenshots or short GIFs for exercises. Add final image files to `preview-assets/`, then link them from this README and `index.html`.

## GitHub Pages

This repository includes a static course index at [index.html](index.html). To publish it:

1. Go to the repository on GitHub.
2. Open **Settings > Pages**.
3. Choose **Deploy from a branch**.
4. Select the `main` branch and the repository root.
5. Save.

After GitHub Pages builds, the course index will be available as a website.

## Teaching Notes

The best way to use these examples is to make small changes and rerun often. Try changing one number at a time, then one color, then one behavior. When something breaks, read the error message slowly and use it as a clue.

Good experiments:

- Change canvas size.
- Replace one shape with another.
- Map mouse position to color, scale, rotation, or speed.
- Add randomness, then decide where randomness should be controlled.
- Turn repeated code into a function.
- Save versions as you go so you can compare ideas.
