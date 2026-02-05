//this code is a combination of audio input and image manipulation
//the image is loaded and the audio input is used to manipulate the image
//the audio input is analyzed using FFT and the bass, mid and treble frequencies are extracted
//these frequencies are then mapped to RGB values which are used to tint the image
//the image is displayed on the canvas and the extracted frequencies are displayed as text

let img;
let mic;
let fft;

function preload() {
  // Load the image (ensure "aalto.jpg" is in your project folder)
  img = loadImage('assets/aalto.jpg');
}

function setup() {
  createCanvas(800, 600);
  
  // Create and start the microphone input
  mic = new p5.AudioIn();
  mic.start();
  
  // Create an FFT object with smoothing 0.8 and 512 bins
  fft = new p5.FFT(0.8, 512);
  fft.setInput(mic);
}

function draw() {
  background(0);
  
  // Perform FFT analysis and obtain the frequency spectrum
  let spectrum = fft.analyze();
  
  // Extract specific frequency values from chosen indices
  let bass = spectrum[5];   // Low-frequency (bass) intensity
  let mid = spectrum[20];   // Mid-frequency intensity
  let treble = spectrum[40]; // High-frequency (treble) intensity
  
  // Map the extracted frequencies to RGB color values.
  // Note: p5.FFT returns values from 0-255, so these mappings might need adjustment.
  let r = map(bass, 0, 10, 100, 255);
  let g = map(mid, 0, 10, 100, 255);
  let bVal = map(treble, 0, 10, 100, 255);
  
  // Apply the tint to the image based on the mapped RGB values
  tint(r, g, bVal);
  image(img, 0, 0, width, height);
  
  // Remove tint for drawing text
  noTint();
  
  // Display debugging information
  fill(255);
  textSize(18);
  text("Mic Level: " + nf(mic.getLevel(), 0, 4), 20, 30);
  text("Bass: " + nf(bass, 0, 2), 20, 60);
  text("Mid: " + nf(mid, 0, 2), 20, 90);
  text("Treble: " + nf(treble, 0, 2), 20, 120);
  text("Mapped R: " + int(r), 20, 160);
  text("Mapped G: " + int(g), 20, 190);
  text("Mapped B: " + int(bVal), 20, 220);
}