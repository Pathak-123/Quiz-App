import React, { useEffect, useState } from 'react';
import '../../style/CreateQuizStyle.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import QuizTimer from './QuizTimer';

// function QuizOptionField({optionType,placeholder,id,classname,showTwoInputField,showTimer,onChange }) {
//   const [options, setOptions] = useState([{ text: '', imageUrl: '' }]);
//   const [selectedOption, setSelectedOption] = useState('');
//   const [timer, setTimer] = useState(0);
  
//   useEffect(() => {
//     // Notify parent of changes to options and timer
//     const data = {
//       options,
//       timer,
//     };
//     onChange(data);
//   }, [options, timer]);

//   const handleOptionChange = (index,field, value) => {
//     const newOptions = [...options];
//     newOptions[index] = { ...newOptions[index], [field]: value };
//     setOptions(newOptions);
//   };

//   const addOption = () => {
//     if (options.length < 5) {
//       setOptions([...options, { text: '', imageUrl: '' }]);
//     }
//   };

//   const removeOption = (index) => {
//     const newOptions = options.filter((_, i) => i !== index); // Remove option at index
//     setOptions(newOptions);
//     if (selectedOption === options[index].text) {
//       setSelectedOption(''); // Clear selected option if removed
//     }
//   };

//   const handleOptionSelect = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div className='question-options-container'>
//       <div className='options-fields'>
//         <div className='options-list'>
//           {options.map((option, index) => (
//             <div key={index} className='option-item'>
//               {showTimer &&(
//               <label >
//                 <input
//                   type='radio'
//                   name='questionOptions'
//                   // value={option || ''}
//                   value={option.text}
//                   checked={selectedOption === option.text}
//                   onChange={handleOptionSelect}
//                   className={selectedOption === option.text ? 'radio-selected' : ''}
//                 />
//               </label>
//               )}
//               <input
//                 type='text'
//                 // value={option}
//                 value={option.text}
//                 className={`${classname} ${selectedOption === option.text ? 'input-selected' : ''}`}
//                 id={id}
//                 onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
//                 placeholder={classname==='quiz-image-text-input-field'?'Text':placeholder}
//               />
//               {showTwoInputField && (
//                  <input
//                 type='text'
//                 // value={option}
//                 value={option.imageUrl}
//                 className={`${classname}  ${selectedOption === option.text ? 'input-selected' : ''}`}
//                 id={id}
//                 onChange={(e) => handleOptionChange(index, 'imageUrl', e.target.value)}
//                 placeholder={classname==='quiz-image-text-input-field'?'Image Url':placeholder}
//               /> 
//                 )}
//               {index > 1 && (
//                 <button
//                   type='button'
//                   className='remove-option-button'
//                   onClick={() => removeOption(index)}
//                 >
//                   <i className='fas fa-trash-alt'></i>
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//         {options.length<5&&(
//         <button
//           type='button'
//           className='add-option-button'
//           style={{ marginLeft: showTimer ? '10px' : '9px' }}
//           onClick={addOption}
//         >
//           Add Option
//         </button>
//         )
// }
//       </div>
// {showTimer&&(     <QuizTimer />)}
 
//     </div>
//   );
// }

function QuizOptionField({placeholder,id,classname,showTwoInputField,showTimer,options,addOption,removeOption,handleOptionChange,setTimer,handleCorrectOptionChange,timerValue,isdisabled }) {
  // const [selectedOption, setSelectedOption] = useState();
  // const handleOptionSelect = (event) => {
  //   setSelectedOption(event.target.value);
  //   handleCorrectOptionChange(event.target.value);
  // };
 

  return (
    <div className='question-options-container'>
      <div className='options-fields'>
        <div className='options-list'>
          {options.map((option, index) => (
            <div key={index} className='option-item'>
              {showTimer &&(
           <label >
           <input
             type='radio'
             name='questionOptions'
             value={option}
             checked={option.isCorrect}
             onChange={() => handleCorrectOptionChange(index)}

             className={option.isCorrect ? 'radio-selected' : ''}
           />
         </label>
              )}
              <input
                type='text'
                // value={option}
                // value={option.text || ''} 
                value={placeholder === 'Image Url' ? option.imageUrl || '' : option.text || ''}
              className={`${classname} ${option.isCorrect ? 'input-selected' : ''}`}
                id={id}
                onChange={(e) => handleOptionChange(
                  index,
                  placeholder === 'Image Url' ? 'imageUrl' : 'text', 
                  e.target.value)}
                placeholder={classname==='quiz-image-text-input-field'?'Text':placeholder}
              />
              {showTwoInputField && (
                 <input
                type='text'
                // value={option}
                value={option.imageUrl || ''}
                className={`${classname} ${option.isCorrect ? 'input-selected' : ''}`}
                id={id}
                onChange={(e) => handleOptionChange(index, 'imageUrl', e.target.value)}
                placeholder={classname==='quiz-image-text-input-field'?'Image Url':placeholder}
              /> 
                )}
              {index > 1 && (
                <button
                  type='button'
                  className='remove-option-button'
                  onClick={() => removeOption(index)}
                >
                  <i className='fas fa-trash-alt'></i>
                </button>
              )}
            </div>
          ))}
        </div>
        {options.length<5&&(
        <button
          type='button'
          className='add-option-button'
          style={{ marginLeft: showTimer ? '10px' : '9px' }}
          onClick={addOption}
        >
          Add Option
        </button>
        )
}
      </div>
{showTimer&&(     <QuizTimer setTimer={setTimer} timerValue={timerValue} isdisabled={isdisabled}/>)}
 
    </div>
  );
}

export default QuizOptionField;

// export default QuizOptionField;