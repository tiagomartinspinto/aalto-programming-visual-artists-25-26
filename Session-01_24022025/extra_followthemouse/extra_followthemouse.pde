// setup() runs once when the program starts.
void setup() {
  size(400, 400);  // Set the canvas size to 400 pixels wide by 400 pixels tall.
}

// draw() continuously executes the code inside its block.
void draw() {
  background(220);             // Clear the screen with a light gray color.
  fill(100, 150, 255);         // Set the fill color for shapes (a shade of blue).
  ellipse(mouseX, mouseY, 50, 50);  // Draw an ellipse at the current mouse position with a width and height of 50 pixels.
}