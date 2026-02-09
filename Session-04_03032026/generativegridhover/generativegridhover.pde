// Define grid size
int gridSize = 10; // Number of rows and columns
float tileSize; // Size of each tile

void setup() {
  size(600, 600); // Canvas size
  background(0); // Black background
  noFill();
  strokeWeight(2);
  tileSize = width / float(gridSize); // Calculate tile size dynamically
}

void draw() {
  background(0); // Refresh the background every frame

  // Loop through the grid
  for (int x = 0; x < width; x += tileSize) {
    for (int y = 0; y < height; y += tileSize) {
      
      // Calculate distance from mouse to the center of each tile
      float d = dist(mouseX, mouseY, x + tileSize / 2, y + tileSize / 2);
      
      // Map the distance to control opacity (closer = more visible)
      float opacity = map(d, 0, width / 2, 255, 50);
      
      // Use Perlin noise for smooth rotation variation over time
      float angle = noise(x * 0.01, y * 0.01, frameCount * 0.005) * TWO_PI;

      // Call function to draw the pattern at this grid position
      drawPattern(x + tileSize / 2, y + tileSize / 2, tileSize * 0.4, angle, opacity);
    }
  }
}

// Function to draw a rotating pattern (nested squares)
void drawPattern(float x, float y, float size, float angle, float opacity) {
  pushMatrix(); // Save the current transformation state
  translate(x, y); // Move to the center of the tile
  rotate(angle); // Apply rotation based on Perlin noise

  // Draw multiple nested squares
  for (int i = 0; i < 5; i++) { 
    float s = size * (1 - i * 0.2); // Reduce size for each nested square
    rectMode(CENTER); // Draw from the center
    
    // Dynamically change color based on mouse position
    float c = map(mouseX, 0, width, 50, 255); 
    stroke(c, 100, 255 - c, opacity); // Smooth color transition with opacity

    rect(0, 0, s, s); // Draw square
  }

  popMatrix(); // Restore previous transformation state
}