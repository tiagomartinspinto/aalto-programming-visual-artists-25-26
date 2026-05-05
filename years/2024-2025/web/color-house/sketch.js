let houseColor;
let skyColor;

function setup() {
  const canvas = createCanvas(420, 420);
  canvas.parent("sketch");
  noStroke();
  houseColor = color(255, 122, 168);
  skyColor = color(18, 24, 36);
}

function draw() {
  background(skyColor);
  fill(125, 211, 252, 45);
  circle(330, 90, 110);

  fill(houseColor);
  rect(150, 210, 120, 120);
  triangle(130, 210, 210, 145, 290, 210);

  fill(245, 240, 232);
  rect(188, 270, 42, 60);
  fill(8, 10, 14);
  circle(220, 300, 5);
}

function mousePressed() {
  houseColor = color(random(120, 255), random(80, 180), random(120, 230));
  skyColor = color(random(8, 40), random(12, 38), random(24, 70));
}
