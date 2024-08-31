
import React from 'react';
import '../style/PollAnalysisCardStyle.css';

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function PollOptionCard({ite, text, selectedCount }) {
  const maxLength = 20;
  return (
  
        <div className='poll-question-card' style={{flexDirection:'row'}}>
        <h4>{selectedCount}</h4>
        <p> People Selected Option {truncateText(text, maxLength)}</p>
        
      
      </div>
    
    
  );
}

export default PollOptionCard;
