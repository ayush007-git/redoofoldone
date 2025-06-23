import { Route,Routes,Navigate } from "react-router-dom";
import HomePage from "./page/HomePage";
import QuizPage from "./page/QuizPage";
import ResultPage from "./page/ResultPage";
import { CategoryProvider } from "./contexts/CategoryContext";

export default function App(){
    return(
        <div>
            <CategoryProvider>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/quiz" element={<QuizPage/>}/>
                    <Route path="/results" element={<ResultPage/>}/>
                    <Route path="*" element={<Navigate to="/" replace />}/>
                </Routes>
            </CategoryProvider>
        </div>
    )
}