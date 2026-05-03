// Assignment 3 - Flynn
// Mirrored from OpenProcessing sketch 2594134.
// Original: https://openprocessing.org/sketch/2594134
// License: see the original OpenProcessing page

int cols = 24;
int rows = 24;
int spacing;

int delayFrames = 60;
int triggerTime;

int initialI = (int) random(9, 15);
int initialJ = (int) random(9, 15);

Cell[][] cell = new Cell[cols][rows];
ArrayList<Cell> activeCells = new ArrayList<Cell>();
boolean started = false;

void setup() {
  size(1080, 1080);
  spacing = width / cols;
  noStroke();

  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      cell[i][j] = new Cell(i * spacing + spacing / 2, j * spacing + spacing / 2, i, j);
    }
  }
}

void draw() {
  background(255);

  if (started && frameCount >= triggerTime) {
    ArrayList<Cell> newCells = new ArrayList<Cell>();
    
    for (Cell c : activeCells) {
      for (int di = -1; di <= 1; di++) {
        for (int dj = -1; dj <= 1; dj++) {
          int ni = c.i + di;
          int nj = c.j + dj;
          if (ni >= 0 && ni < cols && nj >= 0 && nj < rows) {
            Cell neighbor = cell[ni][nj];
            if (!neighbor.active) {
              neighbor.update();
              neighbor.active = true;
              newCells.add(neighbor);
            }
          }
        }
      }
    }

    activeCells.addAll(newCells);
    delayFrames = max(1, delayFrames - 2); // Accelerate the spread
    triggerTime = frameCount + delayFrames;
  }

  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      cell[i][j].display();
    }
  }
}

void mouseClicked() {
  if (!started) {
    cell[initialI][initialJ].update();
    cell[initialI][initialJ].active = true;
    activeCells.add(cell[initialI][initialJ]);
    started = true;
    triggerTime = frameCount + delayFrames;
  }
}

class Cell {
  float x, y;
  float size;
  float targetSize;
  float amt = 0.1;
  boolean active = false;
  int i, j;

  Cell(float posX, float posY, int i_, int j_) {
    x = posX;
    y = posY;
    size = 0;
    targetSize = 0;
    i = i_;
    j = j_;
  }

  void display() {
    size = lerp(size, targetSize, amt);
    fill(0);
    ellipse(x, y, size, size);
  }

  void update() {
    targetSize = 30;
  }
}
