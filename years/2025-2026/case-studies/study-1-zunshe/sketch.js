// Study 1 - Zunshe
// Mirrored from OpenProcessing sketch 2901349.
// Original: https://openprocessing.org/sketch/2901349
// License shown on OpenProcessing: CC BY-NC-SA 3.0

// Interactive Face - Fleeing, Blinking, Eye-Tracking, Smooth Lerp & Dynamic Brows

let faceX, faceY;
let faceSize = 200;
let targetRedness = 0;
let currentRedness = 0;
let targetMouthCurve = 0;
let currentMouthCurve = 0;

// New variables for eyebrows
let targetBrowTilt = 0;
let currentBrowTilt = 0;

function setup() {
  createCanvas(700, 700);
  frameRate(60);
  faceX = width / 2;
  faceY = height / 2;
}

function draw() {
  let d = dist(mouseX, mouseY, faceX, faceY);
  let threshold = faceSize * 3;

  // 1. Smooth Transitions using lerp()
  // Redness logic
  targetRedness = map(d, 0, threshold, 150, 0);
  targetRedness = constrain(targetRedness, 0, 150);
  currentRedness = lerp(currentRedness, targetRedness, 0.1);

  // Mouth curve logic
  targetMouthCurve = map(d, 0, threshold, faceSize * 0.01, faceSize * 0.05);
  targetMouthCurve = constrain(targetMouthCurve, -faceSize * 0.15, faceSize * 0.15);
  currentMouthCurve = lerp(currentMouthCurve, targetMouthCurve, 0.1);

  // Eyebrow tilt logic: 
  // Higher value = more "V" shape (angry/worried)
  // Lower/Negative value = relaxed or arched
  targetBrowTilt = map(d, 0, threshold, -faceSize * 0.01, -faceSize * 0.04);
  currentBrowTilt = lerp(currentBrowTilt, targetBrowTilt, 0.1);

  background(0, 47, constrain(167 + currentRedness, 0, 255));

  // 2. Fleeing logic
  if (d < threshold && d > 0) {
    let angle = atan2(faceY - mouseY, faceX - mouseX);
    let maxSpeed = faceSize * 0.04;
    let fleeSpeed = map(d, 0, threshold, maxSpeed, 0); // renamed from 'speed'

    faceX += cos(angle) * fleeSpeed;
    faceY += sin(angle) * fleeSpeed;
  }

  faceX = constrain(faceX, faceSize / 2, width - faceSize / 2);
  faceY = constrain(faceY, faceSize / 2, height - faceSize / 2);

  // Draw face
  drawFace(faceX, faceY, faceSize, currentMouthCurve, currentBrowTilt);
}

function drawFace(x, y, diameter, mCurve, bTilt) {
  // Face Base
  fill(255, 220 - currentRedness, 200 - currentRedness);
  noStroke();
  ellipse(x, y, diameter, diameter);

  // Eye/Brow Settings
  let eyeOffsetX = diameter * 0.15;
  let eyeYPos = y - diameter * 0.15;
  let pupilSize = diameter * 0.05;
  let browWidth = diameter * 0.12;

  // --- DRAW EYEBROWS ---
  stroke(0);
  strokeWeight(diameter * 0.02);
  strokeCap(ROUND);

  // Left Eyebrow (Angles down towards the center when bTilt is high)
  line(x - eyeOffsetX - browWidth / 2, eyeYPos * 0.95 - bTilt / 2,
       x - eyeOffsetX + browWidth / 2, eyeYPos * 0.95 + bTilt);

  // Right Eyebrow (Mirrored)
  line(x + eyeOffsetX + browWidth / 2, eyeYPos * 0.95 - bTilt / 2,
       x + eyeOffsetX - browWidth / 2, eyeYPos * 0.95 + bTilt);

  // --- DRAW EYES & PUPILS ---
  noStroke();
  // Calculate Eye Tracking
  let angleLeftEye = atan2(mouseY - eyeYPos, mouseX - (x - eyeOffsetX));
  let angleRightEye = atan2(mouseY - eyeYPos, mouseX - (x + eyeOffsetX));
  let lookRadius = diameter * 0.02;

  // Left Pupil
  fill(0);
  ellipse(x - eyeOffsetX + cos(angleLeftEye) * lookRadius,
          eyeYPos + sin(angleLeftEye) * lookRadius,
          pupilSize, pupilSize);
  // Right Pupil
  ellipse(x + eyeOffsetX + cos(angleRightEye) * lookRadius,
          eyeYPos + sin(angleRightEye) * lookRadius,
          pupilSize, pupilSize);

  // Nose / Upper lip arc
  noFill();
  stroke(0);
  strokeWeight(diameter * 0.0075);
  arc(x, y + diameter * 0.15, diameter * 0.05, diameter * 0.15, 0, PI);

  // Smooth Dynamic Mouth
  let mouthY = y + diameter * 0.35;
  let mouthWidth = diameter * 0.3;

  bezier(x - mouthWidth / 2, mouthY,
         x - mouthWidth / 2, mouthY + mCurve,
         x + mouthWidth / 2, mouthY + mCurve,
         x + mouthWidth / 2, mouthY);
}