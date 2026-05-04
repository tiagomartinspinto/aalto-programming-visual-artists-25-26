// Assignment 1 - Rosa H.
// Mirrored from OpenProcessing sketch 2564161.
// Original: https://openprocessing.org/sketch/2564161
// License: see the original OpenProcessing page

void setup() {
  size(800, 600);
  noStroke();     
}
void draw() {
  background(mouseX % 200, mouseY % 200, 150);
   fill(255 - mouseX % 255, 255 - mouseY % 255, 200);
  rect(mouseX, mouseY, 50, 100);
    fill(mouseY % 255, mouseX % 255, 0, 100);
  ellipse(400, 300, 400, 350);
fill(mouseY % 200, mouseX % 2, 0, 100);
  ellipse(200, 200, 200, 200);
  fill(mouseY % 200, mouseX % 2, 100);
  rect(700, 0, 500, 600);
}
