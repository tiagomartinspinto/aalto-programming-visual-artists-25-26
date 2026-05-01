# Programming for Visual Artists

Aalto University, 2025-2026

Programming for Visual Artists is a beginner-friendly creative coding course for arts students. The course introduces programming as a tool for visual expression, interaction, and generative art through Processing and p5.js.

No prior programming experience is required. The emphasis is on sketching, play, observation, iteration, and building a personal visual language with code.

## Start Here

1. Install [Processing](https://processing.org/download).
2. Download or clone this repository.
3. Open any `.pde` file in Processing.
4. Press the Run button.
5. Change one thing, run again, and observe what changed.

For browser-based examples, open [index.html](index.html) or visit the GitHub Pages site for this repository once Pages is enabled.

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

Some Processing examples have p5.js companion versions that run in the browser:

- [Face exercise](web/face-exercise/)
- [Mouse shapes](web/mouse-shapes/)
- [Generative grid](web/generative-grid/)

These are not replacements for the Processing sketches. They are small translation examples for students who want to compare Processing and p5.js syntax.

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
