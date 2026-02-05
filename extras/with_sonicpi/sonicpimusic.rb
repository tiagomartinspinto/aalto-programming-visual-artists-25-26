use_osc "localhost", 8000  # Send OSC message to localhost and port 8000

live_loop :sound_visual do
  use_synth :prophet
  note = choose([60, 62, 64, 65, 67, 69, 71, 72])  # Random note from C4 to C5
  play note, amp: 0.5, release: 0.5  # Play note with amplitude 0.5
  
  # Send OSC message with the note's frequency and amplitude
  osc "/sound", note.to_f, 0.5  # Ensure the note is sent as a float and amplitude is properly formatted
  
  sleep 0.5
end
