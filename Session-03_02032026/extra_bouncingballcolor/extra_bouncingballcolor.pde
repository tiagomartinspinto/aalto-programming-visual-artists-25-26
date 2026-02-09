float x = 200, y = 200;
float xSpeed = 3, ySpeed = 2;
color ballColor;

void setup() {
  size(400, 400);
  ballColor = color(100, 200, 255);
}

void draw() {
  background(220);
  
  // Draw ball
  fill(ballColor);
  ellipse(x, y, 50, 50);
  
  // Move ball
  x += xSpeed;
  y += ySpeed;
  
  // Check for collisions
  if (x < 25 || x > width - 25) {
    xSpeed *= -1;
    ballColor = color(random(255), random(255), random(255));
  }
  if (y < 25 || y > height - 25) {
    ySpeed *= -1;
    ballColor = color(random(255), random(255), random(255));
  }
}