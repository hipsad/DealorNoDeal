// NFL-specific game logic utilities
// Each NFL position uses a COMPOSITE score as the "value", blending a primary
// single-season counting stat with position-specific advanced metrics:
//
//   QB   → pass_tds  + passer_rating bonus + yds_per_att bonus
//   WR   → rec_yds   + rec_tds bonus       + yds_per_rec bonus
//   RB   → rush_tds  + rush_yds bonus      + yds_per_carry bonus
//   CB   → ints      + pass_def bonus      + passer_rtg_allowed bonus
//   S    → tackles   + ints bonus          + pass_def bonus
//   EDGE → sacks     + tfl bonus           + qb_hits bonus + forced_fumbles bonus
//
// Active players: 2024 NFL season stats
// Historical players: career-best single season

import { calcBankerOffer, OPEN_GROUPS } from './gameLogic';

export { calcBankerOffer, OPEN_GROUPS };

// ─── Composite value formula ───────────────────────────────────────────────
// Blends each position's primary counting stat with secondary advanced metrics.
// The primary stat still dominates; secondary stats add ±5–15% differentiation.
export function computeNFLValue(position, stats) {
  switch (position) {
    case 'QB':
      // base = pass_tds; bonus from passer rating efficiency and yards-per-attempt
      return Math.round((
        stats.pass_tds +
        (stats.passer_rating - 80) * 0.10 +
        (stats.yds_per_att  - 6.5) * 0.8
      ) * 10) / 10;
    case 'WR':
      // base = rec_yds; bonus from TD production and per-catch efficiency
      return Math.round((
        stats.rec_yds +
        stats.rec_tds    * 20 +
        (stats.yds_per_rec - 10) * 5
      ) * 10) / 10;
    case 'RB':
      // base = rush_tds; bonus from volume and per-carry efficiency
      return Math.round((
        stats.rush_tds +
        stats.rush_yds           * 0.004 +
        (stats.yds_per_carry - 4.0) * 0.8
      ) * 10) / 10;
    case 'CB':
      // base = ints; bonus from total pass defenses and coverage quality
      return Math.round((
        stats.ints +
        stats.pass_def * 0.4 +
        Math.max(0, (95 - stats.passer_rtg_allowed) * 0.03)
      ) * 10) / 10;
    case 'S':
      // base = tackles; bonus from turnover creation and coverage plays
      return Math.round((
        stats.tackles +
        stats.ints     * 5 +
        stats.pass_def * 2
      ) * 10) / 10;
    case 'EDGE':
      // base = sacks; bonus from disruption stats
      return Math.round((
        stats.sacks +
        stats.tfl           * 0.2 +
        stats.qb_hits       * 0.08 +
        stats.forced_fumbles * 0.5
      ) * 10) / 10;
    default:
      return 0;
  }
}

// ─── Secondary stats for display ──────────────────────────────────────────
// Returns an array of { label, val } objects for the secondary stat row shown
// below the primary stat in banker-offer cards, reveal panels, and results.
export function nflSecondaryStats(position, stats) {
  if (!stats) return [];
  switch (position) {
    case 'QB':
      return [
        { label: 'Pass TDs',  val: stats.pass_tds },
        { label: 'Pass Rtg',  val: stats.passer_rating },
        { label: 'Cmp%',      val: `${stats.comp_pct}%` },
        { label: 'YPA',       val: stats.yds_per_att },
      ];
    case 'WR':
      return [
        { label: 'Rec Yds',  val: stats.rec_yds.toLocaleString() },
        { label: 'Rec TDs',  val: stats.rec_tds },
        { label: 'YPR',      val: stats.yds_per_rec },
        { label: 'Catch%',   val: `${stats.catch_pct}%` },
      ];
    case 'RB':
      return [
        { label: 'Rush TDs', val: stats.rush_tds },
        { label: 'Rush Yds', val: stats.rush_yds.toLocaleString() },
        { label: 'YPC',      val: stats.yds_per_carry },
        { label: 'Rec Yds',  val: stats.rec_yds },
      ];
    case 'CB':
      return [
        { label: 'INTs',       val: stats.ints },
        { label: 'Pass Def',   val: stats.pass_def },
        { label: 'PR Allowed', val: stats.passer_rtg_allowed },
      ];
    case 'S':
      return [
        { label: 'Tackles',  val: stats.tackles },
        { label: 'INTs',     val: stats.ints },
        { label: 'Pass Def', val: stats.pass_def },
      ];
    case 'EDGE':
      return [
        { label: 'Sacks',   val: stats.sacks },
        { label: 'TFL',     val: stats.tfl },
        { label: 'QB Hits', val: stats.qb_hits },
        { label: 'FF',      val: stats.forced_fumbles },
      ];
    default:
      return [];
  }
}

// ─── Value color coding ────────────────────────────────────────────────────
// Thresholds calibrated to the composite value ranges after adding advanced stats.
// Five tiers: emerald → green → yellow → orange → red (high → low).
const NFL_COLOR_THRESHOLDS = {
  QB:   [44, 30, 20, 10],          // composite QB score: elite ≥44, great ≥30, good ≥20, avg ≥10
  WR:   [1900, 1300, 900, 500],    // composite WR score: elite ≥1900, great ≥1300, good ≥900, avg ≥500
  RB:   [27, 19, 12, 6],           // composite RB score: elite ≥27, great ≥19, good ≥12, avg ≥6
  CB:   [15, 10, 7, 4],            // composite CB score: elite ≥15, great ≥10, good ≥7, avg ≥4
  S:    [155, 120, 90, 72],        // composite S score:  elite ≥155, great ≥120, good ≥90, avg ≥72
  EDGE: [22, 16, 10, 5],           // composite EDGE score: elite ≥22, great ≥16, good ≥10, avg ≥5
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
// The composite score has a position-specific label so the value makes sense.
export function nflStatLabel(position) {
  return (
    {
      QB:   'QB Score',
      WR:   'WR Score',
      RB:   'RB Score',
      CB:   'CB Score',
      S:    'S Score',
      EDGE: 'EDGE Score',
    }[position] || 'Score'
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

// ─── Format a composite value for display ─────────────────────────────────
// WR values ≥1000 get comma-formatted; non-integer values get 1 decimal place.
export function formatNFLStat(position, value) {
  if (value === null || value === undefined) return '—';
  if (position === 'WR') {
    if (Number.isInteger(value)) {
      return value >= 1000 ? value.toLocaleString() : String(value);
    }
    return value >= 1000
      ? value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })
      : value.toFixed(1);
  }
  if (!Number.isInteger(value)) return value.toFixed(1);
  return String(value);
}
