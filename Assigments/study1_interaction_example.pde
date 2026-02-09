// Study 1 Example
// Interactive Sketch: Mouse, Color, and Shape

void setup() {
  size(800, 600);
  noStroke();
}

void draw() {
  // Map mouse position to color values
  float r = map(mouseX, 0, width, 0, 255);
  float g = map(mouseY, 0, height, 0, 255);

  // Background changes with mouse
  background(r, g, 150);

  // Circle follows the mouse
  fill(255 - r, 255 - g, 200);
  ellipse(mouseX, mouseY, 50, 50);

  // Rectangle stays in place but changes color
  fill(g, r, 100);
  rect(50, 50, 80, 50);
}