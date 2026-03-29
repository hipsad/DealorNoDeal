import { useState, useEffect, useCallback } from 'react';
import {
  NFL_PLAYERS,
  NFL_ROUND_SHORT,
  NFL_LOW_VALUE_THRESHOLD,
  shuffleNFL,
  pickRandomNFL,
} from '../data/nflPlayers';

// ESPN unofficial NFL athlete endpoint – no auth required for basic player data.
// Does not include career stats; only used to supplement the player list with
// current roster names.  Falls back gracefully to the static dataset.
async function fetchNFLPlayersFromAPI() {
  const res = await fetch(
    'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes?limit=100&active=true',
    { signal: AbortSignal.timeout(6000) }
  );
  if (!res.ok) throw new Error(`NFL API error ${res.status}`);
  return res.json();
}

// Convert an ESPN athlete entry to our internal shape.
// Career stats are unavailable from this endpoint, so value is set to null
// and filled in with a positional default when the player is used.
function espnToNFLPlayer(athlete, idOffset) {
  const posMap = {
    QB: 'QB', WR: 'WR', RB: 'RB', CB: 'CB', SS: 'S', FS: 'S',
    DE: 'EDGE', OLB: 'EDGE', LB: 'EDGE',
  };
  const rawPos = athlete.position?.abbreviation || '';
  const position = posMap[rawPos] || null;
  if (!position) return null; // skip non-matching positions
  return {
    id: idOffset + athlete.id,
    name: athlete.displayName || `${athlete.firstName} ${athlete.lastName}`,
    position,
    value: null,
    active: true,
    era: '2020s',
  };
}

export function useNFLApi() {
  const [apiPlayers, setApiPlayers] = useState(null);
  const [apiError, setApiError]     = useState(null);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchNFLPlayersFromAPI();
        if (!cancelled) {
          const items = data.items || [];
          let converted = items
            .map((a, i) => espnToNFLPlayer(a, 9000 + i * 10))
            .filter(Boolean);
          setApiPlayers(converted.length > 0 ? converted : null);
        }
      } catch {
        if (!cancelled) setApiError('Using built-in NFL player dataset.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Build the merged pool for a single position.
  const getPool = useCallback(
    (position, includeHistorical) => {
      let pool = NFL_PLAYERS.filter(
        (p) => p.position === position && (includeHistorical || p.active)
      );

      if (apiPlayers) {
        const existingNames = new Set(pool.map((p) => p.name.toLowerCase()));
        // Fallback stat values assigned to API-sourced players that lack a stat value.
        // These are mid-range estimates for each position's 2024 season stat scale:
        //   QB  → ~150 career TDs (approximate active player average before season stats)
        //   WR  → ~700 season yards (low-end starter threshold)
        //   RB  → ~8  season rush TDs (average starter)
        //   CB  → ~3  season INTs (average starter)
        //   S   → ~70 season tackles (average starter)
        //   EDGE→ ~7  season sacks (average starter)
        const defaults = {
          QB: 20, WR: 750, RB: 8, CB: 3, S: 75, EDGE: 7,
        };
        const extra = apiPlayers
          .filter(
            (p) =>
              p.position === position &&
              !existingNames.has(p.name.toLowerCase())
          )
          .map((p) => ({
            ...p,
            value: p.value ?? defaults[position] ?? 20,
          }));
        pool = [...pool, ...extra];
      }

      return pool;
    },
    [apiPlayers]
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
    loading,
    apiError,
    getPool,
    buildComputerRoster,
    buildRoundCases,
  };
}
