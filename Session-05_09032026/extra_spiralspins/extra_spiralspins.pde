// --- PARAMETERS ---
int turns = 10;
float step = 0.08;
float thickness = 2;
float sat = 80;
float bri = 100;
float curve = 1.0;
boolean trails = false;

void setup() {
  size(600, 600);
  frameRate(60);
  strokeWeight(thickness);
  colorMode(HSB, 360, 100, 100, 255);
  background(0);
}

void draw() {

  // Trails effect
  if (trails) {
    noStroke();
    fill(0, 30);        // semi transparent black
    rect(0, 0, width, height);
  } else {
    background(0);
  }

  // Move drawing origin to center
  translate(width/2, height/2);

  float speed = map(mouseX, 0, width, 0.03, 0.15);
  float offset = frameCount * speed;

  float maxRadius = map(mouseY, 0, height,
    min(width, height) * 0.48,
    min(width, height) * 0.20);

  drawColoredSpiral(offset, maxRadius);
}

void drawColoredSpiral(float offset, float maxRadius) {

  float maxAngle = TWO_PI * turns;

  noFill();
  beginShape();

  for (float a = 0; a < maxAngle; a += step) {

    float t = a / maxAngle;
    float r = pow(t, curve) * maxRadius;

    float x = r * cos(a + offset);
    float y = r * sin(a + offset);

    float hueValue = t * 360;
    stroke(hueValue, sat, bri);

    vertex(x, y);
  }

  endShape();
}

void keyPressed() {
  if (key == 't' || key == 'T') {
    trails = !trails;

    if (!trails) {
      background(0);
    }
  }
}