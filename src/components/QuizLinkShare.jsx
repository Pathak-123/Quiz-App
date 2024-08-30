import React, { useState } from 'react'
import '../style/QuizLinkShareStyle.css';
import '../style/CreateQuizStyle.css';
import '../App.css'
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa'; 

function QuizLinkShare({ text, onShare, setLink }) {
  const [showPopup, setShowPopup] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleClose = () => {
    setShowPopup(false);
    onShare();
  };
  const handleShare = async () => {
    try {
      const result = await navigator.clipboard.writeText(setLink);
      if (result === undefined || result === null) {
        setShowMessage(true);
        };

        setTimeout(() => {
          onShare()
        }, 2000);

    } catch (err) {
      toast.error('Failed to copy Quiz ID');
    }
  };
  return (
    <>
      {showPopup && (
        <div className='quiz-popup-overlay' >
          <div className='quiz-popup-container' id='quiz-share-link-popup-container'>
            <div className='popup-header'>
            {showMessage ? (
               <div className='share-message'>
               <FaCheckCircle className='success-icon' />
               <span>Quiz link copied to clipboard!</span>
               <div className='progress-bar'></div>
             </div>
              ) : (
                <button className='popup-close-button' onClick={handleClose}>
                  &times;
                </button>
              )}

              {/* <button className='popup-close-button' onClick={handleClose}>
                &times;
              </button> */}
            </div>

            <h2 className='title' style={{ marginTop: '0px', marginBottom: '0px' }} id='quiz-share-link-popup-title'>{text}</h2>
            <p className='share-link-text'>{setLink}</p>
            <button className='button' onClick={handleShare} style={{ backgroundColor: '#60B84B', color: 'white' }}>
              Share
            </button>
          </div>
        </div>
      )}

    </>
  );
}


export default QuizLinkShare