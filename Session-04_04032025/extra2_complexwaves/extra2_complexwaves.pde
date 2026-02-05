// Variables to control wave motion
float waveSpeed = 0.03; // Speed of the wave movement
float waveAmplitude = 50; // Height of the first wave
float waveFrequency = 0.1; // Spacing between first wave's peaks

void setup() {
  size(600, 400); // Canvas size
  background(0); // Set background color to black
}

void draw() {
  background(0); // Clear canvas each frame for smooth animation
  stroke(255); // Set stroke color to white
  noFill(); // No fill inside the wave points

  float time = frameCount * waveSpeed; // Controls wave movement over time

  // Loop through x positions to generate multiple wave points
  for (float x = 0; x < width; x += 20) {
    
    // First sine wave calculation
    float y1 = height / 2 + sin(x * waveFrequency + time) * waveAmplitude;

    // Second cosine wave calculation (slightly different frequency and amplitude)
    float y2 = height / 2 + cos(x * waveFrequency * 0.8 + time * 1.2) * waveAmplitude * 0.8;

    // Average both waves to create an interference effect
    float y = (y1 + y2) / 2;

    // Draw a small circle at the (x, y) position
    ellipse(x, y, 10, 10);
  }
}