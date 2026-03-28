import { useState, useEffect } from 'react';
import Briefcase from './Briefcase';
import BankerOffer from './BankerOffer';
import { calcBankerOffer, OPEN_GROUPS, valueColor } from '../utils/gameLogic';
import { ROUND_LABELS, ROUND_SHORT } from '../data/players';

export default function RoundView({
  roundIndex,
  cases,          // array of { number, player, opened }
  onRoundComplete,// callback(player) – the player won for this round
  playerRoster,   // players chosen so far (for sidebar)
  computerRoster, // hidden, length 6 – only shown position label
}) {
  const [localCases, setLocalCases] = useState(() =>
    cases.map((c) => ({ ...c, opened: false }))
  );
  const [heldIndex, setHeldIndex]     = useState(null); // which case player picked
  const [phase, setPhase]             = useState('pick'); // pick | open | offer | reveal
  const [openCount, setOpenCount]     = useState(0);     // how many cases opened so far
  const [groupIdx, setGroupIdx]       = useState(0);     // which OPEN_GROUPS we're on
  const [openedInGroup, setOpenedInGroup] = useState(0); // opened in current group
  const [offer, setOffer]             = useState(null);
  const [dealAccepted, setDealAccepted] = useState(false);
  const [finalPlayer, setFinalPlayer] = useState(null);  // resolved at end of round
  const [revealDone, setRevealDone]   = useState(false);

  const roundLabel = ROUND_LABELS[roundIndex];
  const roundShort = ROUND_SHORT[roundIndex];
  const totalGroups = OPEN_GROUPS.length;

  // ── Phase: pick ──────────────────────────────────────────────────────────
  function pickCase(index) {
    if (phase !== 'pick') return;
    setHeldIndex(index);
    setPhase('open');
  }

  // ── Phase: open ──────────────────────────────────────────────────────────
  function openCase(index) {
    if (phase !== 'open') return;
    if (index === heldIndex) return;
    if (localCases[index].opened) return;

    const updated = localCases.map((c, i) =>
      i === index ? { ...c, opened: true } : c
    );
    setLocalCases(updated);

    const newOpenCount = openCount + 1;
    const newOpenedInGroup = openedInGroup + 1;
    setOpenCount(newOpenCount);

    const groupSize = OPEN_GROUPS[groupIdx];

    if (newOpenedInGroup >= groupSize) {
      // Finished this group – show banker offer
      const closed = updated.filter(
        (c, i) => !c.opened && i !== heldIndex
      );
      const offerVal = calcBankerOffer(closed, newOpenCount);
      setOffer(offerVal);
      setOpenedInGroup(0);
      setPhase('offer');
    } else {
      setOpenedInGroup(newOpenedInGroup);
    }
  }

  // ── Phase: offer → deal ──────────────────────────────────────────────────
  function handleDeal() {
    // Create a synthetic "offer player" with the banker's value
    const offerPlayer = {
      id: -1,
      name: `Banker's Offer (${offer} PPG avg)`,
      position: roundShort,
      value: offer,
      active: true,
      era: 'offer',
    };
    setDealAccepted(true);
    setFinalPlayer(offerPlayer);
    setPhase('reveal');
    // Reveal held case too
    const updated = localCases.map((c, i) =>
      i === heldIndex ? { ...c, opened: true } : c
    );
    setLocalCases(updated);
  }

  // ── Phase: offer → no deal ───────────────────────────────────────────────
  function handleNoDeal() {
    const nextGroupIdx = groupIdx + 1;
    setGroupIdx(nextGroupIdx);
    setOffer(null);

    if (nextGroupIdx >= totalGroups) {
      // No more groups – reveal held case and end
      const updated = localCases.map((c, i) =>
        i === heldIndex ? { ...c, opened: true } : c
      );
      setLocalCases(updated);
      setFinalPlayer(localCases[heldIndex].player);
      setPhase('reveal');
    } else {
      setPhase('open');
    }
  }

  // ── Phase: reveal → next round ───────────────────────────────────────────
  function handleContinue() {
    onRoundComplete(finalPlayer);
  }

  // ── Remaining cases info ─────────────────────────────────────────────────
  const closedNonHeld = localCases.filter(
    (c, i) => !c.opened && i !== heldIndex
  );
  const openedCount = localCases.filter((c) => c.opened).length;
  const needToOpen =
    phase === 'open' ? OPEN_GROUPS[groupIdx] - openedInGroup : 0;

  return (
    <div className="min-h-screen px-4 py-6 max-w-5xl mx-auto">
      {/* Round header */}
      <div className="text-center mb-6">
        <p className="text-gray-500 text-sm uppercase tracking-widest">
          Round {roundIndex + 1} of 6
        </p>
        <h1 className="text-3xl font-extrabold text-white">
          {roundLabel}{' '}
          <span className="text-yellow-400">({roundShort})</span>
        </h1>
        {phase === 'pick' && (
          <p className="text-gray-300 mt-1 text-sm">
            Click a briefcase to hold as your {roundShort}.
          </p>
        )}
        {phase === 'open' && (
          <p className="text-gray-300 mt-1 text-sm">
            Open <span className="font-bold text-yellow-400">{needToOpen}</span> more case
            {needToOpen !== 1 ? 's' : ''} to hear from the Banker.
          </p>
        )}
        {phase === 'reveal' && !revealDone && (
          <p className="text-gray-300 mt-1 text-sm">Your player for this round has been decided!</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Briefcases grid */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-3 justify-center">
            {localCases.map((c, i) => (
              <Briefcase
                key={c.number}
                caseData={c}
                index={i}
                phase={phase}
                isHeld={i === heldIndex}
                onClick={
                  phase === 'pick'
                    ? pickCase
                    : phase === 'open' && i !== heldIndex
                    ? openCase
                    : null
                }
              />
            ))}
          </div>

          {/* Value legend */}
          <div className="flex flex-wrap gap-3 justify-center mt-4 text-xs">
            {[
              { label: '25+ PPG', cls: 'text-emerald-400' },
              { label: '20-24',   cls: 'text-green-400' },
              { label: '15-19',   cls: 'text-yellow-400' },
              { label: '10-14',   cls: 'text-orange-400' },
              { label: '<10',     cls: 'text-red-400' },
            ].map(({ label, cls }) => (
              <span key={label} className={`${cls} font-semibold`}>
                ■ {label}
              </span>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-56 space-y-4">
          {/* Your roster so far */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-wide mb-3">
              Your Roster
            </h3>
            {ROUND_SHORT.map((pos, idx) => {
              const player = playerRoster[idx];
              return (
                <div key={pos} className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400 text-xs w-12">{ROUND_LABELS[idx].slice(0,6)}</span>
                  {player ? (
                    <div>
                      <p className="text-white text-xs font-semibold leading-tight">{player.name}</p>
                      <p className={`text-xs font-bold ${valueColor(player.value)}`}>{player.value} PPG</p>
                    </div>
                  ) : idx === roundIndex ? (
                    <span className="text-yellow-400 text-xs animate-pulse">Choosing…</span>
                  ) : (
                    <span className="text-gray-600 text-xs">—</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Computer roster (hidden) */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <h3 className="text-red-400 font-bold text-sm uppercase tracking-wide mb-3">
              Computer's Team
            </h3>
            {ROUND_SHORT.map((pos, idx) => (
              <div key={pos} className="flex items-center gap-2 mb-2">
                <span className="text-gray-400 text-xs w-12">{ROUND_LABELS[idx].slice(0,6)}</span>
                <span className="text-gray-500 text-xs">🔒 Hidden</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reveal panel */}
      {phase === 'reveal' && finalPlayer && (
        <div className="mt-6 bg-gray-800 border-2 border-yellow-500 rounded-2xl p-6 text-center max-w-md mx-auto shadow-xl shadow-yellow-500/10">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
            {dealAccepted ? "Banker's Offer Accepted!" : 'Your pick!'}
          </p>
          <h2 className="text-white font-extrabold text-2xl mb-1">{finalPlayer.name}</h2>
          <p className="text-gray-400 text-sm mb-2">
            {finalPlayer.position} • {finalPlayer.active ? 'Active' : finalPlayer.era}
          </p>
          <div className={`text-5xl font-black ${valueColor(finalPlayer.value)} mb-4`}>
            {finalPlayer.value} PPG
          </div>
          <button
            onClick={handleContinue}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-lg px-8 py-3 rounded-xl transition-colors shadow-lg"
          >
            {roundIndex < 5 ? 'Next Round →' : 'See Final Results 🏆'}
          </button>
        </div>
      )}

      {/* Banker offer modal */}
      {phase === 'offer' && offer !== null && (
        <BankerOffer
          offer={offer}
          roundLabel={roundLabel}
          onDeal={handleDeal}
          onNoDeal={handleNoDeal}
        />
      )}
    </div>
  );
}
