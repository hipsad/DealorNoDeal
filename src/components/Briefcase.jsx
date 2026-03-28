import { valueColor } from '../utils/gameLogic';

export default function Briefcase({ caseData, index, phase, onClick, isHeld }) {
  const { opened, player, number } = caseData;

  let containerClass =
    'briefcase w-14 h-16 sm:w-16 sm:h-18 text-center p-1 text-xs';

  if (opened) {
    containerClass += ' briefcase-opened';
  } else if (isHeld) {
    containerClass += ' briefcase-selected';
  } else if (phase === 'pick' || phase === 'open') {
    containerClass += ' briefcase-closed';
  } else {
    containerClass += ' briefcase-closed cursor-not-allowed opacity-70';
  }

  const handleClick = () => {
    if (!opened && onClick) onClick(index);
  };

  return (
    <button
      className={containerClass}
      onClick={handleClick}
      aria-label={`Case ${number}`}
    >
      {opened ? (
        <div className="flex flex-col items-center justify-center h-full gap-0.5">
          <span className="font-semibold text-gray-300 leading-tight line-clamp-2 max-w-full text-center" style={{ fontSize: '0.55rem' }}>
            {player.name}
          </span>
          <span className={`font-bold ${valueColor(player.value)}`} style={{ fontSize: '0.7rem' }}>
            {player.value}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-0.5">
          <svg
            className={`w-5 h-5 ${isHeld ? 'text-blue-200' : 'text-yellow-200'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.99 15.89 2 14 2H10c-1.89 0-4 .99-4 2.64C6 5.12 6.11 5.56 6.18 6H4C2.9 6 2 6.9 2 8v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" />
          </svg>
          <span className="font-extrabold text-white" style={{ fontSize: '0.75rem' }}>{number}</span>
          {isHeld && (
            <span className="text-blue-300 font-semibold leading-tight" style={{ fontSize: '0.5rem' }}>
              YOUR<br />PICK
            </span>
          )}
        </div>
      )}
    </button>
  );
}
