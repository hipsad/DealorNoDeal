// ─── Composite value score ─────────────────────────────────────────────────
// Players are ranked by a weighted impact score combining traditional box-score
// stats with two key advanced metrics available from NBA stats APIs:
//
//   base     = PPG×1.0 + RPG×1.2 + APG×1.5 + SPG×2.0 + BPG×2.0
//   advanced = (PER − 15) × 0.3  +  BPM × 0.5
//
// Advanced stats:
//   PER  – Player Efficiency Rating (league avg ≈ 15; elite > 25)
//   TS%  – True Shooting % (FG efficiency accounting for FTs and 3-pointers)
//   BPM  – Box Plus/Minus (per-100-possession value above average, 0 = avg)
//
// Typical range: ~14 (bench role player) to ~105 (Wilt's 1962 historic season).
export function computeValue(stats) {
  const base =
    stats.ppg * 1.0 +
    stats.rpg * 1.2 +
    stats.apg * 1.5 +
    stats.spg * 2.0 +
    stats.bpg * 2.0;
  const perBonus = stats.per != null ? (stats.per - 15) * 0.3 : 0;
  const bpmBonus = stats.bpm != null ? stats.bpm * 0.5 : 0;
  return Math.round((base + perBonus + bpmBonus) * 10) / 10;
}

// Return a short stats string showing advanced metrics when available
export function shortStats(stats) {
  if (!stats) return '';
  if (stats.per != null && stats.bpm != null) {
    const bpmSign = stats.bpm >= 0 ? '+' : '';
    return `PER ${stats.per}  TS% ${(stats.ts_pct * 100).toFixed(1)}%  BPM ${bpmSign}${stats.bpm}`;
  }
  return `${stats.ppg}p  ${stats.rpg}r  ${stats.apg}a`;
}

// ─── Banker offer calculation ──────────────────────────────────────────────
// The banker offer is a fraction of the expected composite value of the
// remaining cases. Classic Deal or No Deal bankers typically offer 80-95% of
// expected value after several cases are opened.

export function calcBankerOffer(closedCases, openCount) {
  if (closedCases.length === 0) return 0;
  const avg = closedCases.reduce((s, c) => s + c.player.value, 0) / closedCases.length;
  // Increase offer % the more cases have been opened (more certainty)
  const fractions = [0.60, 0.70, 0.80, 0.90];
  const idx = Math.min(openCount - 1, fractions.length - 1);
  const fraction = fractions[Math.max(0, idx)];
  return +(avg * fraction).toFixed(1);
}

// ─── Round open groups ─────────────────────────────────────────────────────
// Classic Deal or No Deal structure with 26 cases.
// Player holds 1, leaving 25 to open across 10 banker-offer rounds.
export const OPEN_GROUPS = [6, 5, 4, 3, 2, 1, 1, 1, 1, 1]; // sum = 25

// ─── Player value color ────────────────────────────────────────────────────
// Thresholds calibrated to the enhanced composite impact score range (~14–105).
export function valueColor(value) {
  if (value >= 70) return 'text-emerald-400';
  if (value >= 55) return 'text-green-400';
  if (value >= 40) return 'text-yellow-400';
  if (value >= 27) return 'text-orange-400';
  return 'text-red-400';
}

// ─── Banker player selection ───────────────────────────────────────────────
// Find the real player whose composite impact score best matches the banker's
// offer, excluding any player in the provided exclusion set (ranking-board
// cases + already-offered banker picks this round + already-chosen players
// from prior rounds).  Restricts candidates to players that fit one of the
// remaining open roster positions; falls back to all non-excluded players if
// no position match is found.  Prefers the highest-scoring player at or below
// the offer ("roll down"); falls back to the closest player above the offer
// only when every eligible player exceeds it.
export function findBankerPlayer(offer, allPlayers, excludedIds, availablePositions) {
  let eligible = allPlayers.filter((p) => !excludedIds.has(p.id));
  if (eligible.length === 0) return null;

  // Filter to players whose position fits one of the remaining roster slots.
  if (availablePositions && availablePositions.length > 0) {
    const anyPosition = availablePositions.includes('6th Man');
    if (!anyPosition) {
      const positionFiltered = eligible.filter((p) =>
        availablePositions.includes(p.position)
      );
      // Only narrow down if we actually found matching players.
      if (positionFiltered.length > 0) {
        eligible = positionFiltered;
      }
    }
  }

  // Sort descending by composite score so atOrBelow[0] is the highest value ≤ offer.
  const sorted = [...eligible].sort((a, b) => b.value - a.value);
  const atOrBelow = sorted.filter((p) => p.value <= offer);
  if (atOrBelow.length > 0) {
    // Randomly select among players within 1.0 score of the top match to add variety
    const best = atOrBelow[0];
    const nearEqual = atOrBelow.filter((p) => best.value - p.value <= 1.0);
    return nearEqual[Math.floor(Math.random() * nearEqual.length)];
  }

  // All eligible players are above the offer — return the one closest to it,
  // again randomising among players within 1.0 score of each other.
  const aboveSorted = [...eligible].sort((a, b) => a.value - b.value);
  const closest = aboveSorted[0];
  const nearEqual = aboveSorted.filter((p) => p.value - closest.value <= 1.0);
  return nearEqual[Math.floor(Math.random() * nearEqual.length)];
}

// ─── Score comparison ──────────────────────────────────────────────────────
export function calcTeamScore(roster) {
  return roster.reduce((s, p) => s + (p ? p.value : 0), 0);
}

export function formatScore(val) {
  return val.toFixed(1);
}

// ─── Determine winner ─────────────────────────────────────────────────────
export function getWinner(playerScore, compScore) {
  if (playerScore > compScore) return 'player';
  if (playerScore < compScore) return 'computer';
  return 'tie';
}
