import React from "react"

export default function StartScreen(start) {
    return(
        <div className="start--container">
            <h1>Quizzical</h1>
            <p className="start-question">Ready to test your knowledge?</p>
            <button className="start--button">Start quiz</button>
        </div>
    )
}