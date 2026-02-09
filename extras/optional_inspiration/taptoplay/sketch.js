//this code is for the video to play when the user taps on the screen
//audio is used to detect the taps

let mic; // Microphone input
let video; // Video element
let isPlaying = false; // Tracks if the video is playing
let lastClapTime = 0; // Timestamp for last detected clap
let clapTimeout = 500; // Minimum time between claps (milliseconds)
let clapThreshold = 0.05; // Sensitivity of clap detection
let hasLooped = false; // Flag to ensure "Video looped!" prints only once per cycle

function setup() {
  createCanvas(800, 600); // Create a canvas for the video display
  
  // Load video from file and set up controls
  video = createVideo('test.mp4', () => {
    video.hide(); // Hide default controls
    video.loop(); // Enable looping (video restarts after finishing)
    video.pause(); // Start with video paused (waiting for first clap)
  });
  
  // Initialize microphone for clap detection
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0); // Clear the background
  image(video, 0, 0, width, height); // Display the video frame
  
  detectClap(); // Check for claps to toggle video state
  checkVideoLoop(); // Ensure video correctly loops after reaching the end
  
  // Display real-time microphone input level for debugging
  fill(255);
  textSize(20);
  text("Sound Level: " + mic.getLevel().toFixed(4), 20, height - 40);
}

// Function to detect claps based on microphone input
function detectClap() {
  let level = mic.getLevel() * 10; // Normalize sound levels for better detection
  
  // Detect a loud sound (clap) and ensure minimum time between claps
  if (level > clapThreshold && millis() - lastClapTime > clapTimeout) {
    lastClapTime = millis(); // Update last clap timestamp
    
    // Toggle video state (play/pause)
    if (isPlaying) {
      video.pause();
      console.log("Video paused."); // Print status to console
    } else {
      video.play();
      console.log("Video playing.");
    }
    
    isPlaying = !isPlaying; // Switch play/pause state
  }
}

// Function to ensure video correctly loops after reaching the end
function checkVideoLoop() {
  // If video is playing and it reaches the end (time is close to duration)
  if (isPlaying && video.time() >= video.duration() - 0.1) {
    if (!hasLooped) { // Check if the loop message has already been printed
      console.log("Video looped! Restarting..."); // Print message once
      video.stop();  // Stop video playback
      video.play();  // Restart video from the beginning
      hasLooped = true; // Prevent multiple prints in a single loop cycle
    }
  } else {
    hasLooped = false; // Reset flag when video is not at the end
  }
}