import processing.sound.*;

float n1, n2;  // Perlin noise variables for smooth motion
AudioIn mic;    // Microphone input
Amplitude amp;  // Amplitude analyzer
int screenshotCount = 1; // Counter for saving multiple screenshots

void setup() {
  //fullScreen();  // Use the whole screen for an immersive effect
  size(800, 600); // Use this instead if you prefer a windowed mode
  
  n1 = random(100);
  n2 = random(100);
  
  // Initialize microphone input
  mic = new AudioIn(this, 0);
  mic.start();
  
  // Initialize amplitude analyzer
  amp = new Amplitude(this);
  amp.input(mic);
  
  background(255);  // Set background to white
}

void draw() {
  // Get microphone level and scale it up
  float level = amp.analyze() * 10;

  // Number of lines drawn based on audio intensity
  int doNumTimes = int(map(level, 0, 0.2, 1, 20));

  // Adjust stroke transparency based on sound level
  float strokeAlpha = map(level, 0, 1, 20, 80);  // Higher for better visibility on white

  // Draw multiple lines per frame for a soft layered effect
  for (int i = 0; i < doNumTimes; i++) {
    // Generate Perlin noise-based coordinates for smooth movement
    float x1 = map(noise(n1), 0, 1, 0, width);
    float y1 = map(noise(n1 + 100), 0, 1, 0, height);
    float x2 = map(noise(n2), 0, 1, 0, width);
    float y2 = map(noise(n2 + 100), 0, 1, 0, height);

    // Adjust colors for better contrast on white
    float r = map(level, 0, 0.2, 10, 200);
    float g = map(level, 0, 0.2, 50, 180);
    float b = map(level, 0, 0.2, 100, 220);

    // Set stroke color with a smooth blending effect
    stroke(r, g, b, strokeAlpha);
    strokeWeight(map(level, 0, 0.2, 1, 4));  // Subtle stroke size variation
    
    // Draw the soft, flowing lines
    line(x1, y1, x2, y2);

    // Slightly adjust noise values for continued organic movement
    n1 += 0.001;
    n2 += 0.001;
  }
}

// Function to save a screenshot when pressing "S"
void keyPressed() {
  if (key == 's' || key == 'S') {
    String filename = "screenshot_" + screenshotCount + ".png";  // Auto-increment file name
    save(filename);
    println("Screenshot saved: " + filename);
    screenshotCount++;  // Increase counter for next save
  }
}