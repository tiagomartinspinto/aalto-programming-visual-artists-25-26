int gridSize = 10;
float tileSize;

void setup() {
  size(600, 600);
  tileSize = width / float(gridSize);
  rectMode(CENTER);
}

void draw() {
  background(0);
  stroke(255);
  noFill();

  for (int x = 0; x < width; x += tileSize) {
    for (int y = 0; y < height; y += tileSize) {

      float angle = noise(x * 0.01, y * 0.01, frameCount * 0.01) * TWO_PI;

      pushMatrix();
      translate(x + tileSize/2, y + tileSize/2);
      rotate(angle);
      rect(0, 0, tileSize * 0.5, tileSize * 0.5);
      popMatrix();
    }
  }
}