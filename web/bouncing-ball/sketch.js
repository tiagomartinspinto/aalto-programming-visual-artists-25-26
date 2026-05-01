let x = 200;
let y = 200;
let xSpeed = 3;
let ySpeed = 2;
const radius = 25;
let ballColor;

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent("sketch");
  ballColor = color(100, 200, 255);
}

function draw() {
  background(20);
  fill(ballColor);
  noStroke();
  ellipse(x, y, radius * 2, radius * 2);

  x += xSpeed;
  y += ySpeed;

  if (x < radius || x > width - radius) {
    xSpeed *= -1;
    ballColor = color(random(255), random(255), random(255));
  }

  if (y < radius || y > height - radius) {
    ySpeed *= -1;
    ballColor = color(random(255), random(255), random(255));
  }
}
