//this is the code for the kaleidoscope effect
//this code is taken from the p5.js example and modified to work with the webcam
//the original code can be found at https://p5js.org/examples/image-mask.html

let capture;
let totalSlices = 16;
let scaleAmt = 1.5;

function setup() {
  createCanvas(600, 600);
  // Create a video capture at the desired size and hide the default video element
  capture = createCapture(VIDEO);
  capture.size(600, 600);
  capture.hide();
}

function draw() {
  background(255);

  // Define slice dimensions
  let w = int(width / 3.2);
  let h = int(height / 3.2);

  // Create an off-screen graphics buffer to draw the slice mask
  let selection_mask = createGraphics(w, h);
  selection_mask.noStroke();
  // In p5.js, arc by default is drawn at the given center.
  // Here we draw the arc at (0, 0) with dimensions 2*w x 2*h.
  selection_mask.arc(0, 0, 2 * w, 2 * h, 0, radians(370 / totalSlices + 0.1), PIE);

  // Calculate ratios based on the canvas size
  let wRatio = (width - w) / width;
  let hRatio = (height - h) / height;
  
  // Clamp mouse values to valid bounds
  let mouseXClamped = constrain(mouseX, 0, width);
  let mouseYClamped = constrain(mouseY, 0, height);
  
  // Calculate source coordinates in the video frame for the slice
  let sx = int(mouseXClamped * wRatio);
  let sy = int(mouseYClamped * hRatio);
  
  // Extract a slice of the video frame from the capture and rename variable to avoid conflict
  let imgSlice = capture.get(sx, sy, w, h);
  // Apply the mask to the slice image
  imgSlice.mask(selection_mask);
  
  // Move origin to the canvas center and scale for a full-canvas effect
  translate(width / 2, height / 2);
  scale(scaleAmt);
  
  // Draw the slice in a circular pattern with a mirroring effect
  for (let k = 0; k <= totalSlices; k++) {
    push();
    // Rotate each slice; note that the angle is computed relative to half the number of slices
    rotate(k * radians(360 / (totalSlices / 2)));
    image(imgSlice, 0, 0);
    scale(-1.0, 1.0); // Mirror horizontally
    image(imgSlice, 0, 0);
    pop();
  }
}

function keyPressed() {
  // Adjust totalSlices when UP or DOWN arrow keys are pressed.
  // This version ensures totalSlices remains between 4 and 64.
  if (keyCode === UP_ARROW) {
    totalSlices += 4;
    if (totalSlices > 64) {
      totalSlices = 4;
    }
  } else if (keyCode === DOWN_ARROW) {
    totalSlices -= 4;
    if (totalSlices < 4) {
      totalSlices = 64;
    }
  } else if (key === 'S' || key === 's') {
    // Save the canvas image when 'S' is pressed
    saveCanvas('kaleidoscope', 'jpg');
  }
}