// Soothing Cyber Background Music Song Player & SFX Engine
// Plays relaxing atmospheric ambient background music with full mute control & tab lifecycle management.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // Default muted for browser autoplay compliance
  private audioTrack: HTMLAudioElement | null = null;
  private bgMusicNode: GainNode | null = null;
  private ambientOscs: { osc: OscillatorNode; gain: GainNode }[] = [];
  private ambientFilter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isMusicPlaying: boolean = false;
  private listenersAttached: boolean = false;

  // Music Progression Timers
  private chordTimer: NodeJS.Timeout | null = null;
  private arpeggioTimer: NodeJS.Timeout | null = null;
  private currentChordIdx: number = 0;

  // Peaceful 4-Chord Progression (Cmaj9 -> Am9 -> Fmaj7 -> Gsus4)
  private chordProgression = [
    [130.81, 196.0, 246.94, 329.63, 392.0], // Cmaj9 (C3, G3, B3, E4, G4)
    [110.0, 164.81, 196.0, 261.63, 329.63], // Am9 (A2, E3, G3, C4, E4)
    [87.31, 130.81, 164.81, 220.0, 261.63],  // Fmaj7 (F2, C3, E3, A3, C4)
    [98.0, 146.83, 196.0, 246.94, 293.66],  // Gsus4 (G2, D3, G3, B3, D4)
  ];

  private melodyNotes = [261.63, 329.63, 392.0, 493.88, 523.25, 659.25, 783.99];

  constructor() {
    this.attachLifecycleListeners();
    this.initAudioTrack();
  }

  private initAudioTrack() {
    if (typeof window !== "undefined") {
      // High-quality soothing ambient relaxation soundtrack stream
      this.audioTrack = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soothing-ambient-112199.mp3");
      this.audioTrack.loop = true;
      this.audioTrack.volume = 0.35; // Comfortable soothing volume
    }
  }

  private attachLifecycleListeners() {
    if (typeof window === "undefined" || this.listenersAttached) return;
    this.listenersAttached = true;

    const handleVisibilityOrUnload = () => {
      if (document.hidden || document.visibilityState === "hidden") {
        this.suspendAudio();
      } else if (!this.isMuted && this.ctx && this.ctx.state === "suspended") {
        this.resumeAudio();
      }
    };

    const handlePageExit = () => {
      this.destroyAudio();
    };

    document.addEventListener("visibilitychange", handleVisibilityOrUnload);
    window.addEventListener("pagehide", handlePageExit);
    window.addEventListener("beforeunload", handlePageExit);
    window.addEventListener("unload", handlePageExit);
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public suspendAudio() {
    if (this.audioTrack && !this.audioTrack.paused) {
      try {
        this.audioTrack.pause();
      } catch {}
    }
    if (this.ctx && this.ctx.state === "running") {
      try {
        this.ctx.suspend();
      } catch {}
    }
  }

  public resumeAudio() {
    if (!this.isMuted) {
      if (this.audioTrack) {
        try {
          this.audioTrack.play().catch(() => {
            this.startSynthMusic();
          });
        } catch {
          this.startSynthMusic();
        }
      } else {
        this.startSynthMusic();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        try {
          this.ctx.resume();
        } catch {}
      }
    }
  }

  public destroyAudio() {
    this.stopAmbientMusic();
    if (this.audioTrack) {
      try {
        this.audioTrack.pause();
        this.audioTrack.currentTime = 0;
      } catch {}
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
    }
  }

  // Simultaneous Toggle for BOTH Ambient Music & UI Sound Effects
  public toggleMute(): boolean {
    this.initCtx();
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.stopAmbientMusic();
      this.suspendAudio();
    } else {
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      this.startAmbientMusic();
      this.playSuccess();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Start Soothing Ambient Music Song Track (with Web Audio synth fallback)
  public startAmbientMusic() {
    if (this.isMuted) return;

    if (this.audioTrack) {
      try {
        this.audioTrack.currentTime = 0;
        this.audioTrack.play().then(() => {
          this.isMusicPlaying = true;
        }).catch(() => {
          // Fallback to Web Audio synth song composer if network audio stream is blocked
          this.startSynthMusic();
        });
        return;
      } catch {}
    }

    this.startSynthMusic();
  }

  // Fallback Soothing Web Audio Synth Soundtrack Generator
  private startSynthMusic() {
    if (this.isMuted || this.isMusicPlaying) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      this.bgMusicNode = this.ctx.createGain();
      this.bgMusicNode.gain.setValueAtTime(0, now);
      this.bgMusicNode.gain.linearRampToValueAtTime(0.35, now + 1.5);

      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientFilter.type = "lowpass";
      this.ambientFilter.frequency.setValueAtTime(750, now);
      this.ambientFilter.Q.setValueAtTime(2.0, now);

      this.lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      this.lfo.type = "sine";
      this.lfo.frequency.setValueAtTime(0.12, now);
      lfoGain.gain.setValueAtTime(250, now);

      this.lfo.connect(this.ambientFilter.frequency);
      this.lfo.start(now);

      this.ambientFilter.connect(this.bgMusicNode);
      this.bgMusicNode.connect(this.ctx.destination);

      this.isMusicPlaying = true;
      this.currentChordIdx = 0;

      this.updateChordPad();

      this.chordTimer = setInterval(() => {
        if (!this.isMuted && this.isMusicPlaying) {
          this.currentChordIdx = (this.currentChordIdx + 1) % this.chordProgression.length;
          this.updateChordPad();
        }
      }, 6000);

      let noteStep = 0;
      this.arpeggioTimer = setInterval(() => {
        if (!this.isMuted && this.isMusicPlaying && !document.hidden) {
          this.playMelodyNote(noteStep);
          noteStep = (noteStep + 1) % this.melodyNotes.length;
        }
      }, 750);
    } catch {
      this.isMusicPlaying = false;
    }
  }

  private updateChordPad() {
    if (!this.ctx || !this.ambientFilter || this.isMuted) return;

    const freqs = this.chordProgression[this.currentChordIdx];
    const now = this.ctx.currentTime;

    this.ambientOscs.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0.001, now + 1.2);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        }, 1200);
      } catch {}
    });
    this.ambientOscs = [];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      osc.type = idx % 2 === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((idx - 2) * 6, now);

      const gain = this.ctx!.createGain();
      const targetGain = (0.28 / freqs.length) * (idx % 2 === 0 ? 1.0 : 0.8);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 1.5);

      osc.connect(gain);
      gain.connect(this.ambientFilter!);
      osc.start(now);

      this.ambientOscs.push({ osc, gain });
    });
  }

  private playMelodyNote(step: number) {
    if (!this.ctx || this.isMuted || !this.bgMusicNode) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const noteFreq = this.melodyNotes[(step * 3 + this.currentChordIdx * 2) % this.melodyNotes.length];

      osc.type = "sine";
      osc.frequency.setValueAtTime(noteFreq, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.bgMusicNode);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {}
  }

  // Instant Stop on Mute
  public stopAmbientMusic() {
    if (this.audioTrack) {
      try {
        this.audioTrack.pause();
      } catch {}
    }

    if (this.chordTimer) {
      clearInterval(this.chordTimer);
      this.chordTimer = null;
    }
    if (this.arpeggioTimer) {
      clearInterval(this.arpeggioTimer);
      this.arpeggioTimer = null;
    }

    if (!this.ctx) {
      this.isMusicPlaying = false;
      return;
    }
    try {
      const now = this.ctx.currentTime;
      if (this.bgMusicNode) {
        this.bgMusicNode.gain.cancelScheduledValues(now);
        this.bgMusicNode.gain.setValueAtTime(this.bgMusicNode.gain.value, now);
        this.bgMusicNode.gain.linearRampToValueAtTime(0, now + 0.1);
      }

      this.ambientOscs.forEach(({ osc }) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      if (this.lfo) {
        try {
          this.lfo.stop();
          this.lfo.disconnect();
        } catch {}
      }
      this.ambientOscs = [];
      this.isMusicPlaying = false;
    } catch {
      this.isMusicPlaying = false;
    }
  }

  // LOUDER UI SFX: Magnetic hover tick
  public playHover() {
    if (this.isMuted || document.hidden) return;
    try {
      this.initCtx();
      if (!this.ctx || this.ctx.state !== "running") return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  // LOUDER UI SFX: Crystal click chime
  public playClick() {
    if (this.isMuted || document.hidden) return;
    try {
      this.initCtx();
      if (!this.ctx || this.ctx.state !== "running") return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1160, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {}
  }

  // LOUDER UI SFX: Section transition sub-bass
  public playNav() {
    if (this.isMuted || document.hidden) return;
    try {
      this.initCtx();
      if (!this.ctx || this.ctx.state !== "running") return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {}
  }

  // LOUDER UI SFX: Success confirmation double-chime
  public playSuccess() {
    if (this.isMuted || document.hidden) return;
    try {
      this.initCtx();
      if (!this.ctx || this.ctx.state !== "running") return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(523.25, now);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(659.25, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.08);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.25);
    } catch {}
  }
}

export const audioEngine = new AudioEngine();
