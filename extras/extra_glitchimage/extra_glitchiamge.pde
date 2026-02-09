// Declare a global PImage variable to store the image
PImage img;

// Declare a global integer to keep track of the vertical position in the image
int y = 0;

// Declare a global integer to define the size of the swapped image blocks
int size = 5;

void settings() {
  size(800, 600);  // Set the canvas size to a fixed 800x600 pixels
}

void setup() {
  // Load the image from file (make sure "aalto.jpg" is in the sketch's data folder)
  img = loadImage("aalto.jpg");

  // Resize the image to fit exactly into the canvas size (800x600)
  img.resize(width, height);

  // Display the resized image on the canvas at position (0,0)
  image(img, 0, 0);
}

void draw() {
  // Iterate through the image horizontally, swapping small square blocks
  for (int x = 0; x < width - size * 2; x += size * 2) {
    // Extract two adjacent square blocks from the image
    PImage subImg = img.get(x, y, size, size);      // Left block
    PImage subImg2 = img.get(x + size, y, size, size); // Right block

    // Swap the positions of the extracted blocks in the image
    img.set(x + size, y, subImg);
    img.set(x, y, subImg2);
  }
  
  // Redraw the entire modified image to the canvas
  image(img, 0, 0);

  // Move to the next row of pixels for the next iteration
  y += size;

  // Reset if the swapping reaches the bottom of the image
  if (y > height - size) {
    y = 0;  // Restart from the top

    // Randomize the block size for the next full pass (between 5 and 50 pixels)
    size = int(random(5, 50));
  }
}
