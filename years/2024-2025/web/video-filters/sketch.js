let video;
let invertEffect = false;
let grayscaleEffect = false;
let thresholdEffect = false;
let blurEffect = false;

function setup() {
  const canvas = createCanvas(640, 420);
  canvas.parent("sketch");
  pixelDensity(1);
  const videoPath = window.location.pathname.includes("/video-filters/") ? "test_small.mp4" : "video-filters/test_small.mp4";
  video = createVideo(videoPath, videoLoaded);
  video.attribute("muted", true);
  video.hide();
}

function videoLoaded() {
  video.volume(0);
  video.loop();
}

function draw() {
  background(0);

  if (!video || video.width === 0) {
    fill(245, 240, 232);
    noStroke();
    textAlign(CENTER, CENTER);
    text("Loading local video...", width / 2, height / 2);
    return;
  }

  const frame = video.get();
  frame.resize(width, height);

  if (invertEffect) invertVideo(frame);
  if (grayscaleEffect) grayscaleVideo(frame);
  if (thresholdEffect) thresholdVideo(frame, 0.5);
  if (blurEffect) frame.filter(BLUR, 6);

  image(frame, 0, 0);

  fill(8, 10, 14, 190);
  rect(12, height - 42, width - 24, 30, 6);
  fill(245, 240, 232);
  noStroke();
  text("Press I, G, B, or T to toggle filters", 24, height - 22);
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
    const avg = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    img.pixels[i] = avg;
    img.pixels[i + 1] = avg;
    img.pixels[i + 2] = avg;
  }
  img.updatePixels();
}

function thresholdVideo(img, threshold) {
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i += 4) {
    const brightness = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    const val = brightness > threshold * 255 ? 255 : 0;
    img.pixels[i] = val;
    img.pixels[i + 1] = val;
    img.pixels[i + 2] = val;
  }
  img.updatePixels();
}

function keyPressed() {
  if (key === "i" || key === "I") invertEffect = !invertEffect;
  if (key === "g" || key === "G") grayscaleEffect = !grayscaleEffect;
  if (key === "t" || key === "T") thresholdEffect = !thresholdEffect;
  if (key === "b" || key === "B") blurEffect = !blurEffect;
}
