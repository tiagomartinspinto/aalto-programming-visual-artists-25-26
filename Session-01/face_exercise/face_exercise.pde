// Face Exercise
// Modify values and experiment.

void setup() {
  size(400, 400);
  noLoop(); // Remove this if you want animation
}

void draw() {
  background(200, 220, 255);

  // Change position and size here
  drawFace(200, 200, 200);
}

void drawFace(float x, float y, float diameter) {

  // Face
  fill(255, 220, 200);
  noStroke();
  ellipse(x, y, diameter, diameter);

  // Eyes
  fill(0);
  float eyeOffsetX = 30;
  float eyeOffsetY = 20;
  float eyeSize = 20;

  ellipse(x - eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
  ellipse(x + eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);

  // Mouth
  noFill();
  stroke(0);
  strokeWeight(3);
  arc(x, y + 20, diameter * 0.5, diameter * 0.25, 0, PI);
}