import { useState } from "react"
import { useCategory } from "../contexts/CategoryContext"
import useFetchQuestions from "../hooks/useFetchQuestions"
import QuestionCard from "../components/QuestionCard"
import { useNavigate } from "react-router-dom"

function QuizPage() {
  const navigate = useNavigate()
  const { selectedCategory, selectedDifficulty } = useCategory()
  const { questions, error, loading } = useFetchQuestions(selectedCategory?.id, selectedDifficulty?.id)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)

  if (!selectedCategory || !selectedDifficulty) {
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
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Missing Selection</h2>
          <p className="text-slate-400 mb-6">Please select a category and difficulty</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Start Over
          </button>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Error Loading Questions</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Loading Questions...</h2>
          <p className="text-slate-400">Preparing your {selectedCategory.name} quiz</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-1">Quiz Time!</h1>
              <p className="text-blue-400 font-medium">Category: {selectedCategory.name}</p>
              <p className="text-purple-400 font-medium text-sm">Difficulty: {selectedDifficulty.name}</p>
            </div>

            {/* Progress indicator */}
            <div className="hidden sm:flex items-center space-x-2">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i <= questionIndex ? "bg-blue-500" : "bg-slate-600"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quiz content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <QuestionCard
          questionData={questions[questionIndex]}
          questionNumber={questionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={(isCorrect) => {
            const newScore = isCorrect ? score + 1 : score
            const newIndex = questionIndex + 1

            if (newIndex >= questions.length) {
              navigate("/results", { state: { score: newScore, total: questions.length } })
              return
            }
            setQuestionIndex(newIndex)
            setScore(newScore)
          }}
        />
      </div>
    </div>
  )
}

export default QuizPage
