'use client';

export const dynamic = 'force-dynamic'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getLeaderboard } from '@/lib/game/engine';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<Array<{ name: string; score: number }>>([]);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-400 via-pink-300 to-red-400 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/">
            <h1 className="text-5xl md:text-6xl mb-4 cursor-pointer hover:scale-105 transition-transform inline-block">
              HALL OF SLOBBER
            </h1>
          </Link>
          <p className="text-2xl font-bold text-white" style={{
            fontFamily: 'var(--font-arcade)',
            textShadow: '2px 2px 0 black'
          }}>
            🏆 Top Slobber Dodgers 🏆
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-black shadow-cartoon-lg overflow-hidden mb-8">
          {/* Header Row */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 border-b-4 border-black px-6 py-4">
            <div className="grid grid-cols-12 gap-4 font-bold text-lg" style={{ fontFamily: 'var(--font-arcade)' }}>
              <div className="col-span-2 text-center">RANK</div>
              <div className="col-span-7">PLAYER NAME</div>
              <div className="col-span-3 text-right">SCORE</div>
            </div>
          </div>

          {/* Leaderboard Entries */}
          <div className="divide-y-2 divide-black">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`px-6 py-4 hover:bg-yellow-50 transition-colors ${
                  index < 3 ? 'bg-yellow-100/50' : ''
                }`}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Rank */}
                  <div className="col-span-2 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full border-3 border-black font-bold text-xl ${
                      index === 0 ? 'bg-yellow-400 text-white' :
                      index === 1 ? 'bg-gray-300 text-black' :
                      index === 2 ? 'bg-orange-400 text-white' :
                      'bg-white text-black'
                    }`} style={{ fontFamily: 'var(--font-heading)' }}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="col-span-7">
                    <div className="font-bold text-lg truncate" style={{ fontFamily: 'var(--font-primary)' }}>
                      {entry.name}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-3 text-right">
                    <div className={`font-bold text-2xl ${
                      index === 0 ? 'text-yellow-600' :
                      index === 1 ? 'text-gray-600' :
                      index === 2 ? 'text-orange-600' :
                      'text-green-600'
                    }`} style={{
                      fontFamily: 'var(--font-heading)',
                      textShadow: '1px 1px 0 rgba(0,0,0,0.2)'
                    }}>
                      {entry.score.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/game">
            <button className="px-8 py-4 text-xl bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 text-white w-full sm:w-auto">
              🎮 PLAY NOW
            </button>
          </Link>
          <Link href="/">
            <button className="px-8 py-4 text-xl bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white w-full sm:w-auto">
              🏠 HOME
            </button>
          </Link>
          <Link href="/dogs">
            <button className="px-8 py-4 text-xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white w-full sm:w-auto">
              🐕 MEET DOGS
            </button>
          </Link>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-black shadow-cartoon text-center">
            <div className="text-3xl mb-2">💧</div>
            <div className="text-2xl font-bold text-pink-600" style={{ fontFamily: 'var(--font-heading)' }}>
              {leaderboard[0]?.score.toLocaleString() || '0'}
            </div>
            <p className="text-sm font-bold mt-1">Highest Score</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-black shadow-cartoon text-center">
            <div className="text-3xl mb-2">🐶</div>
            <div className="text-2xl font-bold text-green-600" style={{ fontFamily: 'var(--font-heading)' }}>
              4 DOGS
            </div>
            <p className="text-sm font-bold mt-1">Unlock Them All!</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-black shadow-cartoon text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-yellow-600" style={{ fontFamily: 'var(--font-heading)' }}>
              ENDLESS
            </div>
            <p className="text-sm font-bold mt-1">Mode Available</p>
          </div>
        </div>
      </div>
    </main>
  );
}
