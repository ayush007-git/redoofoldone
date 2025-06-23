import { useState } from "react";
import { useCategory } from "../contexts/CategoryContext"
import useFetchQuestions from "../hooks/useFetchQuestions";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";


function QuizPage() {
  const navigate = useNavigate();
  const {selectedCategory} = useCategory();
  const {questions,error,loading}= useFetchQuestions(selectedCategory?.id);
  const [questionIndex,setQuesionIndex]  = useState(0);
  const [score,setScore] = useState(0);

  if(error) return <div>Error : {error}</div>;
  if(loading) return <div>Loading Quesions...</div>;
  return (
    <div>
      <QuestionCard questionData= {questions[questionIndex]} onAnswer = {(isCorrect)=>{
        const newscore = isCorrect?score+1:score;
        const newind = questionIndex+1;

        if(newind>9){
          navigate('/results',{state:{score:newscore}});
          return;
        }
        setQuesionIndex(newind);
        setScore(newscore);
      }}/>
    </div>
  )
}

export default QuizPage
