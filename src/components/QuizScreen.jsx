import React,{ useState, useEffect } from 'react'

import _ from 'lodash';

import data from "../questions"
import Question from './Question';

export default function QuizScreen({setIsStartGame}) {
    const [questions, setQuestions] = useState(enrichData(data));

    function enrichData(data) {
        return data.map(question => {
            //add incorrect options
            const options = question.incorrect_answers.map( incorrect => {
                return {
                    isCorrect: false,
                    value: incorrect
                }
            })
            //add correct option
            options.push({
                isCorrect: true,
                value: question.correct_answer
            })
            return {
                title: question.question,
                options: _.shuffle(options)
            }
        })
    }
    // useEffect(() => {
    //     fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    //       .then(response =>  response.json())
    //       .then(data => setQuestions(data))
    //   }, []); 

    console.log(questions)

    return (
        <div className='quiz--container'>
            <Question props={questions[0]}/>
        </div>
    )
}