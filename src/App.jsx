import React, { useState } from 'react'

import StartScreen from "./components/StartScreen"
import QuizScreen from "./components/QuizScreen"

import './App.css'

function App() {
  const [isStartGame, setIsStartGame] = useState(true);

  console.log(`isStartGame from App ${isStartGame}`)

  return (
    <main className='main--container'>
      {
        isStartGame ?
          <StartScreen setIsStartGame={setIsStartGame} />
          : <QuizScreen setIsStartGame={setIsStartGame} />
      }
    </main>
  )
}

export default App
