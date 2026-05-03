// Assignment 2 - Alina
// Mirrored from OpenProcessing sketch 2582351.
// Original: https://openprocessing.org/sketch/2582351
// License: see the original OpenProcessing page

float waveSpeed = 0.02;
float waveAmplitude = 100;
float waveFrequency = 0.5;

void setup() {
  size(600, 400);
  smooth();
}

void draw() {
  background(0);
  float time = frameCount * waveSpeed;

  for (float x = 0; x < width; x += 20) {
    float y1 = height / 2 + sin(x * waveFrequency + time) * waveAmplitude;
    float y2 = height / 2 + cos(x * waveFrequency * 0.8 + time * 1.2) * waveAmplitude * 0.8;
    float y = (y1 + y2) / 2;

    pushMatrix();
    translate(x, y);
    drawStar(0, 0, 9, 4, 5);
    popMatrix();
  }
}

// Function to manually draw a star
void drawStar(float x, float y, float outerRadius, float innerRadius, int points) {
  float angleStep = TWO_PI / (points * 2);
  fill(255);
  noStroke();
  beginShape();
  for (int i = 0; i < points * 2; i++) {
    float angle = angleStep * i;
    float radius = (i % 2 == 0) ? outerRadius : innerRadius;
    float sx = x + cos(angle) * radius;
    float sy = y + sin(angle) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
