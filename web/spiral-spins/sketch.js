const turns = 10;
const step = 0.08;
const thickness = 2;
const sat = 80;
const bri = 100;
const curve = 1.0;
let trails = false;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  frameRate(60);
  noFill();
  strokeWeight(thickness);
  colorMode(HSB, 360, 100, 100, 255);
  background(0);
}

function draw() {
  if (trails) {
    noStroke();
    fill(0, 40);
    rect(0, 0, width, height);
    noFill();
  } else {
    background(0);
  }

  translate(width / 2, height / 2);
  const speed = map(mouseX, 0, width, 0.005, 0.05);
  const offset = frameCount * speed;
  const maxRadius = map(mouseY, 0, height, min(width, height) * 0.48, min(width, height) * 0.20);
  drawColoredSpiral(offset, maxRadius);
}

function drawColoredSpiral(offset, maxRadius) {
  const maxAngle = TWO_PI * turns;
  beginShape();
  for (let a = 0; a < maxAngle; a += step) {
    const t = a / maxAngle;
    const r = pow(t, curve) * maxRadius;
    const x = r * cos(a + offset);
    const y = r * sin(a + offset);
    stroke(t * 360, sat, bri, map(r, 0, maxRadius, 50, 255));
    vertex(x, y);
  }
  endShape();
}

function keyPressed() {
  if (key === "t" || key === "T") {
    trails = !trails;
    if (!trails) background(0);
  }
}
