//this code is based on the example provided by p5.js library
//https://p5js.org/reference/#/p5.FFT
//it shows the frequency bands of an audio file using the Fast Fourier Transform (FFT) algorithm
//the audio file is loaded from the assets folder
//the frequency bands are displayed as rectangles with varying heights and colors
//the height of each rectangle is determined by the amplitude of the corresponding frequency band
//the color of each rectangle is determined by the hue and brightness values calculated based on the amplitude


let player;
let fft;
let bands = 64;

function preload() {
  // Load the audio file (ensure "sample.mp3" is in your project folder "assets")
  player = loadSound("assets/sample.mp3");
}

function setup() {
  createCanvas(800, 400);
  // Start playing the audio file
  player.play();
  
  // Create an FFT object with a smoothing factor of 0.8 and 64 frequency bins.
  fft = new p5.FFT(0.8, bands);
  fft.setInput(player);
}

function draw() {
  background(0);
  
  // Analyze the current audio frame; this returns an array of amplitudes for each frequency bin.
  let spectrum = fft.analyze();
  
  // Use HSB color mode with a max of 255 for each channel.
  colorMode(HSB, 255);
  
  for (let i = 0; i < bands; i++) {
    // Get the amplitude for the current band.
    let amplitude = spectrum[i];
    
    // Map the current band index to an x-coordinate (leaving margins at left/right).
    let x = map(i, 0, bands, 50, width - 50);
    
    // Map the amplitude (0 to 100) to a rectangle height.
    // Note: p5.FFT values range up to 255, so you may adjust the mapping range as needed.
    let h = map(amplitude, 0, 100, 2, height - 50);
    
    // Calculate a hue value that transitions smoothly across frequency bands.
    let hueValue = map(i, 0, bands, 0, 255);
    // Map amplitude to brightness for a dynamic effect.
    let brightnessValue = map(amplitude, 0, 100, 50, 255);
    
    fill(hueValue, 255, brightnessValue);
    // Draw the rectangle for this frequency band.
    rect(x, height - h, width / bands - 2, h);
  }
}