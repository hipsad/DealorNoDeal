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
