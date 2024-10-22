import React from "react"

export default function StartScreen({setIsStartGame}) {
    
    function toggle() {
        setIsStartGame(false)
    }

    return(
        <div id="start-screen" className="flex flex-col items-center justify-center mx-7">
            <h1 className="text-4xl font-bold text-blue-800 md:text-6xl">Quizzical</h1>
            <p className="text-xl md:text-3xl my-5 text-blue-900 font-bold">Ready to test your knowledge?</p>
            <p className="text-l md:text-2xl my-12 md:my-24 text-blue-900  text-center">Select only one option for each question and press <b>Check answers</b></p>
            <button onClick={toggle} className="quizzical--button">Start quiz</button>
        </div>
    )
}