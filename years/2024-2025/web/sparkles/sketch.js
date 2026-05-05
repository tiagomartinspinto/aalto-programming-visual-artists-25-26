const systems = [];

function setup() {
  const canvas = createCanvas(620, 420);
  canvas.parent("sketch");
  systems.push(new ParticleSystem(width * 0.25, height * 0.5, color(255, 122, 168)));
  systems.push(new ParticleSystem(width * 0.5, height * 0.5, color(245, 240, 232)));
  systems.push(new ParticleSystem(width * 0.75, height * 0.5, color(125, 211, 252)));
}

function draw() {
  background(8, 10, 14, 70);
  for (const system of systems) {
    system.run();
  }
}

class Particle {
  constructor(x, y, particleColor) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.lifespan = 255;
    this.particleColor = particleColor;
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= 2.8;
  }

  display() {
    noStroke();
    const c = color(this.particleColor);
    c.setAlpha(this.lifespan);
    fill(c);
    ellipse(this.pos.x, this.pos.y, 8, 8);
  }

  get dead() {
    return this.lifespan < 0;
  }
}

class ParticleSystem {
  constructor(x, y, systemColor) {
    this.origin = createVector(x, y);
    this.systemColor = systemColor;
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y, this.systemColor));
  }

  run() {
    this.addParticle();
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.update();
      particle.display();
      if (particle.dead) this.particles.splice(i, 1);
    }
  }
}
