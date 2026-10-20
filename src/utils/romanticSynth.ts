/**
 * Romantic Music Box Synthesizer (Web Audio API)
 * Plays a delicate, soothing romantic chime melody without any external audio file dependency.
 */

class RomanticSynthPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private volume: number = 0.35;

  // Gentle pentatonic/romantic notes (Frequencies in Hz)
  private melody = [
    { note: 261.63, dur: 0.8 }, // C4
    { note: 329.63, dur: 0.8 }, // E4
    { note: 392.00, dur: 0.8 }, // G4
    { note: 493.88, dur: 1.2 }, // B4
    { note: 523.25, dur: 1.6 }, // C5 (high soft note)
    { note: 440.00, dur: 0.8 }, // A4
    { note: 392.00, dur: 0.8 }, // G4
    { note: 329.63, dur: 1.4 }, // E4
    { note: 293.66, dur: 0.8 }, // D4
    { note: 349.23, dur: 0.8 }, // F4
    { note: 440.00, dur: 1.0 }, // A4
    { note: 392.00, dur: 1.8 }, // G4
  ];
  private currentNoteIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.gainNode) return;

    // Dual oscillator for a rich, warm music-box chime
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, this.ctx.currentTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, this.ctx.currentTime); // 1 octave overtone

    const now = this.ctx.currentTime;
    // Bell / Music box envelope: fast attack, gentle exponential decay
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.4, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  public start() {
    if (this.isPlaying) return;
    this.initContext();
    this.isPlaying = true;
    this.currentNoteIndex = 0;

    const playNext = () => {
      if (!this.isPlaying) return;
      const item = this.melody[this.currentNoteIndex];
      this.playTone(item.note, item.dur);

      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
      const intervalMs = (item.dur + 0.4) * 1000;
      this.timerId = window.setTimeout(playNext, intervalMs);
    };

    playNext();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const romanticSynth = new RomanticSynthPlayer();
