float x = 200;
float y = 200;

float xSpeed = 3;
float ySpeed = 2;

float radius = 25;

color ballColor;

void setup() {
  size(400, 400);
  ballColor = color(100, 200, 255);
}

void draw() {
  background(220);

  // Draw ball
  fill(ballColor);
  noStroke();
  ellipse(x, y, radius * 2, radius * 2);

  // Move ball
  x += xSpeed;
  y += ySpeed;

  // Bounce on left/right walls
  if (x < radius || x > width - radius) {
    xSpeed *= -1;
    ballColor = color(random(255), random(255), random(255));
  }

  // Bounce on top/bottom walls
  if (y < radius || y > height - radius) {
    ySpeed *= -1;
    ballColor = color(random(255), random(255), random(255));
  }
}