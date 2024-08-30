
import React, { useState } from 'react';
import '../style/CreateQuizStyle.css';
import QuizPopUpButtons from './shared/QuizPopUpButtons';
import CreateQuestion from './CreateQuestion';
import { toast } from 'react-toastify';
import QuizLinkShare from './QuizLinkShare';
import { publishQuiz } from '../services/quizService';

function CreateQuiz({ isOpen, onClose }) {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState(null);
  const [isQuestionVisible, setIsQuestionVisiblee] = useState(false);
  const [isQuizLinkShareVisible, setIsQuizLinkShareVisible] = useState(false);
  const [quizLink, setQuizLink] = useState('');
  const handleContinue = () => {
    if (quizName && quizType) {
      setIsQuestionVisiblee(true);
    } else {
      toast.error('Please enter Quiz Name and its type');
    }
  };
  const handleCancel = () => {
    setQuizName('');
    setQuizType(null);
    setIsQuestionVisiblee(false);
    onClose();
  };

  const handleQuizCreated = async (quizName, quizId) => {
    try {

      let link = await publishQuiz(quizId);
      link = `${window.location.origin}/${link}`;
      setQuizLink(link);
      setIsQuestionVisiblee(false);
      setTimeout(() => {
        setIsQuizLinkShareVisible(true);
      }, 100);
    }
    catch (error) {
      toast.error("Link Not Created please try Again");
    }
  };

  const handleCloseQuizLinkShare = () => {
    setIsQuizLinkShareVisible(false);
    onClose();
  };

  if (!isOpen) return null;
  if (isQuestionVisible) {
    return (
      <CreateQuestion
        quizName={quizName}
        quizType={quizType}
        onQuizCreated={handleQuizCreated}
        onClose={onClose}

      />
    );
  }

  return (
    <div className="quiz-popup-overlay ">
      <div className="quiz-popup-container">
        <input type='text' name='quiz-name' className='quiz-input-field' id="quizName"
          value={quizName}
          placeholder='Quiz Name'
          onChange={(e) => setQuizName(e.target.value)} />
        <div className='quiz-type-container'>
          <p className='quiz-type-text'>Quiz Type</p>
          <button className={quizType === 'q&a' ? 'selected' : ''} onClick={() => { setQuizType('q&a') }}>Q & A</button>
          <button className={quizType === 'poll' ? 'selected' : ''} onClick={() => { setQuizType('poll') }}>Poll Type</button>
        </div>
        <QuizPopUpButtons
          buttonText1='Cancel'
          buttonText2='Continue'
          onButton1Click={handleCancel}
          onButton2Click={handleContinue} />
      </div>

      {isQuizLinkShareVisible && (
        <QuizLinkShare
          text="Your quiz is created successfully!"
          onShare={handleCloseQuizLinkShare}
          setLink={quizLink}
        />
      )}

    </div>
  );
}

export default CreateQuiz;