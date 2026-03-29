import { useCallback } from 'react';
import {
  NFL_PLAYERS,
  NFL_ROUND_SHORT,
  NFL_LOW_VALUE_THRESHOLD,
  shuffleNFL,
  pickRandomNFL,
} from '../data/nflPlayers';

// Player stats are sourced from nflverse (https://github.com/nflverse/nflverse-data).
// Active players use verified 2024 regular-season stats:
//   QB   → passing TDs   CB   → interceptions
//   WR   → receiving yards  S    → tackles
//   RB   → rushing TDs   EDGE → sacks

export function useNFLApi() {
  // Build the pool for a single position from the static dataset.
  const getPool = useCallback(
    (position, includeHistorical) =>
      NFL_PLAYERS.filter(
        (p) => p.position === position && (includeHistorical || p.active)
      ),
    []
  );

  // Build the computer's hidden 6-player roster (one per position).
  const buildComputerRoster = useCallback(
    (includeHistorical) => {
      return NFL_ROUND_SHORT.map((pos) => {
        const pool = getPool(pos, includeHistorical);
        return pickRandomNFL(pool, 1)[0];
      });
    },
    [getPool]
  );

  // Build 26 briefcases for a specific position round.
  // All cases come from the same position pool to keep each round focused.
  const buildRoundCases = useCallback(
    (position, includeHistorical, usedIds = new Set()) => {
      let pool = getPool(position, includeHistorical);
      const available = pool.filter((p) => !usedIds.has(p.id));
      const source = available.length >= 26 ? available : pool;

      const lowThreshold = NFL_LOW_VALUE_THRESHOLD[position] ?? 0;
      const lowPool  = shuffleNFL(source.filter((p) => p.value < lowThreshold));
      const highPool = shuffleNFL(source.filter((p) => p.value >= lowThreshold));

      // Guarantee 7-8 "low" players per round to maintain deal-or-no-deal tension.
      const MIN_LOW = 7;
      const LOW_VARIANCE = 2;
      const lowCount  = MIN_LOW + Math.floor(Math.random() * LOW_VARIANCE);
      const pickedLow  = lowPool.slice(0, Math.min(lowCount, lowPool.length));
      const pickedHigh = highPool.slice(0, 26 - pickedLow.length);
      return shuffleNFL([...pickedLow, ...pickedHigh]);
    },
    [getPool]
  );

  return {
    loading: false,
    apiError: null,
    getPool,
    buildComputerRoster,
    buildRoundCases,
  };
}
