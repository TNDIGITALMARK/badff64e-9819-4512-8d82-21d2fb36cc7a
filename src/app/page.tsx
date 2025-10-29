export const dynamic = 'force-dynamic'

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-400 via-pink-300 to-red-400">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-green-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-red-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/3 w-44 h-44 bg-yellow-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Main Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo / Title */}
        <div className="text-center mb-8 animate-bounce-in">
          <h1 className="mb-4">
            SLOBBERER
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-white text-center" style={{
            fontFamily: 'var(--font-arcade)',
            textShadow: '3px 3px 0 black, 5px 5px 0 rgba(0,0,0,0.3)',
            WebkitTextStroke: '2px black',
            paintOrder: 'stroke fill'
          }}>
            Can You Dodge the Drool?
          </p>
        </div>

        {/* Giant PLAY NOW Button with Drip Animation */}
        <div className="relative mb-12">
          {/* Animated drips */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-300 rounded-full animate-drip" style={{ animationDelay: '0s' }} />
          <div className="absolute -top-8 left-1/3 w-3 h-3 bg-gray-200 rounded-full animate-drip" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -top-8 right-1/3 w-3 h-3 bg-gray-300 rounded-full animate-drip" style={{ animationDelay: '1s' }} />

          <Link href="/game">
            <button
              className="group relative px-16 py-8 text-4xl md:text-6xl bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 text-white transition-all duration-200 hover:scale-110"
              style={{
                animation: 'pulse-arcade 2s ease-in-out infinite'
              }}
            >
              <span className="relative z-10">PLAY NOW!</span>

              {/* Splash effect on hover */}
              <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
          </Link>
        </div>

        {/* Game Preview / Character Tease */}
        <div className="text-center mb-12 max-w-2xl">
          <p className="text-xl md:text-2xl font-bold mb-6" style={{
            fontFamily: 'var(--font-primary)',
            color: 'white',
            textShadow: '2px 2px 0 black'
          }}>
            A hilariously absurd arcade game where you dodge flying slobber
            from over-excited cartoon dogs!
          </p>
        </div>

        {/* Quick Nav Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link href="/leaderboard">
            <button className="px-8 py-4 text-xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white">
              🏆 Hall of Slobber
            </button>
          </Link>
          <Link href="/dogs">
            <button className="px-8 py-4 text-xl bg-gradient-to-br from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white">
              🐕 Meet the Dogs
            </button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-black shadow-cartoon text-center">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-arcade)' }}>Easy to Play</h3>
            <p className="text-sm font-semibold">Just move left and right to dodge the slobber!</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-black shadow-cartoon text-center">
            <div className="text-4xl mb-3">🐶</div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-arcade)' }}>Unlock Dogs</h3>
            <p className="text-sm font-semibold">Each breed has unique slobber patterns!</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-4 border-black shadow-cartoon text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-arcade)' }}>Mobile Ready</h3>
            <p className="text-sm font-semibold">Tap to move on phones and tablets!</p>
          </div>
        </div>

        {/* Footer tagline */}
        <div className="mt-12 text-center">
          <p className="text-sm md:text-base font-bold text-white/80" style={{
            fontFamily: 'var(--font-primary)',
            textShadow: '1px 1px 0 black'
          }}>
            Fun, absurd, sticky, and laugh-out-loud funny! 🐾
          </p>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes drip {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0.7; }
        }

        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .animate-drip {
          animation: drip 3s ease-in infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}
