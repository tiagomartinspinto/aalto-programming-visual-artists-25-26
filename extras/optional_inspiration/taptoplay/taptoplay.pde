import ddf.minim.*;        // Import Minim library for audio input
import processing.video.*; // Import Processing video library

// Declare Minim audio input
Minim minim;
AudioInput mic;

// Declare video object
Movie myVideo;

// State variables
boolean isPlaying = false; // Tracks if the video is playing
int lastClapTime = 0;      // Timestamp for last detected clap (prevents rapid triggers)
int clapTimeout = 500;     // Minimum time between claps (milliseconds)
float clapThreshold = 0.05; // Sensitivity of clap detection (adjust as needed)
boolean hasLooped = false; // Flag to ensure "Video looped!" prints only once per cycle

void setup() {
  size(800, 600); // Set window size
  
  // Load video from file (ensure it's inside the "data" folder)
  myVideo = new Movie(this, "test.mp4");
  
  myVideo.loop();  // Enable looping (video will restart after finishing)
  myVideo.pause(); // Start with video paused (waiting for first clap)
  
  // Initialize Minim and microphone for clap detection
  minim = new Minim(this);
  mic = minim.getLineIn(Minim.MONO, 512); // Capture mono audio with 512 buffer size
}

void draw() {
  background(0); // Clear background
  
  // Read video frames when available
  if (myVideo.available()) {
    myVideo.read();
  }
  
  // Display video on screen
  image(myVideo, 0, 0, width, height);
  
  // Check for claps to toggle play/pause
  detectClap();
  
  // Check if video has finished and restart it
  checkVideoLoop();
  
  // Display real-time microphone input level for debugging
  fill(255);
  textSize(20);
  text("Sound Level: " + mic.mix.level(), 20, height - 40);
}

// Function to detect claps based on microphone input
void detectClap() {
  float level = mic.mix.level(); // Get the current audio input level
  float scaledLevel = abs(level) * 10; // Normalize sound levels for better detection

  // Detect a loud sound (clap) and ensure minimum time between claps
  if (scaledLevel > clapThreshold && millis() - lastClapTime > clapTimeout) { 
    lastClapTime = millis(); // Update last clap timestamp
    
    // Toggle video state (play/pause)
    if (isPlaying) {
      myVideo.pause();
      println("Video paused."); // Print status to console
    } else {
      myVideo.play();
      println("Video playing.");
    }
    
    isPlaying = !isPlaying; // Switch play/pause state
  }
}

// Function to ensure video correctly loops after reaching the end
void checkVideoLoop() {
  // If video is playing and it reaches the end (time is close to duration)
  if (isPlaying && myVideo.time() >= myVideo.duration() - 0.1) { 
    if (!hasLooped) { // Check if the loop message has already been printed
      println("Video looped! Restarting..."); // Print message once
      myVideo.stop();  // Stop video playback
      myVideo.play();  // Restart video from the beginning
      hasLooped = true; // Prevent multiple prints in a single loop cycle
    }
  } else {
    hasLooped = false; // Reset flag when video is not at the end
  }
}

// Required function to handle new video frames
void movieEvent(Movie m) {
  m.read(); // Read the next frame
}