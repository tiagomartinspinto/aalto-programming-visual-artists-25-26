// Study 2 - Chrystalla
// Mirrored from OpenProcessing sketch 2901398.
// Original: https://openprocessing.org/sketch/2901398
// License shown on OpenProcessing: CC BY-NC-SA 3.0

let gridSize = 13;
let tileSize;
let circles = [];

class Circle {
  constructor(circleX, circleY, radius, brightness) {
    this.cx = circleX;
    this.cy = circleY;
    this.r = radius;
    this.b = brightness;
  }
}

function setup() {
  createCanvas(800, 800);
  tileSize = width / gridSize;
}

function draw() {
  background(38, 1, 1);
  noStroke();

  circles = [];

  for (let x = 0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize) {
      let circleX = x + tileSize / 2;
      let circleY = y + tileSize / 2;
      let d = dist(mouseX, mouseY, circleX, circleY);
      let influence = tileSize * 5;
      let radius, brightness;

      if (d < influence) {
        let baseRadius = map(d, 0, influence, tileSize * 1, tileSize * 0.6);
        let wave = sin(frameCount * 0.09);
        radius = baseRadius + wave * tileSize * 0.2;
        brightness = map(d, 0, influence, 255, 45);
      } else {
        radius = tileSize * 0.40;
        brightness = 45;
      }

      circles.push(new Circle(circleX, circleY, radius, brightness));
    }
  }

  // Sort circles by radius so largest are drawn last (on top)
  circles.sort((a, b) => a.r - b.r);

  for (let c of circles) {
    fill(c.b, 0, 0);
    ellipse(c.cx, c.cy, c.r * 2, c.r * 2);
  }
}