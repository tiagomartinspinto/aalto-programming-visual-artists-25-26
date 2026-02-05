float baseLength = 120;

void setup() {
  size(600, 600);  // Set the canvas size to 600x600 pixels
}

void draw() {
  background(255);  // Clear the canvas with a white background
  
  // Calculate a dynamic angle for a smooth swaying effect.
  // The sine function oscillates over time, altering the angle between approximately 10 and 40 degrees.
  float dynamicAngle = radians(25 + sin(frameCount * 0.05) * 15);
  
  // ---------------------------
  // Draw the tree at the bottom (green tree)
  // ---------------------------
  pushMatrix();  // Save the current transformation matrix
  translate(width / 2, height);  // Move the origin to the bottom center of the canvas
  stroke(0, 150, 0); // Set the stroke color to green
  branch(baseLength, dynamicAngle);  // Draw the recursive tree
  popMatrix();  // Restore the transformation matrix to its previous state
  
  // ---------------------------
  // Draw the tree at the top (red tree)
  // ---------------------------
  pushMatrix();  // Save the current transformation matrix
  translate(width / 2, 0);  // Move the origin to the top center of the canvas
  rotate(PI);  // Rotate the canvas 180° so the tree grows downward
  stroke(150, 0, 0); // Set the stroke color to red
  branch(baseLength, dynamicAngle);  // Draw the recursive tree
  popMatrix();  // Restore the transformation matrix to its previous state
}

// Recursive function to draw a branch of the tree
// Each call draws a branch and then recursively draws two smaller branches on either side.
void branch(float len, float angle) {
  // Draw the current branch as a line from (0, 0) to (0, -len)
  line(0, 0, 0, -len);
  
  // Move the origin to the end of the current branch
  translate(0, -len);
  
  // Base case: stop recursion when the branch is too short
  if (len > 10) {
    // ---------------------------
    // Draw the right branch
    // ---------------------------
    pushMatrix();  // Save the current transformation state
    rotate(angle);  // Rotate to the right by the dynamic angle
    branch(len * 0.67, angle);  // Recursively draw the right branch with reduced length
    popMatrix();  // Restore the transformation state
    
    // ---------------------------
    // Draw the left branch
    // ---------------------------
    pushMatrix();  // Save the current transformation state
    rotate(-angle);  // Rotate to the left by the dynamic angle
    branch(len * 0.67, angle);  // Recursively draw the left branch with reduced length
    popMatrix();  // Restore the transformation state
  }
}