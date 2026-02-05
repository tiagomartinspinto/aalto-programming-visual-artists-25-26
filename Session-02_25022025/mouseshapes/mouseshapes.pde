// Declare variables for the position and size of both shapes, as well as their colors
float circleX = 0;
float circleY = 0;
int circleSize = 50;
color circleColor;

float squareX = width;
float squareY = height;
int squareSize = 50;
color squareColor;

void setup() {
  // Set up the size of the canvas (window)
  size(800, 600);
}

void draw() {
  // Set the background color based on the mouse position
  background(mouseX % 255, mouseY % 255, (mouseX + mouseY) % 255);

  // Update the position of both shapes to follow the mouse pointer
  circleX = mouseX;
  circleY = mouseY;
  squareX = width - mouseX;
  squareY = height - mouseY;

  // Set the color of each shape based on its position
  circleColor = color(circleX % 255, circleY % 255, (circleX + circleY) % 255);
  squareColor = color((squareX * squareY) % 255, (squareX - squareY) % 255, (squareX + squareY) % 255);

  // Draw the shapes with their respective colors and positions
  fill(circleColor);
  ellipse(circleX, circleY, circleSize, circleSize);

  fill(squareColor);
  rectMode(CENTER);
  rect(squareX, squareY, squareSize, squareSize);
}