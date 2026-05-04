// Assignment 1 - Anna L.
// Mirrored from OpenProcessing sketch 2564116.
// Original: https://openprocessing.org/sketch/2564116
// License: see the original OpenProcessing page

float ballX, ballY;  
float speedX, speedY;  
int ballSize = 50;  
color ballColor = color(255); 

void setup() {  
  size(500, 500); 
  noStroke();
  ballX = random(width);  
  ballY = random(height);  
  speedX = random(2, 5) * (random(1) > 0.5 ? 1 : -1);  
  speedY = random(2, 5) * (random(1) > 0.5 ? 1 : -1);  
}  

void draw() {  
  background(0, 10);  
  

  float d = dist(mouseX, mouseY, ballX, ballY);  
  if (d < ballSize / 2) {  
    ballColor = color(random(255), random(255), random(255));  
  }  
  
  fill(ballColor);  
  ellipse(ballX, ballY, ballSize, ballSize);  
  
  ballX += speedX;  
  ballY += speedY;  
 
  if (ballX > width - ballSize / 2 || ballX < ballSize / 2) {  
    speedX *= -1;  
  }  
  if (ballY > height - ballSize / 2 || ballY < ballSize / 2) {  
    speedY *= -1;  
  }  
    fill(255);         
    rect(mouseX, mouseY, 70, 70);

}
