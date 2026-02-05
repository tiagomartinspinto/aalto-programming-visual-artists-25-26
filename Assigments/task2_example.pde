// Dynamic Circle Grid with Mouse Interaction

void setup() {
  size(800, 600);
  noStroke(); // Disable outlines for the circles
}

void draw() {
  background(30); // Dark background for contrast

  // Define grid parameters
  int cols = 10;
  int rows = 8;
  float circleSpacing = width / float(cols);
  float halfSpacing = circleSpacing / 2;

  // Cache mouse values
  float mX = mouseX;
  float mY = mouseY;

  // Map mouse positions to dynamic properties
  float circleSize = map(mX, 0, width, 10, 80);
  float colorShift = map(mY, 0, height, 0, 255);
  
  // Pre-calculate max and min sizes for mapping based on distance
  float sizeMax = circleSize * 1.5;
  float sizeMin = circleSize / 2;
  
  // Pre-calculate a scale for the blue color channel
  float blueScale = 255 / float(width);
  
  for (int i = 0; i < cols; i++) {
    // x is constant for a given column
    float x = i * circleSpacing + halfSpacing;
    for (int j = 0; j < rows; j++) {
      // Calculate y position for the row
      float y = j * circleSpacing + halfSpacing;

      // Calculate the distance from the mouse to the current circle
      float distToMouse = dist(mX, mY, x, y);

      // Map the distance to a dynamic size and constrain it
      float dynamicSize = map(distToMouse, 0, width / 2.0, sizeMax, sizeMin);
      dynamicSize = constrain(dynamicSize, 5, sizeMax);

      // Compute product once for color variation based on grid position
      int prod = i * j;
      int fillR = int((colorShift + prod) % 255);
      int fillG = int((255 - colorShift + prod) % 255);
      int fillB = int(distToMouse * blueScale);  // Equivalent to (distToMouse/width)*255

      fill(fillR, fillG, fillB);
      ellipse(x, y, dynamicSize, dynamicSize);
    }
  }
}