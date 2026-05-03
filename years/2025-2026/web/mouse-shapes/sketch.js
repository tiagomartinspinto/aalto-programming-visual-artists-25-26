const circleSize = 50;
const squareSize = 50;

function setup() {
  const canvas = createCanvas(800, 600);
  canvas.parent("sketch");
  rectMode(CENTER);
}

function draw() {
  const bgR = map(mouseX, 0, width, 0, 255);
  const bgG = map(mouseY, 0, height, 0, 255);
  const bgB = map(mouseX + mouseY, 0, width + height, 0, 255);
  background(bgR, bgG, bgB);

  const circleX = mouseX;
  const circleY = mouseY;
  const squareX = width - mouseX;
  const squareY = height - mouseY;

  const cR = map(circleX, 0, width, 0, 255);
  const cG = map(circleY, 0, height, 0, 255);
  fill(cR, cG, 200);
  noStroke();
  ellipse(circleX, circleY, circleSize, circleSize);

  const sR = map(squareX, 0, width, 0, 255);
  const sG = map(squareY, 0, height, 0, 255);
  fill(sR, 200, sG);
  rect(squareX, squareY, squareSize, squareSize);
}
