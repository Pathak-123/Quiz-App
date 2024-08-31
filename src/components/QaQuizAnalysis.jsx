import  {useEffect, useState } from 'react'
import '../style/QuizQuestionAnalysisStyle.css'
import QuizAnalysisHeader from './shared/QuizAnalysisHeader'
import QuizAnalysisQuestionCard from './shared/QuizAnalysisQuestionCard';
import { formatDate } from '../utils/helperFunction';
import { useLocation } from 'react-router-dom';
import { fetchQuizData } from '../services/quizService';
import { toast } from 'react-toastify';

function QaQuizAnalysis() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { quizId } = location.state || 0;

  useEffect(()=>{

    const fetchAnalysisData = async() => {
      try{
        const isdata = await fetchQuizData(quizId);
        if(isdata.success){
          setData(isdata.quiz);
        }
        else{
          toast.error('Error while fetching. Please try again');
        }
      }
      catch(error){
        console.error('Error fetching quiz data:', error);
      }
    }
    if (quizId) {
      fetchAnalysisData();
    }

  },[]);


  const questions = data.questions?.map((question, index) => ({

    id: question._id,
    text: question.questionText,
    impression: question.QuestionImpressions || 0,
    correctAnswer: question.correctAnswer || 0,

  })) || [];


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