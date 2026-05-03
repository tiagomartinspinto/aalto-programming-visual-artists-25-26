import ddf.minim.*;
import ddf.minim.analysis.*;

Minim minim;
AudioPlayer player;
FFT fft;

int bands = 64; // Number of frequency bands
float[] spectrum;

void setup() {
  size(800, 400);
  minim = new Minim(this);

  // Load and play audio file (ensure "sample.mp3" is in the sketch folder)
  player = minim.loadFile("sample.mp3", 1024);
  player.play();

  // Initialize FFT
  fft = new FFT(player.bufferSize(), player.sampleRate());
  fft.logAverages(22, 3); // Logarithmic scaling

  spectrum = new float[bands];
}

void draw() {
  background(0);

  // Analyze the current audio frame
  fft.forward(player.mix);

  for (int i = 0; i < bands; i++) {
    spectrum[i] = fft.getBand(i);
    float x = map(i, 0, bands, 50, width - 50);
    float h = map(spectrum[i], 0, 100, 2, height - 50);

    // Color variation based on frequency
    float hue = map(i, 0, bands, 0, 255); // Smooth color transition
    float brightness = map(spectrum[i], 0, 100, 50, 255); // Dynamic brightness

    colorMode(HSB, 255); // Use Hue-Saturation-Brightness mode
    fill(hue, 255, brightness); // Color changes with frequency & amplitude
    
    rect(x, height - h, width / bands - 2, h);
  }
}

void stop() {
  player.close();
  minim.stop();
  super.stop();
}