// Session 2 template: follow mouse + inverted shape + dynamic background

float circleX, circleY;
float squareX, squareY;

int circleSize = 50;
int squareSize = 50;

void setup() {
  size(800, 600);
  rectMode(CENTER);
}

void draw() {
  // Dynamic background based on mouse position (clear mapping)
  float bgR = map(mouseX, 0, width, 0, 255);
  float bgG = map(mouseY, 0, height, 0, 255);
  float bgB = map(mouseX + mouseY, 0, width + height, 0, 255);
  background(bgR, bgG, bgB);

  // Follow mouse
  circleX = mouseX;
  circleY = mouseY;

  // Inverted movement (mirrored around center)
  squareX = width  - mouseX;
  squareY = height - mouseY;

  // Colors based on position
  float cR = map(circleX, 0, width, 0, 255);
  float cG = map(circleY, 0, height, 0, 255);
  fill(cR, cG, 200);
  ellipse(circleX, circleY, circleSize, circleSize);

  float sR = map(squareX, 0, width, 0, 255);
  float sG = map(squareY, 0, height, 0, 255);
  fill(sR, 200, sG);
  rect(squareX, squareY, squareSize, squareSize);
}