import React, { useState, useEffect } from 'react'

import '../css/Question.css'

export default function Question({ question, isGameFinished, setQuestions }) {
    const [selectedOption, setSelectedOption] = useState({});

    function calculateOptionStyle(optionId) {
        console.log(`rending ${optionId} where the selected option is ${selectedOption.id}`)
        if (isGameFinished) {
            // highlight correct option always
            if (question.options.find(option =>
                option.id === optionId &&
                option.isCorrectOption)
            ){
                return "correct-option"
            }
            // highlight incorrect option only if selected
            if (question.options.find(option =>
                option.id === selectedOption.id &&
                option.id === optionId)
            ){
                return "incorrect-option"
            }
            return "radio-label"
        } else {
            return "radio-label"
        }
    }

    const handleChange = (event) => {
        const selectedOption = event.target
        const selectedOptionId = selectedOption.id
        setSelectedOption(selectedOption)

        setQuestions(prevQuestions =>
            prevQuestions.map(prevQuestion => {
                // found the right question for update
                if (prevQuestion.id === question.id) {
                    // Check if the selected option is the correct one
                    const correctOptionSelected = prevQuestion.options.some(
                        option => option.id === selectedOptionId && option.isCorrectOption)

                    // Update the question's isCorrectAnswer and isSelected
                    return {
                        ...prevQuestion,
                        isCorrectAnswer: correctOptionSelected,
                        isSelected: true
                    }
                } else {
                    // leave other questions unchanged
                    return prevQuestion
                }
            })
        )
    };

    return (
        <div className='question--container'>
            <h2 className='question--title'>{question.title}</h2>
            <ul className="radio-buttons">
                {question.options.map(option => (
                    <li key={option.id}>
                        <input
                            id={option.id}
                            type="radio"
                            name={`option-${question.id}`}
                            value={option.value}
                            checked={selectedOption.value === option.value}
                            onChange={handleChange}
                        />
                        <label className={calculateOptionStyle(option.id)} htmlFor={option.id}>
                            {option.value}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}