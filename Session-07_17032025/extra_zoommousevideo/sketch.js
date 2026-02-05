// This is the code for the magnifying glass effect on a video using p5.js.

let video;
let zoomFactor = 2.0;
let lensSize = 100;
let maskImg;

function setup() {
  createCanvas(800, 600);
  video = createVideo(['assets/test_small.mp4'], videoLoaded);
  video.hide();

  // Precompute a circular mask for the magnifying effect
  maskImg = createGraphics(lensSize, lensSize);
  maskImg.noStroke();
  maskImg.fill(255);
  maskImg.ellipse(lensSize / 2, lensSize / 2, lensSize, lensSize);
}

function videoLoaded() {
  video.loop();
  video.volume(0);
}

function draw() {
  background(0);

  // Ensure video dimensions are available before drawing
  if (video.width > 0 && video.height > 0) {
    // Draw the video scaled to the canvas
    image(video, 0, 0, width, height);
    // Apply the magnifying effect at the current mouse position
    applyMagnifyingEffect(video, mouseX, mouseY, lensSize, zoomFactor);
  }
}

function applyMagnifyingEffect(img, x, y, size, zoom) {
  // Map canvas mouse coordinates (x, y) to video coordinates.
  let videoX = x * (img.width / width);
  let videoY = y * (img.height / height);
  
  // Calculate the source region dimensions in video coordinates.
  let srcW = (size / zoom) * (img.width / width);
  let srcH = (size / zoom) * (img.height / height);
  let srcX = videoX - srcW / 2;
  let srcY = videoY - srcH / 2;
  
  // Convert values to integers for copy()
  let srcXInt = int(srcX);
  let srcYInt = int(srcY);
  let srcWInt = int(srcW);
  let srcHInt = int(srcH);
  
  // Create an offscreen graphics buffer for the zoomed image
  let zoomed = createGraphics(size, size);
  // Copy the region from the video (using video coordinates) and scale it to the lens size
  zoomed.copy(img, srcXInt, srcYInt, srcWInt, srcHInt, 0, 0, size, size);
  
  // Convert the graphics buffer to a p5.Image so that we can use the mask() function
  let zoomedImg = zoomed.get();
  // Apply the precomputed circular mask
  zoomedImg.mask(maskImg);
  
  // Draw the magnified, masked region on the main canvas,
  // centering it at the original mouse position
  image(zoomedImg, x - size / 2, y - size / 2);
}