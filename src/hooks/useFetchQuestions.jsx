import React, { useEffect, useState } from 'react'
import { fetchQuestions } from '../api/fetchQuestions'

export default function useFetchQuestions(categoryID) {
    console.log(categoryID);
    const [questions,setQuestions] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        if(!categoryID) return;

        setError(null);
        setLoading(true);

        fetchQuestions(categoryID).then((res)=>{
            if(res.error){
                setError(res.error);
                setQuestions([]);
            }
            else setQuestions(res);
            setLoading(false);
        });
    },[categoryID]);

    return {questions,error,loading};
}
