"use client"

import { useEffect, useState, useRef } from "react"

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function QuestionCard({ questionData, onAnswer, questionNumber, totalQuestions }) {
  const [active, setActive] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [options, setOptions] = useState([])
  const [timeLeft, setTimeLeft] = useState(15)
  const [timerActive, setTimerActive] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (questionData) {
      setOptions(shuffleArray([questionData.correct_answer, ...questionData.incorrect_answers]))
      setActive(null)
      setAnswered(false)
      setIsCorrect(false)
      setTimeLeft(15)
      setTimerActive(true)
    }
  }, [questionData])

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0 && !answered) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && !answered) {
      // Time's up - auto submit as incorrect
      handleTimeUp()
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timeLeft, timerActive, answered])

  function handleTimeUp() {
    setAnswered(true)
    setTimerActive(false)
    setIsCorrect(false)
    // Auto-advance after showing time's up message
    setTimeout(() => {
      onAnswer(false)
    }, 2000)
  }

  function handleClick(option) {
    if (answered || timeLeft === 0) return

    setActive(option)
    setAnswered(true)
    setTimerActive(false)
    setIsCorrect(option === questionData.correct_answer)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  }

  if (!questionData) {
    return (
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 p-8 text-center">
        <div className="text-slate-400">Loading question...</div>
      </div>
    )
  }

  const getTimerColor = () => {
    if (timeLeft > 10) return "text-green-400"
    if (timeLeft > 5) return "text-yellow-400"
    return "text-red-400"
  }

  const getProgressColor = () => {
    if (timeLeft > 10) return "bg-green-500"
    if (timeLeft > 5) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 p-6 sm:p-8 lg:p-12">
      {/* Timer Section */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-slate-600 relative mb-4">
          {/* Circular progress */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-600"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className={getProgressColor()}
              strokeDasharray={`${(timeLeft / 15) * 283} 283`}
              style={{
                transition: "stroke-dasharray 1s linear",
              }}
            />
          </svg>
          <span className={`text-2xl font-bold ${getTimerColor()}`}>{timeLeft}</span>
        </div>

        {timeLeft === 0 && !answered && <div className="text-red-400 font-medium animate-pulse">Time's Up!</div>}
      </div>

      {/* Question header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
          <span className="text-white font-bold text-lg">{questionNumber}</span>
        </div>
        <div className="text-slate-400 text-sm mb-2">
          Question {questionNumber} of {totalQuestions}
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 leading-relaxed">{questionData.question}</h2>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {options.map((option, idx) => {
          let optionClass =
            "p-4 bg-slate-700/30 rounded-lg border border-slate-600 cursor-pointer transition-all duration-200 text-slate-300 hover:border-blue-500 hover:bg-slate-600/30"

          if (answered || timeLeft === 0) {
            if (option === questionData.correct_answer) {
              optionClass = "p-4 bg-green-600/20 border-green-500 rounded-lg text-green-300 cursor-default"
            } else if (option === active) {
              optionClass = "p-4 bg-red-600/20 border-red-500 rounded-lg text-red-300 cursor-default"
            } else {
              optionClass = "p-4 bg-slate-700/20 border-slate-600 rounded-lg text-slate-400 cursor-default"
            }
          }

          return (
            <div key={idx} className={optionClass} onClick={() => handleClick(option)}>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Result and Next button */}
      {(answered || timeLeft === 0) && (
        <div className="text-center">
          <div className="mb-4">
            {timeLeft === 0 && !active ? (
              <div className="inline-flex items-center text-red-400 font-medium">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Time's Up!
              </div>
            ) : isCorrect ? (
              <div className="inline-flex items-center text-green-400 font-medium">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Correct! {timeLeft > 0 && `(${15 - timeLeft}s)`}
              </div>
            ) : (
              <div className="inline-flex items-center text-red-400 font-medium">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Incorrect
              </div>
            )}
          </div>

          {/* Only show next button if not auto-advancing */}
          {!(timeLeft === 0 && !active) && (
            <button
              onClick={() => onAnswer(isCorrect)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              {questionNumber === totalQuestions ? "View Results" : "Next Question"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionCard
