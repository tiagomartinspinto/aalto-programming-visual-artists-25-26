// Assignment 2 - Flynn
// Mirrored from OpenProcessing sketch 2582366.
// Original: https://openprocessing.org/sketch/2582366
// License: see the original OpenProcessing page

// defining grid layout
int cols = 24;
int rows = 24;
int spacing;

// defining colour swatches
color shutterClr = #44464d;
color cLeft = #2ad4c0;
color cRight = #aef2b9;
color cTop = #e4f2ef;
color cBottom = #748c9e;

int backgroundClr, triangleClr;

void setup() {
  size(1080, 1080);
  spacing = width / cols;
  noStroke();
}

// the dynamic "shutters"
class Shutter {
  float posX1, posY1, posX2, posY2;
  
  Shutter(float posX1, float posY1, float posX2, float posY2) {
    /*idk why these are necessary, pls explain to me
    I feel like these are not needed anymore?
    since I changed the code and no longer use these variables in other parts
    */
    this.posX1 = posX1;
    this.posY1 = posY1;
    this.posX2 = posX2;
    this.posY2 = posY2;
  }
  
  void display(int x, int y) {
    // determining the centre of each grid space
    float centreX = x * spacing + (spacing / 2);
    float centreY = y * spacing + (spacing / 2);
    
    // distance between mouse and grid centre
    float distance = dist(mouseX, mouseY, centreX, centreY);
    
    // changing the distance to a smaller value useable as shutter verteces
    float displacement = map(distance, 0, width / 2, spacing / 2, 0);
    displacement = constrain(displacement, 0, spacing / 2); // ensuring it doesn't go into the negatives
    
    // defining the dynamic verteces
    float newX = posX1 - displacement;
    float newY = posY2 - displacement;

    // defining the shutters' graphical representation
    fill(shutterClr);
    triangle(posX1, posY1, posX2, posY2, newX, newY);
  }
}

void draw() {
  // dynamically changing colour based off mouse horizontal position
  float cMapX = map(mouseX, 0, width, 0, 1);
  backgroundClr = lerpColor(cLeft, cRight, cMapX);
  background(backgroundClr);

  // applying this for each grid space
  for (int y = 0; y < rows; y++) {
    for (int x = 0; x < cols; x++) {
      // defining the corners of the grids/triangles
      float posXleft = x * spacing;
      float posYtop = y * spacing;
      float posYbottom = y * spacing + spacing;
      float posXright = x * spacing + spacing;
      
      // dynamically changing the colours based off mouse vertical position
      float cMapY = map(mouseY, 0, height, 0, 1);
      triangleClr = lerpColor(cTop, cBottom, cMapY);
      fill(triangleClr);
      
      // creating the triangles
      triangle(posXleft, posYtop, posXright, posYtop, posXleft, posYbottom);
      
      // creating the shutters
      Shutter s = new Shutter(posXright, posYtop, posXleft, posYbottom);
      s.display(x, y); // i dont understand this part either
    }
  }
}
