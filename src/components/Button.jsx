import React from 'react'

export default function Button({ isGameFinished, checkAnswers, playAgain }) {
    return (
        <>
            {isGameFinished ? (
                <button className="quizzical--button" onClick={playAgain}>
                    Play again
                </button>
            ) : (
                <button className="quizzical--button" onClick={checkAnswers}>
                    Check answers
                </button>
            )}
        </>
    )
}