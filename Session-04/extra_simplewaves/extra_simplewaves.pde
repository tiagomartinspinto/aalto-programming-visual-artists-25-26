// Variables to control wave motion
float waveSpeed = 0.05; // Speed of the wave movement
float waveAmplitude = 50; // Height (amplitude) of the wave
float waveFrequency = 0.1; // Spacing between wave peaks

void setup() {
  size(600, 400); // Canvas size
  background(0); // Set background color to black
}

void draw() {
  background(0); // Clear the canvas every frame for smooth animation
  stroke(255); // Set stroke color to white
  noFill(); // No fill inside the wave points

  float time = frameCount * waveSpeed; // Controls wave movement over time

  // Loop to create multiple points along the wave
  for (float x = 0; x < width; x += 20) { 
    // Calculate y-position using sine function
    float y = height / 2 + sin(x * waveFrequency + time) * waveAmplitude;

    // Draw a small circle at the calculated (x, y) position
    ellipse(x, y, 10, 10);
  }
}