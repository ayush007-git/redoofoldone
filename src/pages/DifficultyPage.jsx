import { useCategory } from "../contexts/CategoryContext"
import { useNavigate } from "react-router-dom"

function DifficultyPage() {
  const navigate = useNavigate()
  const { selectedCategory, selectedDifficulty, setSelectedDifficulty } = useCategory()

  if (!selectedCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">No Category Selected</h2>
          <p className="text-slate-400 mb-6">Please select a category first</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Back to Categories
          </button>
        </div>
      </div>
    )
  }

  const difficulties = [
    {
      id: "easy",
      name: "Easy",
      description: "Perfect for beginners",
      icon: "🌱",
      color: "from-green-600 to-green-700",
      hoverColor: "hover:from-green-500 hover:to-green-600",
      borderColor: "border-green-500",
    },
    {
      id: "medium",
      name: "Medium",
      description: "A balanced challenge",
      icon: "⚡",
      color: "from-yellow-600 to-orange-600",
      hoverColor: "hover:from-yellow-500 hover:to-orange-500",
      borderColor: "border-yellow-500",
    },
    {
      id: "hard",
      name: "Hard",
      description: "For the experts",
      icon: "🔥",
      color: "from-red-600 to-red-700",
      hoverColor: "hover:from-red-500 hover:to-red-600",
      borderColor: "border-red-500",
    },
  ]

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty)
    navigate("/quiz")
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center py-12 sm:py-16 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center text-slate-400 hover:text-slate-300 transition-colors duration-200 mb-8"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Categories
            </button>

            {/* Selected category display */}
            <div className="inline-flex items-center bg-slate-800/50 rounded-full px-6 py-3 mb-6 ml-[20px] border border-slate-700">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
              <span className="text-slate-300 font-medium">{selectedCategory.name}</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              Choose Difficulty
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-2 font-light">Select your challenge level</p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8">
              Each question has a 15-second timer. Choose wisely - the difficulty affects question complexity!
            </p>

            {/* Timer info */}
            <div className="inline-flex items-center bg-blue-600/10 border border-blue-500/30 rounded-lg px-4 py-2 mb-8">
              <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-blue-300 text-sm font-medium">15 seconds per question</span>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty.id}
              onClick={() => handleDifficultySelect(difficulty)}
              className={`group relative overflow-hidden bg-gradient-to-br ${difficulty.color} ${difficulty.hoverColor} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-current/25 text-white flex flex-col items-center justify-center rounded-2xl border-2 ${difficulty.borderColor} min-h-[200px] p-8`}
            >
              {/* Icon */}
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {difficulty.icon}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
                  {difficulty.name}
                </h3>
                <p className="text-white/80 group-hover:text-white/90 transition-colors duration-300">
                  {difficulty.description}
                </p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>
          <p className="text-slate-500 text-sm">Ready for the challenge?</p>
        </div>
      </div>
    </div>
  )
}

export default DifficultyPage
