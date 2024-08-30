import React from 'react'
import '../../style/QuizQuestionAnalysisStyle.css'
function QuizAnalysisHeader({quizName,date,impressions}) {
  return (
    <div className='container-header'>
        <h1 >{`${quizName} Question Analysis`}</h1>
        <div className='header-right-container'>
        <p>{`Create on: ${date}`}</p>
        <p>{`Impression: ${impressions}`}</p>
        </div>
      </div>
  )
}

export default QuizAnalysisHeader