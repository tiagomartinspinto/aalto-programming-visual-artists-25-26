ArrayList<Particle> particles = new ArrayList<Particle>();

class Particle {
  float x, y;
  float vx, vy;
  float life;

  Particle(float startX, float startY) {
    x = startX;
    y = startY;
    vx = random(-2, 2);
    vy = random(-2, 2);
    life = 255;
  }

  void update() {
    x += vx;
    y += vy;
    life -= 3;
  }

  void display() {
    noStroke();
    fill(255, life);
    ellipse(x, y, 8, 8);
  }

  boolean isDead() {
    return life <= 0;
  }
}

void setup() {
  size(600, 400);
}

void draw() {
  background(0);

  // create a particle at the mouse
  particles.add(new Particle(mouseX, mouseY));

  // update and display particles
  for (int i = particles.size()-1; i >= 0; i--) {
    Particle p = particles.get(i);
    p.update();
    p.display();

    if (p.isDead()) {
      particles.remove(i);
    }
  }
}