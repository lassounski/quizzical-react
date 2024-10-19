import React from "react"

export default function StartScreen({setIsStartGame}) {
    
    function toggle() {
        setIsStartGame(false)
    }

    return(
        <div className="start--container">
            <h1>Quizzical</h1>
            <p className="start-question">Ready to test your knowledge?</p>
            <button onClick={toggle} className="quizzical--button">Start quiz</button>
        </div>
    )
}