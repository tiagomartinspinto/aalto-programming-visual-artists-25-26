let x = 200;
let y = 200;
let xSpeed = 3;
let ySpeed = 2.3;
let ballColor;

function setup() {
  const canvas = createCanvas(420, 420);
  canvas.parent("sketch");
  ballColor = color(125, 211, 252);
}

function draw() {
  background(15, 18, 25, 42);
  fill(ballColor);
  noStroke();
  ellipse(x, y, 54, 54);

  x += xSpeed;
  y += ySpeed;

  if (x < 27 || x > width - 27) {
    xSpeed *= -1;
    changeBallColor();
  }

  if (y < 27 || y > height - 27) {
    ySpeed *= -1;
    changeBallColor();
  }
}

function changeBallColor() {
  ballColor = color(random(170, 255), random(90, 220), random(130, 255));
}
