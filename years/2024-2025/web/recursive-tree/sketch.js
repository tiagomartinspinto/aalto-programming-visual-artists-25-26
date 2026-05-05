let baseLength = 120;

function setup() {
  const canvas = createCanvas(560, 560);
  canvas.parent("sketch");
}

function draw() {
  background(13, 16, 23);
  const dynamicAngle = radians(25 + sin(frameCount * 0.05) * 15);

  strokeWeight(2);
  push();
  translate(width / 2, height);
  stroke(125, 211, 252);
  branch(baseLength, dynamicAngle);
  pop();

  push();
  translate(width / 2, 0);
  rotate(PI);
  stroke(255, 122, 168);
  branch(baseLength, dynamicAngle);
  pop();
}

function branch(length, angle) {
  line(0, 0, 0, -length);
  translate(0, -length);

  if (length > 10) {
    push();
    rotate(angle);
    branch(length * 0.67, angle);
    pop();

    push();
    rotate(-angle);
    branch(length * 0.67, angle);
    pop();
  }
}
