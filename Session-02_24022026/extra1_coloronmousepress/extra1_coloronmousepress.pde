// Session 2 Extra Exercise
// Click to change the house color

color houseColor;
color roofColor;

void setup() {
  size(400, 400);
  noStroke();
  
  // Initial colors
  houseColor = color(200, 100, 50);
  roofColor  = color(150, 50, 30);
}

void draw() {
  background(220);

  // Draw house base
  fill(houseColor);
  rect(150, 200, 100, 100);

  // Draw roof
  fill(roofColor);
  triangle(150, 200, 200, 150, 250, 200);
}

void mousePressed() {
  // Change both colors when mouse is clicked
  houseColor = color(random(255), random(255), random(255));
  roofColor  = color(random(255), random(255), random(255));
}