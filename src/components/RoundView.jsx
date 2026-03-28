import { useState } from 'react';
import Briefcase from './Briefcase';
import BankerOffer from './BankerOffer';
import { calcBankerOffer, OPEN_GROUPS, valueColor } from '../utils/gameLogic';
import { ROUND_LABELS, ROUND_SHORT } from '../data/players';

// Sort players by value descending for the ranking board
function buildRankedBoard(cases) {
  return [...cases].sort((a, b) => b.player.value - a.player.value);
}

export default function RoundView({
  roundIndex,
  cases,
  onRoundComplete,
  playerRoster,   // object: { PG: player|null, SG: player|null, ... }
  computerRoster,
}) {
  const [localCases, setLocalCases] = useState(() =>
    cases.map((c) => ({ ...c, opened: false }))
  );
  const [heldIndex, setHeldIndex]         = useState(null);
  const [phase, setPhase]                 = useState('pick');
  const [openCount, setOpenCount]         = useState(0);
  const [groupIdx, setGroupIdx]           = useState(0);
  const [openedInGroup, setOpenedInGroup] = useState(0);
  const [offer, setOffer]                 = useState(null);
  const [dealAccepted, setDealAccepted]   = useState(false);
  const [finalPlayer, setFinalPlayer]     = useState(null);

  const totalGroups = OPEN_GROUPS.length;

  // Ranked board for the sidebar (constant order, marks opened entries)
  const rankedBoard = buildRankedBoard(localCases);

  // ── pick ──────────────────────────────────────────────────────────────────
  function pickCase(index) {
    if (phase !== 'pick') return;
    setHeldIndex(index);
    setPhase('open');
  }

  // ── open ──────────────────────────────────────────────────────────────────
  function openCase(index) {
    if (phase !== 'open') return;
    if (index === heldIndex || localCases[index].opened) return;

    const updated = localCases.map((c, i) =>
      i === index ? { ...c, opened: true } : c
    );
    setLocalCases(updated);

    const newOpenCount   = openCount + 1;
    const newGroupOpened = openedInGroup + 1;
    setOpenCount(newOpenCount);

    if (newGroupOpened >= OPEN_GROUPS[groupIdx]) {
      // End of group → banker offer
      const closed = updated.filter((c, i) => !c.opened && i !== heldIndex);
      setOffer(calcBankerOffer(closed, newOpenCount));
      setOpenedInGroup(0);
      setPhase('offer');
    } else {
      setOpenedInGroup(newGroupOpened);
    }
  }

  // ── deal ──────────────────────────────────────────────────────────────────
  function handleDeal() {
    const offerPlayer = {
      id: -1,
      name: `Banker's Offer (${offer} PPG avg)`,
      position: 'ANY',
      value: offer,
      active: true,
      era: 'offer',
    };
    setDealAccepted(true);
    setFinalPlayer(offerPlayer);
    // Reveal held case visually
    setLocalCases((prev) =>
      prev.map((c, i) => (i === heldIndex ? { ...c, opened: true } : c))
    );
    setPhase('reveal');
  }

  // ── no deal ───────────────────────────────────────────────────────────────
  function handleNoDeal() {
    const nextGroupIdx = groupIdx + 1;
    setGroupIdx(nextGroupIdx);
    setOffer(null);

    if (nextGroupIdx >= totalGroups) {
      // All groups done — reveal held case and take it
      setLocalCases((prev) =>
        prev.map((c, i) => (i === heldIndex ? { ...c, opened: true } : c))
      );
      setFinalPlayer(localCases[heldIndex].player);
      setPhase('reveal');
    } else {
      setPhase('open');
    }
  }

  // ── position assignment ───────────────────────────────────────────────────
  function handleSlotPick(slotKey) {
    onRoundComplete(finalPlayer, slotKey);
  }

  const needToOpen =
    phase === 'open' ? OPEN_GROUPS[groupIdx] - openedInGroup : 0;

  const openedCount = localCases.filter((c) => c.opened).length;

  return (
    <div className="min-h-screen px-2 py-4 max-w-7xl mx-auto">
      {/* Round header */}
      <div className="text-center mb-4">
        <p className="text-gray-500 text-xs uppercase tracking-widest">
          Round {roundIndex + 1} of 6
        </p>
        <h1 className="text-2xl font-extrabold text-white">
          Pick Your Player
        </h1>
        {phase === 'pick' && (
          <p className="text-gray-300 text-sm">
            Choose a briefcase to hold — then open the rest to hear from the Banker.
          </p>
        )}
        {phase === 'open' && (
          <p className="text-gray-300 text-sm">
            Open{' '}
            <span className="font-bold text-yellow-400">{needToOpen}</span>{' '}
            more case{needToOpen !== 1 ? 's' : ''} to hear from the Banker.
          </p>
        )}
        {phase === 'reveal' && (
          <p className="text-gray-300 text-sm">
            Player locked in — now choose a roster slot!
          </p>
        )}
      </div>

      <div className="flex flex-col xl:flex-row gap-4">

        {/* ── Left: Value Ranking Board ──────────────────────────────────── */}
        <div className="xl:w-52 flex-shrink-0">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-700 px-3 py-1.5 text-center">
              <span className="text-yellow-400 font-bold text-xs uppercase tracking-wide">
                Player Rankings
              </span>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-0">
              {rankedBoard.map((c, rank) => {
                const isOpened = c.opened;
                const isHeld   = localCases.indexOf(c) === heldIndex;
                return (
                  <div
                    key={c.number}
                    className={`flex items-center gap-1.5 px-2 py-0.5 border-b border-gray-700/50 transition-opacity ${
                      isOpened ? 'opacity-30' : ''
                    }`}
                  >
                    <span className="text-gray-500 text-xs w-4 flex-shrink-0">
                      {rank + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`text-xs font-semibold truncate block ${
                          isOpened
                            ? 'line-through text-gray-500'
                            : isHeld
                            ? 'text-blue-300'
                            : 'text-white'
                        }`}
                        style={{ fontSize: '0.6rem' }}
                      >
                        {c.player.name}
                      </span>
                    </div>
                    <span
                      className={`font-bold flex-shrink-0 ${valueColor(c.player.value)} ${
                        isOpened ? 'line-through' : ''
                      }`}
                      style={{ fontSize: '0.65rem' }}
                    >
                      {c.player.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Center: Briefcases ────────────────────────────────────────── */}
        <div className="flex-1">
          {/* 26 briefcases in a responsive grid */}
          <div className="grid grid-cols-6 sm:grid-cols-7 gap-1.5 justify-items-center mb-3">
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

          {/* Value color legend */}
          <div className="flex flex-wrap gap-2 justify-center text-xs mb-3">
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

          {/* Progress indicator */}
          {heldIndex !== null && phase !== 'reveal' && (
            <div className="text-center text-xs text-gray-500 mb-2">
              {openedCount} / 25 cases opened
              {phase === 'open' && (
                <span className="text-yellow-400">
                  {' '}· Open {needToOpen} more
                </span>
              )}
            </div>
          )}

          {/* Reveal + position-assignment panel */}
          {phase === 'reveal' && finalPlayer && (
            <div className="mt-3 bg-gray-800 border-2 border-yellow-500 rounded-2xl p-5 text-center max-w-md mx-auto shadow-xl shadow-yellow-500/10">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                {dealAccepted ? "Banker's Offer Accepted!" : 'Your pick!'}
              </p>
              <h2 className="text-white font-extrabold text-xl mb-1">
                {finalPlayer.name}
              </h2>
              <p className="text-gray-400 text-xs mb-1">
                {finalPlayer.active ? 'Active' : finalPlayer.era}
              </p>
              <div
                className={`text-4xl font-black ${valueColor(finalPlayer.value)} mb-4`}
              >
                {finalPlayer.value} PPG
              </div>

              {/* Position-slot selector */}
              <p className="text-gray-300 text-sm font-semibold mb-3">
                Assign this player to a roster slot:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {ROUND_SHORT.map((slotKey, idx) => {
                  const alreadyFilled = Boolean(playerRoster[slotKey]);
                  return (
                    <button
                      key={slotKey}
                      onClick={() => !alreadyFilled && handleSlotPick(slotKey)}
                      disabled={alreadyFilled}
                      className={`py-2 px-1 rounded-xl font-bold text-sm transition-all border-2 ${
                        alreadyFilled
                          ? 'border-gray-700 bg-gray-700/40 text-gray-600 cursor-not-allowed'
                          : 'border-yellow-500 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500 hover:text-black cursor-pointer'
                      }`}
                    >
                      <div className="text-xs font-extrabold">{slotKey}</div>
                      <div style={{ fontSize: '0.6rem' }} className="opacity-70 leading-tight">
                        {ROUND_LABELS[idx]}
                      </div>
                      {alreadyFilled && (
                        <div style={{ fontSize: '0.55rem' }} className="text-gray-500 mt-0.5">
                          ✓ Filled
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Roster sidebar ─────────────────────────────────────── */}
        <div className="xl:w-48 flex-shrink-0 space-y-3">
          <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
            <h3 className="text-yellow-400 font-bold text-xs uppercase tracking-wide mb-2">
              Your Roster
            </h3>
            {ROUND_SHORT.map((slotKey, idx) => {
              const player = playerRoster[slotKey];
              return (
                <div key={slotKey} className="flex items-center gap-2 mb-1.5">
                  <span className="text-gray-400 text-xs w-10 flex-shrink-0">
                    {slotKey}
                  </span>
                  {player ? (
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold leading-tight truncate">
                        {player.name}
                      </p>
                      <p className={`text-xs font-bold ${valueColor(player.value)}`}>
                        {player.value} PPG
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-600 text-xs">—</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
            <h3 className="text-red-400 font-bold text-xs uppercase tracking-wide mb-2">
              Computer's Team
            </h3>
            {ROUND_SHORT.map((slotKey, idx) => (
              <div key={slotKey} className="flex items-center gap-2 mb-1.5">
                <span className="text-gray-400 text-xs w-10 flex-shrink-0">
                  {slotKey}
                </span>
                <span className="text-gray-500 text-xs">🔒 Hidden</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Banker offer modal */}
      {phase === 'offer' && offer !== null && (
        <BankerOffer
          offer={offer}
          roundLabel={`Round ${roundIndex + 1}`}
          onDeal={handleDeal}
          onNoDeal={handleNoDeal}
        />
      )}
    </div>
  );
}
