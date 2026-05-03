// Assignment 2 - Kaius
// Mirrored from OpenProcessing sketch 2582368.
// Original: https://openprocessing.org/sketch/2582368
// License: see the original OpenProcessing page

int gridSize = 15; //number of rows and columns
float circleSize; //size of a default circle

void setup() {
  size(780,780);
  background(0);
  noFill();
  strokeWeight(1.5);
  circleSize = width / float(gridSize); 
}

void draw() {
  background(0);
  
  //grid loop
  for (int x = 0; x < width; x += circleSize) {
    for (int y = 0; y < width; y += circleSize) {
      
      float d = dist(mouseX, mouseY, x + circleSize / 2, y + circleSize / 2); //distance of mouse from circle
      
      float c = map(d, 0, 200, 255, 0); //mapping distance value to circle color
      
      float cSize = map(d, 0, width+20, 0, circleSize*13); //mapping mouse distance to "scared" circle size
      
      stroke(c, 20, 20); //color of circle
      
      //making the circle smaller when mouse is too close
      if(d <60) { 
      
      ellipse(x + circleSize / 2, y + circleSize / 2, cSize, cSize);
      
     
      //drawing a circle if its far away enough
      } else {
        ellipse(x + circleSize / 2, y + circleSize / 2, circleSize-2, circleSize-2);
      }
      
    }
  }
}
