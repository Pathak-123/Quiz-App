import React from 'react'
import '../../style/QuizAnalysisQuestionCardStyle.css'

function QuizAnalysisQuestionCard({flexDirection,impression,correctAnswer}) {
  const incorrectAnswer = impression - correctAnswer;
  return (
    <div className='quiz-question-containers'>
            <div className='quiz-question-card' style={{flexDirection}}>
              <h4>{impression}</h4>
              <p>People attempted the question</p>
            </div>
            <div className='quiz-question-card' style={{flexDirection}}>
                <h4>{correctAnswer}</h4>
            <p>People answered correctly</p>
            </div>
            <div className='quiz-question-card' style={{flexDirection}}>
            <h4>{incorrectAnswer}</h4>
            <p>People answered incorrectly</p>
            </div>
          </div>
  )
}

export default QuizAnalysisQuestionCard