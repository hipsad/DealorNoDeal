// ─── Banker offer calculation ──────────────────────────────────────────────
// The banker offer is a fraction of the expected value of the remaining cases.
// Classic Deal or No Deal bankers typically offer 80-95% of expected value
// after several cases are opened.

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
export function valueColor(value) {
  if (value >= 25) return 'text-emerald-400';
  if (value >= 20) return 'text-green-400';
  if (value >= 15) return 'text-yellow-400';
  if (value >= 10) return 'text-orange-400';
  return 'text-red-400';
}

// ─── Banker player selection ───────────────────────────────────────────────
// Find the real player whose PPG best matches the banker's offer, excluding
// any player in the provided exclusion set (ranking-board cases + already-
// offered banker picks this round).  Prefers the highest-PPG player at or
// below the offer ("roll down"); falls back to the closest player above the
// offer only when every eligible player exceeds it.
export function findBankerPlayer(offer, allPlayers, excludedIds) {
  const eligible = allPlayers.filter((p) => !excludedIds.has(p.id));
  if (eligible.length === 0) return null;

  // Sort descending by PPG so atOrBelow[0] is the highest value ≤ offer.
  const sorted = [...eligible].sort((a, b) => b.value - a.value);
  const atOrBelow = sorted.filter((p) => p.value <= offer);
  if (atOrBelow.length > 0) return atOrBelow[0];

  // All eligible players are above the offer — return the one closest to it.
  return sorted[sorted.length - 1];
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
