function setup() {
  const canvas = createCanvas(420, 420);
  canvas.parent("sketch");
  noLoop();
}

function draw() {
  background(20, 24, 32);
  drawFace(width / 2, height / 2, 220);
  drawFace(105, 110, 90);
  drawFace(320, 310, 110);
}

function drawFace(x, y, diameter) {
  noStroke();
  fill(255, 218, 205);
  ellipse(x, y, diameter, diameter);

  fill(17, 20, 27);
  const eyeOffsetX = diameter * 0.16;
  const eyeOffsetY = diameter * 0.1;
  const eyeSize = diameter * 0.1;
  ellipse(x - eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
  ellipse(x + eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);

  noFill();
  stroke(17, 20, 27);
  strokeWeight(max(2, diameter * 0.018));
  arc(x, y + diameter * 0.1, diameter * 0.5, diameter * 0.25, 0, PI);
}
