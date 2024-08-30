import React from 'react'
import '../../style//DashboardQuizCardStyle.css'
function DashboardQuizCard({numberValue,title,color}) {
  return (
    <div className='dashboard-quiz-card-container'>
    <h4 style={{color:color}}>  <span>{numberValue}</span>
      {title}</h4>
    </div>
  )
}

export default DashboardQuizCard