const waveSpeed = 0.05;
const waveAmplitude = 50;
const waveFrequency = 0.1;

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent("sketch");
}

function draw() {
  background(0);
  stroke(245);
  noFill();

  const time = frameCount * waveSpeed;
  for (let x = 0; x < width; x += 20) {
    const y = height / 2 + sin(x * waveFrequency + time) * waveAmplitude;
    ellipse(x, y, 10, 10);
  }
}
