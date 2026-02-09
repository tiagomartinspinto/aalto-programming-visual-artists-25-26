//this code is for playing and pausing the sound file
// The sound file is loaded in the preload() function
// The sound is played in loop mode in the setup() function
// The keyPressed() function detects when the 'P' key is pressed
// If the sound is playing, it is paused
// If the sound is paused or stopped, it is resumed in loop mode


// Declare a variable to store the sound file
let sound;

function preload() {
  // Preload function loads the sound before setup() runs
  // This ensures the audio is available when the sketch starts
  sound = loadSound("sample.mp3"); // Load the sound file (make sure it's in the project folder)
}

function setup() {
  // Create a 400x200 pixel canvas
  createCanvas(400, 200);

  // Start playing the sound in loop mode
  // This ensures the sound automatically repeats forever
  sound.loop();
}

function draw() {
  // Set the background color to black
  background(0);

  // Set the text color to white
  fill(255);

  // Set text size to 16 pixels
  textSize(16);

  // Display user instructions on the screen
  text("Press 'P' to pause/play", 50, 100);
}

// This function detects when a key is pressed
function keyPressed() {
  // Check if the pressed key is 'P' or 'p' (case-insensitive)
  if (key === 'P' || key === 'p') {
    // If the sound is currently playing, pause it
    if (sound.isPlaying()) {
      sound.pause(); // Pause playback, keeping the current position
    } else {
      // If the sound is paused or stopped, resume playing in loop mode
      sound.loop(); 
    }
  }
}