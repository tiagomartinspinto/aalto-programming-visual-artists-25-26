//this code is taken from the p5.js example
//https://editor.p5js.org/p5/sketches/Image:imagetosound
//I have made some changes to the code to make it work for my image
//I have used the image of Aalto University
//I have also changed the frequency range to 100-2000Hz
//I have also changed the delay to 50ms

let img;
let osc;
let scanY = 0; // current y-coordinate in the scan

function preload() {
  // Load the image from your project folder
  img = loadImage("aalto.jpg");
}

function setup() {
  createCanvas(400, 400);
  // Set color mode to HSB with maximum of 255 so that brightness() returns values 0–255.
  colorMode(HSB, 255);
  
  // Load the image pixels into memory
  img.loadPixels();
  
  // Create a sine wave oscillator (p5.SinOsc) and configure it
  osc = new p5.SinOsc();
  osc.amp(0.5);
  osc.start();
  
  // Start scanning the middle column of the image asynchronously
  scanColumn();
}

function scanColumn() {
  // Use the middle column of the image
  let x = floor(img.width / 2);
  
  // Ensure we don't go past the image height
  if (scanY < img.height) {
    // Get the color at the pixel in the middle column at vertical position scanY
    let c = img.get(x, scanY);
    // Compute brightness (with our HSB mode, brightness() returns 0–255)
    let bright = brightness(c);
    
    // Map brightness (0-255) to a frequency between 100Hz and 2000Hz
    let freq = map(bright, 0, 255, 100, 2000);
    osc.freq(freq);
    
    // Move to the next pixel after a 50ms delay
    scanY++;
    setTimeout(scanColumn, 50);
  }
}
