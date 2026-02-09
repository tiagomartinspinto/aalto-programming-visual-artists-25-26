// Minimalistic Fractal Line Art with Randomized Shapes

// Fractal Tree & Fractal Birds: Function-Based Modular Artwork
// This sketch uses two custom functions to generate visual elements:
// 1. drawFractalTree() – draws a fractal tree from the bottom center.
// 2. drawFractalBird() – draws a fractal bird (a pair of recursive wing branches) in the sky.

void setup() {
  size(800, 800);
  background(255);   // Clean white background
  stroke(0);         // Black strokes for minimalistic line art
  noFill();
  
  // --- Draw the Fractal Tree ---
  pushMatrix();
  // Position the tree at the bottom center of the canvas.
  translate(width / 2, height);
  drawFractalTree(200, PI / 2, 8); // Initial branch length, upward angle, and recursion depth
  popMatrix();
  
  // --- Draw Fractal Birds in the Sky ---
  // We'll draw a few fractal birds in the upper portion of the canvas.
  int birdCount = 3;
  for (int i = 0; i < birdCount; i++) {
    pushMatrix();
    // Choose a random position in the upper part of the canvas.
    float x = random(100, width - 100);
    float y = random(50, 300);
    translate(x, y);
    // Draw a fractal bird with a base wing length and a recursion depth.
    drawFractalBird(40, 3);
    popMatrix();
  }
}

// ------------------------------------------------------------------
// Function: drawFractalTree
// Description: Recursively draws a fractal tree with randomized branching.
// Parameters:
//   length - the length of the current branch
//   angle  - the angle of the branch relative to the horizontal
//   depth  - recursion depth (stops when 0)
// ------------------------------------------------------------------
void drawFractalTree(float length, float angle, int depth) {
  if (depth == 0) return; // Base case
  
  pushMatrix();
  // Calculate the end point of the branch.
  float x2 = cos(angle) * length;
  float y2 = -sin(angle) * length;
  line(0, 0, x2, y2);
  // Move to the end of the branch.
  translate(x2, y2);
  
  // Randomize the number of branches (2 or 3)
  int branches = int(random(2, 4));
  for (int i = 0; i < branches; i++) {
    pushMatrix();
    // Randomize branch angle within ±45° and branch length
    float randomAngle = angle + random(-PI / 4, PI / 4);
    float randomLength = length * random(0.5, 0.8);
    drawFractalTree(randomLength, randomAngle, depth - 1);
    popMatrix();
  }
  popMatrix();
}

// ------------------------------------------------------------------
// Function: drawFractalBird
// Description: Recursively draws a minimalistic fractal bird (a pair of wings).
// The bird is rendered as two symmetric branches, each with recursive detail.
// Parameters:
//   wingLength - the base length for the bird's wing branch
//   depth      - recursion depth (stops when 0)
// ------------------------------------------------------------------
void drawFractalBird(float wingLength, int depth) {
  if (depth == 0) return;
  
  // Draw left wing branch.
  pushMatrix();
  rotate(-PI/6); // Tilt left wing upward
  line(0, 0, wingLength, 0);
  translate(wingLength, 0);
  drawFractalBird(wingLength * 0.7, depth - 1);
  popMatrix();
  
  // Draw right wing branch.
  pushMatrix();
  rotate(PI/6); // Tilt right wing upward
  line(0, 0, wingLength, 0);
  translate(wingLength, 0);
  drawFractalBird(wingLength * 0.7, depth - 1);
  popMatrix();
}