import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const score = state?.score ?? 0;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-8">
      <p className="text-[80px] font-extrabold mb-8">Your Score:</p>
      <p className="text-[100px] font-extrabold mb-8">{score} / 10</p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/')}
          className="block bg-blue-600 hover:bg-blue-700 transition-colors font-semibold py-3 px-6 rounded-xl shadow-lg"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
