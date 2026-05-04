// Study 1 - Matleena
// Mirrored from OpenProcessing sketch 2901307.
// Original: https://openprocessing.org/sketch/2901307
// License shown on OpenProcessing: CC BY-NC-SA 3.0

let words = ["gut", "FEELING", "Luonnos"];

// let font; // custom font commented out

// per-letter distortion
let sx = [];
let sy = [];

// per-word interaction factors
let wordSizeFactor = [];
let rotFactor = [];

// colors
let bgColor;
let textColor = [];

function setup() {
  createCanvas(1000, 800);
  textAlign(CENTER, CENTER); // simple center alignment
  // font = loadFont("Arial-Black-20.vlw"); // font loading commented
  // textFont(font);

  // initialize arrays
  for (let i = 0; i < words.length; i++) {
    sx.push([]);
    sy.push([]);
    textColor.push(0);
    wordSizeFactor.push(1);
    rotFactor.push(1);
  }

  randomizeAll();
}

function draw() {
  background(bgColor);

  let baseSize = map(mouseX, 0, width, 40, 260);
  let baseRotation  = map(mouseY, 0, height, -PI/3, PI/3);

  let cx = width / 2;
  let ys = [height*0.15, height*0.35, height*0.55, height*0.75];

  for (let i = 0; i < words.length; i++) {
    let currentSize = baseSize * wordSizeFactor[i];
    let angle = baseRotation * rotFactor[i];

    textSize(currentSize);
    fill(textColor[i]);

    push();
    translate(cx, ys[i]);
    rotate(angle);

    drawWordDistorted(words[i], i);

    pop();
  }
}

// draw letters with distortion, centering
function drawWordDistorted(word, index) {
  let spacing = textWidth("W") * 0.9;

  for (let j = 0; j < word.length; j++) {
    push();
    translate((j - word.length/2.0) * spacing, 0); // center relative to word
    scale(sx[index][j], sy[index][j]);
    text(word.charAt(j), 0, 0);
    pop();
  }
}

// randomization
function randomizeAll() {
  bgColor = color(random(255), random(255), random(255));

  for (let i = 0; i < words.length; i++) {
    textColor[i] = color(random(255), random(255), random(255));
    wordSizeFactor[i] = random(0.7, 1.4);
    rotFactor[i] = random(0.5, 1.6);

    // stronger letter distortion
    for (let j = 0; j < words[i].length; j++) {
      sx[i][j] = random(0.4, 2);
      sy[i][j] = random(0.4, 5);
    }
  }
}

// mouse controls
function mousePressed() {
  if (mouseButton === LEFT) randomizeAll();                // refresh
  if (mouseButton === RIGHT) saveCanvas("wordmess", "png"); // save PNG
}