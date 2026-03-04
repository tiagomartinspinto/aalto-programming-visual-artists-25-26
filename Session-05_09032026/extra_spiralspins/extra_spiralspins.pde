// --- PARAMETERS (easy to tweak) ---
int turns = 10;            // how many spiral rotations
float step = 0.08;         // smaller = smoother, heavier CPU
float thickness = 2;       // stroke weight
float sat = 80;            // saturation (0–100)
float bri = 100;           // brightness (0–100)
float curve = 1.0;         // 1.0 = linear radius, >1 = tighter center, <1 = faster growth
boolean trails = false;    // true = leaves trails

void setup() {
  size(600, 600);
  frameRate(60);
  noFill();
  strokeWeight(thickness);
  colorMode(HSB, 360, 100, 100, 255); // add alpha channel
}

void draw() {
  // Background (either clean or trails)
  if (trails) {
    background(0, 20);   // low alpha = motion trails
  } else {
    background(0);
  }

  translate(width / 2, height / 2);

  // Animation speed controlled by mouseX (left slow → right fast)
  float speed = map(mouseX, 0, width, 0.005, 0.05);
  float offset = frameCount * speed;

  // Radius scale controlled by mouseY (top big → bottom small)
  float maxRadius = map(mouseY, 0, height, min(width, height) * 0.48, min(width, height) * 0.20);

  drawColoredSpiral(offset, maxRadius);
}

// Draw a spiral using polar coordinates
void drawColoredSpiral(float offset, float maxRadius) {
  float maxAngle = TWO_PI * turns;

  beginShape();
  for (float a = 0; a < maxAngle; a += step) {

    // 0..1 progress through the spiral
    float t = a / maxAngle;

    // radius growth curve (try 0.5, 1.0, 2.0)
    float r = pow(t, curve) * maxRadius;

    float x = r * cos(a + offset);
    float y = r * sin(a + offset);

    float hueValue = t * 360;
    float alphaValue = map(r, 0, maxRadius, 50, 255); // fade near center
    stroke(hueValue, sat, bri, alphaValue);

    vertex(x, y);
  }
  endShape();
}

// Toggle trails on/off
void keyPressed() {
  if (key == 't' || key == 'T') {
    trails = !trails;
  }
}