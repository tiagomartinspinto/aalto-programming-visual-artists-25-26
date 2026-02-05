import processing.video.*; // Import video library for webcam capture

Capture capture; // Webcam capture object
int totalSlices = 16; // Number of slices, should be divisible by 4
float scaleAmt = 1.5; // Scale factor for filling the canvas

void setup() {
  size(600, 600); // Set the canvas size
  capture = new Capture(this, 600, 600); // Initialize webcam capture with resolution 600x600
  capture.start(); // Start capturing video
}

void draw() {
  if (capture.available()) { // Check if the webcam feed is available
    capture.read(); // Read the latest frame
  }
  
  background(255); // Set background color to white to clear previous frames
  int w = int(width / 3.2); // Define the width of the slice
  int h = int(height / 3.2); // Define the height of the slice
  
  // Create an off-screen graphics object to define a slice mask
  PGraphics selection_mask = createGraphics(w, h);
  selection_mask.beginDraw();
  selection_mask.noStroke();
  selection_mask.beginShape();
  selection_mask.arc(0, 0, 2 * w, 2 * h, 0, radians(370 / totalSlices + 0.1)); // Define slice shape
  selection_mask.endShape(CLOSE);
  selection_mask.endDraw();
  
  // Calculate the scaling ratio for selecting webcam slice based on mouse position
  float wRatio = float(width - w) / float(width);
  float hRatio = float(height - h) / float(height);
  
  // Ensure mouse values stay within valid bounds
  int mouseXClamped = constrain(mouseX, 0, width);
  int mouseYClamped = constrain(mouseY, 0, height);
  
  // Extract a slice of the webcam feed based on mouse position
  PImage slice = capture.get(int(mouseXClamped * wRatio), int(mouseYClamped * hRatio), w, h);
  slice.mask(selection_mask); // Apply the mask to the slice
  
  translate(width / 2, height / 2); // Move origin to the center of the canvas
  scale(scaleAmt); // Scale the entire pattern for a full canvas effect
  
  // Apply the slice in a circular pattern with mirroring effect
  for (int k = 0; k <= totalSlices; k++) {
    pushMatrix(); // Save transformation state
    rotate(k * radians(360 / (totalSlices / 2))); // Rotate the slice around the center
    image(slice, 0, 0); // Draw the slice
    scale(-1.0, 1.0); // Mirror the slice horizontally
    image(slice, 0, 0); // Draw the mirrored slice
    popMatrix(); // Restore previous transformation state
  }
}

// Key functions to adjust the number of slices dynamically and save the image
void keyPressed() {
  switch (keyCode) {
    case UP: // Increase number of slices when up arrow is pressed
      totalSlices = (totalSlices + 4) % 64;
      if (totalSlices == 0) totalSlices = 4; // Ensure minimum of 4 slices
      break;
    case DOWN: // Decrease number of slices when down arrow is pressed
      totalSlices = (totalSlices - 4) % 64;
      if (totalSlices == 0) totalSlices = 64; // Ensure maximum of 64 slices
      break;
    case 'S': // Save the kaleidoscope image when 'S' key is pressed
      saveFrame("kaleidoscope-####.jpg");
      break;
  }
}