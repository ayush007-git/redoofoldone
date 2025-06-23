import { useLocation, useNavigate } from "react-router-dom"

function ResultPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const score = state?.score ?? 0
  const total = state?.total ?? 10
  const percentage = Math.round((score / total) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding!", color: "text-green-400", icon: "🏆" }
    if (percentage >= 80) return { message: "Excellent!", color: "text-blue-400", icon: "🎉" }
    if (percentage >= 70) return { message: "Great Job!", color: "text-purple-400", icon: "👏" }
    if (percentage >= 60) return { message: "Good Work!", color: "text-yellow-400", icon: "👍" }
    return { message: "Keep Practicing!", color: "text-orange-400", icon: "💪" }
  }

  const performance = getPerformanceMessage()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Results card */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 p-8 sm:p-12">
          {/* Success icon */}
          <div className="text-6xl mb-4">{performance.icon}</div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">Quiz Complete!</h1>

          <p className={`text-xl font-semibold mb-6 ${performance.color}`}>{performance.message}</p>

          {/* Score display */}
          <div className="bg-slate-700/30 rounded-xl p-6 mb-8">
            <div className="text-5xl sm:text-6xl font-bold text-blue-400 mb-2">
              {score}/{total}
            </div>
            <div className="text-slate-300 font-medium mb-1">Correct Answers</div>
            <div className={`text-3xl font-semibold ${performance.color}`}>{percentage}% Score</div>
          </div>

          {/* Performance breakdown */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{score}</div>
              <div className="text-slate-400 text-sm">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-1">{total - score}</div>
              <div className="text-slate-400 text-sm">Wrong</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-400 mb-1">0</div>
              <div className="text-slate-400 text-sm">Skipped</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Try Another Quiz
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors duration-200 border border-slate-600 font-medium"
            >
              Back to Categories
            </button>
          </div>
        </div>

        {/* Encouraging message */}
        <div className="mt-8 text-slate-500 text-sm">Keep practicing to improve your knowledge!</div>
      </div>
    </div>
  )
}

export default ResultPage
