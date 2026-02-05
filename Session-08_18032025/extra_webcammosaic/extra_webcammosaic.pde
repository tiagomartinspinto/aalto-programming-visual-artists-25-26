import processing.video.*; // Import video library for webcam capture

Capture webcam; // Declare webcam capture object
int sizeX; // Width of each grid cell
int sizeY; // Height of each grid cell

void setup() {
  size(640, 480); // Set canvas size
  webcam = new Capture(this, 640, 480); // Initialize webcam capture with same size as canvas
  webcam.start(); // Start the webcam feed
  sizeX = width / 10; // Define width of each grid cell (1/10th of canvas width)
  sizeY = height / 10; // Define height of each grid cell (1/10th of canvas height)
}

void draw() {
  if (webcam.available()) { // Check if webcam feed is available
    webcam.read(); // Read the current frame from the webcam
  }
  
  // Loop through the canvas in a grid pattern
  for (int y = 0; y < height - sizeY; y += sizeY) {
    for (int x = 0; x < width - sizeX; x += sizeX) {
      // Generate a random offset for the sample position using Perlin noise and mouse position
      float camX = mouseX + map(noise(x, y), 0, 1, -50, 50);
      float camY = mouseY + map(noise(x + 100, y + 100), 0, 1, -50, 50);
      
      // Ensure sample positions stay within valid boundaries of the webcam feed
      camX = constrain(camX, 0, width - sizeX);
      camY = constrain(camY, 0, height - sizeY);
      
      // Extract a portion of the webcam feed at the calculated position
      PImage subVideo = webcam.get((int)camX, (int)camY, sizeX, sizeY);
      
      // Draw the extracted portion onto the corresponding grid position on the canvas
      image(subVideo, x, y);
    }
  }
}