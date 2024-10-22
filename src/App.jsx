import React, { useState } from 'react'

import StartScreen from "./components/StartScreen"
import QuizScreen from "./components/QuizScreen"

import './App.css'

function App() {
  const [isStartGame, setIsStartGame] = useState(true);

  return (
    <main className='min-h-screen flex flex-col justify-center'>
      {
        isStartGame ?
          <StartScreen setIsStartGame={setIsStartGame} />
          : <QuizScreen setIsStartGame={setIsStartGame} />
      }
    </main>
  )
}

export default App
