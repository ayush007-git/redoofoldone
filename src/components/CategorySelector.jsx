import { useCategory } from "../contexts/CategoryContext";
import { useNavigate } from "react-router-dom";

function CategorySelector({ categories }) {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useCategory();
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 py-[50px]">
      {categories.map((val) => (
        <div
          key={val.id}
          onClick={() => {
            setSelectedCategory(val);
            navigate("/quiz");
          }}
          className="hover:bg-[#2563eb] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg text-[#e1e5f2] text-[20px] flex h-[200px] w-[300px] bg-[#1e293b] text-white text-center items-center justify-center rounded-md shadow-md"
        >
          {val.name}
        </div>
      ))}
    </div>
  );
}

export default CategorySelector;
