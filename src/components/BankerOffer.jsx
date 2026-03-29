import { valueColor } from '../utils/gameLogic';

export default function BankerOffer({ offer, player, onDeal, onNoDeal, roundLabel }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border-2 border-yellow-500 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl shadow-yellow-500/20 animate-in fade-in zoom-in duration-300">
        {/* Phone icon */}
        <div className="text-5xl mb-4">📞</div>
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">The Banker</p>
        <h2 className="text-white font-extrabold text-2xl mb-2">{roundLabel} Round</h2>
        <p className="text-gray-300 text-sm mb-4">
          {player ? "I'll give you this player:" : "I'll offer you a player guaranteed to average:"}
        </p>

        {/* Offer value */}
        <div className="bg-gray-800 rounded-xl py-4 px-6 mb-6 inline-block w-full">
          {player ? (
            <>
              <p className={`text-2xl font-extrabold text-white mb-1`}>{player.name}</p>
              <p className="text-gray-400 text-xs mb-2">{player.position}</p>
              <span className={`text-5xl font-black ${valueColor(player.value)}`}>{player.value}</span>
              <span className="text-gray-400 text-lg ml-2">PPG</span>
            </>
          ) : (
            <>
              <span className={`text-5xl font-black ${valueColor(offer)}`}>{offer}</span>
              <span className="text-gray-400 text-lg ml-2">PPG</span>
            </>
          )}
        </div>

        <p className="text-gray-400 text-xs mb-6">
          Based on the average value of remaining cases.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onDeal}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-black text-xl rounded-xl py-4 transition-colors shadow-lg"
          >
            DEAL ✅
          </button>
          <button
            onClick={onNoDeal}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black text-xl rounded-xl py-4 transition-colors shadow-lg"
          >
            NO DEAL ❌
          </button>
        </div>
      </div>
    </div>
  );
}
