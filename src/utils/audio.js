let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Play a single soft glass bell chime (perfect for flower clicks)
export const playGlassChime = (freq = 880, duration = 0.8, isSoundOn = true) => {
  if (!isSoundOn) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Core sine wave (pure bell tone)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    
    // High overtone (gives glass "tink" sound)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.5, now);
    
    // Envelope for main tone (smooth decay)
    gain1.gain.setValueAtTime(0.04, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    
    // Envelope for overtone (decays much faster for a metallic tink)
    gain2.gain.setValueAtTime(0.01, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc1.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.start(now);
    osc2.stop(now + 0.15);
  } catch (err) {
    console.debug("Audio play failed", err);
  }
};

// Play an ascending arpeggio of chimes (for wax seal click or verification success)
export const playHarpArpeggio = (isSoundOn = true) => {
  if (!isSoundOn) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // Beautiful pentatonic chord in F major (warm, cozy, peaceful)
    const scale = [349.23, 392.00, 440.00, 523.25, 587.33, 698.46, 880.00];
    
    scale.forEach((freq, idx) => {
      const noteTime = now + (idx * 0.08);
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.setValueAtTime(0.035, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.7);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(noteTime);
      osc.stop(noteTime + 0.75);
    });
  } catch (err) {
    console.debug("Harp arpeggio failed", err);
  }
};

// Looping soft, warm atmospheric background hum
let humInterval = null;
export const playDreamyHum = (isHummingFn, isSoundOn = true) => {
  if (!isSoundOn) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    // Deep warm note (C3 at 130.81Hz)
    osc.frequency.setValueAtTime(130.81, now);
    
    gain.gain.setValueAtTime(0.02, now);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    
    if (humInterval) clearInterval(humInterval);
    humInterval = setInterval(() => {
      if (!isHummingFn()) {
        const stopTime = ctx.currentTime;
        gain.gain.setValueAtTime(gain.gain.value, stopTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, stopTime + 0.35);
        osc.stop(stopTime + 0.45);
        clearInterval(humInterval);
      }
    }, 45);
  } catch (err) {
    console.debug("Dreamy hum error", err);
  }
};
