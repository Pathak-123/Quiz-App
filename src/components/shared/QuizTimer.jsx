import React, { useEffect, useState } from 'react'
import '../../style/CreateQuizStyle.css';
import { toast } from 'react-toastify';

function QuizTimer({setTimer,timerValue,isdisabled}) {
  const [selectedTimer,setSelectedTimer]=useState('off');
  useEffect(() => {
    switch (timerValue) {
      case 0:
        setSelectedTimer('off');
        break;
      case 5:
        setSelectedTimer('5sec');
        break;
      case 10:
        setSelectedTimer('10sec');
        break;
      default:
        setSelectedTimer('off');
    }
  }, [timerValue]);

  const handleButtonClick = (value) => {
    setSelectedTimer(value);
    setTimer(value === 'off' ? 0 : parseInt(value));
  };

  return (
    <div className='timer-container'>

      <p className='quiz-type-text'>Timer</p>
        <button className={`timer-button ${selectedTimer  === 'off' ? 'timer-selected' : ''}`}  onClick={() => {
          handleButtonClick('off');
          // setTimer(0); 
        }}>OFF</button>
        <button  className={`timer-button ${selectedTimer  === '5sec' ? 'timer-selected' : ''}`}   onClick={() => {
          handleButtonClick('5sec')
          // setTimer(5); 
        }}>5 sec</button>
        <button  className={`timer-button ${selectedTimer  === '10sec' ? 'timer-selected' : ''}`} onClick={() => {
        handleButtonClick('10se')
          // setTimer(10); 
        }}>10 sec</button>
    </div>
  )
}

export default QuizTimer