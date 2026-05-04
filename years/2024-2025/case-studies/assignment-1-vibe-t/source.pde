// Assignment 1 - Vibe T.
// Mirrored from OpenProcessing sketch 2564174.
// Original: https://openprocessing.org/sketch/2564174
// License: see the original OpenProcessing page

float spriteX = 0;
float spriteY = 0;
float targetX, targetY;
float easingAmount = 0.03;
color skyColor = color(2,7,130);
color dangerColor = color(255,238,140);
color spriteColor = color(0);
color eyeColor = color(255);
float spriteSize = 80 ;
boolean originReached = true;
//origin reached truth allows for free movement of clone sprites, false will ensure they maintain movement towards origin-
//the boolean allows the program to evaluate a condition and apply the results elsewhere in the program


float spriteCloneX = 0;
float spriteCloneY = 0;
float targetCloneX, targetCloneY;
color spriteCloneColor = color(0);
color eyeColorClone = color(255);
float spriteCloneSize = 80 ;

//set up variables to be used in later functions


void setup () {
  size(1000,1000);
  background(skyColor);
}
void draw() {
  background(skyColor);
  //reset background to clear previous movements
  noStroke();
  fill (dangerColor);
  danger(1000, 1000 , 50, 290, 20);
// draw the obstacle in the bottom right corner, same parameters as sprite
      if (spriteX >= 700 && spriteY >= 700){
        targetX = 0;
        targetY = 0;
        originReached = false;
      } else if (originReached == true){
        targetX = mouseX;
        targetY = mouseY;
      }
      
      if (spriteX <= 10 && spriteY <= 10 && (mouseX<700 || mouseY<700)) {
        originReached = true;
      }
// sets up targets to make clones continue movement towards origin, also ensures they will not return to mouse until mouse is moved outside of danger area
  stroke(200);
  fill(spriteColor);
  
  sprite(spriteX, spriteY, 45, spriteSize, 35);
  // (position, position, width of spikes, lenth of spikes (spriteSize), number of spikes)
  // setting the target to the mouse coordinates to guide animation ease
  if (originReached == true) {
        spriteX += (targetX - spriteX) * easingAmount;
        spriteY += (targetY - spriteY) * easingAmount;
      } else {
        spriteX += (targetX - spriteX) * easingAmount*3;
        spriteY += (targetY - spriteY) * easingAmount*3;
      }
  // the easing function moves star towards target, both x and y easing described
  
  // The following is an army of clone sprites with different ways of interacting with the mouse, they oscillate between colors and get paler as they move towards the bottom right
      noStroke();
      fill(250+spriteCloneY/4,200, 80+spriteCloneX/4);
      spriteClone(spriteX - mouseX/4+ 168, spriteY - spriteY/2, 45, spriteSize, 35);
      spriteCloneX += (targetCloneX - spriteCloneX) * easingAmount;
      spriteCloneY += (targetY - spriteCloneY) * easingAmount;
        
      
      noStroke();
      fill(200+spriteCloneX/4, 100+spriteCloneY/4, 198);
      spriteClone(spriteX- mouseX/6+ 230,spriteY- 200, 45, spriteSize, 35);
      spriteCloneX += (targetCloneX - spriteCloneX) * easingAmount;
      spriteCloneY += (targetY - spriteCloneY) * easingAmount;

      
      noStroke();
      fill(230,90+spriteCloneY/4, 200+spriteCloneX/4);
      spriteClone(spriteY-20, spriteX/4 + 100, 45, spriteSize, 35);
      spriteCloneX += (targetCloneX - spriteCloneX) * easingAmount;
      spriteCloneY += (targetY - spriteCloneY) * easingAmount;
  
      noStroke();
      fill(220,10+spriteCloneY/2, 100+spriteCloneX/4);
      spriteClone(spriteY/2,  spriteX/4 - 20 , 45, spriteSize, 35);
      spriteCloneX += (targetX - spriteCloneX) * easingAmount;
      spriteCloneY += (targetY - spriteCloneY) * easingAmount;
  
        noStroke();
      fill(250+spriteCloneY/4, 80+spriteCloneX/4,200);
      spriteClone(spriteY - spriteY/2,spriteX - mouseX/4+ 168, 45, spriteSize, 35);
      spriteCloneX += (targetCloneX - spriteCloneX) * easingAmount;
      spriteCloneY += (targetY - spriteCloneY) * easingAmount;
        
      
      noStroke();
      fill(200+spriteCloneX/4,198, 100+spriteCloneY/4);
      spriteClone(spriteY- 300, spriteX+ mouseX/6+100,45, spriteSize, 35);
      spriteCloneX += (targetCloneX - spriteCloneX) * easingAmount;
      spriteCloneY += (targetY - spriteCloneY) * easingAmount;

      
      noStroke();
      fill(90+spriteCloneY/4,230, 200+spriteCloneX/4);
      spriteClone( spriteX/4 + 67,spriteY+45, 45, spriteSize, 35);
      spriteCloneX += (targetCloneX - spriteCloneX) * easingAmount;
      spriteCloneY += (targetY - spriteCloneY) * easingAmount;
  
      noStroke();
      fill(220, 100+spriteCloneX/4, 10+spriteCloneY/2);
      spriteClone( spriteX/4 +20 ,spriteY/2+ 200,  45, spriteSize, 35);
      spriteCloneX += (targetX - spriteCloneX) * easingAmount;
      spriteCloneY += (targetY - spriteCloneY) * easingAmount;
  


  if (originReached == false) {
  skyColor = color(0);
  dangerColor = color(255);
  spriteColor = color (255);
  eyeColor = color (0);
  spriteSize = 50;
  spriteCloneY= 0;
 
// this changes the appearance of the sprites as they move away from the danger, shortens their spikes and turns the scene black and white
}
  if (originReached == true) {
  skyColor = color(2,7,130);
  dangerColor = color(255,238,140);
  spriteColor = color (0);
  eyeColor = color (255);
  spriteSize = 65;
  
  // returns the sprites to their original appearance once they have settled at the origin
}



}


void sprite(float x, float y, float radius1, float radius2, int npoints) {
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0;
  beginShape();
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius2;
    float sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  //draw the star shape
  endShape(CLOSE);
  fill(eyeColor); // white color for the eyes
  
  // Offsets position the eyes relative to the face center.
  float eyeOffsetX = 15;
  float eyeOffsetY = 10;
  float eyeSize = 10;

  // Left eye
  ellipse(x - eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
  // Right eye
  ellipse(x + eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
  //The previous describes the sprite shape, begin shape and endshape inclose the instructions for the body, while the two circles describe the eyes
 
}
// this will ensure that the sidekick sprites can be handled seperately from the main character
void spriteClone(float x, float y, float radius1, float radius2, int npoints) {
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0;
  beginShape();
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius2;
    float sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  fill(eyeColor); 
  float eyeOffsetX = 15;
  float eyeOffsetY = 10;
  float eyeSize = 10;
  ellipse(x - eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
  ellipse(x + eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
}



void danger (float x, float y, float radius1, float radius2, int npoints) {
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0;
  beginShape();
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius2;
    float sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
//describing the danger element, similar star shape
