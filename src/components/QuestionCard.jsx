import React, { useEffect, useState } from "react";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function QuestionCard({ questionData, onAnswer }) {
  const [active, setActive] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(
      shuffleArray([
        questionData.correct_answer,
        ...questionData.incorrect_answers,
      ])
    );
    setActive(null);
    setAnswered(false);
    setIsCorrect(false);
  }, [questionData]);
  function handleClick(option) {
    if (answered) return;
    setActive(option);
    setAnswered(true);
    setIsCorrect(option === questionData.correct_answer);
  }
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{questionData.question}</h2>
      <div className="grid grid-cols-1 gap-4">
        {options.map((option, idx) => {
          let optionClass = "p-2 rounded border cursor-pointer";
          if (answered) {
            if (option === questionData.correct_answer) {
              optionClass += " bg-green-600 text-white";
            } else if (option === active) {
              optionClass += " bg-red-600 text-white";
            }
          }

          return (
            <div
              key={idx}
              className={optionClass}
              onClick={() => handleClick(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
      {answered && (
        <div
          onClick={() => {
            onAnswer(isCorrect);
          }}
        >
          <p>next</p>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
