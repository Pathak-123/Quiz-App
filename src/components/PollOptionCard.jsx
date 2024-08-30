
import React from 'react';
import '../style/PollAnalysisCardStyle.css';

function PollOptionCard({ite, text, selectedCount }) {
  return (
  
        <div className='poll-question-card' style={{flexDirection:'row'}}>
        <h4>{selectedCount}</h4>
        <p> People Selected Option {++ite}</p>
        
      
      </div>
    
    
  );
}

export default PollOptionCard;
