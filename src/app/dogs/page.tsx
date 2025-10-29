'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link';
import { DOGS } from '@/lib/game/dogs';

export default function DogsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 via-pink-300 to-red-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/">
            <h1 className="text-5xl md:text-6xl mb-4 cursor-pointer hover:scale-105 transition-transform inline-block">
              MEET THE DOGS
            </h1>
          </Link>
          <p className="text-2xl font-bold text-white" style={{
            fontFamily: 'var(--font-arcade)',
            textShadow: '2px 2px 0 black'
          }}>
            🐕 Each Breed Has Unique Slobber Powers! 🐾
          </p>
        </div>

        {/* Dog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {DOGS.map((dog, index) => (
            <div
              key={dog.id}
              className="bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-black shadow-cartoon-lg overflow-hidden hover:scale-105 transition-transform"
            >
              {/* Dog Header */}
              <div
                className="px-6 py-8 text-center border-b-4 border-black relative"
                style={{
                  background: `linear-gradient(135deg, ${dog.color}dd, ${dog.color}bb)`
                }}
              >
                {/* Emoji Avatar */}
                <div className="text-8xl mb-4 animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {dog.emoji}
                </div>

                {/* Name */}
                <h2 className="text-4xl font-bold text-white mb-2" style={{
                  fontFamily: 'var(--font-heading)',
                  textShadow: '3px 3px 0 black, 4px 4px 0 rgba(0,0,0,0.3)'
                }}>
                  {dog.name}
                </h2>

                {/* Breed */}
                <p className="text-xl font-bold text-white" style={{
                  fontFamily: 'var(--font-arcade)',
                  textShadow: '2px 2px 0 black'
                }}>
                  {dog.breed}
                </p>

                {/* Unlock Badge */}
                {dog.unlockScore > 0 && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full border-3 border-black font-bold text-sm">
                    🔒 {dog.unlockScore} pts
                  </div>
                )}
              </div>

              {/* Dog Stats */}
              <div className="p-6">
                {/* Description */}
                <p className="text-center mb-6 text-lg font-semibold text-gray-800">
                  {dog.description}
                </p>

                {/* Slobber Pattern Stats */}
                <div className="bg-gray-100 rounded-2xl border-3 border-black p-4 mb-4">
                  <h3 className="font-bold text-center mb-3 text-lg" style={{ fontFamily: 'var(--font-arcade)' }}>
                    SLOBBER PATTERN
                  </h3>

                  <div className="space-y-3">
                    {/* Pattern Type */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">Type:</span>
                        <span className="text-sm font-semibold uppercase bg-white px-3 py-1 rounded-full border-2 border-black">
                          {dog.slobberPattern.type}
                        </span>
                      </div>
                    </div>

                    {/* Speed */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">Speed:</span>
                        <span className="text-sm font-semibold">
                          {'⚡'.repeat(Math.min(5, Math.ceil(dog.slobberPattern.speed)))}
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2 border-2 border-black">
                        <div
                          className="bg-red-500 h-full rounded-full"
                          style={{ width: `${(dog.slobberPattern.speed / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Size */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">Size:</span>
                        <span className="text-sm font-semibold">
                          {'💧'.repeat(Math.min(5, Math.ceil(dog.slobberPattern.size / 10)))}
                        </span>
                      </div>
                      <div className="w-full bg-gray-300 rounded-full h-2 border-2 border-black">
                        <div
                          className="bg-blue-500 h-full rounded-full"
                          style={{ width: `${(dog.slobberPattern.size / 50) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Frequency */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">Frequency:</span>
                        <span className="text-sm font-semibold">
                          {dog.slobberPattern.frequency < 600 ? 'HIGH 🔥' :
                           dog.slobberPattern.frequency < 1000 ? 'MEDIUM ⚡' :
                           'LOW 🐌'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Difficulty Rating */}
                <div className="text-center">
                  <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-6 py-2 rounded-full border-3 border-black text-sm">
                    DIFFICULTY: {
                      dog.unlockScore === 0 ? '⭐ EASY' :
                      dog.unlockScore < 2000 ? '⭐⭐ MEDIUM' :
                      dog.unlockScore < 3500 ? '⭐⭐⭐ HARD' :
                      '⭐⭐⭐⭐ EXPERT'
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-black shadow-cartoon-lg p-8 mb-8">
          <h3 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: 'var(--font-arcade)' }}>
            💡 PRO TIPS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-3xl">🎯</span>
              <div>
                <strong className="font-bold text-lg">Learn the Patterns</strong>
                <p className="text-sm">Each dog has a predictable pattern. Study their movement!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">🚀</span>
              <div>
                <strong className="font-bold text-lg">Stay Moving</strong>
                <p className="text-sm">Never stop in one place - keep moving to avoid surprise slobber!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">👀</span>
              <div>
                <strong className="font-bold text-lg">Watch Multiple Dogs</strong>
                <p className="text-sm">In higher levels, track all active dogs at once!</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">🏆</span>
              <div>
                <strong className="font-bold text-lg">Unlock All Dogs</strong>
                <p className="text-sm">Reach score milestones to unlock new breeds and patterns!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/game">
            <button className="px-8 py-4 text-xl bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 text-white w-full sm:w-auto">
              🎮 PLAY NOW
            </button>
          </Link>
          <Link href="/leaderboard">
            <button className="px-8 py-4 text-xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white w-full sm:w-auto">
              🏆 LEADERBOARD
            </button>
          </Link>
          <Link href="/">
            <button className="px-8 py-4 text-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white w-full sm:w-auto">
              🏠 HOME
            </button>
          </Link>
        </div>
      </div>

      {/* Inline animation styles */}
      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0) rotate(-180deg); }
          50% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}
