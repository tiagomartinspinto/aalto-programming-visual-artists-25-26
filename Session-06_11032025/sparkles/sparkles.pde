import java.util.ArrayList;  // Import the ArrayList class for dynamic arrays

// *****************************************
// Particle Class: Represents a single particle
// *****************************************
class Particle {
  PVector pos;       // Position of the particle (x, y)
  PVector vel;       // Velocity of the particle (direction and speed)
  float lifespan;    // Lifespan (opacity) of the particle
  
  // Constructor: Called when creating a new Particle object
  Particle(float x, float y) {
    pos = new PVector(x, y);        // Initialize the particle's position
    vel = PVector.random2D();       // Set a random direction for the velocity
    vel.mult(random(1, 3));         // Multiply the velocity by a random speed between 1 and 3
    lifespan = 255;                 // Set the initial lifespan (fully opaque)
  }
  
  // Update method: Changes the particle's state each frame
  void update() {
    pos.add(vel);   // Update the position by adding the velocity vector
    lifespan -= 2;  // Decrease the lifespan to simulate fading over time
  }
  
  // Display method: Draws the particle on the screen
  void display() {
    noStroke();                   // Remove any outline for a smooth look
    fill(255, lifespan);          // Set the fill color to white with current opacity (lifespan)
    ellipse(pos.x, pos.y, 8, 8);    // Draw an ellipse at the particle's position with width and height of 8
  }
  
  // Check if the particle has "died" (its lifespan has faded completely)
  boolean isDead() {
    return lifespan < 0;          // Return true if the lifespan is less than zero
  }
}

// **********************************************
// ParticleSystem Class: Manages a collection of particles
// **********************************************
class ParticleSystem {
  ArrayList<Particle> particles;  // Dynamic list to store particles
  PVector origin;                 // The origin point where particles are generated
  
  // Constructor: Creates a new particle system at a given (x, y) location
  ParticleSystem(float x, float y) {
    origin = new PVector(x, y);        // Set the origin point for the particle system
    particles = new ArrayList<Particle>(); // Initialize the dynamic array for particles
  }
  
  // addParticle method: Adds a new particle at the origin
  void addParticle() {
    particles.add(new Particle(origin.x, origin.y)); // Create and add a new Particle object
  }
  
  // run method: Updates and displays all particles, and removes dead ones
  void run() {
    addParticle(); // Continuously add a new particle for a constant effect
    
    // Loop backwards through the ArrayList to safely remove particles
    for (int i = particles.size() - 1; i >= 0; i--) {
      Particle p = particles.get(i);  // Get the particle at index i
      p.update();                     // Update its position and lifespan
      p.display();                    // Draw the particle
      
      // Remove the particle if it has faded away (is dead)
      if (p.isDead()) {
        particles.remove(i);
      }
    }
  }
}

// ************************************
// Global variables and setup
// ************************************

// Create an array (fixed size) of ParticleSystem objects
ParticleSystem[] systems = new ParticleSystem[3];

void setup() {
  size(600, 400);  // Set the size of the display window
  
  // Initialize three ParticleSystem objects at different horizontal positions
  systems[0] = new ParticleSystem(width / 4, height / 2);   // First system at 1/4 width
  systems[1] = new ParticleSystem(width / 2, height / 2);     // Second system at center width
  systems[2] = new ParticleSystem(3 * width / 4, height / 2); // Third system at 3/4 width
}

void draw() {
  background(0);  // Clear the screen with a black background each frame
  
  // Loop through each particle system in the array and run it
  for (int i = 0; i < systems.length; i++) {
    systems[i].run();  // Call the run method to update, display, and manage particles
  }
}