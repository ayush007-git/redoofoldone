import CategorySelector from "../components/CategorySelector"

function HomePage() {
  const categories = [
    { id: 9, name: "General Knowledge" },
    { id: 10, name: "Entertainment: Books" },
    { id: 11, name: "Entertainment: Film" },
    { id: 12, name: "Entertainment: Music" },
    { id: 13, name: "Entertainment: Musicals & Theatres" },
    { id: 14, name: "Entertainment: Television" },
    { id: 15, name: "Entertainment: Video Games" },
    { id: 16, name: "Entertainment: Board Games" },
    { id: 17, name: "Science & Nature" },
    { id: 18, name: "Science: Computers" },
    { id: 19, name: "Science: Mathematics" },
    { id: 20, name: "Mythology" },
    { id: 21, name: "Sports" },
    { id: 22, name: "Geography" },
    { id: 23, name: "History" },
    { id: 24, name: "Politics" },
    { id: 25, name: "Art" },
    { id: 26, name: "Celebrities" },
    { id: 27, name: "Animals" },
    { id: 28, name: "Vehicles" },
    { id: 29, name: "Entertainment: Comics" },
    { id: 30, name: "Science: Gadgets" },
    { id: 31, name: "Entertainment: Japanese Anime & Manga" },
    { id: 32, name: "Entertainment: Cartoon & Animations" },
  ]

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center py-12 sm:py-16 lg:py-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              Trivia Challenge
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-2 font-light">
              Test your knowledge across various categories
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8">
              Choose from our wide selection of trivia categories and challenge yourself with questions ranging from
              general knowledge to specialized topics.
            </p>

            {/* Decorative elements */}
            <div className="flex justify-center space-x-2 mb-8">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative">
        <div className="text-center mb-8 px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-2">Pick Your Category</h2>
          <p className="text-slate-400 text-sm sm:text-base">Select a category to begin your trivia journey</p>
        </div>

        <CategorySelector categories={categories} />
      </div>

      {/* Footer decoration */}
      <div className="py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6"></div>
          <p className="text-slate-500 text-sm">Ready to test your knowledge?</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
