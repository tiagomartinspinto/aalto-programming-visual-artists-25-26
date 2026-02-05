//It draws a smiling face on a light blue background.

void setup() {
  // The size() function sets the width and height of the display window in pixels.
  size(400, 400);

  // noLoop() stops draw() from running continuously.
  // Since this sketch is static (no animation), we only need to draw once.
  noLoop();
}

void draw() {
  // background() sets the color of the window (red, green, blue).
  // Here, (200, 220, 255) is a light blue color.
  background(200, 220, 255);

  // Draw a face at (200, 200) (the center of the window) with a diameter of 200.
  drawFace(200, 200, 200);
}

/**
 * Draws a smiling face at the specified coordinates.
 *
 * @param x        The x-coordinate of the face center
 * @param y        The y-coordinate of the face center
 * @param diameter The diameter of the circular face
 */
void drawFace(float x, float y, float diameter) {
  // fill() sets the interior color of shapes.
  // (255, 220, 200) is a pale skin-like color.
  fill(255, 220, 200);
  
  // noStroke() means we do not want an outline on our shape.
  noStroke();
  
  // ellipse() draws an ellipse at (x, y) with the specified width and height.
  // Using 'diameter' for both width and height makes it a circle.
  ellipse(x, y, diameter, diameter);

  // Next, we'll draw two black eyes.
  fill(0); // Black color for the eyes
  
  // Offsets position the eyes relative to the face center.
  float eyeOffsetX = 30;
  float eyeOffsetY = 20;
  float eyeSize = 20;

  // Left eye
  ellipse(x - eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);
  // Right eye
  ellipse(x + eyeOffsetX, y - eyeOffsetY, eyeSize, eyeSize);

  // Now, let's draw a smiling mouth using an arc.
  noFill();         // No interior color, just an outline
  stroke(0);        // Outline color (black)
  strokeWeight(3);  // Outline thickness

  // arc() draws an arc at the specified coordinates, with a certain width, height,
  // and start/end angles in radians.
  // 0 to PI (3.14159...) creates a semicircle.
  arc(x, y + 20, diameter * 0.5, diameter * 0.25, 0, PI);
}