// Study 2 Example (distance-based size)

void setup() {
  size(800, 600);
  noStroke();
}

void draw() {
  background(30);

  int cols = 12;
  int rows = 9;

  float spacingX = width / float(cols);
  float spacingY = height / float(rows);

  for (int i = 0; i < cols; i++) {
    float x = i * spacingX + spacingX / 2;

    for (int j = 0; j < rows; j++) {
      float y = j * spacingY + spacingY / 2;

      float d = dist(mouseX, mouseY, x, y);
      float s = map(d, 0, width/2.0, spacingX, 5);

      fill(200, 200, 255);
      ellipse(x, y, s, s);
    }
  }
}