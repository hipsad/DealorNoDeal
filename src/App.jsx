import { useState, useCallback } from 'react';
import GameSetup from './components/GameSetup';
import RoundView from './components/RoundView';
import FinalResult from './components/FinalResult';
import ModeSelect from './components/ModeSelect';
import NFLGameSetup from './components/NFLGameSetup';
import NFLRoundView from './components/NFLRoundView';
import NFLFinalResult from './components/NFLFinalResult';
import { useNBAApi } from './hooks/useNBAApi';
import { useNFLApi } from './hooks/useNFLApi';
import { ROUND_SHORT } from './data/players';
import { NFL_ROUND_SHORT } from './data/nflPlayers';

const PHASE_MODE   = 'mode';
const PHASE_SETUP  = 'setup';
const PHASE_ROUND  = 'round';
const PHASE_RESULT = 'result';

// Initial empty rosters keyed by position slot
const NBA_EMPTY_ROSTER = { PG: null, SG: null, SF: null, PF: null, C: null, '6th Man': null };
const NFL_EMPTY_ROSTER = { QB: null, WR: null, RB: null, CB: null, S: null, EDGE: null };

export default function App() {
  const nba = useNBAApi();
  const nfl = useNFLApi();

  const [mode, setMode]       = useState(null); // 'nba' | 'nfl'
  const [phase, setPhase]     = useState(PHASE_MODE);

  // ── Shared state ────────────────────────────────────────────────────────────
  const [includeHistorical, setInclude] = useState(false);
  const [roundIndex, setRoundIndex]     = useState(0);
  const [playerRoster, setPlayerRoster] = useState(NBA_EMPTY_ROSTER);
  const [computerRoster, setComputerRoster] = useState([]);
  const [currentCases, setCurrentCases] = useState([]);
  // NFL: pool for the current round position (for banker lookups)
  const [currentPositionPool, setCurrentPositionPool] = useState([]);

  // ── NBA helpers ─────────────────────────────────────────────────────────────
  const buildNBACases = useCallback(
    (rIndex, includeHist, usedIds) => {
      const position = rIndex === 5 ? '6th Man' : ROUND_SHORT[rIndex];
      const players  = nba.buildRoundCases(position, includeHist, usedIds);
      return players.map((p, i) => ({ number: i + 1, player: p, opened: false }));
    },
    [nba]
  );

  // ── NFL helpers ─────────────────────────────────────────────────────────────
  const buildNFLCases = useCallback(
    (rIndex, includeHist, usedIds) => {
      const position = NFL_ROUND_SHORT[rIndex];
      const players  = nfl.buildRoundCases(position, includeHist, usedIds);
      const pool     = nfl.getPool(position, includeHist);
      return {
        cases: players.map((p, i) => ({ number: i + 1, player: p, opened: false })),
        pool,
      };
    },
    [nfl]
  );

  // ── Mode selection ──────────────────────────────────────────────────────────
  function handleSelectNBA() {
    setMode('nba');
    setPhase(PHASE_SETUP);
  }

  function handleSelectNFL() {
    setMode('nfl');
    setPhase(PHASE_SETUP);
  }

  function handleBackToMenu() {
    setMode(null);
    setPhase(PHASE_MODE);
    setPlayerRoster(NBA_EMPTY_ROSTER);
    setComputerRoster([]);
    setRoundIndex(0);
    setCurrentCases([]);
    setCurrentPositionPool([]);
  }

  // ── NBA game flow ───────────────────────────────────────────────────────────
  function handleNBAStart(includeHist) {
    setInclude(includeHist);
    const compRoster = nba.buildComputerRoster(includeHist);
    setComputerRoster(compRoster);
    setPlayerRoster(NBA_EMPTY_ROSTER);
    setRoundIndex(0);
    const usedIds = new Set(compRoster.map((p) => p.id));
    const cases = buildNBACases(0, includeHist, usedIds);
    setCurrentCases(cases);
    setPhase(PHASE_ROUND);
  }

  function handleNBARoundComplete(chosenPlayer, slotKey) {
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
      const cases = buildNBACases(nextRoundIndex, includeHistorical, usedIds);
      setCurrentCases(cases);
    }
  }

  function handleNBAPlayAgain() {
    setPlayerRoster(NBA_EMPTY_ROSTER);
    setComputerRoster([]);
    setRoundIndex(0);
    setCurrentCases([]);
    setPhase(PHASE_SETUP);
  }

  // ── NFL game flow ───────────────────────────────────────────────────────────
  function handleNFLStart(includeHist) {
    setInclude(includeHist);
    const compRoster = nfl.buildComputerRoster(includeHist);
    setComputerRoster(compRoster);
    setPlayerRoster(NFL_EMPTY_ROSTER);
    setRoundIndex(0);
    const usedIds = new Set(compRoster.map((p) => p.id));
    const { cases, pool } = buildNFLCases(0, includeHist, usedIds);
    setCurrentCases(cases);
    setCurrentPositionPool(pool);
    setPhase(PHASE_ROUND);
  }

  function handleNFLRoundComplete(chosenPlayer, slotKey) {
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
      const { cases, pool } = buildNFLCases(nextRoundIndex, includeHistorical, usedIds);
      setCurrentCases(cases);
      setCurrentPositionPool(pool);
    }
  }

  function handleNFLPlayAgain() {
    setPlayerRoster(NFL_EMPTY_ROSTER);
    setComputerRoster([]);
    setRoundIndex(0);
    setCurrentCases([]);
    setCurrentPositionPool([]);
    setPhase(PHASE_SETUP);
  }

  // ── API error banner ─────────────────────────────────────────────────────────
  const apiError = mode === 'nfl' ? nfl.apiError : nba.apiError;

  return (
    <div className="min-h-screen bg-gray-900">
      {apiError && phase === PHASE_ROUND && (
        <div className="bg-gray-800 text-gray-400 text-xs text-center py-1 px-4">
          ℹ️ {apiError}
        </div>
      )}

      {/* ── Mode selection ──────────────────────────────────────────────────── */}
      {phase === PHASE_MODE && (
        <ModeSelect onSelectNBA={handleSelectNBA} onSelectNFL={handleSelectNFL} />
      )}

      {/* ── NBA game ────────────────────────────────────────────────────────── */}
      {mode === 'nba' && phase === PHASE_SETUP && (
        <GameSetup onStart={handleNBAStart} loading={nba.loading} />
      )}

      {mode === 'nba' && phase === PHASE_ROUND && currentCases.length > 0 && (
        <RoundView
          key={`nba-${roundIndex}`}
          roundIndex={roundIndex}
          cases={currentCases}
          onRoundComplete={handleNBARoundComplete}
          playerRoster={playerRoster}
          computerRoster={computerRoster}
          allPlayers={nba.getAllPool(includeHistorical)}
        />
      )}

      {mode === 'nba' && phase === PHASE_RESULT && (
        <FinalResult
          playerRoster={playerRoster}
          computerRoster={computerRoster}
          onPlayAgain={handleNBAPlayAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {/* ── NFL game ────────────────────────────────────────────────────────── */}
      {mode === 'nfl' && phase === PHASE_SETUP && (
        <NFLGameSetup onStart={handleNFLStart} loading={nfl.loading} />
      )}

      {mode === 'nfl' && phase === PHASE_ROUND && currentCases.length > 0 && (
        <NFLRoundView
          key={`nfl-${roundIndex}`}
          roundIndex={roundIndex}
          cases={currentCases}
          onRoundComplete={handleNFLRoundComplete}
          playerRoster={playerRoster}
          computerRoster={computerRoster}
          positionPool={currentPositionPool}
        />
      )}

      {mode === 'nfl' && phase === PHASE_RESULT && (
        <NFLFinalResult
          playerRoster={playerRoster}
          computerRoster={computerRoster}
          onPlayAgain={handleNFLPlayAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

