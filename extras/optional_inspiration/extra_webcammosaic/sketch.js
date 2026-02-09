//this code is about creating a mosaic effect using the webcam feed
//and the perlin noise function to create a random offset for each cell
//inspired by: https://editor.p5js.org/codingtrain/sketches/1v7JfGqj

let webcam;
let sizeX, sizeY;

function setup() {
  createCanvas(640, 480);
  // Create the video capture with the same dimensions as the canvas and hide it
  webcam = createCapture(VIDEO);
  webcam.size(640, 480);
  webcam.hide();

  // Calculate grid cell dimensions (1/10th of the canvas size)
  sizeX = width / 10;
  sizeY = height / 10;
}

function draw() {
  background(0); // Clear the canvas

  // Loop over the canvas in a grid pattern
  for (let y = 0; y < height - sizeY; y += sizeY) {
    for (let x = 0; x < width - sizeX; x += sizeX) {
      // Use Perlin noise combined with mouse position to compute a random offset for the sample region
      let camX = mouseX + map(noise(x, y), 0, 1, -50, 50);
      let camY = mouseY + map(noise(x + 100, y + 100), 0, 1, -50, 50);

      // Ensure the sample region stays within the bounds of the webcam feed
      camX = constrain(camX, 0, width - sizeX);
      camY = constrain(camY, 0, height - sizeY);

      // Draw a sub-region of the webcam feed onto the canvas
      // The parameters: image(img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight)
      image(webcam, x, y, sizeX, sizeY, camX, camY, sizeX, sizeY);
    }
  }
}