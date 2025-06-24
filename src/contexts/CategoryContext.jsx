import { createContext, useContext, useState } from "react"

const CategoryContext = createContext()

export function CategoryProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedDifficulty,
        setSelectedDifficulty,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategory() {
  return useContext(CategoryContext)
}
