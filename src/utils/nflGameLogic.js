// NFL-specific game logic utilities
// Each NFL position uses a SINGLE-SEASON stat as the "value":
//   QB   → passing TDs   CB   → interceptions
//   WR   → receiving yards  S    → tackles
//   RB   → rushing TDs   EDGE → sacks
// Active players: 2024 NFL season stats
// Historical players: career-best single season

import { calcBankerOffer, OPEN_GROUPS } from './gameLogic';

export { calcBankerOffer, OPEN_GROUPS };

// ─── Value color coding ────────────────────────────────────────────────────
// Returns a Tailwind text-color class based on position + single-season stat value.
// Five tiers: emerald → green → yellow → orange → red (high → low).
// Each array is [elite, great, good, average] — values below the last threshold are "low".
const NFL_COLOR_THRESHOLDS = {
  QB:   [38, 25, 15, 8],        // season passing TDs:  elite ≥38, great ≥25, good ≥15, avg ≥8
  WR:   [1500, 1000, 700, 400], // season rec yards:   elite ≥1500, great ≥1000, good ≥700, avg ≥400
  RB:   [20, 13, 8, 4],         // season rush TDs:    elite ≥20, great ≥13, good ≥8, avg ≥4
  CB:   [9,  6,  4, 2],         // season INTs:        elite ≥9, great ≥6, good ≥4, avg ≥2
  S:    [120, 90, 70, 50],      // season tackles:     elite ≥120, great ≥90, good ≥70, avg ≥50
  EDGE: [17, 12,  8, 4],        // season sacks:       elite ≥17, great ≥12, good ≥8, avg ≥4
};

export function nflValueColor(position, value) {
  const t = NFL_COLOR_THRESHOLDS[position];
  if (!t) return 'text-white';
  if (value >= t[0]) return 'text-emerald-400';
  if (value >= t[1]) return 'text-green-400';
  if (value >= t[2]) return 'text-yellow-400';
  if (value >= t[3]) return 'text-orange-400';
  return 'text-red-400';
}

// ─── Stat label per position ───────────────────────────────────────────────
export function nflStatLabel(position) {
  return (
    {
      QB:   'Pass TDs',
      WR:   'Rec Yds',
      RB:   'Rush TDs',
      CB:   'INTs',
      S:    'Tackles',
      EDGE: 'Sacks',
    }[position] || 'Stat'
  );
}

// ─── Banker player selection (NFL variant) ────────────────────────────────
// Each NFL round is position-specific — the pool is already filtered to the
// round's position before this function is called.
//
// Selection tiers (first non-empty tier wins):
//   1. Players NOT in any briefcase (off the rankings board) — preferred
//   2. Players in briefcases but not yet eliminated (still closed)
//   3. Players in briefcases who are already eliminated (opened cases)
//
// excludedIds   – players to skip entirely (held case, already-offered,
//                 already in roster)
// casePlayerIds – all 26 briefcase player IDs (the rankings board)
// eliminatedIds – IDs of players whose briefcase has already been opened
export function findNFLBankerPlayer(
  offer,
  positionPool,
  excludedIds,
  casePlayerIds = new Set(),
  eliminatedIds = new Set(),
) {
  const pick = (pool) => {
    if (pool.length === 0) return null;
    const sorted = [...pool].sort((a, b) => b.value - a.value);
    const atOrBelow = sorted.filter((p) => p.value <= offer);
    if (atOrBelow.length > 0) return atOrBelow[0];
    return sorted[sorted.length - 1];
  };

  // Tier 1 – off the rankings board entirely
  const offBoard = positionPool.filter(
    (p) => !excludedIds.has(p.id) && !casePlayerIds.has(p.id),
  );
  const t1 = pick(offBoard);
  if (t1) return t1;

  // Tier 2 – on the board but not yet eliminated
  const onBoardActive = positionPool.filter(
    (p) =>
      !excludedIds.has(p.id) &&
      casePlayerIds.has(p.id) &&
      !eliminatedIds.has(p.id),
  );
  const t2 = pick(onBoardActive);
  if (t2) return t2;

  // Tier 3 – on the board and already eliminated
  const onBoardEliminated = positionPool.filter(
    (p) =>
      !excludedIds.has(p.id) &&
      casePlayerIds.has(p.id) &&
      eliminatedIds.has(p.id),
  );
  return pick(onBoardEliminated);
}

// ─── Position-by-position team comparison ─────────────────────────────────
// Returns { playerWins, computerWins, ties } across the 6 position slots.
export function calcNFLTeamRecord(playerRoster, computerRoster, positionSlots) {
  let playerWins = 0;
  let computerWins = 0;
  let ties = 0;
  positionSlots.forEach((slot, idx) => {
    const p = playerRoster[slot];
    const c = computerRoster[idx];
    if (!p || !c) return;
    if (p.value > c.value) playerWins++;
    else if (c.value > p.value) computerWins++;
    else ties++;
  });
  return { playerWins, computerWins, ties };
}

// ─── Determine winner ─────────────────────────────────────────────────────
export function getNFLWinner(playerWins, computerWins) {
  if (playerWins > computerWins) return 'player';
  if (playerWins < computerWins) return 'computer';
  return 'tie';
}

// ─── Format a stat value for display ──────────────────────────────────────
// Large receiving yard numbers get comma-formatted; others stay as-is.
export function formatNFLStat(position, value) {
  if (value === null || value === undefined) return '—';
  if (position === 'WR' && value >= 1000) {
    return value.toLocaleString();
  }
  // Sacks can be decimals (half-sacks)
  if (position === 'EDGE' && !Number.isInteger(value)) {
    return value.toFixed(1);
  }
  return String(value);
}
