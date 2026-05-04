// Assignment 2 - Malhar
// Mirrored from OpenProcessing sketch 2582371.
// Original: https://openprocessing.org/sketch/2582371
// License: see the original OpenProcessing page

//this is code for a game of 3 player pong

//set the variables
float circleX, circleY;
float xSpeed = 3, ySpeed = 3;
int circleSize = 30;
boolean going = false;

//set the 4 paddles
float paddleWidth = 10, paddleHeight = 100;
float vertPaddleY, horiPaddleX;
float paddleSpeed = 50;

color ballColor;

//set the grid
int cols = 25;
int rows = 25;
float spacing;

//mouse interaction only occurs every 5 seconds
int lastHitTime = 0;

//choice to reset the game + spacing
void setup() {
  size(720, 480);
  spacing = (float) width / cols;
  resetGame();
}


void draw() {
  background(30);

  //draw grid + circle that follows
  for (int y = 0; y < rows + 10; y++) {
    for (int x = 0; x < cols + 10; x++) {
      float posX = x * spacing;
      float posY = y * spacing;

      if (mouseX > posX && mouseX < posX + spacing &&
        mouseY > posY && mouseY < posY + spacing) {
        fill(255);
      } else {
        fill(30);
      }

      ellipse(posX, posY, spacing, spacing);
    }
  }
  //mouse controlled circle
  float mouseCircleX = mouseX - spacing / 2;
  float mouseCircleY = mouseY - spacing / 2;
  fill(255, 100, 100, 150);
  ellipse(mouseCircleX, mouseCircleY, spacing, spacing);

  // Draw vertical paddles (left & right walls)
  fill(255, 0, 0);
  rect(0, vertPaddleY, paddleWidth, paddleHeight);
  rect(width - paddleWidth, vertPaddleY, paddleWidth, paddleHeight);

  // Draw horizontal paddles (top & bottom walls)
  fill(0, 255, 0);
  rect(horiPaddleX, 0, paddleHeight, paddleWidth);
  rect(horiPaddleX, height - paddleWidth, paddleHeight, paddleWidth);

  // Draw ball
  fill(ballColor);
  ellipse(circleX, circleY, circleSize, circleSize);

  // Move ball only if "going" is true
  if (going) {
    circleX += xSpeed;
    circleY += ySpeed;
  }

  // Ball collision with vertical paddles, with every collision the ball gets faster
  if (circleX - circleSize / 2 <= 0 || circleX + circleSize / 2 >= width) {
    if (circleY > vertPaddleY && circleY < vertPaddleY + paddleHeight) {
      xSpeed *= -1.1;
      changeColor();
    }
  }

  // Ball collision with horizontal paddles + moves faster
  if (circleY - circleSize / 2 <= 0 || circleY + circleSize / 2 >= height) {
    if (circleX > horiPaddleX && circleX < horiPaddleX + paddleHeight) {
      ySpeed *= -1.1;
      changeColor();
    }
  }
  //collision with circle
  if (millis() - lastHitTime > 5000) {
    if (circleX + circleSize / 2 > mouseCircleX &&
      circleX - circleSize / 2 < mouseCircleX + spacing &&
      circleY + circleSize / 2 > mouseCircleY &&
      circleY - circleSize / 2 < mouseCircleY + spacing) {

      // Reflect the ball naturally by reversing its direction
      if (abs(circleX - mouseX) > abs(circleY - mouseY)) {
        xSpeed *= -1;
      } else {
        ySpeed *= -1;
      }

      // Move ball slightly away to prevent glitching
      circleX += xSpeed * 2;
      circleY += ySpeed * 2;

      changeColor();
      lastHitTime = millis();
    }
  }
}

void keyPressed() {
  going = true; // Start ball movement when a key is pressed

  // Vertical paddle controls (I/K)
  if (key == 'i') vertPaddleY -= paddleSpeed;
  if (key == 'k') vertPaddleY += paddleSpeed;

  // Horizontal paddle controls (A/D)
  if (key == 'a') horiPaddleX -= paddleSpeed;
  if (key == 'd') horiPaddleX += paddleSpeed;
}

void changeColor() {
  ballColor = color(random(150, 255), random(50, 200), random(150, 255));
}

void mousePressed() {
  resetGame();
}

//setup everytime mouse is pressed
void resetGame() {
  circleX = width / 2;
  circleY = height / 2;

  xSpeed = random(-3, 3);
  ySpeed = random(-3, 3);

//prevents ball from moving too slow
  if (abs(xSpeed) < 1) {
    if (xSpeed > 0) {
      xSpeed = random(1, 3);
    } else {
      xSpeed = random(-1, -3);
    }
  }

  if (abs(ySpeed) < 1) {
    if (ySpeed > 0) {
      ySpeed = random(1, 3);
    } else {
      ySpeed = random(-1, -3);
    }
  }

//resets paddle positions
  vertPaddleY = height / 2 - paddleHeight / 2;
  horiPaddleX = width / 2 - paddleHeight / 2;

  ballColor = color(100, 200, 255);
  going = false;
  
  lastHitTime = 0;
}
