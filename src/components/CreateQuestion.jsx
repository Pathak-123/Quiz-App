import React, { useEffect, useState } from 'react'
import '../style/CreateQuizStyle.css';
import QuizPopUpButtons from './shared/QuizPopUpButtons';
import QuizOptionField from './shared/QuizOptionField';
import { createQuiz, fetchQuizData, updateQuizData } from '../services/quizService';
import { toast } from 'react-toastify';


function CreateQuestion({ quizName, quizType, quizId, handleQuizUpdateButton, onQuizCreated, onClose, onCancel }) {
  const [questions, setQuestions] = useState([{ id: 1, text: '', options: [{ text: '', imageUrl: '', isCorrect: false }, { text: '', imageUrl: '', isCorrect: false }], timer: false }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [optionType, setOptionType] = useState('text');
  const [selectedQuestionId, setSelectedQuestionId] = useState(1);
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    if (quizId) {
      const fetchQuiz = async () => {
        try {
          const data = await fetchQuizData(quizId);
          if (data.quiz && data.quiz.questions) {

            let idCount = 1;
            const transformedQuestions = data.quiz.questions.map(q => ({
              id: idCount++,
              text: q.questionText || '',
              options: q.questionOptions.map(opt => ({
                text: opt.text || '',
                imageUrl: opt.imageUrl || '',
                isCorrect: opt.isCorrect || false
              })),
              timerValue: q.timer || 0
            }));
            setQuestions(transformedQuestions);
          } else {
            setQuestions([]);
          }
          setDataLoaded(true);
        }

        catch (error) {
          console.error('Failed to fetch quiz data:', error);
        }
      };
      fetchQuiz();
    }
  }, [quizId]);
  useEffect(() => {
    if (questions.length > 0 && quizId) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        const hasText = currentQuestion.options.some(option => option.text !== '');
        const hasImage = currentQuestion.options.some(option => option.imageUrl !== '');

        if (hasText && hasImage) {
          setOptionType('image-text');
        } else if (hasImage) {
          setOptionType('image');
        } else {
          setOptionType('text');

        }

      }
    }
  }, [currentQuestionIndex, dataLoaded]);

  const optionTypeHandler = (value) => () => {
    if (!quizId) {

      setQuestions(prevQuestions => {
        const updatedQuestions = [...prevQuestions];
        const currentQuestion = updatedQuestions[currentQuestionIndex];
        // updatedQuestions[currentQuestionIndex] = { ...currentQuestion, options: ['',''] };
        updatedQuestions[currentQuestionIndex] = {
          ...currentQuestion,
          options: [{ text: '', imageUrl: '', isCorrect: false }, { text: '', imageUrl: '', isCorrect: false }],
        };

        return updatedQuestions;
      });
    }

    if (quizId) {
      toast.error('You can only edit question text and options when updating a quiz.');
      return; 
    }


    setOptionType(value);
  }
  const maxQuestions = 5;
  const addQuestion = () => {
    if (quizId) {
      toast.error('You cannot add questions while updating a quiz.');
      return; 
    }

    const currentQuestion = questions[currentQuestionIndex];
    const ValidText = currentQuestion.text.trim() !== '';
    const MinimumOptions = currentQuestion.options.filter(option => {
      if (optionType === 'text') {
        return option.text.trim() !== '';
      }
      if (optionType === 'image') {
        return option.imageUrl.trim() !== '';
      }
      if (optionType === 'image-text') {
        return option.text.trim() !== '' && option.imageUrl.trim() !== '';
      }
      return false;
    }).length >= 2;

    if (!ValidText || !MinimumOptions) {
      toast.warning('Please complete the current question: Enter question text and provide at least two options.');
      return;
    }

    if (questions.length < maxQuestions) {

      setQuestions([...questions, { id: questions.length + 1, text: '', options: [{ text: '', imageUrl: '', isCorrect: false }, { text: '', imageUrl: '', isCorrect: false }], timer: false }]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedQuestionId(questions.length + 1);
    }
    else {
      toast.warning("You have reached the maximum limit of 5 questions per quiz");
    }

  };

  const removeQuestion = (id) => {
    if (quizId) {
      toast.error('You cannot remove questions while updating a quiz.');
      return;
    }
    setQuestions(prevQuestions => {
      const updatedQuestions = prevQuestions.filter(q => q.id !== id);
      let newIndex = currentQuestionIndex;

      if (updatedQuestions.length === 0) {
        newIndex = 0;
      } else if (currentQuestionIndex >= updatedQuestions.length) {
        newIndex = updatedQuestions.length - 1;
      }
      setCurrentQuestionIndex(newIndex);
      if (selectedQuestionId === id) {
        setSelectedQuestionId(updatedQuestions[newIndex]?.id || (updatedQuestions[0]?.id || 1));
      }
      const selectedQuestion = updatedQuestions[newIndex];
      if (selectedQuestion) {
        const hasText = selectedQuestion.options.some(option => option.text !== '');
        const hasImage = selectedQuestion.options.some(option => option.imageUrl !== '');

        if (hasText && hasImage) {
          setOptionType('image-text');
        } else if (hasImage) {
          setOptionType('image');
        } else {
          setOptionType('text');
        }
      } else {
        setOptionType('text');
      }
      return updatedQuestions;
    });
  };
  const handleQuestionChange = (e) => {
    const { value } = e.target;
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[currentQuestionIndex].text = value;
      return updatedQuestions;
    });
  };
  const addOption = () => {
    if (quizId) {
      toast.error('You cannot add options while updating a quiz.');
      return;
    }
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[currentQuestionIndex];
      if (currentQuestion && currentQuestion.options.length < 6) {
        const newOptions = [...currentQuestion.options, { text: '', imageUrl: '', isCorrect: false }];
        updatedQuestions[currentQuestionIndex] = { ...currentQuestion, options: newOptions };
      }
      return updatedQuestions;
    });
  };
  const removeOption = (index) => {
    if (quizId) {
      toast.error('You cannot remove options while updating a quiz.');
      return;
    }
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[currentQuestionIndex];
      if (currentQuestion) {
        const newOptions = currentQuestion.options.filter((_, i) => i !== index);
        updatedQuestions[currentQuestionIndex] = { ...currentQuestion, options: newOptions };
      }
      return updatedQuestions;
    });
  };
  const handleOptionChange = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[currentQuestionIndex];
      if (currentQuestion && currentQuestion.options[index]) {
        currentQuestion.options[index] = { ...currentQuestion.options[index], [field]: value };
      }
      return updatedQuestions;
    });
  };
  const handleCorrectOptionChange = (index) => {
    if (quizId) {
      toast.error("You cannot edit the answer of the question while editing");
      return;
    }
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[currentQuestionIndex];
      currentQuestion.options.forEach(option => option.isCorrect = false);
      currentQuestion.options[index].isCorrect = true;
      updatedQuestions[currentQuestionIndex] = { ...currentQuestion, options: currentQuestion.options };
      return updatedQuestions;
    });
  };
  const setTimer = (value) => {
    setQuestions(prevQuestions => {
      const updatedQuestions = [...prevQuestions];
      const currentQuestion = updatedQuestions[currentQuestionIndex];
      if (currentQuestion) {
        updatedQuestions[currentQuestionIndex] = { ...currentQuestion, timer: true, timerValue: value };
      }
      return updatedQuestions;
    });
  };

  const handleCreateQuiz = async (quizId) => {

    const isValid = questions.every(question => {
      const hasText = question.text && question.text.trim() !== '';
      const hasTwoOptions = question.options.length >= 2;
      return hasText && hasTwoOptions;
    });

    if (!isValid) {
      const invalidQuestion = questions.find(question =>
        !question.text || question.text.trim() === '' ||
        question.options.length < 2
      );

      if (invalidQuestion) {
        if (!invalidQuestion.text || invalidQuestion.text.trim() === '') {
          toast.error('All questions must have text.');
        }
        else if (invalidQuestion.options.length < 2) {
          toast.error('Each question must have at least two options.');
        }
      }
      return;
    }
    try {
      const quizData = {
        name: quizName,
        type: quizType,
        questions: questions.map(question => ({
          questionText: question.text || '',
          questionOptions: question.options.map(option => ({
            text: option.text || '',
            imageUrl: option.imageUrl || '',
            isCorrect: option.isCorrect || false,
          })),
          timer: question.timerValue || 0,
        })),
      };

      if (quizId) {
        const response = await updateQuizData(quizId, quizData);
        if (response.success) {
          toast.success('Quiz Updated Successfully');
          handleQuizUpdateButton(quizId);
        } else {
          toast.error('Failed to update quiz');
        }
        return;
      }




      const response = await createQuiz(quizData);

      if (response.success) {
        toast.success('Quiz Created Successfully');
        onQuizCreated(quizName, response.quizId);
      } else {
        toast.error('Failed to create quiz');
      }
    } catch (error) {
      toast.error('Failed to create quiz');
    }
  };

  const handleCancel = () => {
    setQuestions([
      { id: 1, text: '', options: [{ text: '', imageUrl: '', isCorrect: false }, { text: '', imageUrl: '', isCorrect: false }], timer: false }
    ]);
    setCurrentQuestionIndex(0);
    setOptionType('text');
    onClose();
  };
  const handleQuestionClick = (id) => {
    const index = questions.findIndex(q => q.id === id);
    setCurrentQuestionIndex(index);
    setSelectedQuestionId(id);
    const selectedQuestion = questions[index];
    if (selectedQuestion) {
      const hasText = selectedQuestion.options.some(option => option.text !== '');
      const hasImage = selectedQuestion.options.some(option => option.imageUrl !== '');

      if (hasText && hasImage) {
        setOptionType('image-text');
      } else if (hasImage) {
        setOptionType('image');
      } else {
        setOptionType('text');
      }
    }
  };

  return (
    <div className="quiz-popup-overlay ">
      <div className="quiz-popup-container" id='qa-quiz-container' >
        <div className='number-of-question-container'>
          <div className='questions-and-icon'>
            {questions.map((question, index) => (
              <div key={question.id} className='question-item'>
                <div
                  className={`question-number ${selectedQuestionId === question.id ? 'selected' : ''}`}
                  onClick={() => handleQuestionClick(question.id)}
                >{question.id}</div>
                {index > 0 && (
                  <p className='remove-question-icon' onClick={() => removeQuestion(question.id)}>X</p>)
                }
              </div>
            ))}

            <p className='add-question-icon' onClick={addQuestion}>+</p>

          </div>
          <p className='max-question-text'>Max 5 questions</p>
        </div>
        <input type='text' name='poll-question' className='quiz-input-field' id="pollQuestion"
          value={questions[currentQuestionIndex]?.text || ''} placeholder='Question'
          onChange={handleQuestionChange}
        />
        <div className='quiz-type-container'>
          <p className='quiz-type-text'>Option Type</p>
          <label className='radio-label'>
            <input type='radio' name='quizType' value='text' checked={optionType === 'text'} onChange={optionTypeHandler('text')} />
            Text
          </label>
          <label className='radio-label'>
            <input type='radio' name='quizType' value='image-url' checked={optionType === 'image'} onChange={optionTypeHandler('image')} />
            Image URL
          </label>
          <label className='radio-label'>
            <input type='radio' name='quizType' value='text-image-url' checked={optionType === 'image-text'} onChange={optionTypeHandler('image-text')} />
            Text & Image URL
          </label>
        </div>


        {/* //for Q&A TYPE */}

        {quizType === 'q&a' && optionType === 'text' && (
          <QuizOptionField placeholder='Text' id='option-field' classname='quiz-input-field' showTwoInputField={false} showTimer={true} options={questions[currentQuestionIndex]?.options} addOption={addOption} removeOption={removeOption} handleOptionChange={handleOptionChange} setTimer={setTimer} handleCorrectOptionChange={handleCorrectOptionChange} timerValue={questions[currentQuestionIndex]?.timerValue} isdisabled={quizId ? true : false} />
        )}

        {quizType === 'q&a' && optionType === 'image' && (
          <QuizOptionField placeholder='Image Url' id='option-field' classname='quiz-input-field' showTwoInputField={false} showTimer={true} options={questions[currentQuestionIndex]?.options} addOption={addOption} removeOption={removeOption} handleOptionChange={handleOptionChange} setTimer={setTimer} handleCorrectOptionChange={handleCorrectOptionChange} timerValue={questions[currentQuestionIndex]?.timerValue} isdisabled={quizId ? true : false} />
        )}

        {quizType === 'q&a' && optionType === 'image-text' && (
          <QuizOptionField placeholder='Image' id='quiz-image-text-input-field' classname='quiz-image-text-input-field' showTwoInputField={true} showTimer={true} options={questions[currentQuestionIndex]?.options} addOption={addOption} removeOption={removeOption} handleOptionChange={handleOptionChange} setTimer={setTimer} handleCorrectOptionChange={handleCorrectOptionChange} timerValue={questions[currentQuestionIndex]?.timerValue} isdisabled={quizId ? true : false} />
        )}


        {/* //for POLL TYPE */}

        {quizType === 'poll' && optionType === 'text' && (
          <QuizOptionField placeholder='Text' id='option-field' classname='quiz-input-field' showTwoInputField={false} showTimer={false} options={questions[currentQuestionIndex]?.options} addOption={addOption} removeOption={removeOption} handleOptionChange={handleOptionChange} />
        )}
        {quizType === 'poll' && optionType === 'image' && (
          <QuizOptionField placeholder='Image Url' id='option-field' classname='quiz-input-field' showTwoInputField={false} showTimer={false} options={questions[currentQuestionIndex]?.options} addOption={addOption} removeOption={removeOption} handleOptionChange={handleOptionChange} />
        )}
        {quizType === 'poll' && optionType === 'image-text' && (
          <QuizOptionField placeholder='Image' id='quiz-image-text-input-field' classname='quiz-image-text-input-field' showTwoInputField={true} showTimer={false} options={questions[currentQuestionIndex]?.options} addOption={addOption} removeOption={removeOption} handleOptionChange={handleOptionChange} />
        )}
        <QuizPopUpButtons
          buttonText1='Cancel'
          buttonText2={quizId ? 'Update' : 'Create Quiz'}
          onButton2Click={() => handleCreateQuiz(quizId)}
          onButton1Click={quizId ? onCancel : handleCancel} />
      </div>
    </div>
  )
}

export default CreateQuestion;