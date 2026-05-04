// Assignment 3 - Kaius
// Mirrored from OpenProcessing sketch 2594141.
// Original: https://openprocessing.org/sketch/2594141
// License: see the original OpenProcessing page

Drop[] drops = new Drop [70];  //creates 70 falling characters

void setup(){
  frameRate(30);
  size(640, 360);
    for (int i = 0; i < drops.length; i++) {
      drops[i] = new Drop(); 
      //creates the objects i think? haha 
      // I should've written the comments while I coded and not 3 days later oops
  }
}

void draw() {
  background(0);
   for (int i = 0; i < drops.length; i++) {
      drops[i].fall();  // moves the character
      drops[i].show();  //draws the caracter
  }
}

String[] letters = { // defines an array of character strings
  "a",
  "b",
  "c",
  "d",
  "e",
  "f","}",
  "g",
  "v","&",
  "b",
  "j","}",
  "y",
  "5","?",
  "3",
  "8",
  "@",
  "!",
  "''",
  "#",
  ")",
  ")",
  "=",
  "?",
  "8",
  "9",
};

//creating the class for the falling characters, defining variables
class Drop {
  
 float x = random(width);;
 // x-position of characters
 float y = random(-400,-50);
 // starting y-position of characters off screen, randomized for illusion of being created at different times
 float ySpeed = random(2, 4);
 // varying falling speed of characters
 float siz = random(20,30);
 // size of characters
 float viz = 255;
 // transperancy of characters, fully matte at the beginning
 int index = int(random(letters.length));
 // when an object is created the object is assigned an index at random from corresponding to the letters array
 
 
 //function that moves the characters downwards and makes them smaller and more transparent the lower they get
 void fall(){
   y = y + ySpeed;  
   siz = siz-0.005;
   viz = viz-1;
   
   // moves the characters to the top and resets their size and visibility if they fall off screen
   if (y > height+50) {
     y = random(-400,-50);
     siz = random(10,30);
     viz = 255;
   }
   
   // moves the characters to the top and resets their size and visibility if they get too small
   if (siz < 1) {
     y = random(-400,-50);
     siz = random(20,30);
     viz = 255;
   }
 }
 
// constructor, draws the characters
 void show() {
   
  textSize(siz);
  fill(0,255,0, viz);
   text(letters[index], x, y);
 }
  
}
