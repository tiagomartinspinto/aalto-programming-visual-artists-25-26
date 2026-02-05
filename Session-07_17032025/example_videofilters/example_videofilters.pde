import processing.video.*;

// Declare a Movie object to handle video playback
Movie video;

// Boolean flags to toggle different video effects
boolean invertEffect = false;
boolean grayscaleEffect = false;
boolean thresholdEffect = false;
boolean blurEffect = false;

void setup() {
  size(800, 600); // Set the size of the sketch window
  
  // Load the video file from the data folder
  video = new Movie(this, "test.mp4");
  
  // Start looping the video infinitely
  video.loop();
}

void draw() {
  background(0); // Clear the background to black

  // Check if new video frame is available
  if (video.available()) {
    video.read(); // Read the next frame
    video.loadPixels(); // Load pixel data for processing
  }

  // Ensure the video has loaded before processing
  if (video.width > 0 && video.height > 0) {
    PImage frame = video.get(); // Extract the current frame as an image
    frame.resize(width, height); // Resize the frame to match the canvas size

    // Apply selected effects based on boolean flags
    if (invertEffect) {
      invertVideo(frame);
    }
    if (grayscaleEffect) {
      grayscaleVideo(frame);
    }
    if (thresholdEffect) {
      thresholdVideo(frame, 0.5); // Apply threshold with a default value of 0.5
    }
    if (blurEffect) {
      frame.filter(BLUR, 6); // Apply a blur filter with intensity 6
    }

    image(frame, 0, 0); // Draw the processed video frame onto the canvas
  }
}

// Event handler for when the movie reaches the end
void movieEvent(Movie m) {
  m.read(); // Read the new frame
  
  // If the video reaches near its end, restart from the beginning
  if (m.time() >= m.duration() - 0.1) {
    m.jump(0); // Jump to the start of the video
    m.play(); // Restart video playback
  }
}

// Function to invert the colors of the video frame
void invertVideo(PImage img) {
  img.loadPixels(); // Load pixel data
  for (int i = 0; i < img.pixels.length; i++) {
    color c = img.pixels[i]; // Get current pixel color
    img.pixels[i] = color(255 - red(c), 255 - green(c), 255 - blue(c)); // Invert RGB values
  }
  img.updatePixels(); // Update the image with modified pixel data
}

// Function to convert the video frame to grayscale
void grayscaleVideo(PImage img) {
  img.loadPixels(); // Load pixel data
  for (int i = 0; i < img.pixels.length; i++) {
    color c = img.pixels[i]; // Get current pixel color
    float avg = (red(c) + green(c) + blue(c)) / 3; // Compute average brightness
    img.pixels[i] = color(avg, avg, avg); // Assign grayscale value
  }
  img.updatePixels(); // Update the image with modified pixel data
}

// Function to apply a threshold effect on the video frame
void thresholdVideo(PImage img, float threshold) {
  img.loadPixels(); // Load pixel data
  for (int i = 0; i < img.pixels.length; i++) {
    color c = img.pixels[i]; // Get current pixel color
    float brightness = (red(c) + green(c) + blue(c)) / 3; // Compute brightness level
    img.pixels[i] = brightness > threshold * 255 ? color(255) : color(0); // Apply thresholding
  }
  img.updatePixels(); // Update the image with modified pixel data
}

// Function to handle key presses for toggling effects
void keyPressed() {
  if (key == 'i' || key == 'I') {
    invertEffect = !invertEffect; // Toggle invert effect
    println("Invert!");
  }
  if (key == 'b' || key == 'B') {
    blurEffect = !blurEffect; // Toggle blur effect
    println("Blur!");
  }
  if (key == 'g' || key == 'G') {
    grayscaleEffect = !grayscaleEffect; // Toggle grayscale effect
    println("Gray!");
  }
  if (key == 't' || key == 'T') {
    thresholdEffect = !thresholdEffect; // Toggle threshold effect
    println("Threshold!");
  }
}
