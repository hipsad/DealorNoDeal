import { useState, useEffect, useCallback } from 'react';
import { PLAYERS, shuffle } from '../data/players';

// Map balldontlie position strings to our canonical positions
const POS_MAP = {
  G: 'PG', F: 'SF', C: 'C',
  'G-F': 'SG', 'F-G': 'SG',
  'F-C': 'PF', 'C-F': 'PF',
};

function mapPosition(pos) {
  return POS_MAP[pos] || pos || 'SF';
}

// Fetch players from balldontlie v1 (no auth required for legacy endpoint)
async function fetchFromAPI(page = 1, perPage = 100) {
  const res = await fetch(
    `https://www.balldontlie.io/api/v1/players?per_page=${perPage}&page=${page}`,
    { signal: AbortSignal.timeout(6000) }
  );
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// Convert an API player object to our internal shape
function apiToPlayer(p) {
  return {
    id: p.id,
    name: `${p.first_name} ${p.last_name}`.trim(),
    position: mapPosition(p.position),
    // balldontlie v1 doesn't include career stats; use a deterministic
    // pseudo-value so the game still works when API data is loaded
    value: null,
    active: true,
    era: '2020s',
  };
}

export function useNBAApi() {
  const [apiPlayers, setApiPlayers] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchFromAPI(1, 100);
        if (!cancelled) {
          const converted = (data.data || []).map(apiToPlayer);
          setApiPlayers(converted.length > 0 ? converted : null);
        }
      } catch {
        if (!cancelled) setApiError('Using built-in player dataset.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Build a merged player pool: start with static dataset, add any API-only players
  const getPool = useCallback(
    (position, includeHistorical) => {
      let pool = PLAYERS.filter(
        (p) => p.position === position && (includeHistorical || p.active)
      );

      if (apiPlayers) {
        const existingNames = new Set(pool.map((p) => p.name.toLowerCase()));
        const extra = apiPlayers
          .filter(
            (p) =>
              p.position === position &&
              !existingNames.has(p.name.toLowerCase())
          )
          .map((p) => ({
            ...p,
            // Assign a value if we don't have stats (mid-tier default)
            value: p.value ?? 12 + Math.random() * 6,
          }));
        pool = [...pool, ...extra];
      }

      return pool;
    },
    [apiPlayers]
  );

  const getAllPool = useCallback(
    (includeHistorical) => {
      let pool = PLAYERS.filter((p) => includeHistorical || p.active);

      if (apiPlayers) {
        const existingNames = new Set(pool.map((p) => p.name.toLowerCase()));
        const extra = apiPlayers
          .filter((p) => !existingNames.has(p.name.toLowerCase()))
          .map((p) => ({
            ...p,
            value: p.value ?? 12 + Math.random() * 6,
          }));
        pool = [...pool, ...extra];
      }

      return pool;
    },
    [apiPlayers]
  );

  // Build the computer's 6-player hidden roster using tiered selection:
  // 1-3 great players (≥24 PPG), 1-3 good-to-great players (14–23.9 PPG),
  // and at least 2 weak players (<14 PPG).
  const buildComputerRoster = useCallback(
    (includeHistorical) => {
      const allPool = getAllPool(includeHistorical);

      const great = shuffle(allPool.filter((p) => p.value >= 24));
      const good  = shuffle(allPool.filter((p) => p.value >= 14 && p.value < 24));
      const weak  = shuffle(allPool.filter((p) => p.value < 14));

      // Randomly choose how many great players (1-3); remaining non-weak slots fill with good
      const greatCount = 1 + Math.floor(Math.random() * 3); // 1, 2, or 3
      const goodCount  = 4 - greatCount; // 3, 2, or 1
      const weakCount  = 2;

      const pickedGreat = great.slice(0, greatCount);
      const usedAfterGreat = new Set(pickedGreat.map((p) => p.id));
      const pickedGood  = good.filter((p) => !usedAfterGreat.has(p.id)).slice(0, goodCount);
      const usedAfterGood = new Set([...usedAfterGreat, ...pickedGood.map((p) => p.id)]);
      const pickedWeak  = weak.filter((p) => !usedAfterGood.has(p.id)).slice(0, weakCount);

      const roster = shuffle([...pickedGreat, ...pickedGood, ...pickedWeak]);
      return roster;
    },
    [getAllPool]
  );

  // Build the 26 cases for a round (randomly selected from the full player pool)
  const buildRoundCases = useCallback(
    (position, includeHistorical, usedIds = new Set()) => {
      // Always draw from the full pool regardless of position —
      // this ensures we always have 26 unique players available.
      const pool = getAllPool(includeHistorical);

      const available = pool.filter((p) => !usedIds.has(p.id));
      // If fewer than 26 available after deduplication, relax the usedIds filter
      const source = available.length >= 26 ? available : pool;

      // Skew distribution: guarantee MIN_LOW_PPG–(MIN_LOW_PPG + LOW_PPG_VARIANCE - 1)
      // players under 15 PPG per round (currently 7 or 8 out of 26 cases).
      const MIN_LOW_PPG_PLAYERS  = 7;
      const LOW_PPG_PLAYER_VARIANCE = 2;
      const lowPool  = shuffle(source.filter((p) => p.value < 15));
      const highPool = shuffle(source.filter((p) => p.value >= 15));
      const lowCount = MIN_LOW_PPG_PLAYERS + Math.floor(Math.random() * LOW_PPG_PLAYER_VARIANCE);
      const pickedLow  = lowPool.slice(0, Math.min(lowCount, lowPool.length));
      const pickedHigh = highPool.slice(0, 26 - pickedLow.length);
      return shuffle([...pickedLow, ...pickedHigh]);
    },
    [getAllPool]
  );

  return {
    loading,
    apiError,
    getPool,
    getAllPool,
    buildComputerRoster,
    buildRoundCases,
  };
}
