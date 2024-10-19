import React, { useState, useEffect } from 'react'
import Button from "./Button"

import _ from 'lodash';
import { nanoid } from 'nanoid';

import data from "../questions"
import Question from './Question';

export default function QuizScreen() {
    const [questions, setQuestions] = useState([])
    const [isGameFinished, setGameFinished] = useState(false)
    const [gameMessage, setGameMessage] = useState("")
    const [getDataTrigger, setGetDataTrigger] = useState(0)

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
                setGameMessage("")
            }, 5000);
        }
    }

    function playAgain() {
        setGetDataTrigger((prevTrigger) => prevTrigger + 1);
        setGameMessage("")
        setGameFinished(false)
    }

    const fetchData = async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple');
            setGameMessage("")
            // Check if the response status is 429
            if (response.status === 429) {
                const retryAfter = response.headers.get('Retry-After');
                const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000; // If Retry-After is provided, use it; otherwise, wait for 5 seconds

                console.warn(`Too many requests. Retrying after ${waitTime / 1000} seconds...`);
                setGameMessage("☹️ Server is too busy, waiting 5 sec.")

                // Wait for the specified time before retrying
                setTimeout(() => {
                    fetchData(); // Retry the request
                }, waitTime);
            } else if (response.ok) {
                const data = await response.json();
                setQuestions(enrichData(data.results))
                console.log('Data fetched:', data);
            } else {
                console.error('Error fetching data:', response.status);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => fetchData, [getDataTrigger]);

    return (
        <div>
            <div className='quiz--container'>
                {questions.map(question =>
                    <Question
                        key={question.id}
                        question={question}
                        isGameFinished={isGameFinished}
                        setQuestions={setQuestions} />)
                }
            </div>
            <div className='game--container'>
                {gameMessage && <h3 className='game--message'>{gameMessage}</h3>}
                <Button isGameFinished={isGameFinished} checkAnswers={checkAnswers} playAgain={playAgain} />
            </div>
        </div>
    )
}