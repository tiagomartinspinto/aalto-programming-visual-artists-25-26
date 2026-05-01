const gridSize = 10;
let tileSize;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  tileSize = width / gridSize;
  rectMode(CENTER);
}

function draw() {
  background(0);
  stroke(255);
  noFill();

  for (let x = 0; x < width; x += tileSize) {
    for (let y = 0; y < height; y += tileSize) {
      const angle = noise(x * 0.01, y * 0.01, frameCount * 0.01) * TWO_PI;

      push();
      translate(x + tileSize / 2, y + tileSize / 2);
      rotate(angle);
      rect(0, 0, tileSize * 0.5, tileSize * 0.5);
      pop();
    }
  }
}
