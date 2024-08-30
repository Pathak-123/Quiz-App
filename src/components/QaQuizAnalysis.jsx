import React from 'react'
import '../style/QuizQuestionAnalysisStyle.css'
import QuizAnalysisHeader from './shared/QuizAnalysisHeader'
import QuizAnalysisQuestionCard from './shared/QuizAnalysisQuestionCard';
import { formatDate } from '../utils/helperFunction';
import { useLocation } from 'react-router-dom';
function QaQuizAnalysis() {
  const location = useLocation();
  const { data } = location.state || {};

  const questions = data.questions.map((question, index) => ({

    id: question._id,
    text: question.questionText,
    impression: question.QuestionImpressions || 0,
    correctAnswer: question.correctAnswer || 0,

  }));


  return (
    <div className='quiz-analysis-container'>

      <QuizAnalysisHeader quizName={data.name} date={formatDate(data.createdAt)} impressions={data.impressions} />
      {questions.map((question, index) => (
        <div key={question.id} className='question-container'>
          <p className='question-text'>{`Q.${index + 1} ${question.text}`}</p>
          <QuizAnalysisQuestionCard flexDirection='column' impression={question.impression} correctAnswer={question.correctAnswer} />
          <hr />
        </div>
      ))}
    </div>
  )
}

export default QaQuizAnalysis