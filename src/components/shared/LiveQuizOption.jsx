import '../../style/LiveQuizOptionStyle.css'; // Optional: for specific styling
import optionImage from '../../assets/option.png';

const LiveQuizOption = ({ options, Quiztype ,selectedOptionId, onOptionSelect}) => { 
  const handleOptionClick = (id) => {
    onOptionSelect(id);  };

    const renderOptions = (options) => {
    return options.map(option => {
      let type = '';
      if (option.text && option.imageUrl) {
        type = 'imageText';
      } else if (option.imageUrl) {
        type = 'image';
      } else if (option.text) {
        type = 'text';
      }
      return (
        <div key={option.id} className={`option ${type === 'image' ? 'no-padding' : 'with-padding'} ${type === 'imageText' ? 'option-image-text' : ''} ${selectedOptionId === option.id ? 'selected' : ''}`}    onClick={() => handleOptionClick(option.id)}>
          {type === 'text' && <p>{option.text}</p>}
          {type === 'image' && <img src={option.imageUrl} alt="option" />}
          {type === 'imageText' && (
            <div className='option-image-text'>
              <p>{option.text}</p>
              <img src={option.imageUrl} alt="option-image" />
            </div>
          )}
        </div>
      )
    });
    };
  
  return (
    <div className='options-container'>
      {renderOptions(options)}
    </div>
  );
};

export default LiveQuizOption;