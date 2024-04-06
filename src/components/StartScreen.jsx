import React from 'react'

function StartScreen({numQuestions, onClickStart}) {
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numQuestions} questions to test your React mastery</h3>
        <button className="btn btn-ui" onClick={onClickStart}>Let´s Start</button>
    </div>
  )
}

export default StartScreen
