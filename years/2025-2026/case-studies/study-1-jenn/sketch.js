// Study 1 - Jenn
// Mirrored from OpenProcessing sketch 2901352.
// Original: https://openprocessing.org/sketch/2901352
// License shown on OpenProcessing: CC BY-NC-SA 3.0

let cols, rows;
let spacing = 30;
let showRects = false; // Idea taken as inspo from Gemini
let showTriangle = false; // repeat for triangle
let showCircle = true;
let shapeSize = 30; // Experimenting with shape size through mouse drag
let minSize = 7;
let maxSize = 50;

function setup() {
  createCanvas(600, 600);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
}

function draw() {
  background(200, 90, mouseX);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let col = map(j, 0, rows - 5, 0, 255);

      noStroke();
      fill(col, map(mouseX, 0, 100, 20, 100), mouseY);

      if (showRects) {
        rect(i * spacing, j * spacing, shapeSize - 5, shapeSize - 5);
      } else if (showTriangle) { 
        // Must use 'else if' because 'else(show triangle)' does not work
        triangle(i * spacing, j * spacing,
                 i * spacing + shapeSize, j * spacing + shapeSize,
                 i * spacing + 5, j * spacing + shapeSize);
      } else if (showCircle) {
        ellipse(spacing / 2 + i * spacing, spacing / 2 + j * spacing, shapeSize, shapeSize);
      }
    }
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    showRects = true;
    showTriangle = false;
    showCircle = false;
  } else if (key === 't' || key === 'T') {
    showTriangle = true;
    showRects = false;
    showCircle = false;
  } else if (key === 'c' || key === 'C') {
    showCircle = true;
    showTriangle = false;
    showRects = false;
  }
}

// Drag UP (mouseY decreasing) = shrink
// Drag DOWN (mouseY increasing) = grow
function mouseDragged() {
  let change = (pmouseY - mouseY) * 0.1;
  shapeSize += change;
  shapeSize = constrain(shapeSize, minSize, maxSize);
}

/* NOTES 
Cartesian coordinates, color theory, interactivity, mouse input handling.
Create an interactive visual sketch in p5.js that reacts to mouse movement.
The artwork changes visually as the mouse moves across the screen. Uses color, shape, and motion to explore interaction and composition.

This is an exploratory study. Play, experiment, and see what happens.
The sketch responds to mouseX and mouseY, changes colors dynamically,
uses multiple shape types, and includes a shape that changes size via dragging.
*/