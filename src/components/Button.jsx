import React from 'react'

export default function Button({props: gameFinished}) {

    function checkAnswers(){
    }

    function playAgain() {
    }

    return (
        <div className="button--container">
            {gameFinished ? (
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