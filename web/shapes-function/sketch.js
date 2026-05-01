function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  rectMode(CENTER);
  noLoop();
}

function draw() {
  background(0);
  for (let i = 0; i < 20; i++) {
    drawAbstractShape(random(width), random(height), random(30, 100));
  }
}

function drawAbstractShape(x, y, size) {
  const shapeType = floor(random(3));
  fill(random(255), random(255), random(255), 150);
  noStroke();

  if (shapeType === 0) {
    ellipse(x, y, size, size);
  } else if (shapeType === 1) {
    rect(x, y, size, size);
  } else {
    const halfSize = size / 2;
    triangle(x, y - halfSize, x - halfSize, y + halfSize, x + halfSize, y + halfSize);
  }
}

function mousePressed() {
  redraw();
}
