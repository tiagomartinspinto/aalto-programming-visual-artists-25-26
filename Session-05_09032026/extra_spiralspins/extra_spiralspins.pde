// --- PARAMETERS (easy to tweak) ---
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
  noFill();
  strokeWeight(thickness);
  colorMode(HSB, 360, 100, 100, 255);
  background(0);
}

void draw() {

  // Background (either clean or trails)
  if (trails) {
    noStroke();
    fill(0, 40);       // semi-transparent black
    rect(0, 0, width, height);
    noFill();
  } else {
    background(0);
  }

  translate(width / 2, height / 2);

  // Animation speed controlled by mouseX
  float speed = map(mouseX, 0, width, 0.005, 0.05);
  float offset = frameCount * speed;

  // Radius scale controlled by mouseY
  float maxRadius = map(mouseY, 0, height,
    min(width, height) * 0.48,
    min(width, height) * 0.20);

  drawColoredSpiral(offset, maxRadius);
}

// Draw a spiral using polar coordinates
void drawColoredSpiral(float offset, float maxRadius) {

  float maxAngle = TWO_PI * turns;

  beginShape();

  for (float a = 0; a < maxAngle; a += step) {

    float t = a / maxAngle;
    float r = pow(t, curve) * maxRadius;

    float x = r * cos(a + offset);
    float y = r * sin(a + offset);

    float hueValue = t * 360;
    float alphaValue = map(r, 0, maxRadius, 50, 255);

    stroke(hueValue, sat, bri, alphaValue);

    vertex(x, y);
  }

  endShape();
}

// Toggle trails on/off
void keyPressed() {
  if (key == 't' || key == 'T') {
    trails = !trails;

    if (!trails) {
      background(0);   // clear immediately when turning off
    }
  }
}