ArrayList<Particle> particles = new ArrayList<Particle>();

class Particle {
  float x, y;
  float vx, vy;
  float noiseOffset;
  float size;

  Particle(float startX, float startY) {
    x = startX;
    y = startY;
    vx = 0;
    vy = 0;
    noiseOffset = random(1000);
    size = random(2, 6);
  }

  void update() {
    // Use Perlin noise to generate a smooth movement angle
    float angle = noise(x * 0.005, y * 0.005, noiseOffset) * TWO_PI * 4;

    // Convert angle to movement
    vx = cos(angle) * 2;
    vy = sin(angle) * 2;

    x += vx;
    y += vy;

    noiseOffset += 0.01;

    // Wrap around screen
    if (x < 0) x = width;
    if (x > width) x = 0;
    if (y < 0) y = height;
    if (y > height) y = 0;
  }

  void display() {
    fill(255, 150);
    ellipse(x, y, size, size);
  }
}

void setup() {
  size(600, 600);
  noStroke();
  background(0);

  for (int i = 0; i < 300; i++) {
    particles.add(new Particle(random(width), random(height)));
  }
}

void draw() {
  fill(0, 20);
  rect(0, 0, width, height);

  for (Particle p : particles) {
    p.update();
    p.display();
  }
}