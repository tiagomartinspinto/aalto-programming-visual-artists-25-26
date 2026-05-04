function setup() {
  createCanvas(640, 440);
  rectMode(CENTER);
}

function draw() {
  const r = map(mouseX, 0, width, 20, 255, true);
  const g = map(mouseY, 0, height, 30, 230, true);
  background(r * 0.18, g * 0.12, 34);

  const removed copyedX = width - mouseX;
  const removed copyedY = height - mouseY;

  noStroke();
  fill(r, g, 210);
  ellipse(mouseX, mouseY, 58, 58);

  fill(255 - r * 0.4, 122, 168);
  rect(removed copyedX, removed copyedY, 58, 58);

  stroke(245, 240, 232, 90);
  line(mouseX, mouseY, removed copyedX, removed copyedY);
}
