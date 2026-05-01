const particles = [];

class Particle {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.noiseOffset = random(1000);
    this.size = random(2, 6);
  }

  update() {
    const angle = noise(this.x * 0.005, this.y * 0.005, this.noiseOffset) * TWO_PI * 4;
    this.x += cos(angle) * 2;
    this.y += sin(angle) * 2;
    this.noiseOffset += 0.01;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
  }

  display() {
    fill(255, 150);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("sketch");
  noStroke();
  background(0);

  for (let i = 0; i < 300; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  fill(0, 20);
  rect(0, 0, width, height);
  for (const particle of particles) {
    particle.update();
    particle.display();
  }
}
