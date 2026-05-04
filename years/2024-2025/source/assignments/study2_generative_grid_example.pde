// Study 2 Example
// Dynamic Circle Grid with Mouse Interaction

void setup() {
  size(800, 600);
  noStroke();
}

void draw() {
  background(30);

  int cols = 10;
  int rows = 8;

  float spacingX = width / float(cols);
  float spacingY = height / float(rows);

  // Mouse controls the circle size and color shift
  float baseSize = map(mouseX, 0, width, 5, spacingX);
  float colorShift = map(mouseY, 0, height, 0, 255);

  for (int i = 0; i < cols; i++) {
    float x = i * spacingX + spacingX / 2;

    for (int j = 0; j < rows; j++) {
      float y = j * spacingY + spacingY / 2;

      // Simple variation across the grid
      float s = baseSize * (0.5 + 0.5 * sin(i * 0.6 + j * 0.6));

      fill(colorShift, 255 - colorShift, 180);
      ellipse(x, y, s, s);
    }
  }
}