import { valueColor } from '../utils/gameLogic';

export default function Briefcase({ caseData, index, phase, onClick, isHeld }) {
  const { opened, player, number } = caseData;

  let containerClass = 'briefcase w-24 h-28 sm:w-28 sm:h-32 text-center p-2';

  if (opened) {
    containerClass += ' briefcase-opened';
  } else if (isHeld) {
    containerClass += ' briefcase-selected';
  } else if (phase === 'pick') {
    containerClass += ' briefcase-closed';
  } else if (phase === 'open') {
    containerClass += ' briefcase-closed';
  } else {
    containerClass += ' briefcase-closed cursor-not-allowed opacity-70';
  }

  const handleClick = () => {
    if (!opened && onClick) {
      onClick(index);
    }
  };

  return (
    <button className={containerClass} onClick={handleClick} aria-label={`Case ${number}`}>
      {opened ? (
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-xs font-semibold text-gray-300 leading-tight mb-1 max-w-full truncate">
            {player.name}
          </span>
          <span className={`text-base font-bold ${valueColor(player.value)}`}>
            {player.value}
          </span>
          <span className="text-gray-500 text-xs">PPG</span>
          <span className="text-gray-500 text-xs">{player.position}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-1">
          {/* Briefcase icon */}
          <svg
            className={`w-10 h-10 ${isHeld ? 'text-blue-200' : 'text-yellow-200'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.99 15.89 2 14 2H10c-1.89 0-4 .99-4 2.64C6 5.12 6.11 5.56 6.18 6H4C2.9 6 2 6.9 2 8v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c.55 0 2 .45 2 .64V6h-4V4.64C12 4.45 13.45 4 14 4zm-4 0h0V6h-.01C9.45 4.45 10 4.44 10 4zM11 4h2v2h-2V4z" />
            <path d="M9 4.64C9 4.45 10.45 4 11 4v2H9V4.64z" />
          </svg>
          <span className="text-lg font-extrabold text-white">{number}</span>
          {isHeld && (
            <span className="text-xs text-blue-300 font-semibold mt-1">YOUR PICK</span>
          )}
        </div>
      )}
    </button>
  );
}
