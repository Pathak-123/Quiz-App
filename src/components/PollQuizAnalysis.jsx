import React from 'react'
import QuizAnalysisHeader from './shared/QuizAnalysisHeader';
import QuizAnalysisQuestionCard from './shared/QuizAnalysisQuestionCard';
import PollOptionCard from './PollOptionCard';
import '../style/PollAnalysisCardStyle.css';
import { formatDate } from '../utils/helperFunction';
import { useLocation } from 'react-router-dom';

function PollQuizAnalysis() {
  const location = useLocation();
  const { data } = location.state || {};


  const questions = data.questions.map((question, index) => ({

    id: question._id,
    text: question.questionText,
    impression: question.QuestionImpressions || 0,
    options: question.questionOptions.map(option => ({
      text: option.text,
      selectedCount: option.selectedCount,
    })),

  }));

  return (
    <div className='quiz-analysis-container'>
      <QuizAnalysisHeader quizName={data.name}  date={formatDate(data.createdAt)} impressions={data.impressions} />
      {questions.map((question, index) => (
        <div key={question.id} className='question-container'>
          <p className='question-text'>{`Q.${index + 1} ${question.text}`}</p>
          <div className='poll-question-containers'>
            {question.options.map((option, optIndex) => (
              <PollOptionCard key={optIndex} text={option.text} selectedCount={option.selectedCount} ite={optIndex} />
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default PollQuizAnalysis