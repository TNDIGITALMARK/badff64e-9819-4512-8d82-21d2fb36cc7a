'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  createInitialGameState,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  generateSlobber,
  updateSlobbers,
  checkCollision,
  updatePlayer,
  updateGameDifficulty,
  saveHighScore,
  addToLeaderboard
} from '@/lib/game/engine';
import { GameState } from '@/lib/game/types';
import { getDogById } from '@/lib/game/dogs';

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const gameLoopRef = useRef<number | null>(null);
  const slobberTimersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameOver || gameState.isPaused) return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setDirection('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setDirection('right');
      } else if (e.key === ' ' || e.key === 'Escape') {
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A' ||
          e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setDirection(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.gameOver, gameState.isPaused]);

  // Touch controls for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (gameState.gameOver || gameState.isPaused) return;

    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const canvasWidth = rect.width;

    if (touchX < canvasWidth / 2) {
      setDirection('left');
    } else {
      setDirection('right');
    }
  }, [gameState.gameOver, gameState.isPaused]);

  const handleTouchEnd = useCallback(() => {
    setDirection(null);
  }, []);

  // Slobber generation
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused) return;

    // Clear existing timers
    slobberTimersRef.current.forEach(timer => clearTimeout(timer));
    slobberTimersRef.current.clear();

    // Set up slobber generation for each active dog
    gameState.activeDogs.forEach(dogId => {
      const dog = getDogById(dogId);
      if (!dog) return;

      const generateSlobberForDog = () => {
        if (gameState.gameOver || gameState.isPaused) return;

        setGameState(prev => ({
          ...prev,
          slobbers: [...prev.slobbers, generateSlobber(dog, CANVAS_WIDTH)]
        }));

        const timer = setTimeout(generateSlobberForDog, dog.slobberPattern.frequency);
        slobberTimersRef.current.set(dogId, timer);
      };

      generateSlobberForDog();
    });

    return () => {
      slobberTimersRef.current.forEach(timer => clearTimeout(timer));
      slobberTimersRef.current.clear();
    };
  }, [gameState.activeDogs, gameState.gameOver, gameState.isPaused]);

  // Main game loop
  useEffect(() => {
    if (gameState.gameOver || gameState.isPaused) return;

    let lastTime = performance.now();

    const gameLoop = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      setGameState(prev => {
        // Update player position
        const updatedPlayer = updatePlayer(prev.player, direction, CANVAS_WIDTH, deltaTime);

        // Update slobbers
        const updatedSlobbers = updateSlobbers(prev.slobbers, CANVAS_WIDTH, CANVAS_HEIGHT, deltaTime);

        // Check collisions
        let gameOver = prev.gameOver;
        for (const slobber of updatedSlobbers) {
          if (checkCollision(updatedPlayer, slobber)) {
            gameOver = true;
            saveHighScore(prev.score);
            setShowGameOver(true);
            break;
          }
        }

        // Update score (time survived)
        const newScore = prev.score + Math.floor(deltaTime / 100);

        // Update difficulty
        let updatedState = {
          ...prev,
          player: updatedPlayer,
          slobbers: updatedSlobbers,
          score: newScore,
          gameOver
        };

        updatedState = updateGameDifficulty(updatedState);

        return updatedState;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [direction, gameState.gameOver, gameState.isPaused]);

  // Render game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#A8E6CF');
    gradient.addColorStop(1, '#FFD3E0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw slobbers
    gameState.slobbers.forEach(slobber => {
      ctx.fillStyle = slobber.color;
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(
        slobber.position.x + slobber.size / 2,
        slobber.position.y + slobber.size / 2,
        slobber.size / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();

      // Add shine effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(
        slobber.position.x + slobber.size / 3,
        slobber.position.y + slobber.size / 3,
        slobber.size / 6,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });

    // Draw player (cartoon character)
    const playerX = gameState.player.position.x + gameState.player.width / 2;
    const playerY = gameState.player.position.y + gameState.player.height / 2;

    // Player body (circle)
    ctx.fillStyle = '#FF69B4';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(playerX, playerY, gameState.player.width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Player face (simple emoji-style)
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(playerX - 8, playerY - 5, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(playerX + 8, playerY - 5, 3, 0, Math.PI * 2);
    ctx.fill();

    // Player smile
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(playerX, playerY + 5, 10, 0, Math.PI);
    ctx.stroke();

  }, [gameState.player, gameState.slobbers]);

  const handleRestart = () => {
    setGameState(createInitialGameState());
    setShowGameOver(false);
    setPlayerName('');
  };

  const handleSaveScore = () => {
    if (playerName.trim()) {
      addToLeaderboard(playerName.trim(), gameState.score);
      setShowGameOver(false);
      handleRestart();
    }
  };

  return (
    <div className="relative">
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="border-4 border-black rounded-xl shadow-cartoon-lg mx-auto block bg-gradient-to-br from-green-200 to-pink-200"
      />

      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl border-4 border-black shadow-cartoon">
          <div className="text-sm font-bold" style={{ fontFamily: 'var(--font-arcade)' }}>SCORE</div>
          <div className="text-3xl font-bold text-yellow-500" style={{ fontFamily: 'var(--font-heading)', textShadow: '2px 2px 0 black' }}>
            {gameState.score}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl border-4 border-black shadow-cartoon">
          <div className="text-sm font-bold" style={{ fontFamily: 'var(--font-arcade)' }}>LEVEL</div>
          <div className="text-3xl font-bold text-red-500" style={{ fontFamily: 'var(--font-heading)', textShadow: '2px 2px 0 black' }}>
            {gameState.level}
          </div>
        </div>
      </div>

      {/* High Score */}
      <div className="absolute top-20 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border-3 border-black pointer-events-none">
        <div className="text-xs font-bold">HIGH SCORE</div>
        <div className="text-xl font-bold text-green-600">{gameState.highScore}</div>
      </div>

      {/* Pause Overlay */}
      {gameState.isPaused && !gameState.gameOver && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-cartoon-lg text-center">
            <h2 className="text-4xl mb-4">PAUSED</h2>
            <p className="mb-6 font-bold">Press SPACE or ESC to continue</p>
            <button
              onClick={() => setGameState(prev => ({ ...prev, isPaused: false }))}
              className="px-8 py-4 text-xl bg-gradient-to-br from-green-500 to-green-600 text-white"
            >
              RESUME
            </button>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {showGameOver && gameState.gameOver && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-cartoon-lg text-center max-w-md">
            <h2 className="text-5xl mb-4 text-red-500">GAME OVER!</h2>
            <p className="text-2xl mb-4 font-bold">You got slobbered!</p>

            <div className="my-6 p-4 bg-yellow-100 rounded-xl border-3 border-black">
              <div className="text-sm font-bold mb-2">FINAL SCORE</div>
              <div className="text-5xl font-bold text-yellow-600" style={{ fontFamily: 'var(--font-heading)', textShadow: '3px 3px 0 black' }}>
                {gameState.score}
              </div>
            </div>

            {gameState.score > gameState.highScore && (
              <div className="mb-4 text-green-600 font-bold text-xl animate-bounce">
                🏆 NEW HIGH SCORE! 🏆
              </div>
            )}

            <div className="mb-6">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name"
                className="w-full mb-3"
                maxLength={20}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSaveScore}
                disabled={!playerName.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 text-white disabled:opacity-50"
              >
                SAVE & RETRY
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 px-6 py-3 bg-gradient-to-br from-pink-500 to-red-500 text-white"
              >
                RETRY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Controls hint */}
      <div className="mt-4 text-center text-sm font-bold">
        <p>🎮 Use ← → Arrow Keys or A/D to move</p>
        <p className="text-xs mt-1">📱 Tap left/right side of screen on mobile</p>
      </div>
    </div>
  );
}
