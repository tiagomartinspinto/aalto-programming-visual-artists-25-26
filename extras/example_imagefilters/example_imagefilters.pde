PImage img; // Image object to store the processed image
PImage originalImg; // Image object to store the original image for resets

void setup() {
  size(800, 600); // Set the size of the sketch window
  
  // Load the image from the data folder
  img = loadImage("aalto.jpg");
  
  // Resize the image to match the window dimensions
  img.resize(width, height);
  
  // Store a copy of the original image for reset purposes
  originalImg = img.copy();
}

void draw() {
  background(0); // Clear the background with black
  image(img, 0, 0); // Display the current image
}

// Function to invert the colors of an image
void invertImage(PImage img) {
  img.loadPixels(); // Load pixel data for manipulation
  for (int i = 0; i < img.pixels.length; i++) {
    color c = img.pixels[i]; // Get the current pixel color
    img.pixels[i] = color(255 - red(c), 255 - green(c), 255 - blue(c)); // Invert RGB values
  }
  img.updatePixels(); // Update the image with modified pixel data
}

// Function to convert an image to grayscale
void grayscaleImage(PImage img) {
  img.loadPixels(); // Load pixel data for manipulation
  for (int i = 0; i < img.pixels.length; i++) {
    color c = img.pixels[i]; // Get the current pixel color
    float avg = (red(c) + green(c) + blue(c)) / 3; // Compute average brightness
    img.pixels[i] = color(avg, avg, avg); // Assign grayscale value
  }
  img.updatePixels(); // Update the image with modified pixel data
}

// Function to apply a threshold effect to an image
void thresholdImage(PImage img, float threshold) {
  img.loadPixels(); // Load pixel data for manipulation
  for (int i = 0; i < img.pixels.length; i++) {
    color c = img.pixels[i]; // Get the current pixel color
    float brightness = (red(c) + green(c) + blue(c)) / 3; // Compute brightness level
    img.pixels[i] = brightness > threshold * 255 ? color(255) : color(0); // Apply thresholding
  }
  img.updatePixels(); // Update the image with modified pixel data
}

// Function to apply a blur effect to an image
void blurImage(PImage img) {
  img.filter(BLUR, 6); // Apply a blur filter with intensity 6
}

// Function to handle key presses for applying effects
void keyPressed() {
  if (key == 'i' || key == 'I') {
    invertImage(img); // Apply color inversion effect
  }
  if (key == 'b' || key == 'B') {
    blurImage(img); // Apply blur effect
  }
  if (key == 'g' || key == 'G') {
    grayscaleImage(img); // Convert image to grayscale
  }
  if (key == 't' || key == 'T') {
    thresholdImage(img, 0.5); // Apply threshold effect with a default threshold of 0.5
  }
  if (key == 'r' || key == 'R') {
    img = originalImg.copy(); // Reset to the original image
  }
}