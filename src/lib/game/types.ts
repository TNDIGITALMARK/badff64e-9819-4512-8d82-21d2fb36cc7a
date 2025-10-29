// Game Types and Interfaces

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Slobber {
  id: string;
  position: Position;
  velocity: Velocity;
  size: number;
  color: string;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  emoji: string;
  color: string;
  slobberPattern: SlobberPattern;
  description: string;
  unlockScore: number;
}

export interface SlobberPattern {
  type: 'heavy-slow' | 'rapid-fire' | 'spray' | 'bouncing';
  frequency: number; // milliseconds between slobber drops
  speed: number;
  size: number;
  variance: number; // randomness factor
}

export interface Player {
  position: Position;
  width: number;
  height: number;
  speed: number;
}

export interface GameState {
  player: Player;
  slobbers: Slobber[];
  dogs: Dog[];
  activeDogs: string[];
  score: number;
  level: number;
  gameOver: boolean;
  isPaused: boolean;
  highScore: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
}

export interface PowerUp {
  id: string;
  type: 'shield' | 'slow-motion' | 'multiplier';
  position: Position;
  duration: number;
  active: boolean;
  timeLeft: number;
}
