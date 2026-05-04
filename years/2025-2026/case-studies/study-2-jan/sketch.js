// Study 2 - Jan
// Mirrored from OpenProcessing sketch 2901380.
// Original: https://openprocessing.org/sketch/2901380
// License shown on OpenProcessing: CC BY-NC-SA 3.0

let bgEllipses = [];

let gridSize = 30;
let tileSize;

let baseSize = 0.5;     // normal circle size
let hoverRadius = 40;   // mouse hover effect distance

// color variables for SPACEBAR interaction
let hoverR = 255;
let hoverG = 100;
let hoverB = 100;

// ===========================
// Background Ellipse Class
// ===========================
class BackgroundEllipse {
  constructor(xE, yE, wE, hE) {
    this.x = xE;
    this.y = yE;
    this.w = wE;
    this.h = hE;
  }

  display() {
    noStroke();
    fill(hoverB, hoverR, hoverG, 180);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.w, this.h);
  }
}

// ===========================
// p5.js setup
// ===========================
function setup() {
  createCanvas(750, 750);
  tileSize = width / gridSize;

  // create 4 background ellipses
  for (let i = 0; i < 4; i++) {
    let x = (i + 0.5) * (width / 4);
    let y = height / 2;
    bgEllipses.push(new BackgroundEllipse(x, y, width / 4, 700));
  }
}

// ===========================
// p5.js draw
// ===========================
function draw() {
  // dynamic background color
  background(mouseX, 0, mouseY);

  // draw background ellipses
  for (let ell of bgEllipses) {
    ell.display();
  }

  // draw 30x30 grid
  for (let gx = 0; gx < gridSize; gx++) {
    for (let gy = 0; gy < gridSize; gy++) {
      let x = gx * tileSize;
      let y = gy * tileSize;
      let cx = x + tileSize / 2;
      let cy = y + tileSize / 2;

      // distance to mouse
      let d = dist(mouseX, mouseY, cx, cy);
      let circleSize = tileSize * baseSize;

      if (d < hoverRadius) {
        circleSize = tileSize * 0.9;
      }

      push();
      translate(cx, cy);

      if (d < hoverRadius) {
        // hover effect: rectangles
        noStroke();
        fill(hoverR, hoverG, hoverB, 120);
        rect(0, 0, tileSize * 0.5, tileSize * 0.5);
      } else {
        // normal circle
        stroke(255);
        noFill();
        ellipse(0, 0, tileSize * 0.5, tileSize * 0.5);
      }

      pop();
    }
  }

  // instructions panel
  noStroke();
  fill(0);
  rect(0, 730, width, 25);

  fill(255, 0, 0);
  textSize(15);
  text("use SPACEBAR to interact", 300, 745);
}

// ===========================
// SPACEBAR interaction
// ===========================
function keyPressed() {
  if (key === ' ') {
    hoverR = random(255);
    hoverG = random(255);
    hoverB = random(255);
    hoverRadius = random(60, 120);
  }
}