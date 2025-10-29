import { Dog } from './types';

export const DOGS: Dog[] = [
  {
    id: 'slobbo',
    name: 'Slobbo',
    breed: 'Saint Bernard',
    emoji: '🐕',
    color: '#8B4513',
    slobberPattern: {
      type: 'heavy-slow',
      frequency: 1200,
      speed: 2,
      size: 40,
      variance: 0.3
    },
    description: 'The gentle giant with massive, slow-moving slobber drops',
    unlockScore: 0
  },
  {
    id: 'dribble',
    name: 'Dribble',
    breed: 'Beagle',
    emoji: '🐶',
    color: '#CD853F',
    slobberPattern: {
      type: 'rapid-fire',
      frequency: 400,
      speed: 4,
      size: 20,
      variance: 0.5
    },
    description: 'Hyperactive pup with rapid-fire tiny droplets',
    unlockScore: 500
  },
  {
    id: 'miss-muzzle',
    name: 'Miss Muzzle',
    breed: 'Mastiff',
    emoji: '🦮',
    color: '#A0522D',
    slobberPattern: {
      type: 'spray',
      frequency: 800,
      speed: 3,
      size: 30,
      variance: 0.8
    },
    description: 'Unpredictable spray patterns that cover the screen',
    unlockScore: 1500
  },
  {
    id: 'puddles',
    name: 'Puddles',
    breed: 'Pug',
    emoji: '🐕‍🦺',
    color: '#DEB887',
    slobberPattern: {
      type: 'bouncing',
      frequency: 600,
      speed: 3.5,
      size: 25,
      variance: 0.6
    },
    description: 'Bouncing slobber physics that ricochet across the screen',
    unlockScore: 3000
  }
];

export function getDogById(id: string): Dog | undefined {
  return DOGS.find(dog => dog.id === id);
}

export function getUnlockedDogs(score: number): Dog[] {
  return DOGS.filter(dog => dog.unlockScore <= score);
}

export function getDogsForLevel(level: number): string[] {
  if (level <= 3) return ['slobbo'];
  if (level <= 7) return ['slobbo', 'dribble'];
  if (level <= 12) return ['slobbo', 'dribble', 'miss-muzzle'];
  return ['slobbo', 'dribble', 'miss-muzzle', 'puddles'];
}
