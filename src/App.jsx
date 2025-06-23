import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import QuizPage from "./pages/QuizPage"
import ResultPage from "./pages/ResultPage"
import { CategoryProvider } from "./contexts/CategoryContext"
import DifficultyPage from "./pages/DifficultyPage"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <CategoryProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/difficulty" element={<DifficultyPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CategoryProvider>
    </div>
  )
}
