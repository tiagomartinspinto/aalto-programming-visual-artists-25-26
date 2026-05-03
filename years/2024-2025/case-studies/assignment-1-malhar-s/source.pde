// Assignment 1 - Malhar S.
// Mirrored from OpenProcessing sketch 2564047.
// Original: https://openprocessing.org/sketch/2564047
// License: see the original OpenProcessing page

//this is the code for an interactive artwork generator
//the mouse determines the colour, shape and size of the abstract visuals
//the form created will be based on a combination of chance and interaction

//setting the variables circle, size, color, and animation

float circleX;
float circleY;
int circlesize = 100;
color circlecolor;
boolean going = false;

//setting the size, background, and position of the circle

void setup() {
  size (1080, 720);
  background(0);
  circleX = (width/2);
  circleY = (height/2);
}

//changing the colour of the circle based on mouse position

void draw() {
  fill(mouseX % 255, mouseY % 255, (mouseX + mouseY) % 255);
  
//changing the shape and size of the circle based on mouse position

  ellipse(circleX, circleY, mouseX, mouseY);

//giving the movement a jittery effect to create texture
  if (going) {
    circleX = circleX + random(-5, 5);
    circleY = circleY + random(-5, 5);
  }
}

//refresh the artwork if i dont like it

void mousePressed() {
  background(0);
}

//stop the animation and start it again

void keyPressed() {
  going = !going;
}
