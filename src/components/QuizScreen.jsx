import React, { useState, useEffect } from 'react'
import Button from "./Button"

import _ from 'lodash';
import { nanoid } from 'nanoid';

import data from "../questions"
import Question from './Question';

export default function QuizScreen({ setIsStartGame }) {
    const [questions, setQuestions] = useState(enrichData(data))
    const [isGameFinished, setGameFinished] = useState(false);

    // for each question I want to know
    // if it has been selected - to check by the end if all are selected [array] ✅
    // if it is corect - to check if player won game [array] ✅
    // each question should highlight correct and wrongly selected answers by the end the game
    // the question needs to know that the gameIsFinished
    // the game is only Finished when all questions have been marked

    function enrichData(data) {
        return data.map(question => {
            const options = question.incorrect_answers.map(incorrect => {
                return {
                    id: nanoid(),
                    isCorrectOption: false,
                    value: incorrect
                }
            })
            options.push({
                id: nanoid(),
                isCorrectOption: true,
                value: question.correct_answer
            })
            return {
                id: nanoid(),
                title: question.question,
                isCorrectAnswer: false,
                isSelected: false,
                options: _.shuffle(options)
            }
        })
    }

    function checkAnswers() {
        const isAllQuestionsSelected = questions
            .reduce((accumulator, question) => accumulator && question.isSelected, true)
        if (!isAllQuestionsSelected) {
            console.log('please selects all questions')
        }

        const questionsCorrectCount = questions
            .reduce((accumulator, question) => {
                console.log(`${question.title} - correct ${question.isCorrectAnswer}`)
                return question.isCorrectAnswer ? accumulator + 1 : accumulator
            }, 0)
            
        if (questionsCorrectCount === questions.length) {
            console.log('winner!')
        } else {
            console.log(`You have ${questionsCorrectCount}/${questions.length} right`)
        }
    }

    function playAgain() {
        console.log('playagain')
    }
    // useEffect(() => {
    //     fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    //       .then(response =>  response.json())
    //       .then(data => setQuestions(data))
    //   }, []); 

    return (
        <div>
            <div className='quiz--container'>
                {questions.map(question =>
                    <Question
                        key={question.id}
                        props={question}
                        setQuestions={setQuestions} />)
                }
            </div>
            <div className='game--container'>
                <Button props={isGameFinished} checkAnswers={checkAnswers} playAgain={playAgain} />
            </div>
        </div>
    )
}