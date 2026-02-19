// Session 2 Extra Exercise
// Smooth follow vs smooth wander (press SPACE to toggle)

float circleX, circleY;
float targetX, targetY;

int circleSize = 50;
float easingAmount = 0.08;

boolean isWandering = false;

void setup() {
  size(800, 600);
  
  // Start in center
  circleX = width / 2;
  circleY = height / 2;
  targetX = circleX;
  targetY = circleY;
}

void draw() {
  background(0);

  if (isWandering) {
    // Change target every 40 frames (not every frame!)
    if (frameCount % 40 == 0) {
      targetX = random(circleSize/2, width - circleSize/2);
      targetY = random(circleSize/2, height - circleSize/2);
    }
  } else {
    // Follow mouse
    targetX = mouseX;
    targetY = mouseY;
  }

  // Easing motion
  circleX += (targetX - circleX) * easingAmount;
  circleY += (targetY - circleY) * easingAmount;

  // Color based on position (clear mapping)
  float r = map(circleX, 0, width, 0, 255);
  float g = map(circleY, 0, height, 0, 255);
  fill(r, g, 200);

  ellipse(circleX, circleY, circleSize, circleSize);
}

void keyPressed() {
  // Toggle mode when SPACE is pressed
  if (key == ' ') {
    isWandering = !isWandering;
  }
}