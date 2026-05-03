// Define the RotatingShape class
class RotatingShape {
  float x, y;          // Position of the shape
  float size;          // Size of the shape
  float angle;         // Current rotation angle
  float rotationSpeed; // How fast it rotates
  color shapeColor;    // The color of the shape
  
  // Constructor to set up the shape's properties
  RotatingShape(float x, float y, float size, float rotationSpeed, color shapeColor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotationSpeed = rotationSpeed;
    this.shapeColor = shapeColor;
    angle = random(TWO_PI); // Start at a random angle
  }
  
  // Update the shape's angle for rotation
  void update() {
    angle += rotationSpeed;
  }
  
  // Display the shape on the screen
  void display() {
    pushMatrix();
    translate(x, y);
    rotate(angle);
    noFill();
    stroke(shapeColor);
    strokeWeight(2);
    // Draw a rectangle centered at the shape's position
    rectMode(CENTER);
    rect(0, 0, size, size);
    popMatrix();
  }
}

RotatingShape[] shapes;

void setup() {
  size(600, 600);
  // Create an array to hold 10 rotating shapes
  shapes = new RotatingShape[10];
  for (int i = 0; i < shapes.length; i++) {
    // Random position, size, rotation speed, and color for each shape
    shapes[i] = new RotatingShape(random(width), random(height), random(30, 100), random(0.01, 0.05), color(random(255), random(255), random(255)));
  }
}

void draw() {
  background(0);
  // Update and display each shape
  for (RotatingShape s : shapes) {
    s.update();
    s.display();
  }
}