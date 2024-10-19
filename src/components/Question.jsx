import React, { useState, useEffect } from 'react'

import '../css/Question.css'

export default function Question({ props: question , setQuestions}) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        const selectedOption = event.target.value
        const selectedOptionId = event.target.id
        setSelectedOption(selectedOption)
       
        setQuestions(prevQuestions => 
            prevQuestions.map(prevQuestion => {
                // found the right question for update
                if(prevQuestion.id === question.id){
                    // Check if the selected option is the correct one
                    const correctOptionSelected = prevQuestion.options.some(
                        option =>  option.id === selectedOptionId && option.isCorrectOption)
                    
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
                            checked={selectedOption === option.value}
                            onChange={handleChange}
                        />
                        <label className="radio-label" htmlFor={option.id}>
                            {option.value}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}