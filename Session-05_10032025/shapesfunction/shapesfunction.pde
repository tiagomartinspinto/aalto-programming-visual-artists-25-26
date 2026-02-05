void setup() {
  size(600, 600);
  background(0);
  //noLoop();  // Draw once for a static artwork
}

void draw() {
  // Generate multiple shapes across the canvas
  for (int i = 0; i < 20; i++) {
    // Choose random positions and sizes
    float x = random(width);
    float y = random(height);
    float s = random(30, 100);
    
    // Call a custom function to draw an abstract shape
    drawAbstractShape(x, y, s);
  }
}

// This function draws a random abstract shape at (x, y) with a given size
void drawAbstractShape(float x, float y, float size) {
  // Choose a random shape type: 0 for ellipse, 1 for rectangle, 2 for triangle
  int shapeType = int(random(3));
  
  // Set a random fill color with some transparency
  fill(random(255), random(255), random(255), 150);
  noStroke();
  
  if (shapeType == 0) {
    // Draw an ellipse centered at (x, y)
    ellipse(x, y, size, size);
  } else if (shapeType == 1) {
    // Draw a rectangle with (x, y) as the center
    rectMode(CENTER);
    rect(x, y, size, size);
  } else {
    // Draw a triangle centered around (x, y)
    float halfSize = size / 2;
    triangle(x, y - halfSize, x - halfSize, y + halfSize, x + halfSize, y + halfSize);
  }
}

// noLoop() stops the draw() function from executing repeatedly. Without it, 
// Processing automatically calls draw() over and over, which is great for animations. 
// In our example, we only want to create a single piece of generative artwork, so calling 
// noLoop() ensures the artwork is drawn once and then remains static.