// Study 2 - Jenn
// Mirrored from OpenProcessing sketch 2901397.
// Original: https://openprocessing.org/sketch/2901397
// License shown on OpenProcessing: CC BY-NC-SA 3.0

let cols, rows;
let spacing = 50;
let scl = 0.7;
let sizeArr = [];           // renamed from "size" to avoid conflicts
let maxDist = 100;
let yPlacement = [0, 100, 200, 300, 400, 500, 600];

function setup() {
  createCanvas(600, 600);
  cols = int(width / spacing);
  rows = yPlacement.length;
}

function draw() {
  background(0);

  // Initialize size array for this frame
  sizeArr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    sizeArr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      let d = dist(mouseX, mouseY, i * spacing, j * spacing);
      let expand = maxDist - d;
      sizeArr[i][j] = constrain(expand * scl, (i + 1) * spacing / cols, 70);
    }
  }

  // Draw circles and squares
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let colVal = map(j, 0, rows - 3, 0, 255);

      noStroke();
      fill(colVal, 150, 250);

      // Circle
      ellipse(spacing / 2 + i * spacing, yPlacement[j], sizeArr[i][j], sizeArr[i][j]);

      // Square
      rectMode(CENTER);
      rect(spacing / 2 + i * spacing, yPlacement[j] + 50, sizeArr[i][j], sizeArr[i][j]);
    }
  }
}