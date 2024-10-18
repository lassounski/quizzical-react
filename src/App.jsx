import React, { useState } from 'react'

import StartScreen from "./components/StartScreen"
import QuizScreen from "./components/QuizScreen"

import './App.css'

function App() {
  const [isStartGame, setIsStartGame] = useState(false);

  console.log(`isStartGame from App ${isStartGame}`)

  return (
    <main className='main--container'>
      {
        isStartGame ?
          <StartScreen setIsStartGame={setIsStartGame} />
          : <QuizScreen props={setIsStartGame} />
      }
    </main>
  )
}

export default App
