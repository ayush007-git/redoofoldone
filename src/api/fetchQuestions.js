export async function fetchQuestions(categoryID) {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryID}&type=multiple`
    )
    if (!res.ok) {
        throw new Error(`failed to fetch: ${res.status}`);
      }
      
      let data = await res.json();
      console.log(data);
      if(data.response_code !=0){
        throw new Error(`Api Error :${data.response_code}`);
      }
      return data.results;

    } catch (error) {
    return { error: error.message || "Something went wrong" };
  }
}
