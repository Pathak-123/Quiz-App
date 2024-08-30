import React from 'react'
import '../style/TrendingQuizContainerStyle.css'
function TrendingQuizContainer({title, description,impression}) {
  return (
    <div className='trending-quiz-card-container'>
      <div className='quiz-title-container'>
       <h4 className='heading'>{title}</h4>
       <div className='quiz-impression-icon'>
        <p>{impression}</p>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="eye-icon"
          >
        <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.08.244-.167.483-.261.717M21.542 12c-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7a12.028 12.028 0 01-.261-.717" 
            />
          </svg>
       </div>
       </div>
     
       <p className='created-on'>{`Created on : ${description}`}</p>
     
    </div>
  )
}

export default TrendingQuizContainer