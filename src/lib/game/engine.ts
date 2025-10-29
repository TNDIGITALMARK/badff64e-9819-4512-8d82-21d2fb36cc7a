import { GameState, Slobber, Position, Dog, Player, PowerUp } from './types';
import { DOGS, getDogsForLevel, getDogById } from './dogs';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const PLAYER_WIDTH = 60;
export const PLAYER_HEIGHT = 60;
export const PLAYER_SPEED = 8;

export function createInitialGameState(): GameState {
  const highScore = typeof window !== 'undefined'
    ? parseInt(localStorage.getItem('slobberer-high-score') || '0', 10)
    : 0;

  return {
    player: {
      position: { x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 100 },
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      speed: PLAYER_SPEED
    },
    slobbers: [],
    dogs: DOGS,
    activeDogs: ['slobbo'],
    score: 0,
    level: 1,
    gameOver: false,
    isPaused: false,
    highScore,
    soundEnabled: true,
    musicEnabled: true
  };
}

export function generateSlobber(dog: Dog, canvasWidth: number): Slobber {
  const pattern = dog.slobberPattern;
  const variance = pattern.variance;

  let x = Math.random() * canvasWidth;
  let speedX = 0;
  let speedY = pattern.speed * (1 + (Math.random() - 0.5) * variance);
  let size = pattern.size * (1 + (Math.random() - 0.5) * variance * 0.5);

  // Apply pattern-specific behaviors
  switch (pattern.type) {
    case 'spray':
      speedX = (Math.random() - 0.5) * 4;
      break;
    case 'bouncing':
      speedX = (Math.random() - 0.5) * 2;
      break;
    case 'rapid-fire':
      x = Math.random() * canvasWidth;
      break;
    default:
      break;
  }

  return {
    id: `${dog.id}-${Date.now()}-${Math.random()}`,
    position: { x, y: -size },
    velocity: { x: speedX, y: speedY },
    size,
    color: '#E5E5E5'
  };
}

export function updateSlobbers(
  slobbers: Slobber[],
  canvasWidth: number,
  canvasHeight: number,
  deltaTime: number = 16
): Slobber[] {
  return slobbers
    .map(slobber => {
      const newX = slobber.position.x + slobber.velocity.x * (deltaTime / 16);
      const newY = slobber.position.y + slobber.velocity.y * (deltaTime / 16);

      // Bounce off walls for bouncing pattern
      let velocityX = slobber.velocity.x;
      if (newX < 0 || newX > canvasWidth - slobber.size) {
        velocityX = -velocityX * 0.8; // Dampen bounce
      }

      return {
        ...slobber,
        position: { x: newX, y: newY },
        velocity: { x: velocityX, y: slobber.velocity.y }
      };
    })
    .filter(slobber => slobber.position.y < canvasHeight + slobber.size);
}

export function checkCollision(
  player: Player,
  slobber: Slobber
): boolean {
  const playerCenterX = player.position.x + player.width / 2;
  const playerCenterY = player.position.y + player.height / 2;
  const slobberCenterX = slobber.position.x + slobber.size / 2;
  const slobberCenterY = slobber.position.y + slobber.size / 2;

  const distance = Math.sqrt(
    Math.pow(playerCenterX - slobberCenterX, 2) +
    Math.pow(playerCenterY - slobberCenterY, 2)
  );

  const combinedRadius = (player.width / 2) + (slobber.size / 2);
  return distance < combinedRadius * 0.8; // Slightly forgiving hitbox
}

export function updatePlayer(
  player: Player,
  direction: 'left' | 'right' | null,
  canvasWidth: number,
  deltaTime: number = 16
): Player {
  if (!direction) return player;

  const movement = player.speed * (deltaTime / 16);
  let newX = player.position.x;

  if (direction === 'left') {
    newX = Math.max(0, player.position.x - movement);
  } else if (direction === 'right') {
    newX = Math.min(canvasWidth - player.width, player.position.x + movement);
  }

  return {
    ...player,
    position: { ...player.position, x: newX }
  };
}

export function calculateLevel(score: number): number {
  return Math.floor(score / 500) + 1;
}

export function updateGameDifficulty(state: GameState): GameState {
  const newLevel = calculateLevel(state.score);

  if (newLevel !== state.level) {
    const activeDogs = getDogsForLevel(newLevel);
    return {
      ...state,
      level: newLevel,
      activeDogs
    };
  }

  return state;
}

export function saveHighScore(score: number): void {
  if (typeof window !== 'undefined') {
    const currentHigh = parseInt(localStorage.getItem('slobberer-high-score') || '0', 10);
    if (score > currentHigh) {
      localStorage.setItem('slobberer-high-score', score.toString());
    }
  }
}

export function getLeaderboard(): Array<{ name: string; score: number }> {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('slobberer-leaderboard');
    if (data) {
      return JSON.parse(data);
    }
  }

  // Mock data
  return [
    { name: 'Slobber Dodger Supreme', score: 15847 },
    { name: 'Drool Pool Champion', score: 12203 },
    { name: 'Soggy Sock Survivor', score: 9876 },
    { name: 'Moisture Master', score: 7432 },
    { name: 'Dry Dream Keeper', score: 5678 }
  ];
}

export function addToLeaderboard(name: string, score: number): void {
  if (typeof window !== 'undefined') {
    const leaderboard = getLeaderboard();
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    const top10 = leaderboard.slice(0, 10);
    localStorage.setItem('slobberer-leaderboard', JSON.stringify(top10));
  }
}
