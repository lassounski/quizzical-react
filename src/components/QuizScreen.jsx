import React, { useState, useEffect } from 'react'
import Button from "./Button"

import _ from 'lodash';
import { nanoid } from 'nanoid';

import data from "../questions"
import Question from './Question';

export default function QuizScreen({ setIsStartGame }) {
    const [questions, setQuestions] = useState(enrichData(data))
    const [isGameFinished, setGameFinished] = useState(false)
    const [gameMessage, setGameMessage] = useState("")

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
        const questionsCorrectCount = questions
            .reduce((accumulator, question) => {
                return question.isCorrectAnswer ? accumulator + 1 : accumulator
            }, 0)

        const isAllQuestionsSelected = questions
            .reduce((accumulator, question) => accumulator && question.isSelected, true)

        if (isAllQuestionsSelected) {
            setGameFinished(true)
            if (questionsCorrectCount === questions.length) {
                setGameMessage("🏆 5/5 correct answers")
            } else {
                setGameMessage(`You scored ${questionsCorrectCount}/${questions.length} correct answers`)
            }
        } else {
            setGameMessage('Please select one option from each question')
            setTimeout(() => {
                setGameMessage('')
            }, 5000);
        }
    }

    function playAgain() {
        setGameMessage('')
        setQuestions(enrichData(data))
        setGameFinished(false)
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
                <h3 className='game--message'>{gameMessage}</h3>
                <Button props={isGameFinished} checkAnswers={checkAnswers} playAgain={playAgain} />
            </div>
        </div>
    )
}