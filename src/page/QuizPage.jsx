import { useCategory } from "../contexts/CategoryContext"
import useFetchQuestions from "../hooks/useFetchQuestions";


function QuizPage() {
  const {selectedCategory} = useCategory();
  const {questions,error,loading}= useFetchQuestions(selectedCategory?.id);

  if(error) return <div>Error : {error}</div>;
  if(loading) return <div>Loading Quesions...</div>;
  return (
    <div>
      {questions.map((val,idx)=>{
        return(
          <div key={idx}>
            {val.question}
          </div>
        )
      })}
    </div>
  )
}

export default QuizPage
