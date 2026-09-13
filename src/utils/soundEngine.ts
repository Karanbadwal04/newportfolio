// ============================================================
// Sound Engine — Background Music & Sweet Acoustic Piano FX
// Powered by HTML5 Audio + Web Audio API Synthesis
// Ultra-optimized for zero hover latency
// ============================================================

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private dryGain: GainNode | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private isInitialized = false;
  private isMuted: boolean;
  private hoverNoteIndex = 0;
  private bgMusicTargetVolume = 0.22;
  private fadeInterval: number | null = null;
  private lastHoverTime = 0;

  // Sweet E-Major / Lydian pentatonic scale frequencies (Hz) for hover notes
  private readonly HOVER_SCALE = [
    659.25, // E5
    739.99, // F#5
    830.61, // G#5
    987.77, // B5
    1108.73, // C#6
    1244.51, // D#6
    1318.51, // E6
    1479.98, // F#6
    1661.22, // G#6
    1975.53, // B6
  ];

  constructor() {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('sound-pref') : null;
    this.isMuted = stored === null ? true : stored === 'muted';
  }

  // Must be called from a user gesture (click/tap)
  init(): void {
    if (this.isInitialized) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output for synthesized SFX
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : 1;
      this.masterGain.connect(this.ctx.destination);

      // Algorithmic soundboard reverb for click chords
      this.reverbNode = this.ctx.createConvolver();
      this.reverbNode.buffer = this.buildPianoReverbImpulse(this.ctx, 1.8, 2.4);

      this.dryGain = this.ctx.createGain();
      this.dryGain.gain.value = 0.85;
      this.dryGain.connect(this.masterGain);

      const wetGain = this.ctx.createGain();
      wetGain.gain.value = 0.35;
      this.reverbNode.connect(wetGain);
      wetGain.connect(this.masterGain);

      // Background Music from public/music.mp3
      this.initBackgroundMusic();

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
    }
  }

  private initBackgroundMusic(): void {
    if (typeof window === 'undefined') return;

    try {
      this.bgAudio = new Audio('/music.mp3');
      this.bgAudio.loop = true;
      this.bgAudio.preload = 'auto';
      this.bgAudio.volume = this.isMuted ? 0 : this.bgMusicTargetVolume;

      if (!this.isMuted) {
        this.bgAudio.play().catch(() => {});
      }
    } catch (err) {
      console.warn('Could not initialize background music:', err);
    }
  }

  private buildPianoReverbImpulse(ctx: AudioContext, duration = 1.8, decay = 2.4): AudioBuffer {
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * duration);
    const impulse = ctx.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const t = i / rate;
      const factor = Math.exp(-t * decay);
      left[i] = (Math.random() * 2 - 1) * factor;
      right[i] = (Math.random() * 2 - 1) * factor;
    }
    return impulse;
  }

  private ensureCtx(): boolean {
    if (!this.ctx || !this.masterGain) return false;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return true;
  }

  /**
   * Fast, ultra-lightweight sweet piano chime on hover (Zero lag)
   */
  playHover(): void {
    if (this.isMuted || !this.ensureCtx() || !this.ctx || !this.dryGain) return;

    const now = performance.now();
    // Debounce rapid multi-element mouse sweeps by 65ms
    if (now - this.lastHoverTime < 65) return;
    this.lastHoverTime = now;

    const audioNow = this.ctx.currentTime;
    const freq = this.HOVER_SCALE[this.hoverNoteIndex % this.HOVER_SCALE.length];
    this.hoverNoteIndex = (this.hoverNoteIndex + 1) % this.HOVER_SCALE.length;

    // Fast 2-oscillator sweet harmonic chime
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, audioNow);
    gain.gain.linearRampToValueAtTime(0.055, audioNow + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioNow + 0.35);

    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, audioNow);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.001, audioNow);

    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.25, audioNow);

    osc1.connect(gain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(gain);
    gain.connect(this.dryGain);

    osc1.start(audioNow);
    osc2.start(audioNow);
    osc1.stop(audioNow + 0.35);
    osc2.stop(audioNow + 0.35);
  }

  /**
   * Rich rolled grand piano chord on click
   */
  playClick(): void {
    if (this.isMuted || !this.ensureCtx() || !this.ctx || !this.dryGain) return;

    const chordNotes = [329.63, 415.30, 493.88, 622.25, 830.61]; // E4, G#4, B4, D#5, G#5
    chordNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted && this.ctx && this.dryGain) {
          const now = this.ctx.currentTime;
          const gain = this.ctx.createGain();
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.06 - idx * 0.008, now + 0.003);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

          const osc = this.ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          osc.connect(gain);
          gain.connect(this.dryGain);
          if (this.reverbNode) gain.connect(this.reverbNode);

          osc.start(now);
          osc.stop(now + 0.95);
        }
      }, idx * 16);
    });
  }

  // ── Background Music Controls ───────────────────────────

  startAmbient(): void {
    if (this.isMuted) return;

    if (!this.bgAudio) {
      this.initBackgroundMusic();
    }

    if (this.bgAudio) {
      this.fadeAudio(this.bgAudio, this.bgMusicTargetVolume, 1200);
      this.bgAudio.play().catch(() => {});
    }
  }

  stopAmbient(): void {
    if (this.bgAudio) {
      this.fadeAudio(this.bgAudio, 0, 600, () => {
        this.bgAudio?.pause();
      });
    }
  }

  private fadeAudio(
    audio: HTMLAudioElement,
    targetVolume: number,
    durationMs: number,
    onComplete?: () => void
  ): void {
    if (this.fadeInterval !== null) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    const steps = 20;
    const stepTime = durationMs / steps;
    const startVolume = audio.volume;
    const delta = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    this.fadeInterval = window.setInterval(() => {
      currentStep++;
      const newVol = Math.max(0, Math.min(1, startVolume + delta * currentStep));
      audio.volume = newVol;

      if (currentStep >= steps) {
        if (this.fadeInterval !== null) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
        }
        audio.volume = targetVolume;
        onComplete?.();
      }
    }, stepTime);
  }

  // ── Mute / Unmute Toggle ────────────────────────────────

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound-pref', this.isMuted ? 'muted' : 'unmuted');
    }

    if (!this.isInitialized) {
      this.init();
    }

    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(
        this.isMuted ? 0 : 1,
        now + 0.15
      );
    }

    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      setTimeout(() => {
        this.playHover();
      }, 50);
    }

    return !this.isMuted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  getInitialized(): boolean {
    return this.isInitialized;
  }
}

// Singleton
export const soundEngine = new SoundEngine();
