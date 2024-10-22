import React, { useState } from 'react'
import { decode } from 'he';

export default function Question({ question, isGameFinished, setQuestions }) {
    const [selectedOption, setSelectedOption] = useState({});

    function calculateOptionStyle(optionId) {
        const regularButtonClasses = "text-blue-800 border-2 border-blue-800 bg-white p-1.5 rounded-xl peer-checked:bg-gray-200 peer-checked:border-gray-300"
        const correctButtonClasses = "text-blue-800 border-2 border-green-300 bg-green-300 p-1.5 rounded-xl peer-checked:bg-green-2300 peer-checked:border-green-300"
        const incorrectButtonClasses = "text-blue-800 border-2 border-red-300 bg-red-300 p-1.5 rounded-xl peer-checked:bg-red-300 peer-checked:border-red-300"
        
        if (isGameFinished) {
            // highlight correct option always
            if (question.options.find(option =>
                option.id === optionId &&
                option.isCorrectOption)
            ) {
                return correctButtonClasses
            }
            // highlight incorrect option only if selected
            if (question.options.find(option =>
                option.id === selectedOption.id &&
                option.id === optionId)
            ) {
                return incorrectButtonClasses
            }
            return regularButtonClasses
        } else {
            return regularButtonClasses
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
        <div className='border-b-2 pb-4 mx-6 border-gray-100'>
            <h2 className='text-xl  mt-4 mb-2 text-blue-900 md:text-4xl '>{decode(question.title)}</h2>
            <ul className="flex text-sm justify-center items-center gap-2 text-blue-700 
            md:text-2xl md:gap-5 md:m-5 flex-wrap">
                {question.options.map(option => (
                    <li className='my-2' key={option.id}>
                        <input
                            className='peer hidden'
                            id={option.id}
                            type="radio"
                            name={`option-${question.id}`}
                            value={decode(option.value)}
                            checked={selectedOption.value === option.value}
                            onChange={handleChange}
                        />
                        <label
                            className={calculateOptionStyle(option.id)}
                            htmlFor={option.id}>
                            {decode(option.value)}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}