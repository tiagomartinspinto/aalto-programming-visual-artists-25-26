function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent("sketch");
  noLoop();
}

function draw() {
  background(200, 220, 255);
  drawFace(width / 2, height / 2, 200);
}

function drawFace(x, y, diameter) {
  noStroke();
  fill(255, 220, 200);
  ellipse(x, y, diameter, diameter);

  fill(0);
  const eyeOffsetX = 30;
  const eyeOffsetY = 20;
  const eyeSize = 20;
  ellipse(x - eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
  ellipse(x + eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);

  noFill();
  stroke(0);
  strokeWeight(3);
  arc(x, y + 20, diameter * 0.5, diameter * 0.25, 0, PI);
}
