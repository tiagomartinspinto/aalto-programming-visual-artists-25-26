// Study 2 - Zunshe
// Mirrored from OpenProcessing sketch 2901394.
// Original: https://openprocessing.org/sketch/2901394
// License shown on OpenProcessing: CC BY-NC-SA 3.0

let step = 20;            // Grid spacing
let cols, rows;           // Grid dimensions
let energy = [];          // 2D array for animation "energy"

function setup() {
  createCanvas(600, 700);
  noStroke();

  // Calculate grid
  cols = int(width / (step / 3.0));
  rows = int(height / step);

  // Initialize energy array
  for (let i = 0; i < cols; i++) {
    energy[i] = [];
    for (let j = 0; j < rows; j++) {
      energy[i][j] = 0;
    }
  }

  // --- Webcam initialization commented out ---
  /*
  let cam;
  try {
    cam = createCapture(VIDEO);
    cam.size(width, height);
    cam.hide();
  } catch (e) {
    console.warn("No webcam found, using fallback animation.");
  }
  */
}

function draw() {
  background(255);

  // --- Webcam loadPixels commented out ---
  // if (cam && cam.loadedmetadata) cam.loadPixels();

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      let x = int(col * (step / 3.0));
      let y = int(row * step);

      // --- Use fallback brightness animation ---
      let bright = 127 + 127 * sin(frameCount * 0.01 + x * 0.05 + y * 0.05);

      // Map brightness + mouse distance to circle size
      let sizeVal = map(bright + dist(mouseX, mouseY, x, y) * 0.5, 0, 300, step, 0);

      // Random energy trigger
      if (random(1) > 0.99995 && bright < 120) {
        energy[col][row] = 1;
      }

      // Energy decay
      energy[col][row] *= 0.92;

      let scl = 1 + energy[col][row] * 20; // renamed from "scale"

      // Draw circle with dynamic brightness
      fill(noise(x, y, frameCount * 0.002) * 255);
      ellipse(x, y + 10 * sin(x * frameCount * 0.00003), sizeVal * scl, sizeVal * scl);
    }
  }
}