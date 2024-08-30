import React from 'react'

function QuizPopUpButtons({buttonText1,buttonText2,onButton1Click,onButton2Click}) {
  return (
    <div className='quiz-buttons-container'>
        <button className='quiz-cancel-button' onClick={onButton1Click}>{buttonText1}</button>
        <button className='quiz-continue-button' onClick={onButton2Click}>{buttonText2}</button>
</div>
  )
}

export default QuizPopUpButtons