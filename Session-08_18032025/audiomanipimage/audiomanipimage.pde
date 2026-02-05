// Import necessary libraries for audio processing and frequency analysis
import ddf.minim.*;
import ddf.minim.analysis.*;

// Declare a PImage variable to hold the image
PImage img;

// Declare Minim object for audio input
Minim minim;

// Declare an AudioInput object to capture microphone input
AudioInput mic;

// Declare an FFT (Fast Fourier Transform) object for frequency analysis
FFT fft;

void setup() {
  size(800, 600); // Set the canvas size to 800x600 pixels

  // Load an image from the "data" folder. Ensure "your_image.jpg" exists there.
  img = loadImage("aalto.jpg");

  // Initialize Minim library (required for audio processing)
  minim = new Minim(this);
  
  // Capture live audio input from the microphone
  // MONO mode (single channel), with a buffer size of 512 samples
  mic = minim.getLineIn(Minim.MONO, 512);

  // Initialize FFT (Fast Fourier Transform) object
  // This analyzes the frequency components of the audio input
  fft = new FFT(mic.bufferSize(), mic.sampleRate());
}

void draw() {
  background(0); // Clear the background (set it to black)

  // Perform FFT analysis on the live audio input
  fft.forward(mic.mix);

  // Extract specific frequency bands from the FFT analysis:
  float bass = fft.getBand(5);   // Get low-frequency (bass) intensity
  float mid = fft.getBand(20);   // Get mid-frequency intensity
  float treble = fft.getBand(40); // Get high-frequency (treble) intensity

  // Map the extracted frequencies to RGB color values:
  float r = map(bass, 0, 10, 100, 255);  // Map bass levels to RED intensity
  float g = map(mid, 0, 10, 100, 255);   // Map mid-range levels to GREEN intensity
  float b = map(treble, 0, 10, 100, 255); // Map treble levels to BLUE intensity

  // Apply a tint to the image based on the calculated RGB values
  tint(r, g, b);

  // Display the image on screen with the applied tint effect
  image(img, 0, 0, width, height);
  
  // =========================
  // Display Debug Information on Canvas
  // =========================
  fill(255); // Set text color to white
  textSize(18);

  // Show microphone input level
  text("Mic Level: " + nf(mic.mix.level(), 0, 4), 20, 30);

  // Show raw frequency values
  text("Bass: " + nf(bass, 0, 2), 20, 60);
  text("Mid: " + nf(mid, 0, 2), 20, 90);
  text("Treble: " + nf(treble, 0, 2), 20, 120);

  // Show mapped RGB values
  text("Mapped R: " + int(r), 20, 160);
  text("Mapped G: " + int(g), 20, 190);
  text("Mapped B: " + int(b), 20, 220);
}