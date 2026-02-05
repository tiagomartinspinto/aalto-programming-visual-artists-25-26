// Import the built-in Processing Sound library
import processing.sound.*;

SoundFile sound;  // Create a SoundFile object

void setup() {
  size(400, 200); // Set the window size
  
  // Load an audio file (place the file in the "data" folder)
  sound = new SoundFile(this, "sample.mp3");  

  // Start playing the sound
  sound.play();
}

void draw() {
  background(0);  // Set background color to black
  fill(255);      // Set text color to white
  textSize(16);
  
  // Display instructions
  text("Press 'P' to pause, 'R' to restart", 50, 100);
}

// Handle keyboard input for controlling playback
void keyPressed() {
  if (key == 'p') {
    sound.stop();  // Stop playback (pause function not available)
  } else if (key == 'r') {
    sound.play();  // Restart the sound from the beginning
  }
}