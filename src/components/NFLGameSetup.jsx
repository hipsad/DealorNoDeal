export default function NFLGameSetup({ onStart, loading }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          <span className="text-green-400">NFL</span>{' '}
          <span className="text-white">Deal or No Deal</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-lg mx-auto">
          Draft one player at each NFL position through six rounds of Deal or
          No Deal. Outscore the computer's hidden roster to win!
        </p>
      </div>

      {/* Rules card */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-8 max-w-xl w-full border border-gray-700 shadow-lg">
        <h2 className="text-green-400 font-bold text-xl mb-4">How to Play</h2>
        <ol className="text-gray-300 space-y-2 list-decimal list-inside text-sm">
          <li>
            Play{' '}
            <span className="text-white font-semibold">6 rounds</span>, one for
            each NFL position:{' '}
            <span className="text-green-400 font-semibold">QB → WR → RB → CB → Safety → Edge Rusher</span>.
          </li>
          <li>
            Each round is{' '}
            <span className="text-white font-semibold">position-specific</span>{' '}
            — all 26 briefcases hide a real NFL player at that position, rated
            by their{' '}
            <span className="text-white font-semibold">2024 season stat</span>{' '}
            (Pass TDs, Rec Yds, Rush TDs, INTs, Tackles, or Sacks). Legends use
            their career-best single season.
          </li>
          <li>
            Pick one briefcase to hold, then open the rest in groups. The{' '}
            <span className="text-blue-400 font-semibold">Banker</span> will
            offer you a deal after each group.
          </li>
          <li>
            <span className="text-green-400 font-semibold">Deal</span> to take
            the banker's player, or{' '}
            <span className="text-red-400 font-semibold">No Deal</span> to keep
            your original pick.
          </li>
          <li>
            After all 6 rounds, compare your roster to the{' '}
            <span className="text-red-400 font-semibold">
              computer's hidden team
            </span>{' '}
            position-by-position. Most positions won takes the game!
          </li>
        </ol>

        {/* Position legend */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          {[
            { pos: 'QB',   stat: 'Passing TDs',     icon: '🎯' },
            { pos: 'WR',   stat: 'Receiving Yards',  icon: '🙌' },
            { pos: 'RB',   stat: 'Rushing TDs',      icon: '💨' },
            { pos: 'CB',   stat: 'Interceptions',    icon: '🛡️' },
            { pos: 'S',    stat: 'Tackles',          icon: '💪' },
            { pos: 'EDGE', stat: 'Sacks',            icon: '🔥' },
          ].map(({ pos, stat, icon }) => (
            <div key={pos} className="flex items-center gap-2 bg-gray-700/40 rounded-lg px-3 py-2">
              <span className="text-lg">{icon}</span>
              <div>
                <span className="text-green-400 font-bold text-xs">{pos}</span>
                <span className="text-gray-300 text-xs ml-1">— {stat}</span>
              </div>
            </div>
          ))}
        </div>
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
            className="group flex flex-col items-center bg-gray-800 border-2 border-gray-600 hover:border-green-400 rounded-2xl p-5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-3xl mb-2">🏈</span>
            <span className="font-bold text-white text-base mb-1">Active Players Only</span>
            <span className="text-gray-400 text-xs text-center">
              Current NFL stars competing today
            </span>
          </button>

          <button
            onClick={() => onStart(true)}
            disabled={loading}
            className="group flex flex-col items-center bg-gray-800 border-2 border-gray-600 hover:border-yellow-400 rounded-2xl p-5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-3xl mb-2">🏆</span>
            <span className="font-bold text-white text-base mb-1">Include Legends</span>
            <span className="text-gray-400 text-xs text-center">
              All-time NFL greats from every era
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
