// Assignment 1 - Kaius K.
// Mirrored from OpenProcessing sketch 2564148.
// Original: https://openprocessing.org/sketch/2564148
// License: see the original OpenProcessing page

// Declare variables for position, size and color of both faces

float uwuX = 0;
float uwuY = 0;
float uwuSize = 100;
color uwuColor;

float owoX = 500;
float owoY = 800;
int owoSize = 70;
color owoColor;

color circleColor;

void setup() {
  
  // the P3D enables the rendering of the Z axis
  size(1000, 1000, P3D);
  
}

void draw() { 
  
  //background's color changes according to mouse movements
  background(0, mouseX/4, mouseY/4);
  
  //Update first face movement, first face follows mouse and changes color according to mouse movements
  uwuX = mouseX;
  uwuY = mouseY;
  uwuColor = color(uwuX/4, uwuY/4, (uwuX-uwuY)/4);
  
  //drawing the first face, the face also moves on the Z axis according to the mouses Y axis movement
  fill(uwuColor);
  textSize(uwuSize);
  textAlign(CENTER,CENTER);
  text("uwu", uwuX, uwuY,(1000-mouseY)-100);
  
  
  
  //Update second face movement, size and color
  owoX = (1001-mouseX)/2+200;
  owoColor = color(uwuY/3, 0, 0);
  owoSize = 70;
  
  
  //Drawing the second face which moves only on the X axis
  fill(owoColor);
  textSize(owoSize);
  textAlign(CENTER,CENTER);
  text("owo", owoX, owoY);
  
  
  
  //Drawing the eyebrows which move according to mouse's Y axis
  strokeWeight(5);
  stroke(uwuY/3, 0, 0);
  line(owoX-100*(uwuY/1000),owoY-60,owoX-25,owoY-30);
  line(owoX+100*(uwuY/1000),owoY-60,owoX+25,owoY-30);
  
  
  //head of the angry face a bit translucent, I swear I can do shapes as well as text I just kind of forgot to do shapes instead of text <3
  strokeWeight(1); 
  circleColor = color(uwuY/3, 0, 0, 100);
  fill(circleColor);
  ellipse(owoX, owoY, 100);
  
  //Drawing the decorations on the sides
   textSize(70);
      textAlign(CENTER, TOP);

  text("jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL ",width/2, -50, -70); 
    text("jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL ",width/2, -30, -50); 
      text("jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL ",width/2, -10, -30); 


  text("jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL ",width/2, 950, -70);
  text("jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL ",width/2, 970, -100);
  text("jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL ",width/2, 990, -130);
  
        textSize(20);

  text("jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL ", 950, 0, 50, 1000); 
  text("jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL jl lL ", 0, 0, 50, 1000); 


  
  
}
