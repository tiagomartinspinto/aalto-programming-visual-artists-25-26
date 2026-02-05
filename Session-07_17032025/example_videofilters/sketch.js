// This is the code for the magnifying glass effect on a video using p5.js.


let video;
let invertEffect = false;
let grayscaleEffect = false;
let thresholdEffect = false;
let blurEffect = false;

function setup() {
  createCanvas(800, 600);
  video = createVideo('assets/test_small.mp4', videoLoaded);
  video.hide();
}

function videoLoaded() {
  video.loop();
  video.volume(0);
}

function draw() {
  background(0);

  if (video.width > 0 && video.height > 0) {
    let frame = video.get();
    frame.resize(width, height);

    if (invertEffect) {
      invertVideo(frame);
    }
    if (grayscaleEffect) {
      grayscaleVideo(frame);
    }
    if (thresholdEffect) {
      thresholdVideo(frame, 0.5);
    }
    if (blurEffect) {
      frame.filter(BLUR, 6);
    }

    image(frame, 0, 0);
  }
}

function invertVideo(img) {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    img.pixels[i] = 255 - img.pixels[i];
    img.pixels[i + 1] = 255 - img.pixels[i + 1];
    img.pixels[i + 2] = 255 - img.pixels[i + 2];
  }
  img.updatePixels();
}

function grayscaleVideo(img) {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let avg = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    img.pixels[i] = avg;
    img.pixels[i + 1] = avg;
    img.pixels[i + 2] = avg;
  }
  img.updatePixels();
}

function thresholdVideo(img, threshold) {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    let brightness = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    let val = brightness > threshold * 255 ? 255 : 0;
    img.pixels[i] = val;
    img.pixels[i + 1] = val;
    img.pixels[i + 2] = val;
  }
  img.updatePixels();
}

function keyPressed() {
  if (key === 'i' || key === 'I') {
    invertEffect = !invertEffect;
    console.log("Invert!");
  }
  if (key === 'b' || key === 'B') {
    blurEffect = !blurEffect;
    console.log("Blur!");
  }
  if (key === 'g' || key === 'G') {
    grayscaleEffect = !grayscaleEffect;
    console.log("Gray!");
  }
  if (key === 't' || key === 'T') {
    thresholdEffect = !thresholdEffect;
    console.log("Threshold!");
  }
}