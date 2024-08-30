
import React, { useEffect, useState } from 'react'
import '../../style/CreateQuizStyle.css';
import '../../App.css'
import QaLiveQuiz from './QaLiveQuiz';
import PollLiveQuiz from './PollLiveQuiz'
import CongratulationPopUp from './CongratulationPopUp';
import ThankYouPopup from './ThankyouPopup';
import { getPublishedQuiz, updateQuizImpressions } from '../../services/quizService';
import { useParams } from 'react-router-dom';
function StartLiveQuizPopup() {
  const [currentPopup, setCurrentPopup] = useState('startQuiz'); 
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const { slugID } = useParams(); 


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quiz = await getPublishedQuiz(slugID);
        setQuizData(quiz);
        // await updateQuizImpressions(quiz._id);
      } catch (error) {
        console.error('Failed to fetch quiz data:', error.message);
      }
    };

    fetchQuizData();
  }, [slugID]);

  const handleStartQuiz = async (quizType) => {
    if (quizType === 'qaQuiz') {
      setCurrentPopup('qaQuiz');
    } else if (quizType === 'pollQuiz') {
      setCurrentPopup('pollQuiz');
    }
    
    await updateQuizImpressions(quizData._id);
  };
 
const handleSubmitQuiz=(quizType)=>{
  const questions = quizData.questions;
  
   let correctAnswersCount = 0;
   setCorrectAnswer(correctAnswersCount);
  selectedOptions.forEach((selectedOption) => {
    const { questionId, selectedOptionId } = selectedOption;
    const question = questions.find((q) => q._id === questionId);
  
    if (question) {
      const option = question.questionOptions.find((opt) => opt._id === selectedOptionId);
      
      if (option && option.isCorrect) {
        correctAnswersCount++;
        setCorrectAnswer(correctAnswersCount);
      }
    }
   
  });
  

  if (quizType === 'qaQuiz') {
  setCurrentPopup('score-popup')
  }else if (quizType === 'pollQuiz') {
    setCurrentPopup('thank-you')
  }
 
}

  return (

    <>
      {currentPopup === 'startQuiz' && (
      <div className='quiz-popup-overlay' >
        <div className='quiz-popup-container' id='live-quiz-popup-container'>
        <div >
      </div>
       
          <h2 className='title' style={{marginTop:'0px'}} id='quiz-share-link-popup-title'>Start Your Quiz
          
            </h2>
          <button className='button' onClick={()=>handleStartQuiz(quizData.type === 'q&a' ? 'qaQuiz' : 'pollQuiz')}   style={{ backgroundColor: '#60B84B', color:'white'}}>
            Start Quiz
          </button>
        </div>
      </div>
      )}
         {currentPopup === 'qaQuiz' && <QaLiveQuiz questions={quizData.questions} setSelectedOptions={setSelectedOptions} handleSubmitQuiz={() => handleSubmitQuiz(currentPopup)} selectedOptions={selectedOptions}/>}
         {currentPopup === 'pollQuiz' && <PollLiveQuiz questions={quizData.questions} handleSubmitQuiz={() => handleSubmitQuiz(currentPopup)} setSelectedOptions={setSelectedOptions} selectedOptions={selectedOptions}/>}
         
         {currentPopup === 'score-popup' && <CongratulationPopUp correctAnswer={correctAnswer} TotalQuestions={selectedOptions.length}/>}
         {currentPopup === 'thank-you' && <ThankYouPopup />}

</>
  )
}

export default StartLiveQuizPopup