import React from "react"

export default function StartScreen({setIsStartGame}) {
    
    function toggle() {
        setIsStartGame(false)
    }

    return(
        <div className="start--container">
            <h1>Quizzical</h1>
            <p className="start-question">Ready to test your knowledge?</p>
            <p className="start-question">Select only one option for each question and press <b>Check answers</b></p>
            <button onClick={toggle} className="quizzical--button">Start quiz</button>
        </div>
    )
}