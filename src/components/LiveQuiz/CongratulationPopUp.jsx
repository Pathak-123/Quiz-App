import React from 'react'
import '../../App.css'
import '../../style/LiveQuizStyle.css';
import congratulationImage from '../../assets/congratulation.png';
function CongratulationPopUp({correctAnswer,TotalQuestions}) {
  return (
    <div className='center-container'  id='popup-center-container'>
    <div className='popup-container'>
      <div className='container'>
        <h1>Congrats Quiz is Completed</h1>
        <img src={congratulationImage} alt="congratulation" />
        <h1>Your score is <span>{`${correctAnswer}/${TotalQuestions}`}</span></h1>
      </div>
    </div>
    </div>
  )
}

export default CongratulationPopUp