const cols = 8;
const rows = 8;
let cellW;
let cellH;

function setup() {
  const canvas = createCanvas(400, 400);
  canvas.parent("sketch");
  cellW = width / cols;
  cellH = height / rows;
}

function draw() {
  background(18);
  noStroke();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const posX = x * cellW;
      const posY = y * cellH;
      const hovering = mouseX >= posX && mouseX < posX + cellW &&
        mouseY >= posY && mouseY < posY + cellH;

      fill(hovering ? color(255, 91, 79) : color(76, 84, 98));
      rect(posX, posY, cellW - 1, cellH - 1);
    }
  }
}
