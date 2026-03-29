import { calcNFLTeamRecord, getNFLWinner, nflValueColor, nflStatLabel, formatNFLStat } from '../utils/nflGameLogic';
import { NFL_ROUND_LABELS, NFL_ROUND_SHORT } from '../data/nflPlayers';

export default function NFLFinalResult({ playerRoster, computerRoster, onPlayAgain, onBackToMenu }) {
  // playerRoster is { QB: player|null, WR: player|null, ... }
  const { playerWins, computerWins, ties } = calcNFLTeamRecord(
    playerRoster,
    computerRoster,
    NFL_ROUND_SHORT
  );
  const winner = getNFLWinner(playerWins, computerWins);

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
          You won{' '}
          <span className="font-bold text-white">{playerWins}</span>{' '}
          position{playerWins !== 1 ? 's' : ''} vs the computer's{' '}
          <span className="font-bold text-white">{computerWins}</span>
          {ties > 0 && (
            <span className="text-gray-500"> ({ties} tied)</span>
          )}
        </p>
      </div>

      {/* Roster comparison */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Player's team */}
        <div className="bg-gray-800 rounded-2xl p-6 border-2 border-green-500 shadow-lg shadow-green-500/10">
          <h2 className="text-green-400 font-extrabold text-xl mb-4 text-center">
            🏈 Your Team
          </h2>
          <div className="space-y-3">
            {NFL_ROUND_SHORT.map((slot, idx) => (
              <NFLRosterRow
                key={slot}
                posLabel={NFL_ROUND_LABELS[idx]}
                posShort={slot}
                player={playerRoster[slot] ?? null}
              />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <span className="text-gray-400 text-sm">Positions Won: </span>
            <span className="font-extrabold text-2xl text-green-400">
              {playerWins}
            </span>
            <span className="text-gray-400 text-sm"> / 6</span>
          </div>
        </div>

        {/* Computer's team */}
        <div className="bg-gray-800 rounded-2xl p-6 border-2 border-red-500 shadow-lg shadow-red-500/10">
          <h2 className="text-red-400 font-extrabold text-xl mb-4 text-center">
            💻 Computer's Team
          </h2>
          <div className="space-y-3">
            {NFL_ROUND_SHORT.map((slot, idx) => (
              <NFLRosterRow
                key={slot}
                posLabel={NFL_ROUND_LABELS[idx]}
                posShort={slot}
                player={computerRoster[idx] ?? null}
              />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 text-center">
            <span className="text-gray-400 text-sm">Positions Won: </span>
            <span className="font-extrabold text-2xl text-red-400">
              {computerWins}
            </span>
            <span className="text-gray-400 text-sm"> / 6</span>
          </div>
        </div>
      </div>

      {/* Position-by-position breakdown */}
      <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
        <h2 className="text-white font-bold text-lg mb-4 text-center">
          Position-by-Position Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="text-left pb-2 w-16">Pos</th>
                <th className="text-center pb-2">Your Player</th>
                <th className="text-center pb-2 w-12">vs</th>
                <th className="text-center pb-2">Computer's Player</th>
              </tr>
            </thead>
            <tbody>
              {NFL_ROUND_SHORT.map((slot, idx) => {
                const p    = playerRoster[slot] ?? null;
                const c    = computerRoster[idx] ?? null;
                const youWin  = p && c && p.value > c.value;
                const compWin = p && c && c.value > p.value;
                const stat = nflStatLabel(slot);
                const fmtP = formatNFLStat(slot, p?.value);
                const fmtC = formatNFLStat(slot, c?.value);
                const colP = (v) => nflValueColor(slot, v);
                return (
                  <tr key={slot} className="border-b border-gray-700/50">
                    <td className="py-2 text-gray-400 font-semibold">{slot}</td>
                    <td className="py-2 text-center">
                      {p ? (
                        <>
                          <span className={`font-semibold ${youWin ? 'text-green-400' : 'text-white'}`}>
                            {p.name}
                          </span>
                          <br />
                          <span className={`text-xs ${colP(p.value)}`}>
                            {fmtP} {stat}
                          </span>
                        </>
                      ) : '—'}
                    </td>
                    <td className="py-2 text-center text-gray-600 text-xs">
                      {youWin ? '✅' : compWin ? '❌' : '➖'}
                    </td>
                    <td className="py-2 text-center">
                      {c ? (
                        <>
                          <span className={`font-semibold ${compWin ? 'text-red-400' : 'text-white'}`}>
                            {c.name}
                          </span>
                          <br />
                          <span className={`text-xs ${colP(c.value)}`}>
                            {fmtC} {stat}
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

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onPlayAgain}
          className="bg-green-500 hover:bg-green-400 text-black font-extrabold text-xl px-10 py-4 rounded-2xl transition-colors shadow-lg"
        >
          Play Again 🔄
        </button>
        <button
          onClick={onBackToMenu}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-colors"
        >
          ← Change Sport
        </button>
      </div>
    </div>
  );
}

function NFLRosterRow({ posShort, player }) {
  if (!player) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-xs w-16">{posShort}</span>
        <span className="text-gray-600 text-sm">—</span>
      </div>
    );
  }
  const stat = nflStatLabel(posShort);
  const colorCls = nflValueColor(posShort, player.value);
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-400 text-xs w-16">{posShort}</span>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{player.name}</p>
        <p className="text-gray-500 text-xs">{player.active ? 'Active' : player.era}</p>
      </div>
      <span className={`font-extrabold text-base ${colorCls}`}>
        {formatNFLStat(posShort, player.value)}
        <span className="text-gray-500 text-xs ml-1">{stat}</span>
      </span>
    </div>
  );
}
