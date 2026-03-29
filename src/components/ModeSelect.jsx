export default function ModeSelect({ onSelectNBA, onSelectNFL }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-3">
          <span className="text-yellow-400">Deal</span>
          <span className="text-white"> or </span>
          <span className="text-yellow-400">No Deal</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto">
          Build your dream team through six rounds of the banker's game.
          Choose your sport to get started!
        </p>
      </div>

      {/* Mode cards */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl w-full">
        {/* NBA mode */}
        <button
          onClick={onSelectNBA}
          className="group flex flex-col items-center bg-gray-800 border-2 border-gray-600 hover:border-yellow-400 rounded-3xl p-8 transition-all hover:shadow-xl hover:shadow-yellow-400/10 text-left"
        >
          <span className="text-6xl mb-4">🏀</span>
          <h2 className="text-white font-extrabold text-2xl mb-2">NBA</h2>
          <p className="text-gray-400 text-sm text-center">
            Build a 5-man roster + bench. Win players across PG, SG, SF, PF,
            C, and 6th Man rounds. Score is based on career PPG.
          </p>
          <span className="mt-4 text-yellow-400 font-bold text-sm group-hover:underline">
            Play NBA →
          </span>
        </button>

        {/* NFL mode */}
        <button
          onClick={onSelectNFL}
          className="group flex flex-col items-center bg-gray-800 border-2 border-gray-600 hover:border-green-400 rounded-3xl p-8 transition-all hover:shadow-xl hover:shadow-green-400/10 text-left"
        >
          <span className="text-6xl mb-4">🏈</span>
          <h2 className="text-white font-extrabold text-2xl mb-2">NFL</h2>
          <p className="text-gray-400 text-sm text-center">
            Draft one player at each position — QB, WR, RB, CB, Safety, and
            Edge Rusher. Each round is position-specific with 2024 season stats
            (career-best for legends).
          </p>
          <span className="mt-4 text-green-400 font-bold text-sm group-hover:underline">
            Play NFL →
          </span>
        </button>
      </div>
    </div>
  );
}
