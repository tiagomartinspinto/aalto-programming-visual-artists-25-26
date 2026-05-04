// Assignment 3 - Anna
// Mirrored from OpenProcessing sketch 2594125.
// Original: https://openprocessing.org/sketch/2594125
// License: see the original OpenProcessing page

void setup() {
  size(800, 800);
  noLoop(); // Generates the artwork once, but can be refreshed with mousePressed()
}

void draw() {
  background(0);
  
  int shapeCount = 50; // Number of shapes to draw
  for (int i = 0; i < shapeCount; i++) {
    float x = random(width);  
    float y = random(height); 
    float size = random(30, 100); // Random size
    color shapeColor = color(random(255), random(255), random(255), random(150, 255)); // Random color with transparency
    
    drawSquare(x, y, size, shapeColor); // Always draws a square
  }
}

// Function to draw a square
void drawSquare(float x, float y, float size, color c) {
  fill(c);
  noStroke();
  rectMode(CENTER);
  rect(x, y, size, size);
}

// Refresh artwork on mouse click
void mousePressed() {
  redraw();
}
