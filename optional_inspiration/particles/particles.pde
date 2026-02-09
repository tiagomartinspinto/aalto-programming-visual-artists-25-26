// Colorful Particle System with Blur Effect

ArrayList<Particle> particles;

void setup() {
  size(800, 600);
  particles = new ArrayList<Particle>();
  background(0); // Black background for better contrast
}

void draw() {
  // Create a blur effect by overlaying a semi-transparent black rectangle.
  noStroke();
  fill(0, 20);
  rect(0, 0, width, height);

  // Add new particles to the system (5 per frame)
  for (int i = 0; i < 5; i++) {
    particles.add(new Particle(random(width), random(height)));
  }

  // Update and display particles in reverse order for safe removal.
  for (int i = particles.size() - 1; i >= 0; i--) {
    Particle p = particles.get(i);
    p.update();
    p.display();
    if (p.isDead()) {
      particles.remove(i);
    }
  }
}

//------------------------------------------------------------------
// Particle Class Definition
//------------------------------------------------------------------
class Particle {
  float x, y;          // Position
  float vx, vy;        // Velocity
  float lifespan;      // Lifespan (used for fading)
  // Store color components separately for efficiency.
  float r, g, b;       

  Particle(float startX, float startY) {
    x = startX;
    y = startY;
    vx = random(-2, 2);
    vy = random(-2, 2);
    lifespan = 255;
    r = random(100, 255);
    g = random(100, 255);
    b = random(100, 255);
  }

  void update() {
    // Update position based on current velocity.
    x += vx;
    y += vy;

    // Calculate attraction toward the mouse.
    float dx = mouseX - x;
    float dy = mouseY - y;
    float attractionStrength = 0.05;
    // Cache random factors for consistency within this update.
    float randomFactorX = random(0.8, 1.2);
    float randomFactorY = random(0.8, 1.2);
    vx += dx * attractionStrength * randomFactorX;
    vy += dy * attractionStrength * randomFactorY;

    // Dampen velocity to prevent runaway acceleration.
    vx *= 0.95;
    vy *= 0.95;

    // Decrease lifespan to create a fading effect.
    lifespan -= random(2, 5);

    // Bounce off the screen edges.
    if (x < 0 || x > width) vx *= -1;
    if (y < 0 || y > height) vy *= -1;
  }

  void display() {
    noStroke();
    // Constrain alpha to [0, 255].
    float alpha = constrain(lifespan, 0, 255);

    // Draw layered ellipses for a glow effect.
    int layers = max(1, int(alpha / 50)); // Determine number of layers based on lifespan.
    for (int i = layers; i > 0; i--) {
      // Use a quadratic falloff for transparency.
      fill(r, g, b, alpha / (i * i));
      // For consistency, cache a random size per layer.
      float layerSize = i * random(8, 12);
      ellipse(x, y, layerSize, layerSize);
    }
    
    // Draw the central particle ellipse.
    fill(r, g, b, alpha);
    ellipse(x, y, random(10, 15), random(10, 15));
  }

  boolean isDead() {
    return lifespan <= 0;
  }
}