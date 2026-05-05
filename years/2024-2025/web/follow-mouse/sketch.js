let x = 200;
let y = 200;

function setup() {
  const canvas = createCanvas(420, 420);
  canvas.parent("sketch");
}

function draw() {
  background(16, 19, 26, 35);
  x += (mouseX - x) * 0.12;
  y += (mouseY - y) * 0.12;

  noStroke();
  fill(255, 122, 168, 72);
  ellipse(mouseX, mouseY, 82, 82);
  fill(125, 211, 252);
  ellipse(x, y, 52, 52);
}
