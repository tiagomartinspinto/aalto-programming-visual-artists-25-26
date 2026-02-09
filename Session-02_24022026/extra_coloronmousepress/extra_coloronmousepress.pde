color houseColor = color(200, 100, 50);

void setup() {
  size(400, 400);
  noStroke();
}

void draw() {
  background(220);
  fill(houseColor);
  rect(150, 200, 100, 100);
  triangle(150, 200, 200, 150, 250, 200);
}

void mousePressed() {
  houseColor = color(random(255), random(255), random(255));
}