import processing.video.*;  // Import Processing video library

// Declare video object
Movie video;

// Magnification settings
float zoomFactor = 2.0; // Magnification level (higher = more zoom)
int lensSize = 100; // Diameter of the magnifying glass

void setup() {
  size(800, 600);  // Set canvas size
  video = new Movie(this, "test.mp4");  // Load the video file
  video.loop();  // Ensure the video loops forever
}

void draw() {
  background(0); // Clear background before drawing

  // Check if a new video frame is available
  if (video.available()) {
    video.read();  // Read the next frame from the video
  }

  // Ensure video is loaded before drawing (prevents errors)
  if (video.width > 0 && video.height > 0) {  
    PImage frame = video.get(); // Get the current video frame as an image
    frame.resize(width, height); // Resize the video to fit the canvas

    image(frame, 0, 0); // Display the video frame

    // Apply the magnifying glass effect at the mouse position
    applyMagnifyingEffect(frame, mouseX, mouseY, lensSize, zoomFactor);
  }
}

// **Function: Applies a magnifying glass effect to the video**
void applyMagnifyingEffect(PImage img, int x, int y, int size, float zoom) {
  // Create a new image to store the zoomed area
  PImage zoomed = createImage(size, size, ARGB); // ARGB allows transparency
  zoomed.loadPixels();

  // Loop through each pixel in the magnified area
  for (int i = 0; i < zoomed.pixels.length; i++) {
    int px = i % size;  // Get x-coordinate in the zoomed image
    int py = i / size;  // Get y-coordinate in the zoomed image

    // Calculate the corresponding pixel in the original video
    float srcX = x + (px - size / 2) / zoom;
    float srcY = y + (py - size / 2) / zoom;

    // Check if the calculated source pixel is within the video bounds
    if (srcX >= 0 && srcX < img.width && srcY >= 0 && srcY < img.height) {
      zoomed.pixels[i] = img.pixels[(int)srcY * img.width + (int)srcX]; // Copy pixel from video
    } else {
      zoomed.pixels[i] = color(0, 0); // Transparent pixels outside video bounds
    }
  }
  zoomed.updatePixels(); // Apply changes to the zoomed image

  // Apply a circular mask to create a magnifying glass effect
  maskCircle(zoomed);

  // Draw the magnified area at the correct position
  image(zoomed, x - size / 2, y - size / 2);
}

// **Function: Masks an image into a perfect circle**
void maskCircle(PImage img) {
  img.loadPixels();  // Load pixels for editing
  int w = img.width;
  int h = img.height;
  int radius = min(w, h) / 2; // Set radius to fit within the image

  // Loop through each pixel and check if it's inside the circle
  for (int i = 0; i < img.pixels.length; i++) {
    int px = i % w;  // Get x-coordinate in the image
    int py = i / w;  // Get y-coordinate in the image
    float distToCenter = dist(px, py, w / 2, h / 2); // Distance to center

    // If the pixel is outside the circular area, make it transparent
    if (distToCenter > radius) {
      img.pixels[i] = color(0, 0, 0, 0); // Fully transparent
    }
  }
  img.updatePixels(); // Apply transparency
}

// **Function: Ensures video restarts when it reaches the end**
void movieEvent(Movie m) {
  m.read(); // Read next frame
  if (m.time() >= m.duration() - 0.1) {  // Check if video is near the end
    m.jump(0); // Restart the video from the beginning
    m.play(); // Resume playback
  }
}