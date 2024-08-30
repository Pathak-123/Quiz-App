import React, { useEffect, useState } from 'react'
import '../../App.css';
import '../../style/LiveQuizStyle.css';
import LiveQuizOption from '../shared/LiveQuizOption';
import { updateCorrectAnswerCount, updateQuestionImpression } from '../../services/quizService';
function QaLiveQuiz({questions, setSelectedOptions, handleSubmitQuiz,selectedOptions }) {
    const [timeLeft, setTimeLeft] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState(null);

   
  
    useEffect(() => {
     
      const currentQuestion = quizData.questions[currentQuestionIndex];

      
      if (currentQuestion.timer) {
        setTimeLeft(currentQuestion.timerValue);
      } else {
        setTimeLeft(null);
      }

      const fetchQuestionImpression = async () => {
        if (currentQuestion) {
          try {
            await updateQuestionImpression(currentQuestion.id);
          } catch (err) {
            // console.error('Error updating question impression:', err);
          }
        }
      };
  
      fetchQuestionImpression();
      
    }, [currentQuestionIndex]);
  
    useEffect(() => {
      if (timeLeft === null) return;
  
      if (timeLeft > 0) {
        const timerId = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
  
        return () => clearInterval(timerId);
      } else {
        handleNextQuestion();
      }
    }, [timeLeft]);
    
   
  
    const quizData = {
      questions: questions.map((q, index) => ({
        id: q._id,
        idLength:index+1,
        type: q.questionOptions.some(opt => opt.imageUrl) ? 'image' : 'text',
        question: q.questionText,
        options: q.questionOptions.map(opt => ({
          id: opt._id,
          text: opt.text || undefined,
          imageUrl: opt.imageUrl || undefined,
          isCorrect: opt.isCorrect
        })),
        timer: q.timer > 0,
        timerValue: q.timer
      }))
    };
  
   
  
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;

    useEffect(() => {
      const updateCorrectAnswer = async () => {
        if (selectedOptionId !== null && currentQuestion) {
          try {
            await updateCorrectAnswerCount(currentQuestion.id, selectedOptionId);
          } catch (err) {
            
          }
        }
      };
      updateCorrectAnswer();
    }, [selectedOptionId]);

    useEffect(() => {
      if (isLastQuestion && (selectedOptionId !== null || selectedOptions.some(opt => opt.questionId === currentQuestion.id))) {
        handleSubmitQuiz();
      }
    }, [selectedOptions]);

  const handleNextQuestion = () => {
    
      setSelectedOptions((prev) => [
        ...prev,
        { questionId: currentQuestion.id, selectedOptionId },
      ]);
    
      if (!isLastQuestion) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedOptionId(null);
      }
    };
  
    return (
      <div className='center-container' id='popup-center-container'>
        <div className='live-quiz-popup-container'>
          <div className='live-quiz-container'>
            <div className='header'>
              <p>{`${currentQuestion.idLength}/${quizData.questions.length}`}</p>
              {currentQuestion.timer && <p className='timer'>{timeLeft} s</p>}
            </div>
            <h2>{currentQuestion.question}</h2>
            <div className='options-button-container'>
              <LiveQuizOption
                options={currentQuestion.options}
                Quiztype={currentQuestion.type}
                selectedOptionId={selectedOptionId}
                onOptionSelect={setSelectedOptionId}
              />
              <button
                onClick={ handleNextQuestion}
                className='button'
                style={{ backgroundColor: '#60B84B', color: 'white' }}
              >
                {isLastQuestion ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default QaLiveQuiz;