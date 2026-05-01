int gridSize = 10;
float tileSize;

void setup() {
  size(600, 600);
  tileSize = width / float(gridSize); //float(gridSize) is a way of converting gridSize from int to float. Check more below.
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

//if we don't convert one of them we will lose the decimal part of the numbers which is important.
//at least one of the int(s) needs to be converted so the float gets the decimal precision
//int / int   → int
//int / float → float
//float / int → float
//float / float → float
