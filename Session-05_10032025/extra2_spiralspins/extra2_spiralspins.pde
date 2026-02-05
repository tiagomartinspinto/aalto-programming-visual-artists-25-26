void setup() {
  size(600, 600);            // Set the canvas size to 600x600 pixels
  frameRate(60);             // Set frame rate for smooth animation
  noFill();                  // No fill for the spiral shape, only outlines
  colorMode(HSB, 360, 100, 100); // Use HSB color mode (Hue, Saturation, Brightness)
}

void draw() {
  background(0);             // Black background for contrast
  translate(width / 2, height / 2);  // Move the origin to the center

  // Calculate a rotation offset based on the frame count
  float rotationOffset = radians(frameCount % 360);
  
  // Draw the colorful hypnotic spiral with the current rotation offset
  drawColoredSpiral(rotationOffset);
}

// Function to draw a hypnotic spiral with a changing color gradient
// offset: rotates the spiral over time for a dynamic effect
void drawColoredSpiral(float offset) {
  strokeWeight(2);           // Set line thickness
  float maxRadius = min(width, height) / 2;  // Determine the maximum radius
  
  // Begin drawing a continuous line for the spiral
  beginShape();
  
  // Loop through angles to draw multiple turns of the spiral (10 rotations)
  for (float angle = 0; angle < TWO_PI * 10; angle += 0.1) {
    // Map the angle to a radius that grows as the angle increases
    float r = map(angle, 0, TWO_PI * 10, 0, maxRadius);
    
    // Convert polar coordinates to Cartesian coordinates, applying the rotation offset
    float x = r * cos(angle + offset);
    float y = r * sin(angle + offset);
    
    // Map the current angle to a hue value between 0 and 360 for the color gradient
    float hueValue = map(angle, 0, TWO_PI * 10, 0, 360);
    stroke(hueValue, 80, 100);  // Set the stroke color using the hue, with fixed saturation and brightness
    
    // Add the vertex to the shape
    vertex(x, y);
  }
  
  // Finish drawing the shape
  endShape();
}