void setup() {
  size(600, 600);
  background(0);
  rectMode(CENTER);
  noLoop();  // draw once to create a static generative artwork
}

void draw() {

  // Generate multiple shapes across the canvas
  for (int i = 0; i < 20; i++) {

    // Random position and size
    float x = random(width);
    float y = random(height);
    float s = random(30, 100);

    // Call our custom function
    drawAbstractShape(x, y, s);
  }
}

// Function that draws a random abstract shape
void drawAbstractShape(float x, float y, float size) {

  // Choose a random shape type
  int shapeType = int(random(3));

  // Random colour with transparency
  fill(random(255), random(255), random(255), 150);
  noStroke();

  if (shapeType == 0) {

    // Ellipse
    ellipse(x, y, size, size);

  } else if (shapeType == 1) {

    // Rectangle
    rect(x, y, size, size);

  } else {

    // Triangle
    float halfSize = size / 2;

    triangle(
      x, y - halfSize,
      x - halfSize, y + halfSize,
      x + halfSize, y + halfSize
    );
  }
}