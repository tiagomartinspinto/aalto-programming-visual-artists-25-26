int cols = 8;
int rows = 8;

int cellW, cellH;   // cell width/height in pixels

void setup() {
  size(400, 400);
  // Make cells fit the canvas evenly
  cellW = width / cols;
  cellH = height / rows;
}

void draw() {
  background(240);

  // Optional: cleaner look
  noStroke();

  for (int y = 0; y < rows; y++) {
    for (int x = 0; x < cols; x++) {

      int posX = x * cellW;
      int posY = y * cellH;

      // Is the mouse inside this cell?
      boolean hovering =
        mouseX >= posX && mouseX < posX + cellW &&
        mouseY >= posY && mouseY < posY + cellH;

      if (hovering) {
        fill(255, 0, 0);          // hovered: red
      } else {
        fill(100);               // not hovered: gray
      }

      rect(posX, posY, cellW, cellH);
    }
  }
}