// ============================================================
// Sound Engine — Background Music & Sweet Acoustic Piano FX
// Powered by HTML5 Audio + Web Audio API Synthesis
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

      // Algorithmic soundboard reverb for piano SFX
      this.reverbNode = this.ctx.createConvolver();
      this.reverbNode.buffer = this.buildPianoReverbImpulse(this.ctx, 2.0, 2.2);

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
        this.bgAudio.play().catch(() => {
          // Autoplay was prevented by browser until further interaction
        });
      }
    } catch (err) {
      console.warn('Could not initialize background music:', err);
    }
  }

  private buildPianoReverbImpulse(ctx: AudioContext, duration = 2.0, decay = 2.0): AudioBuffer {
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
   * Synthesizes a sweet acoustic piano note
   */
  private playPianoNote(freq: number, velocity = 0.65, duration = 1.6): void {
    if (this.isMuted || !this.ensureCtx() || !this.ctx || !this.dryGain || !this.reverbNode) return;

    const now = this.ctx.currentTime;
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(velocity * 0.1, now + 0.003);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.05, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    const cutoff = Math.min(7500, freq * 4.5 + 800);
    filter.frequency.setValueAtTime(cutoff, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(400, freq * 1.5), now + duration * 0.7);

    noteGain.connect(filter);
    filter.connect(this.dryGain);
    filter.connect(this.reverbNode);

    const B = 0.00025;
    const harmonics = [
      { n: 1, gain: 1.0, decayFactor: 1.0 },
      { n: 2, gain: 0.65, decayFactor: 0.9 },
      { n: 3, gain: 0.35, decayFactor: 0.7 },
      { n: 4, gain: 0.20, decayFactor: 0.55 },
      { n: 5, gain: 0.10, decayFactor: 0.4 },
    ];

    harmonics.forEach(({ n, gain: hGain, decayFactor }) => {
      const partialFreq = n * freq * Math.sqrt(1 + B * n * n);
      if (partialFreq > 16000) return;

      [-1.2, 1.2].forEach((detuneCents) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();

        osc.type = n === 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(partialFreq, now);
        osc.detune.setValueAtTime(detuneCents, now);

        const partialDuration = duration * decayFactor;
        oscGain.gain.setValueAtTime(hGain * 0.5, now);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + partialDuration);

        osc.connect(oscGain);
        oscGain.connect(noteGain);

        osc.start(now);
        osc.stop(now + partialDuration);
      });
    });

    // Hammer percussive transient
    const hammerOsc = this.ctx.createOscillator();
    const hammerGain = this.ctx.createGain();
    const hammerFilter = this.ctx.createBiquadFilter();

    hammerOsc.type = 'triangle';
    hammerOsc.frequency.setValueAtTime(freq * 3, now);
    hammerOsc.frequency.exponentialRampToValueAtTime(100, now + 0.012);

    hammerFilter.type = 'bandpass';
    hammerFilter.frequency.setValueAtTime(1800, now);
    hammerFilter.Q.setValueAtTime(1.5, now);

    hammerGain.gain.setValueAtTime(velocity * 0.05, now);
    hammerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

    hammerOsc.connect(hammerFilter);
    hammerFilter.connect(hammerGain);
    hammerGain.connect(this.dryGain);

    hammerOsc.start(now);
    hammerOsc.stop(now + 0.02);
  }

  // ── Hover Sound ─────────────────────────────────────────

  playHover(): void {
    if (this.isMuted) return;

    const freq = this.HOVER_SCALE[this.hoverNoteIndex % this.HOVER_SCALE.length];
    this.hoverNoteIndex = (this.hoverNoteIndex + 1) % this.HOVER_SCALE.length;

    this.playPianoNote(freq, 0.4, 1.2);
  }

  // ── Click Sound ─────────────────────────────────────────

  playClick(): void {
    if (this.isMuted || !this.ensureCtx() || !this.ctx) return;

    const chordNotes = [329.63, 415.30, 493.88, 622.25, 830.61]; // E4, G#4, B4, D#5, G#5
    chordNotes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.isMuted) {
          this.playPianoNote(freq, 0.5 - idx * 0.04, 1.8);
        }
      }, idx * 18);
    });
  }

  // ── Background Music Controls ───────────────────────────

  startAmbient(): void {
    if (this.isMuted) return;

    if (!this.bgAudio) {
      this.initBackgroundMusic();
    }

    if (this.bgAudio) {
      this.fadeAudio(this.bgAudio, this.bgMusicTargetVolume, 1500);
      this.bgAudio.play().catch(() => {});
    }
  }

  stopAmbient(): void {
    if (this.bgAudio) {
      this.fadeAudio(this.bgAudio, 0, 800, () => {
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

    const steps = 25;
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
        now + 0.2
      );
    }

    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      // Confirmation chime
      setTimeout(() => {
        this.playPianoNote(830.61, 0.45, 1.4);
      }, 80);
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
