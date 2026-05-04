// Study 1 - Marton
// Mirrored from OpenProcessing sketch 2901328.
// Original: https://openprocessing.org/sketch/2901328
// License shown on OpenProcessing: CC BY-NC-SA 3.0

// !!! This code is based on extra2_smoothdrag.pde by ptiagomp on codeberg.org !!!

let circleX, circleY;
let targetX, targetY;
let shapeSize = 50;
let targetSize = 50;
let easingAmount = 0.08;
let hue = 0;
let isFleeing = false;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 255, 255);
  circleX = width / 2;
  circleY = height / 2;
  targetX = circleX;
  targetY = circleY;
}

function draw() {
  if (isFleeing) {
    // Use RGB mode temporarily for fading rectangle to get correct alpha blending
    colorMode(RGB, 255);
    rectMode(CORNER);
    noStroke();
    fill(0, 0, 0, 10); // subtle transparency for fade effect
    rect(0, 0, width, height);

    // Switch back to HSB for main drawing
    colorMode(HSB, 360, 255, 255);

    let dx = circleX - mouseX;
    let dy = circleY - mouseY;
    let d = sqrt(dx * dx + dy * dy); // Calculates the straight-line distance between the shape and the mouse.
    let fleeRadius = 150; // How close you have to be for it to flee

    // Tells which direction to flee in and how urgently.
    if (d < fleeRadius) {
      let force = (fleeRadius - d) / fleeRadius;
      targetX += (dx / d) * force * 10;
      targetY += (dy / d) * force * 10;

      // Closer mouse = smaller shape
      targetSize = map(d, 0, fleeRadius, 1, 100);
    } else {
      targetSize = 100; // Mouse is far, return to normal size
    }

    // Keep shape on screen
    targetX = constrain(targetX, shapeSize / 2, width - shapeSize / 2);
    targetY = constrain(targetY, shapeSize / 2, height - shapeSize / 2);

    shapeSize += (targetSize - shapeSize) * easingAmount;

    hue = (hue + 2) % 360; // Colour bomb
    fill(hue, 220, 255);
    rectMode(CENTER);
    noStroke();
    rect(circleX, circleY, shapeSize, shapeSize);

    // Draw visible border after fade and fill
    noFill();
    stroke(0);        // solid black border for visibility
    strokeWeight(1.5);
    rect(circleX, circleY, shapeSize, shapeSize);
  } else {
    background(0, 0, 255);
    targetX = mouseX;
    targetY = mouseY;
    fill(0, 0, 0);
    ellipse(circleX, circleY, 50, 50);
  }

  // Easing motion
  circleX += (targetX - circleX) * easingAmount;
  circleY += (targetY - circleY) * easingAmount;
}

function mousePressed() {
  isFleeing = true;
  background(0, 0, 0);
}

function mouseReleased() {
  isFleeing = false;
  targetX = mouseX;
  targetY = mouseY;
}
