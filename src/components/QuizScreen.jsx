import React,{ useState, useEffect } from 'react'

import data from "../questions"

export default function QuizScreen({setIsStartGame}) {
    const [questions, setQuestions] = useState(data);

    // useEffect(() => {
    //     fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    //       .then(response =>  response.json())
    //       .then(data => setQuestions(data))
    //   }, []); 

    console.log(questions)

    return (
        <div className='quiz--container'>
            <ul>
                {/* {questions.slice(0, 5).map((item) => (
                <li key={item.id}>{item.title}</li>
                ))} */}
            </ul>
        </div>
    )
}