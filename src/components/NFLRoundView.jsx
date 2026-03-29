import { useState } from 'react';
import Briefcase from './Briefcase';
import BankerOffer from './BankerOffer';
import { calcBankerOffer, OPEN_GROUPS } from '../utils/gameLogic';
import {
  nflValueColor,
  nflStatLabel,
  findNFLBankerPlayer,
  formatNFLStat,
} from '../utils/nflGameLogic';
import { NFL_ROUND_LABELS, NFL_ROUND_SHORT } from '../data/nflPlayers';

function buildRankedBoard(cases) {
  return [...cases].sort((a, b) => b.player.value - a.player.value);
}

export default function NFLRoundView({
  roundIndex,
  cases,
  onRoundComplete,
  playerRoster,
  computerRoster,
  positionPool, // full position pool for this round (for banker player lookup)
}) {
  const position = NFL_ROUND_SHORT[roundIndex];
  const statLbl  = nflStatLabel(position);
  const colorFn  = (v) => nflValueColor(position, v);

  const [localCases, setLocalCases]         = useState(() =>
    cases.map((c) => ({ ...c, opened: false }))
  );
  const [heldIndex, setHeldIndex]           = useState(null);
  const [phase, setPhase]                   = useState('pick');
  const [openCount, setOpenCount]           = useState(0);
  const [groupIdx, setGroupIdx]             = useState(0);
  const [openedInGroup, setOpenedInGroup]   = useState(0);
  const [offer, setOffer]                   = useState(null);
  const [dealAccepted, setDealAccepted]     = useState(false);
  const [finalPlayer, setFinalPlayer]       = useState(null);
  const [bankerPlayer, setBankerPlayer]     = useState(null);
  const [offeredBankerIds, setOfferedBankerIds] = useState(new Set());

  const totalGroups = OPEN_GROUPS.length;
  const rankedBoard = buildRankedBoard(localCases);

  function pickCase(index) {
    if (phase !== 'pick') return;
    setHeldIndex(index);
    setPhase('open');
  }

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
      const closed = updated.filter((c, i) => !c.opened && i !== heldIndex);
      const newOffer = calcBankerOffer(closed, newOpenCount);
      setOffer(newOffer);

      if (positionPool && positionPool.length > 0) {
        // All players on the rankings board (in briefcases)
        const casePlayerIds = new Set(cases.map((c) => c.player.id));
        // Players whose briefcase has already been opened
        const eliminatedIds = new Set(
          updated.filter((c) => c.opened).map((c) => c.player.id),
        );
        // Players to skip entirely: held case, already-offered, already in roster
        const usedIds = new Set([
          ...(heldIndex !== null ? [cases[heldIndex].player.id] : []),
          ...offeredBankerIds,
          ...Object.values(playerRoster).filter(Boolean).map((p) => p.id),
        ]);
        const bp = findNFLBankerPlayer(
          newOffer,
          positionPool,
          usedIds,
          casePlayerIds,
          eliminatedIds,
        );
        setBankerPlayer(bp);
        if (bp) setOfferedBankerIds((prev) => new Set([...prev, bp.id]));
      }

      setOpenedInGroup(0);
      setPhase('offer');
    } else {
      setOpenedInGroup(newGroupOpened);
    }
  }

  function handleDeal() {
    const offerPlayer = bankerPlayer || {
      id: -1,
      name: `Banker's Offer (${offer} ${statLbl})`,
      position,
      value: offer,
      active: true,
      era: 'offer',
    };
    setDealAccepted(true);
    setFinalPlayer(offerPlayer);
    setLocalCases((prev) =>
      prev.map((c, i) => (i === heldIndex ? { ...c, opened: true } : c))
    );
    setPhase('reveal');
  }

  function handleNoDeal() {
    const nextGroupIdx = groupIdx + 1;
    setGroupIdx(nextGroupIdx);
    setOffer(null);

    if (nextGroupIdx >= totalGroups) {
      setLocalCases((prev) =>
        prev.map((c, i) => (i === heldIndex ? { ...c, opened: true } : c))
      );
      setFinalPlayer(localCases[heldIndex].player);
      setPhase('reveal');
    } else {
      setPhase('open');
    }
  }

  function handleConfirm() {
    onRoundComplete(finalPlayer, position);
  }

  const needToOpen = phase === 'open' ? OPEN_GROUPS[groupIdx] - openedInGroup : 0;
  const openedCount = localCases.filter((c) => c.opened).length;

  return (
    <div className="min-h-screen px-2 py-4 max-w-7xl mx-auto">
      {/* Round header */}
      <div className="text-center mb-4">
        <p className="text-gray-500 text-xs uppercase tracking-widest">
          Round {roundIndex + 1} of 6
        </p>
        <h1 className="text-2xl font-extrabold text-white">
          {NFL_ROUND_LABELS[roundIndex]}
          <span className="text-green-400 ml-2 text-lg">— {statLbl}</span>
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
            Player locked in — add them to your roster!
          </p>
        )}
      </div>

      <div className="flex flex-col xl:flex-row gap-4">

        {/* ── Left: Value Ranking Board ───────────────────────────────────── */}
        <div className="xl:w-52 flex-shrink-0">
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-700 px-3 py-1.5 text-center">
              <span className="text-green-400 font-bold text-xs uppercase tracking-wide">
                Player Rankings
              </span>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-0">
              {rankedBoard.map((c, rank) => (
                <div
                  key={c.number}
                  className="flex items-center gap-1.5 px-2 py-0.5 border-b border-gray-700/50"
                >
                  <span className="text-gray-500 text-xs w-4 flex-shrink-0">
                    {rank + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-xs font-semibold truncate block text-white"
                      style={{ fontSize: '0.6rem' }}
                    >
                      {c.player.name}
                    </span>
                  </div>
                  <span
                    className={`font-bold flex-shrink-0 ${colorFn(c.player.value)}`}
                    style={{ fontSize: '0.65rem' }}
                  >
                    {formatNFLStat(position, c.player.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Center: Briefcases ───────────────────────────────────────────── */}
        <div className="flex-1">
          <div className="grid grid-cols-6 sm:grid-cols-7 gap-1.5 justify-items-center mb-3">
            {localCases.map((c, i) => (
              <Briefcase
                key={c.number}
                caseData={c}
                index={i}
                phase={phase}
                isHeld={i === heldIndex}
                colorFn={colorFn}
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
              { label: 'Elite',    cls: 'text-emerald-400' },
              { label: 'Great',    cls: 'text-green-400' },
              { label: 'Good',     cls: 'text-yellow-400' },
              { label: 'Average',  cls: 'text-orange-400' },
              { label: 'Low',      cls: 'text-red-400' },
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

          {/* Reveal + confirm panel */}
          {phase === 'reveal' && finalPlayer && (
            <div className="mt-3 bg-gray-800 border-2 border-green-500 rounded-2xl p-5 text-center max-w-md mx-auto shadow-xl shadow-green-500/10">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                {dealAccepted ? "Banker's Offer Accepted!" : 'Your pick!'}
              </p>
              <h2 className="text-white font-extrabold text-xl mb-1">
                {finalPlayer.name}
              </h2>
              <p className="text-gray-400 text-xs mb-1">
                {finalPlayer.active ? 'Active' : finalPlayer.era}
              </p>
              <div className={`text-4xl font-black ${colorFn(finalPlayer.value)} mb-1`}>
                {formatNFLStat(position, finalPlayer.value)}
              </div>
              <p className="text-gray-500 text-xs mb-4">{statLbl}</p>

              {dealAccepted && heldIndex !== null && localCases[heldIndex] && (
                <div className="mb-4 bg-gray-700/50 border border-gray-600 rounded-xl p-3">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                    Your case contained:
                  </p>
                  <p className="text-white font-bold text-sm">
                    {localCases[heldIndex].player.name}
                  </p>
                  <p className={`text-lg font-black ${colorFn(localCases[heldIndex].player.value)}`}>
                    {formatNFLStat(position, localCases[heldIndex].player.value)} {statLbl}
                  </p>
                </div>
              )}

              <p className="text-gray-300 text-sm font-semibold mb-3">
                Adding to your roster as{' '}
                <span className="text-green-400 font-bold">{NFL_ROUND_LABELS[roundIndex]}</span>
              </p>
              <button
                onClick={handleConfirm}
                className="w-full py-3 px-4 rounded-xl font-bold text-base transition-all border-2 border-green-500 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black cursor-pointer"
              >
                Add to Roster ✓
              </button>
            </div>
          )}
        </div>

        {/* ── Right: Roster sidebar ────────────────────────────────────────── */}
        <div className="xl:w-48 flex-shrink-0 space-y-3">
          <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
            <h3 className="text-green-400 font-bold text-xs uppercase tracking-wide mb-2">
              Your Roster
            </h3>
            {NFL_ROUND_SHORT.map((slot) => {
              const player = playerRoster[slot];
              const slotColor = (v) => nflValueColor(slot, v);
              return (
                <div key={slot} className="flex items-center gap-2 mb-1.5">
                  <span className="text-gray-400 text-xs w-10 flex-shrink-0">
                    {slot}
                  </span>
                  {player ? (
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold leading-tight truncate">
                        {player.name}
                      </p>
                      <p className={`text-xs font-bold ${slotColor(player.value)}`}>
                        {formatNFLStat(slot, player.value)} {nflStatLabel(slot)}
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
            {NFL_ROUND_SHORT.map((slot, idx) => {
              const player = computerRoster[idx];
              const slotColor = (v) => nflValueColor(slot, v);
              return (
                <div key={slot} className="flex items-center gap-2 mb-1.5">
                  <span className="text-gray-400 text-xs w-10 flex-shrink-0">
                    {slot}
                  </span>
                  {player ? (
                    <div className="min-w-0">
                      <p className="text-white text-xs font-semibold leading-tight truncate">
                        {player.name}
                      </p>
                      <p className={`text-xs font-bold ${slotColor(player.value)}`}>
                        {formatNFLStat(slot, player.value)} {nflStatLabel(slot)}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-600 text-xs">—</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Banker offer modal */}
      {phase === 'offer' && offer !== null && (
        <BankerOffer
          offer={offer}
          player={bankerPlayer}
          roundLabel={NFL_ROUND_LABELS[roundIndex]}
          eliminatedPlayers={localCases.filter((c) => c.opened).map((c) => c.player)}
          onDeal={handleDeal}
          onNoDeal={handleNoDeal}
          colorFn={colorFn}
          statLabel={statLbl}
        />
      )}
    </div>
  );
}
