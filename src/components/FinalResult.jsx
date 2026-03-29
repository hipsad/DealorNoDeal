import { calcTeamScore, formatScore, getWinner, valueColor } from '../utils/gameLogic';
import { ROUND_LABELS, ROUND_SHORT } from '../data/players';

export default function FinalResult({ playerRoster, computerRoster, onPlayAgain, onBackToMenu }) {
  // playerRoster is now { PG: player|null, SG: player|null, ... }
  const playerArray = ROUND_SHORT.map((slot) => playerRoster[slot] ?? null);
  const playerScore = calcTeamScore(playerArray);
  const compScore   = calcTeamScore(computerRoster);
  const winner      = getWinner(playerScore, compScore);

  const bannerText = {
    player:   '🏆 You Win!',
    computer: '💻 Computer Wins!',
    tie:      "🤝 It's a Tie!",
  }[winner];

  const bannerColor = {
    player:   'text-yellow-400',
    computer: 'text-red-400',
    tie:      'text-blue-400',
  }[winner];

  return (
    <div className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="text-center mb-10">
        <h1 className={`text-5xl font-extrabold ${bannerColor} mb-2`}>{bannerText}</h1>
        <p className="text-gray-400 text-lg">
          Your team scored{' '}
          <span className={`font-bold ${valueColor(playerScore / 6)}`}>
            {formatScore(playerScore)}
          </span>{' '}
          total PPG vs the computer's{' '}
          <span className={`font-bold ${valueColor(compScore / 6)}`}>
            {formatScore(compScore)}
          </span>
        </p>
      </div>

      {/* Roster comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Player's team */}
        <div className="bg-gray-800 rounded-2xl p-6 border-2 border-yellow-500 shadow-lg shadow-yellow-500/10">
          <h2 className="text-yellow-400 font-extrabold text-xl mb-4 text-center">
            🏀 Your Team
          </h2>
          <div className="space-y-3">
            {playerArray.map((player, idx) => (
              <RosterRow
                key={idx}
                posLabel={ROUND_LABELS[idx]}
                posShort={ROUND_SHORT[idx]}
                player={player}
              />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <span className="text-gray-400 text-sm">Total: </span>
            <span className={`font-extrabold text-2xl ${valueColor(playerScore / 6)}`}>
              {formatScore(playerScore)}
            </span>
            <span className="text-gray-400 text-sm"> PPG</span>
          </div>
        </div>

        {/* Computer's team */}
        <div className="bg-gray-800 rounded-2xl p-6 border-2 border-red-500 shadow-lg shadow-red-500/10">
          <h2 className="text-red-400 font-extrabold text-xl mb-4 text-center">
            💻 Computer's Team
          </h2>
          <div className="space-y-3">
            {computerRoster.map((player, idx) => (
              <RosterRow
                key={idx}
                posLabel={ROUND_LABELS[idx]}
                posShort={ROUND_SHORT[idx]}
                player={player}
              />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <span className="text-gray-400 text-sm">Total: </span>
            <span className={`font-extrabold text-2xl ${valueColor(compScore / 6)}`}>
              {formatScore(compScore)}
            </span>
            <span className="text-gray-400 text-sm"> PPG</span>
          </div>
        </div>
      </div>

      {/* Position-by-position comparison */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
        <h2 className="text-white font-bold text-lg mb-4 text-center">
          Position-by-Position Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="text-left pb-2 w-20">Position</th>
                <th className="text-center pb-2">Your Player</th>
                <th className="text-center pb-2 w-12">vs</th>
                <th className="text-center pb-2">Computer's Player</th>
              </tr>
            </thead>
            <tbody>
              {playerArray.map((player, idx) => {
                const comp   = computerRoster[idx];
                const youWin = player && comp && player.value > comp.value;
                const compWin = player && comp && comp.value > player.value;
                return (
                  <tr key={idx} className="border-b border-gray-700/50">
                    <td className="py-2 text-gray-400 font-semibold">
                      {ROUND_SHORT[idx]}
                    </td>
                    <td className="py-2 text-center">
                      {player ? (
                        <>
                          <span className={`font-semibold ${youWin ? 'text-green-400' : 'text-white'}`}>
                            {player.name}
                          </span>
                          <br />
                          <span className={`text-xs ${valueColor(player.value)}`}>
                            {player.value} PPG
                          </span>
                        </>
                      ) : '—'}
                    </td>
                    <td className="py-2 text-center text-gray-600 text-xs">
                      {youWin ? '✅' : compWin ? '❌' : '➖'}
                    </td>
                    <td className="py-2 text-center">
                      {comp ? (
                        <>
                          <span className={`font-semibold ${compWin ? 'text-red-400' : 'text-white'}`}>
                            {comp.name}
                          </span>
                          <br />
                          <span className={`text-xs ${valueColor(comp.value)}`}>
                            {comp.value} PPG
                          </span>
                        </>
                      ) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Play again */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onPlayAgain}
          className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xl px-10 py-4 rounded-2xl transition-colors shadow-lg"
        >
          Play Again 🔄
        </button>
        {onBackToMenu && (
          <button
            onClick={onBackToMenu}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-colors"
          >
            ← Change Sport
          </button>
        )}
      </div>
    </div>
  );
}

function RosterRow({ posShort, player }) {
  if (!player) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-xs w-16">{posShort}</span>
        <span className="text-gray-600 text-sm">—</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-xs w-16">{posShort}</span>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{player.name}</p>
        <p className="text-gray-500 text-xs">{player.active ? '2024-25 PPG' : player.era}</p>
      </div>
      <span className={`font-extrabold text-base ${valueColor(player.value)}`}>
        {player.value}
      </span>
    </div>
  );
}
