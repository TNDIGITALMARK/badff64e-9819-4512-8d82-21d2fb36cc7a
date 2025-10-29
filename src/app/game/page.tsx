export const dynamic = 'force-dynamic'

import Link from 'next/link';
import GameCanvas from '@/components/game/GameCanvas';

export default function GamePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 via-pink-300 to-red-400 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-4xl md:text-5xl mb-2 cursor-pointer hover:scale-105 transition-transform inline-block">
              SLOBBERER
            </h1>
          </Link>
          <p className="text-xl font-bold text-white" style={{
            fontFamily: 'var(--font-arcade)',
            textShadow: '2px 2px 0 black'
          }}>
            Dodge the Drool!
          </p>
        </div>

        {/* Game Canvas */}
        <div className="mb-8">
          <GameCanvas />
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <Link href="/">
            <button className="px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white">
              🏠 HOME
            </button>
          </Link>
          <Link href="/leaderboard">
            <button className="px-6 py-3 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white">
              🏆 LEADERBOARD
            </button>
          </Link>
          <Link href="/dogs">
            <button className="px-6 py-3 bg-gradient-to-br from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white">
              🐕 DOGS
            </button>
          </Link>
        </div>

        {/* Game Instructions */}
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-black shadow-cartoon">
          <h3 className="text-2xl font-bold mb-4 text-center" style={{ fontFamily: 'var(--font-arcade)' }}>
            HOW TO PLAY
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-semibold">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <strong>GOAL:</strong> Dodge flying slobber for as long as possible!
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⌨️</span>
              <div>
                <strong>CONTROLS:</strong> Arrow keys or A/D to move left/right
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <strong>LEVELS:</strong> More dogs appear as you progress!
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🐶</span>
              <div>
                <strong>DOGS:</strong> Each breed has unique slobber patterns
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
