// Study 2 - Zoe
// Mirrored from OpenProcessing sketch 2901389.
// Original: https://openprocessing.org/sketch/2901389
// License shown on OpenProcessing: CC BY-NC-SA 3.0

let cols = 40;
let rows = 50;
let shapeType = 0;

function setup() {
  createCanvas(1200, 700);
  smooth();
}

function mousePressed() {
  shapeType = int(random(3));
}

function draw() {
  background(100, 10, 120);

  let spacingX = width / cols;
  let spacingY = height / rows;

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      let posX = x * spacingX + spacingX / 2;
      let posY = y * spacingY + spacingY / 2;

      let d = dist(mouseX, mouseY, posX, posY);
      let sizeVal = map(d, 0, width, 40, 3);

      let r = map(d, 0, width, 180, 80);
      let g = map(mouseX, 0, width, 10, 120);
      let b = map(mouseY, 0, height, 200, 10);

      fill(r, g, b, 150);
      noStroke();

      if (shapeType === 0) {
        ellipse(posX, posY, sizeVal, sizeVal);
      } else if (shapeType === 1) {
        rectMode(CENTER);
        rect(posX, posY, sizeVal, sizeVal);
      } else if (shapeType === 2) {
        triangle(
          posX, posY - sizeVal / 2,
          posX - sizeVal / 2, posY + sizeVal / 2,
          posX + sizeVal / 2, posY + sizeVal / 2
        );
      }
    }
  }
}