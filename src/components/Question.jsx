import React, { useState, useEffect } from 'react'

import '../css/Question.css'

export default function Question({ props: question }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    console.log(`selected: ${selectedOption}`)

    return (
        <div className='question--container'>
            <h2 className='question--title'>{question.title}</h2>
            <ul className="radio-buttons">
                {question.options.map((option, index) => (
                    <li key={index}>
                        <input
                            id={`option-${index}`}
                            type="radio"
                            name="options"
                            value={option.value}
                            checked={selectedOption === option.value}
                            onChange={handleChange}
                        />
                        <label className="radio-label" htmlFor={`option-${index}`}>
                            {option.value}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}