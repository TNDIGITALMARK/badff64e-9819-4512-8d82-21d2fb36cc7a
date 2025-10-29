# 🐕 SLOBBERER - Can You Dodge the Drool?

A hilariously absurd cartoon arcade browser game where you dodge flying slobber from over-excited dogs!

## 🎮 Game Overview

**SLOBBERER** is a fast-paced, cartoon-style arcade game that combines retro gaming nostalgia with modern meme-ready humor. Players must dodge increasingly challenging patterns of dog slobber while climbing the leaderboard and unlocking new dog characters.

### Core Gameplay
- **Move left and right** to avoid slobber drops falling from the top
- **Survive as long as possible** to maximize your score
- **Unlock new dogs** at score milestones (500, 1500, 3000 points)
- **Master unique patterns** - each dog breed has different slobber physics

## 🌟 Features

### 🎨 Visual Design
- **Watermelon-bright color palette** (reds, greens, pinks, whites)
- **Cartoon arcade aesthetic** with bold black outlines
- **Custom fonts** (Fredoka, Luckiest Guy, Bangers) for authentic arcade feel
- **Smooth animations** including dripping effects, bouncing, and wobbling

### 🐶 Four Unique Dog Characters
1. **Slobbo the Saint Bernard** - Heavy, slow-moving drops (Unlocked from start)
2. **Dribble the Beagle** - Rapid-fire tiny droplets (Unlock at 500 points)
3. **Miss Muzzle the Mastiff** - Unpredictable spray patterns (Unlock at 1500 points)
4. **Puddles the Pug** - Bouncing slobber physics (Unlock at 3000 points)

### 🎯 Game Modes
- **Endless Mode** - Survive as long as possible
- **Progressive Difficulty** - More dogs appear every 500 points
- **Level System** - Difficulty increases with your score

### 🏆 Leaderboard System
- **Local high score tracking**
- **Hall of Slobber** leaderboard page
- **Save your name** to compete with others
- **Top 10 scores** displayed with rankings

### 📱 Mobile Optimized
- **Touch controls** - Tap left/right side of screen to move
- **Responsive design** - Works on all screen sizes
- **Mobile-friendly UI** - Large touch targets and clear visuals

### 🎵 Audio System
- **Procedural sound effects** using Web Audio API
- **Sound types**: Splat, bark, level-up, game-over, menu click
- **Toggle sound** on/off (saved to localStorage)

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:4006` to play!

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page with hero section
│   ├── game/
│   │   └── page.tsx          # Main game page
│   ├── leaderboard/
│   │   └── page.tsx          # Hall of Slobber leaderboard
│   ├── dogs/
│   │   └── page.tsx          # Meet the Dogs character profiles
│   ├── globals.css           # Global styles and design system
│   └── layout.tsx            # Root layout with metadata
├── components/
│   └── game/
│       └── GameCanvas.tsx    # Core game canvas component
└── lib/
    └── game/
        ├── types.ts          # TypeScript interfaces
        ├── dogs.ts           # Dog character data
        ├── engine.ts         # Game logic and physics
        └── sounds.ts         # Audio system

public/
└── slobber-icon.svg          # Animated favicon
```

## 🎮 Controls

### Desktop
- **Arrow Left / A** - Move left
- **Arrow Right / D** - Move right
- **Space / Escape** - Pause game

### Mobile
- **Tap left side** - Move left
- **Tap right side** - Move right

## 🎨 Design System

### Colors (HSL)
- **Primary Pink**: `330 85% 65%`
- **Secondary Green**: `145 80% 55%`
- **Accent Red**: `0 85% 55%`
- **Bright Lime**: `90 75% 60%`

### Fonts
- **Headings**: Luckiest Guy
- **Arcade Text**: Bangers
- **Body**: Fredoka

### Effects
- Cartoon shadows with black outlines
- Pulse animations for interactive elements
- Drip animations for slobber effects
- Bounce-in animations for page loads

## 🏗️ Technical Details

### Built With
- **Next.js 15.5.2** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **HTML Canvas** - Game rendering
- **Web Audio API** - Sound effects
- **localStorage** - Score persistence

### Game Engine Features
- **60 FPS game loop** using requestAnimationFrame
- **Delta time calculations** for smooth movement
- **Collision detection** with circular hitboxes
- **Dynamic difficulty scaling** based on score
- **Multiple slobber patterns** with unique physics

## 🎯 Game Mechanics

### Scoring
- Score increases over time survived
- Longer survival = higher score
- No score for dodging (incentivizes risky play)

### Difficulty Progression
- **Level 1-3**: 1 dog (Slobbo)
- **Level 4-7**: 2 dogs (Slobbo + Dribble)
- **Level 8-12**: 3 dogs (+ Miss Muzzle)
- **Level 13+**: 4 dogs (+ Puddles)

### Collision System
- Circular hitbox detection
- Slightly forgiving (80% radius) for better gameplay
- Instant game over on collision

## 🌐 Pages

### 1. Home Page (`/`)
- Massive animated PLAY NOW button
- "Can You Dodge the Drool?" tagline
- Feature highlights
- Navigation to all sections

### 2. Game Page (`/game`)
- Full game canvas (800x600)
- Real-time score and level display
- Pause menu
- Game over screen with score entry
- Control instructions

### 3. Leaderboard (`/leaderboard`)
- Top 10 scores with rankings
- Gold/Silver/Bronze medals for top 3
- Fun stats display
- Quick navigation to play

### 4. Dogs Page (`/dogs`)
- Character profiles for all 4 dogs
- Unlock requirements
- Slobber pattern stats
- Pro tips for gameplay

## 🎨 Visual Style Guide

### Typography
- **Main Title**: 6rem, uppercase, bold shadow
- **Headings**: Chunky arcade fonts with outlines
- **Body**: Rounded, friendly, readable

### Buttons
- 4px black borders
- Gradient backgrounds
- Shadow on press effect
- Scale on hover (1.05x)
- Bounce animations

### Cards
- White background with transparency
- 4px black borders
- Rounded corners (1rem)
- Cartoon shadow effects

## 🚀 Deployment

This game is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any static hosting** after `npm run build`

### Domain Ready
Designed for deployment at **Slobberer.com**

## 🎮 Future Enhancement Ideas

- **Power-ups**: Shield, slow-motion, score multiplier
- **Boss dogs**: Special challenge modes
- **Daily challenges**: New patterns each day
- **Social sharing**: Share high scores
- **Achievement system**: Unlock badges
- **Multiple game modes**: Time attack, precision challenges
- **Real audio files**: Professional sound effects and music
- **Multiplayer**: Compete with friends in real-time

## 📜 License

This game is a demonstration project. All rights reserved.

## 🎉 Credits

**Design & Development**: Built with Claude Code
**Fonts**: Google Fonts (Fredoka, Luckiest Guy, Bangers)
**Inspiration**: Classic arcade games + modern meme culture

---

## 🐾 Play Now!

Start dodging slobber at `http://localhost:4006` and climb to the top of the Hall of Slobber!

**Can you survive the drool?** 💧🐕
