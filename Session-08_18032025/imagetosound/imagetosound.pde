// Import the Processing Sound library
import processing.sound.*;

// Declare a SoundFile object (not used in this example, but can be for playback)
SoundFile sound;

// Declare a sine wave oscillator for generating sound
SinOsc osc;

void setup() {
  // Set up the window size
  size(400, 400);
  
  // Load an image from the "data" folder (make sure the file exists)
  PImage img = loadImage("aalto.jpg");
  
  // Load pixel data into memory for faster processing
  img.loadPixels();
  
  // Initialize the sine wave oscillator
  osc = new SinOsc(this);
  
  // Set the amplitude (volume) of the sine wave (0.0 - 1.0)
  osc.amp(0.5);
  
  // Start playing the oscillator (we will change its frequency dynamically)
  osc.play();
  
  // Choose a specific column in the image to scan (middle column)
  int x = width / 2;  
  
  // Loop through all the pixels in this column (from top to bottom)
  for (int y = 0; y < img.height; y++) {
    
    // Get the brightness of the pixel at position (x, y)
    float brightness = brightness(img.pixels[y * img.width + x]);  
    
    // Map the brightness value (0-255) to a sound frequency (100Hz - 2000Hz)
    float freq = map(brightness, 0, 255, 100, 2000);  
    
    // Set the oscillator frequency to the mapped frequency
    osc.freq(freq);
    
    // Wait for a short time before moving to the next pixel
    // This creates a "scanning" effect similar to reading an image over time
    delay(50);  
  }
}
