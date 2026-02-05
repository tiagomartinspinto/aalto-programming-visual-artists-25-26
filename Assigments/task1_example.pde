// Interactive Sketch: Mouse Movement-based Color and Shape

void setup() {
  size(800, 600); // Set the canvas size
  noStroke();     // Disable outlines for shapes
}

void draw() {
  // Change the background color based on the mouse position.
  // The modulo ensures the values stay within the 0-255 range.
  background(mouseX % 255, mouseY % 255, 150);
  
  // Draw a circle that follows the mouse with a color that also depends on mouseX and mouseY.
  fill(255 - mouseX % 255, 255 - mouseY % 255, 200);
  ellipse(mouseX, mouseY, 50, 50);
  
  // Draw a rectangle with a dynamic fill, placed in a fixed location.
  fill(mouseY % 255, mouseX % 255, 100);
  rect(50, 50, 80, 50);
}