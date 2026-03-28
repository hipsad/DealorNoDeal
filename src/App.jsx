import { useState, useCallback } from 'react';
import GameSetup from './components/GameSetup';
import RoundView from './components/RoundView';
import FinalResult from './components/FinalResult';
import { useNBAApi } from './hooks/useNBAApi';
import { ROUND_SHORT } from './data/players';

const PHASE_SETUP  = 'setup';
const PHASE_ROUND  = 'round';
const PHASE_RESULT = 'result';

export default function App() {
  const { loading, apiError, buildComputerRoster, buildRoundCases } = useNBAApi();

  const [phase, setPhase]               = useState(PHASE_SETUP);
  const [includeHistorical, setInclude] = useState(false);
  const [roundIndex, setRoundIndex]     = useState(0);
  const [playerRoster, setPlayerRoster] = useState([]);
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
    setPlayerRoster([]);
    setRoundIndex(0);
    const usedIds = new Set(compRoster.map((p) => p.id));
    const cases = buildCases(0, includeHist, usedIds);
    setCurrentCases(cases);
    setPhase(PHASE_ROUND);
  }

  function handleRoundComplete(chosenPlayer) {
    const newRoster = [...playerRoster, chosenPlayer];
    setPlayerRoster(newRoster);
    const nextRoundIndex = roundIndex + 1;

    if (nextRoundIndex >= 6) {
      setPhase(PHASE_RESULT);
    } else {
      setRoundIndex(nextRoundIndex);
      const usedIds = new Set([
        ...computerRoster.map((p) => p.id),
        ...newRoster.map((p) => p.id),
      ]);
      const cases = buildCases(nextRoundIndex, includeHistorical, usedIds);
      setCurrentCases(cases);
    }
  }

  function handlePlayAgain() {
    setPhase(PHASE_SETUP);
    setPlayerRoster([]);
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
