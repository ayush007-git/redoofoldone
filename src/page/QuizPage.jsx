import { useCategory } from "../contexts/CategoryContext"


function QuizPage() {
  const {selectedCategory} = useCategory();
  console.log(selectedCategory);
  return (
    <div>
      <p>{selectedCategory.name}</p>
    </div>
  )
}

export default QuizPage
