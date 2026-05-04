let particles = [];

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
    this.life = 255;
    this.d = map(this.life, 0, 255, 40, 40);
    this.gravity = 1;
  }

  update() {
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 3;
    this.d = map(this.life, 0, 255, 30, 100);
  }

  display() {
    noStroke();
    fill(235);
    blendMode(DIFFERENCE);
    ellipse(this.x, this.y, this.d, this.d);
  }

  edge() {
    if (this.x < this.d / 2 || this.x > width - this.d / 2) {
      this.vx *= -1;
      fill(0, 0, 255);
      ellipse(this.x, this.y, 3, 3);
    }
    if (this.y < 0 || this.y > height - this.d / 2) {
      this.vy *= -1;
      fill(0, 0, 255);
      ellipse(this.x, this.y, 3, 3);
    }
  }

  collision(allParticles) {
    // Collision with mouse
    if (this.x >= mouseX - this.d && this.x <= mouseX + this.d &&
        this.y >= mouseY - this.d && this.y <= mouseY + this.d) {
      fill(0, 255, 255);
      ellipse(mouseX, mouseY, 30, 30);
      this.life = 10;
    }

    // Collision with other particles
    for (let b of allParticles) {
      if (b !== this) {
        let distance = dist(this.x, this.y, b.x, b.y);
        let minDist = this.d / 2 + b.d / 2;

        if (distance < minDist) {
          let tempVx = this.vx;
          let tempVy = this.vy;
          this.vx = b.vx;
          this.vy = b.vy;
          b.vx = tempVx;
          b.vy = tempVy;

          let angle = atan2(b.y - this.y, b.x - this.x);
          this.x -= cos(angle) * 1;
          this.y -= sin(angle) * 1;

          fill(235);
          noStroke();
          ellipse((this.x + b.x) / 2, (this.y + b.y) / 2, 50, 50);

          stroke(0, 255, 255);
          noFill();
        }
      }
    }
  }

  isDead() {
    return this.life <= 0;
  }
}

function setup() {
  createCanvas(800, 800);
  frameRate(10);
}

function draw() {
  background(235);

  fill(255, 0, 0);
  noStroke();
  blendMode(DIFFERENCE);
  ellipse(mouseX, mouseY, 30, 30);

  // Create particle at mouse when pressed
  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, mouseY));
  }

  // Random particles
  particles.push(new Particle(random(width), random(width)));

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    p.edge();
    p.collision(particles);

    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
}