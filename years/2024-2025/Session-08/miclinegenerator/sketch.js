//this code is about generating lines with the help of microphone input
//and the lines are generated with the help of perlin noise
//and the shapes are drawn with the help of curveVertex


// Declare global variables for Perlin noise and microphone input
let n1, n2, n3; // Perlin noise seed values for smooth movement
let mic; // Microphone input object
let shapes = []; // Array to store shape data and timestamps for fading effect
let fadeTime = 1000; // Time in milliseconds before shapes start fading

function setup() {
  // Create a canvas that fills the entire window dynamically
  createCanvas(windowWidth, windowHeight);
  
  // Initialize Perlin noise variables with random starting values for smooth organic movement
  n1 = random(100);
  n2 = random(100);
  n3 = random(100);
  
  // Set stroke properties for drawing shapes (black with low opacity to blend softly into the background)
  stroke(0, 5);
  
  // Initialize microphone input to capture real-time sound levels
  mic = new p5.AudioIn();
  mic.start(); // Start capturing audio input from the default microphone
  
  // Set a soft purple background color at the start to contrast with the drawn shapes
  background(178, 156, 219);
}

function draw() {
  // Clear background each frame to remove previous drawings and allow fading over time
  background(178, 156, 219);
  
  // Get the current microphone input level and amplify it for better responsiveness
  let level = mic.getLevel() * 10;
  
  // Map the audio level to determine how many shapes to draw, ensuring at least one shape appears
  let doNumTimes = max(1, int(map(level, 0, 0.2, 1, 20))); // Prevents zero shapes being drawn
  
  // Adjust stroke transparency based on sound intensity for dynamic fading effect
  let strokeAlpha = map(level, 0, 1, 50, 150);
  stroke(0, strokeAlpha); // Set stroke color with dynamic opacity based on sound level
  strokeWeight(0.05); // Use a fine stroke weight to keep lines delicate and organic
  noFill(); // Keep the shapes open and raw to maintain a visceral aesthetic
  
  // Generate new shapes and store them with timestamps
  for (let i = 0; i < doNumTimes; i++) {
    // Generate three points with Perlin noise for smooth, fluid movement
    let x1 = map(noise(n1 + random(-0.01, 0.01)), 0, 1, 0, width);
    let y1 = map(noise(n1 + 100 + random(-0.01, 0.01)), 0, 1, 0, height);
    let x2 = map(noise(n2 + random(-0.01, 0.01)), 0, 1, 0, width);
    let y2 = map(noise(n2 + 100 + random(-0.01, 0.01)), 0, 1, 0, height);
    let x3 = map(noise(n3 + random(-0.01, 0.01)), 0, 1, 0, width);
    let y3 = map(noise(n3 + 100 + random(-0.01, 0.01)), 0, 1, 0, height);
    
    // Store shape data along with its creation time for later fading
    shapes.push({ x1, y1, x2, y2, x3, y3, createdAt: millis() });
    
    // Increment Perlin noise values slightly for continued organic motion
    n1 += 0.001;
    n2 += 0.001;
    n3 += 0.0008;
  }
  
  // Loop through stored shapes and apply fading effect based on their age
  for (let i = shapes.length - 1; i >= 0; i--) {
    let shape = shapes[i];
    let age = millis() - shape.createdAt; // Calculate how long the shape has been on screen
    
    // Remove shape if it has exceeded the fade duration
    if (age > fadeTime) {
      shapes.splice(i, 1);
      continue;
    }
    
    // Gradually fade shape over time in the last second before it disappears
    let alpha = map(age, fadeTime - 1000, fadeTime, 150, 0);
    stroke(0, constrain(alpha, 0, 150));
    
    // Draw the shape using curve vertices for a more organic and fluid appearance
    beginShape();
    curveVertex(shape.x1, shape.y1);
    curveVertex(shape.x2, shape.y2);
    curveVertex(shape.x3, shape.y3);
    curveVertex(shape.x1, shape.y1);
    endShape(CLOSE);
  }
}

// Function to save a screenshot when 'S' key is pressed
function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('screenshot', 'png'); // Saves the canvas as a PNG file
  }
}