import oscP5.*;
import netP5.*;

OscP5 oscP5;  // OSC communication object
float frequency = 60;  // Default frequency
float amplitude = 0.5; // Default amplitude

void setup() {
  size(640, 480);
  
  // Setup OSC communication
  oscP5 = new OscP5(this, 8000);  // Listen on port 8000

  // Print out the list of available OSC addresses to help debug
  println("Listening for OSC messages on port 8000...");
}

void draw() {
  background(0);

  // Map frequency and amplitude to visuals
  float xPos = map(frequency, 50, 100, 50, width - 50);  // Map frequency to x position
  float size = map(amplitude, 0, 1, 50, 200);  // Map amplitude to circle size

  // Draw a circle based on frequency and amplitude
  fill(map(amplitude, 0, 1, 0, 255), 0, map(amplitude, 0, 1, 255, 0));  // Dynamic color
  noStroke();
  ellipse(xPos, height / 2, size, size);
}

// OSC event listener
void oscEvent(OscMessage theOscMessage) {
  // Print out the OSC message for debugging
  println("Received OSC message: " + theOscMessage);

  // Check if message is from the expected source
  if (theOscMessage.checkAddrPattern("/sound")) {
    // Get frequency (note) and amplitude from the OSC message
    frequency = theOscMessage.get(0).floatValue();  // Get frequency (note)
    amplitude = theOscMessage.get(1).floatValue();  // Get amplitude
  }
}