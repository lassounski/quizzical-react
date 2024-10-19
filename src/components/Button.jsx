import React from 'react'

export default function Button({props: isGameFinished, checkAnswers, playAgain}) {
    return (
        <div className="button--container">
            {isGameFinished ? (
                <button className="quizzical--button" onClick={playAgain}>
                    Play again
                </button>
            ) : (
                <button className="quizzical--button" onClick={checkAnswers}>
                    Check answers
                </button>
            )}
        </div>
    )
}