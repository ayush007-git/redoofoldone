import { useEffect, useState } from "react"
import { fetchQuestions } from "../api/fetchQuestions"

export default function useFetchQuestions(categoryID, difficulty) {
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!categoryID || !difficulty) return

    setError(null)
    setLoading(true)

    fetchQuestions(categoryID, difficulty).then((res) => {
      if (res.error) {
        setError(res.error)
        setQuestions([])
      } else {
        setQuestions(res)
      }
      setLoading(false)
    })
  }, [categoryID, difficulty])

  return { questions, error, loading }
}
