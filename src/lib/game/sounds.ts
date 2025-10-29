// Sound Effects System for Slobberer
// In a production environment, these would link to actual audio files

export type SoundEffect = 'splat' | 'bark' | 'level-up' | 'game-over' | 'menu-click';

class SoundManager {
  private sounds: Map<SoundEffect, HTMLAudioElement | null> = new Map();
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('slobberer-sound-enabled') !== 'false';
    }
  }

  // Play a sound effect
  play(effect: SoundEffect) {
    if (!this.enabled || typeof window === 'undefined') return;

    // In production, this would play actual audio files
    // For now, we'll use Web Audio API to generate simple sounds
    this.generateSound(effect);
  }

  // Generate simple procedural sounds using Web Audio API
  private generateSound(effect: SoundEffect) {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      switch (effect) {
        case 'splat':
          // Wet splat sound (low frequency noise)
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 0.1);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;

        case 'bark':
          // Dog bark (quick frequency sweep)
          oscillator.type = 'square';
          oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.05);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.05);
          break;

        case 'level-up':
          // Victory sound (ascending notes)
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(554, audioContext.currentTime + 0.1);
          oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + 0.2);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.4);
          break;

        case 'game-over':
          // Game over sound (descending)
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.5);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.5);
          break;

        case 'menu-click':
          // Menu click (short blip)
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.05);
          break;
      }
    } catch (error) {
      // Silently fail if Web Audio API is not available
      console.warn('Web Audio API not available:', error);
    }
  }

  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('slobberer-sound-enabled', this.enabled.toString());
    }
    return this.enabled;
  }

  // Get current sound state
  isEnabled() {
    return this.enabled;
  }

  // Set sound state
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('slobberer-sound-enabled', enabled.toString());
    }
  }
}

// Singleton instance
let soundManager: SoundManager | null = null;

export function getSoundManager(): SoundManager {
  if (!soundManager) {
    soundManager = new SoundManager();
  }
  return soundManager;
}

// Convenience function
export function playSound(effect: SoundEffect) {
  getSoundManager().play(effect);
}
