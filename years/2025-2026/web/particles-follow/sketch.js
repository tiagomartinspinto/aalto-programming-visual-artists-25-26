const particles = [];

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.life = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 3;
  }

  display() {
    noStroke();
    fill(255, this.life);
    ellipse(this.x, this.y, 8, 8);
  }

  isDead() {
    return this.life <= 0;
  }
}

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent("sketch");
}

function draw() {
  background(0);
  particles.push(new Particle(mouseX, mouseY));

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isDead()) particles.splice(i, 1);
  }
}
