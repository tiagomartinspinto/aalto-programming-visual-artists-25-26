// Study 1 - Chrystalla
// Mirrored from OpenProcessing sketch 2901354.
// Original: https://openprocessing.org/sketch/2901354
// License shown on OpenProcessing: CC BY-NC-SA 3.0

let circleX, circleY;
let rectSize;
let circleSize = 70;

function setup() {
  createCanvas(700, 700);
  rectMode(CENTER);
}

function draw() {
  // Semi-transparent background rectangle for fading trail effect
  fill(54, 0, 37, 10);
  noStroke();
  rect(width / 2, height / 2, width, height);
  // Uncomment the next line to remove fading and just see static background
  // background(255, 250, 210);

  // Dynamic rectangle color based on mouse position
  let rR = map(mouseX, 0, width, 240, 255);
  let rG = map(mouseY, 0, width, 40, 130);
  let rB = map(mouseX + mouseY, 0, width + height, 160, 60);
  fill(rR, rG, rB);

  // Rectangle size depends on distance from center
  rectSize = dist(mouseX, mouseY, width / 2, height / 2);

  // Circle size mapped inversely to rectSize
  circleSize = map(rectSize, 0, width / 1.5, 150, 20);

  // Draw the rectangle in the center
  rect(width / 2, height / 2, rectSize, rectSize);

  // Circle follows the mirrored mouse position
  circleX = width - mouseX;
  circleY = height - mouseY;

  // Circle color mapped from mirrored position
  let cR = map(circleX, 0, width, 70, 200);
  let cG = map(circleY, 0, width, 200, 255);
  let cB = map(circleX + circleY, 0, width + height, 0, 70);
  fill(cR, cG, cB);

  ellipse(circleX, circleY, circleSize, circleSize);
}