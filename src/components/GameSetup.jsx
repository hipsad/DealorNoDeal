export default function GameSetup({ onStart, loading }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          <span className="text-yellow-400">NBA</span>{' '}
          <span className="text-white">Deal or No Deal</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-lg mx-auto">
          Build a 5-man roster + 6th man through six rounds of Deal or No Deal.
          Beat the computer's hidden team to win!
        </p>
      </div>

      {/* Rules card */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-8 max-w-xl w-full border border-gray-700 shadow-lg">
        <h2 className="text-yellow-400 font-bold text-xl mb-4">How to Play</h2>
        <ol className="text-gray-300 space-y-2 list-decimal list-inside text-sm">
          <li>
            Each round corresponds to a position:{' '}
            <span className="text-white font-semibold">PG → SG → SF → PF → C → 6th Man</span>
          </li>
          <li>
            Nine mystery <span className="text-yellow-400 font-semibold">briefcases</span> appear.
            Pick one to hold — it's your player for that position.
          </li>
          <li>
            Open the remaining cases in groups. The{' '}
            <span className="text-blue-400 font-semibold">Banker</span> will offer you a deal
            after each group.
          </li>
          <li>
            <span className="text-green-400 font-semibold">Deal</span> to take the guaranteed
            offer, or <span className="text-red-400 font-semibold">No Deal</span> to keep your
            original pick.
          </li>
          <li>
            At the end, your roster's total career PPG is compared to the{' '}
            <span className="text-red-400 font-semibold">computer's hidden team</span>. Highest
            total wins!
          </li>
        </ol>
      </div>

      {/* Player pool selection */}
      <div className="max-w-xl w-full mb-8">
        <h2 className="text-white font-bold text-lg mb-4 text-center">
          Choose Player Pool
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onStart(false)}
            disabled={loading}
            className="group flex flex-col items-center bg-gray-800 border-2 border-gray-600 hover:border-blue-400 rounded-2xl p-5 transition-all hover:bg-gray-750 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-3xl mb-2">🏀</span>
            <span className="font-bold text-white text-base mb-1">Active Players Only</span>
            <span className="text-gray-400 text-xs text-center">
              Current NBA stars competing today
            </span>
          </button>

          <button
            onClick={() => onStart(true)}
            disabled={loading}
            className="group flex flex-col items-center bg-gray-800 border-2 border-gray-600 hover:border-yellow-400 rounded-2xl p-5 transition-all hover:bg-gray-750 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-3xl mb-2">🏆</span>
            <span className="font-bold text-white text-base mb-1">Include Historical</span>
            <span className="text-gray-400 text-xs text-center">
              All-time greats from every era
            </span>
          </button>
        </div>
      </div>

      {loading && (
        <p className="text-gray-500 text-sm animate-pulse">
          Loading player data…
        </p>
      )}
    </div>
  );
}
