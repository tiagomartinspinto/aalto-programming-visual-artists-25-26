void setup() {
  fullScreen(); // Set the window to fullscreen mode
  // size(800, 600);  // Optional window size setting
  
  // Initialize particles with a 20% chance of following the mouse
  for (int i = 0; i < numParticles; i++) {
    boolean followMouse = random(1) < 0.2;
    particles.add(new Particle(followMouse));
  }
  
  lastMouseMove = millis(); // Store the current time as the last mouse movement time
  background(0); // Set background color to black
  textFont(createFont("Arial", 20)); // Set default font for rendering text
}
void draw() {
  background(0); // Clear the screen each frame
  
  // Update and display each particle
  for (Particle particle : particles) {
    particle.update();
    particle.show();
  }
}

// Update the last mouse movement time when the mouse moves
void mouseMoved() {
  lastMouseMove = millis();
}

// Trigger an explosion effect when the mouse is clicked
void mouseClicked() {
  explosionActive = true;
  explosionStart = millis(); // Record the start time of the explosion
  for (Particle particle : particles) {
    PVector explosionForce = PVector.random2D().mult(5); // Generate a random force
    particle.vel.add(explosionForce); // Apply the explosion force to each particle
  }
}

// Particle class to represent individual animated elements
class Particle {
  PVector pos, vel, acc; // Position, velocity, and acceleration vectors
  float size; // Size of the particle
  int[] colour; // RGB color of the particle
  float opacity; // Opacity of the particle
  boolean followMouse; // Determines if the particle follows the mouse
  boolean stuck; // Whether the particle is "stuck" near the mouse
  char character; // Character representation of the particle
  
  // Constructor to initialize particle properties
  Particle(boolean followMouse) {
    this.pos = new PVector(random(width), random(height)); // Random starting position
    this.vel = new PVector(0, 0); // Initial velocity set to zero
    this.acc = new PVector(0, 0); // Initial acceleration set to zero
    this.size = random(12, 24); // Random particle size between 12 and 24
    this.colour = new int[]{(int) random(255), (int) random(255), (int) random(255)}; // Random RGB color
    this.opacity = random(100, 255); // Random opacity
    this.followMouse = followMouse; // Set follow behavior
    this.stuck = false; // Initially not stuck
    
    // Choose a random character from a predefined set
    String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";
    this.character = chars.charAt((int) random(chars.length()));
  }
  
  // Update the particle's movement and behavior
  void update() {
    // Handle explosion behavior
    if (explosionActive && (millis() - explosionStart < 1000)) {
      pos.add(vel); // Continue moving in the explosion direction
      wrapEdges(); // Wrap around screen edges
      return; // Exit the function early
    } else if (explosionActive && (millis() - explosionStart >= 1000)) {
      explosionActive = false; // End explosion after 1 second
    }
    
    acc.mult(0); // Reset acceleration each frame
    boolean inactive = millis() - lastMouseMove > 7500; // Check if the mouse has been inactive

    if (followMouse) { // Behavior for particles that follow the mouse
      if (inactive) { // If the mouse has been inactive, "stick" to the mouse
        stuck = true;
        PVector mouse = new PVector(mouseX, mouseY);
        PVector dir = PVector.sub(mouse, pos); // Direction towards the mouse
        dir.mult(0.05); // Scale down movement speed
        acc.add(dir); // Apply attraction force
      } else { // If the mouse is active
        if (stuck) { // If previously stuck, "release" the particle with an explosion effect
          PVector explosion = PVector.random2D().mult(5);
          vel.add(explosion);
          stuck = false; // No longer stuck
        }
        // Apply Perlin noise movement
        float noiseScale = 0.005;
        float angle = noise(pos.x * noiseScale, pos.y * noiseScale, millis() * 0.001) * TWO_PI * 4;
        PVector noiseVec = new PVector(cos(angle), sin(angle));
        acc.add(noiseVec); // Apply random movement
      }
    } else { // Behavior for particles that do not follow the mouse
      float noiseScale = 0.005;
      float angle = noise(pos.x * noiseScale, pos.y * noiseScale, millis() * 0.001) * TWO_PI * 4;
      PVector noiseVec = new PVector(cos(angle), sin(angle));
      acc.add(noiseVec); // Apply Perlin noise movement
    }
    
    vel.add(acc); // Update velocity based on acceleration
    vel.limit(2); // Limit maximum speed
    pos.add(vel); // Update position
    wrapEdges(); // Ensure particles wrap around screen edges
  }
  
  // Ensure particles wrap around screen edges
  void wrapEdges() {
    if (pos.x > width) pos.x = 0;
    if (pos.x < 0) pos.x = width;
    if (pos.y > height) pos.y = 0;
    if (pos.y < 0) pos.y = height;
  }
  
  // Render the particle on the screen
  void show() {
    fill(colour[0], colour[1], colour[2], opacity); // Set fill color with opacity
    textSize(size); // Set text size
    textAlign(CENTER, CENTER); // Center align the text
    text(character, pos.x, pos.y); // Draw the character at the particle position
  }
}