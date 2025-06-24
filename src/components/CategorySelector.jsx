import { useCategory } from "../contexts/CategoryContext"
import { useNavigate } from "react-router-dom"

function CategorySelector({ categories }) {
  const navigate = useNavigate()
  const { selectedCategory, setSelectedCategory } = useCategory()

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              setSelectedCategory(category)
              navigate("/difficulty")
            }}
            className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 hover:from-blue-600 hover:to-blue-700 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 text-slate-100 flex items-center justify-center rounded-xl border border-slate-700 hover:border-blue-500 min-h-[140px] sm:min-h-[160px] p-4"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold leading-tight group-hover:text-white transition-colors duration-300">
                {category.name}
              </h3>

              {/* Subtle icon indicator */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-6 h-6 mx-auto bg-blue-400 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector
