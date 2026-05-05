const gridSize = 10;

function setup() {
  const canvas = createCanvas(560, 560);
  canvas.parent("sketch");
  noFill();
  strokeWeight(2);
  rectMode(CENTER);
}

function draw() {
  background(8, 10, 14);
  const tileSize = width / gridSize;

  for (let x = 0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize) {
      const cx = x + tileSize / 2;
      const cy = y + tileSize / 2;
      const distanceToPointer = dist(mouseX, mouseY, cx, cy);
      const opacity = map(distanceToPointer, 0, width * 0.55, 255, 45, true);
      const angle = noise(x * 0.01, y * 0.01, frameCount * 0.006) * TWO_PI;
      drawPattern(cx, cy, tileSize * 0.42, angle, opacity);
    }
  }
}

function drawPattern(x, y, size, angle, opacity) {
  push();
  translate(x, y);
  rotate(angle);
  for (let i = 0; i < 5; i++) {
    const s = size * (1 - i * 0.2);
    const c = map(mouseX, 0, width, 70, 255, true);
    stroke(c, 122, 255 - c * 0.25, opacity);
    rect(0, 0, s, s);
  }
  pop();
}
