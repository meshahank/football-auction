/**
 * Sound Effect Generator using Web Audio API
 * Creates a dramatic "SOLD!" announcement sound effect
 */

let audioContextInstance = null;

const getAudioContext = () => {
  if (!audioContextInstance) {
    audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  // Resume context if suspended (required for user interaction)
  if (audioContextInstance.state === 'suspended') {
    audioContextInstance.resume().catch(err => console.error('Failed to resume audio context:', err));
  }
  
  return audioContextInstance;
};

export const playSoldSound = () => {
  try {
    const audioContext = getAudioContext();
    const now = audioContext.currentTime;

    // ===== POP (base impact) =====
    const popOsc = audioContext.createOscillator();
    const popGain = audioContext.createGain();

    popOsc.type = 'square';
    popOsc.frequency.setValueAtTime(500, now);
    popOsc.frequency.exponentialRampToValueAtTime(180, now + 0.1);

    popGain.gain.setValueAtTime(0.5, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    popOsc.connect(popGain);
    popGain.connect(audioContext.destination);

    popOsc.start(now);
    popOsc.stop(now + 0.12);

    // ===== CHIME STACK (reward feel) =====
    const chimeFrequencies = [900, 1200, 1500]; // major chord-ish

    chimeFrequencies.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.05 + i * 0.04);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.15, now + 0.25 + i * 0.04);

      gain.gain.setValueAtTime(0.0001, now + 0.05 + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.08 + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35 + i * 0.04);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(now + 0.05 + i * 0.04);
      osc.stop(now + 0.35 + i * 0.04);
    });

    // ===== EXTRA HIGH SPARKLE =====
    const sparkleOsc = audioContext.createOscillator();
    const sparkleGain = audioContext.createGain();

    sparkleOsc.type = 'triangle';
    sparkleOsc.frequency.setValueAtTime(2000, now + 0.12);
    sparkleOsc.frequency.exponentialRampToValueAtTime(2600, now + 0.3);

    sparkleGain.gain.setValueAtTime(0.15, now + 0.12);
    sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    sparkleOsc.connect(sparkleGain);
    sparkleGain.connect(audioContext.destination);

    sparkleOsc.start(now + 0.12);
    sparkleOsc.stop(now + 0.35);

  } catch (error) {
    console.error('Error playing sound:', error);
  }
};