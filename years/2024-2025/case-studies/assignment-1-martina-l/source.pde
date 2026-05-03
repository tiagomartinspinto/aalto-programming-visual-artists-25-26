// Assignment 1 - Martina L.
// Mirrored from OpenProcessing sketch 2564996.
// Original: https://openprocessing.org/sketch/2564996
// License: see the original OpenProcessing page

color shapeColor; 

void setup() {
  size(900, 640);
  background(56, 100, 67);
  shapeColor = color(13, 45, 67); 
  
}


void draw() {
  fill(shapeColor);  
  noStroke();
  
int shapeType = int(random(3));
float size = 50;
if (shapeType == 0 ) {
  ellipse(mouseX, mouseY, size + 30, size + 30);
  
} else if (shapeType == 1) {
  rect (mouseX - size / 2, mouseY - size / 2, size, size);
  
} else {
  triangle (mouseX, mouseY - size / 2,
            mouseX - size / 2, mouseY + size / 2,
            mouseX + size / 2, mouseY + size / 2);           
}

  fill(0, 2); 
  rect(0, 0, width, height);
}


void mousePressed () {
  shapeColor = color (random (256), random (256), random (256));
}
