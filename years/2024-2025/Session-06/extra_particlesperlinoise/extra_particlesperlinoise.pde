import java.util.ArrayList;  // Import ArrayList for dynamic storage of particles

// *****************************************
// Particle Class: Represents a single particle
// *****************************************
class Particle {
  PVector pos;      // Position of the particle
  PVector vel;      // Velocity of the particle (direction and speed)
  float noiseOffset;  // A unique offset to sample noise, making each particle move differently

  // Constructor: Initialize a particle with a starting position
  Particle(float x, float y) {
    pos = new PVector(x, y);      // Set initial position
    vel = new PVector(0, 0);        // Initial velocity is zero (will be updated by noise)
    noiseOffset = random(1000);     // Random offset for Perlin noise sampling
  }
  
  // Update method: Uses Perlin noise to influence movement direction
  void update() {
    // Calculate a noise value based on the particle's position and its unique offset.
    // Multiplying the position by a small factor (0.005) zooms out the noise field.
    float angle = noise(pos.x * 0.005, pos.y * 0.005, noiseOffset) * TWO_PI * 4;
    
    // Convert the noise-based angle into a velocity vector (using unit length)
    vel = PVector.fromAngle(angle);
    vel.mult(2);  // Scale the velocity to adjust speed
    
    // Update the particle's position by adding the velocity
    pos.add(vel);
    
    // Slowly change the noise offset over time to get evolving motion
    noiseOffset += 0.01;
    
    // Wrap around the screen edges for continuous flow
    if (pos.x < 0) pos.x = width;
    if (pos.x > width) pos.x = 0;
    if (pos.y < 0) pos.y = height;
    if (pos.y > height) pos.y = 0;
  }
  
  // Display method: Draw the particle as a small circle
  void display() {
    noStroke();                // No border around the particle
    fill(255, 150);            // White color with some transparency
    ellipse(pos.x, pos.y, 4, 4); // Draw the particle as a circle of size 4
  }
}

// *****************************************
// Global Variables and Setup
// *****************************************
ArrayList<Particle> particles; // A dynamic array to hold our particles

void setup() {
  size(600, 600);              // Set the canvas size
  particles = new ArrayList<Particle>(); // Initialize the ArrayList
  
  // Create a set number of particles with random starting positions
  for (int i = 0; i < 300; i++) {
    particles.add(new Particle(random(width), random(height)));
  }
  
  // Use a smooth background to create a trailing effect
  background(0);
}

void draw() {
  // Draw a translucent black rectangle to create a fading trail effect
  fill(0, 20);
  rect(0, 0, width, height);
  
  // Update and display each particle in the ArrayList
  for (Particle p : particles) {
    p.update();   // Move the particle based on Perlin noise
    p.display();  // Draw the particle on the screen
  }
}