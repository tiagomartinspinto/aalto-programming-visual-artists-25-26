// Declare variables for the position and size of the circle, as well as its colors and animation properties
float circleX = 0;
float circleY = 0;
int circleSize = 50;
color circleColor;
boolean isBouncing = false;
float targetX, targetY;
float easingAmount = 0.1;

void setup() {
  // Set up the size of the canvas (window)
  size(800, 600);
}

void draw() {
  // Set the background color to black
  background(0);

  // Update the target position based on whether the circle is bouncing or following the mouse pointer
  if (isBouncing) {
    targetX = random(width - circleSize / 2, width + circleSize / 2);
    targetY = random(height - circleSize / 2, height + circleSize / 2);
  } else {
    targetX = mouseX;
    targetY = mouseY;
  }

  // Use an easing function to smoothly move the circle towards its target position
  circleX += (targetX - circleX) * easingAmount;
  circleY += (targetY - circleY) * easingAmount;

  // Set the color of the circle based on its position
  circleColor = color(circleX % 255, circleY % 255, (circleX + circleY) % 255);

  // Draw the circle with its respective color and position
  fill(circleColor);
  ellipse(circleX, circleY, circleSize, circleSize);
}

void keyPressed() {
  // Toggle whether the circle is bouncing or not when the spacebar is pressed
  if (key == ' ') {
    isBouncing = !isBouncing;
  }
}