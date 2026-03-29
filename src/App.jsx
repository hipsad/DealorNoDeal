import { useState, useCallback } from 'react';
import GameSetup from './components/GameSetup';
import RoundView from './components/RoundView';
import FinalResult from './components/FinalResult';
import { useNBAApi } from './hooks/useNBAApi';
import { ROUND_SHORT } from './data/players';

const PHASE_SETUP  = 'setup';
const PHASE_ROUND  = 'round';
const PHASE_RESULT = 'result';

// Initial empty roster keyed by position slot
const EMPTY_ROSTER = { PG: null, SG: null, SF: null, PF: null, C: null, '6th Man': null };

export default function App() {
  const { loading, apiError, getAllPool, buildComputerRoster, buildRoundCases } = useNBAApi();

  const [phase, setPhase]               = useState(PHASE_SETUP);
  const [includeHistorical, setInclude] = useState(false);
  const [roundIndex, setRoundIndex]     = useState(0);
  // playerRoster is now { PG: player|null, SG: player|null, ... }
  const [playerRoster, setPlayerRoster] = useState(EMPTY_ROSTER);
  const [computerRoster, setComputerRoster] = useState([]);
  const [currentCases, setCurrentCases] = useState([]);

  const buildCases = useCallback(
    (rIndex, includeHist, usedIds) => {
      const position = rIndex === 5 ? '6th Man' : ROUND_SHORT[rIndex];
      const players  = buildRoundCases(position, includeHist, usedIds);
      return players.map((p, i) => ({ number: i + 1, player: p, opened: false }));
    },
    [buildRoundCases]
  );

  function handleStart(includeHist) {
    setInclude(includeHist);
    const compRoster = buildComputerRoster(includeHist);
    setComputerRoster(compRoster);
    setPlayerRoster(EMPTY_ROSTER);
    setRoundIndex(0);
    const usedIds = new Set(compRoster.map((p) => p.id));
    const cases = buildCases(0, includeHist, usedIds);
    setCurrentCases(cases);
    setPhase(PHASE_ROUND);
  }

  // chosenPlayer: the player object; slotKey: which position slot they are assigned to
  function handleRoundComplete(chosenPlayer, slotKey) {
    const newRoster = { ...playerRoster, [slotKey]: chosenPlayer };
    setPlayerRoster(newRoster);
    const nextRoundIndex = roundIndex + 1;

    if (nextRoundIndex >= 6) {
      setPhase(PHASE_RESULT);
    } else {
      setRoundIndex(nextRoundIndex);
      const filledPlayers = Object.values(newRoster).filter(Boolean);
      const usedIds = new Set([
        ...computerRoster.map((p) => p.id),
        ...filledPlayers.map((p) => p.id),
      ]);
      const cases = buildCases(nextRoundIndex, includeHistorical, usedIds);
      setCurrentCases(cases);
    }
  }

  function handlePlayAgain() {
    setPhase(PHASE_SETUP);
    setPlayerRoster(EMPTY_ROSTER);
    setComputerRoster([]);
    setRoundIndex(0);
    setCurrentCases([]);
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {apiError && phase !== PHASE_SETUP && (
        <div className="bg-gray-800 text-gray-400 text-xs text-center py-1 px-4">
          ℹ️ {apiError}
        </div>
      )}

      {phase === PHASE_SETUP && (
        <GameSetup onStart={handleStart} loading={loading} />
      )}

      {phase === PHASE_ROUND && currentCases.length > 0 && (
        <RoundView
          key={roundIndex}
          roundIndex={roundIndex}
          cases={currentCases}
          onRoundComplete={handleRoundComplete}
          playerRoster={playerRoster}
          computerRoster={computerRoster}
          allPlayers={getAllPool(includeHistorical)}
        />
      )}

      {phase === PHASE_RESULT && (
        <FinalResult
          playerRoster={playerRoster}
          computerRoster={computerRoster}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}
