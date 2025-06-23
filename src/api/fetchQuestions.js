export async function fetchQuestions(categoryID, difficulty = "medium") {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryID}&difficulty=${difficulty}&type=multiple`,
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`)
    }

    const data = await res.json()

    if (data.response_code !== 0) {
      throw new Error(`API Error: ${data.response_code}`)
    }

    return data.results
  } catch (error) {
    return { error: error.message || "Something went wrong" }
  }
}
