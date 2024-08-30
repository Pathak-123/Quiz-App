import React, { useState } from 'react';
import { useTable } from 'react-table';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';

import { FaShare, FaTrash, FaEdit } from 'react-icons/fa';
import '../style/AnalyticsTableStyle.css'; 
import CreateQuestion from './CreateQuestion';
import QaQuizAnalysis from './QaQuizAnalysis';
import PollQuizAnalysis from './PollQuizAnalysis';
import { deleteQuizData, fetchQuizData, publishQuiz } from '../services/quizService';
import { toast } from 'react-toastify';
import QuizLinkShare from './QuizLinkShare';


const AnalyticsTable = ({ data,onDeleteSuccess }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState({ id: '', name: '' });
   const navigate = useNavigate();

  const handleDeleteClick = (quiz) => {
    setSelectedQuiz(quiz);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {

    try{
    const result = await deleteQuizData(selectedQuiz.id);
    if (result.success) {
      setIsDeleteModalOpen(false);
      toast.success('Quiz deleted successfully');
      setSelectedQuiz({ id: '', name: '' });
      onDeleteSuccess();
  } else {
    toast.error('Failed to delete Quiz. Please try again');
  }
    setIsDeleteModalOpen(false);
    setSelectedQuiz({ id: '', name: '' });
}
catch (error) {
  toast.error('Failed to delete Quiz. Please try again');
}
  };

  const handleAnalysisClick = async (quizId) => {
    try {
      const data = await fetchQuizData(quizId);
      if(!data.success){
        toast.error('Error while fetching. Please try again');
      }
      if (data.quiz.type === 'q&a') {
        setCurrentComponent(<QaQuizAnalysis quizId={quizId} data={data.quiz} />);
        navigate(`/analytics/question-analysis`,{ state: { quizId, data: data.quiz } });
      } else if (data.quiz.type === 'poll') {
        setCurrentComponent(<PollQuizAnalysis quizId={quizId} data={data.quiz} />);
        navigate(`/analytics/poll/question-analysis`,{ state: { quizId, data: data.quiz } });
      }
     
    }
    catch (error) {
      console.error('Error fetching quiz data:', error);
      alert('Failed to fetch quiz data.');
    }
  };

  const handleUpdateClick = (quizId) => {
    
    setCurrentComponent(
      <CreateQuestion
        quizType={quizId.type}
        quizId={quizId.id}
        handleQuizUpdateButton={handleQuizUpdateButton} 
        onCancel = {onCancel}
      />
    );
  }
  const onCancel=() => setCurrentComponent(null);

  const handleQuizUpdateButton= async (quizId)=>{
    
    let link = await publishQuiz(quizId);
    link = `${window.location.origin}/${link}`;

    setCurrentComponent(<QuizLinkShare  text={'Your quiz is updated successfully!'}  onShare={() => setCurrentComponent(null)}  setLink = {link}/>)
  }

  const handleShareClick = async (quizId) => {
    try {
     
      let link = await publishQuiz(quizId);
      link = `${window.location.origin}/${link}`;

      const result = await navigator.clipboard.writeText(link);
      if (result === undefined || result === null) {
        toast.success('Quiz Link copied to clipboard');
      } else {
        toast.error('Failed to copy Quiz Link');
      }
    } catch (err) {
      toast.error('Failed to copy Quiz Link');
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'S.No',
        id: 'serialNo',
        Cell: ({ row }) => row.index + 1, 
      },
      {
        Header: 'Quiz Name',
        accessor: 'quizName',
      },
      {
        Header: 'Created On',
        accessor: 'createdOn',
      },
      {
        Header: 'Impressions',
        accessor: 'impressions',
        Cell: ({ value }) => {
          if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`; 
          }
          return value;
        },
      },
      {
        Header: '', // Empty header for icons
        id: 'actions',
        Cell: ({ row }) => (
          <div className="icons-container">
            <FaEdit className="edit-icon" onClick={() => handleUpdateClick({id:row.original.id,type:row.original.type})} />
            <FaTrash className="delete-icon" onClick={() => handleDeleteClick({id:row.original.id,name:row.original.quizName})} />
            <FaShare className="share-icon" onClick={() => handleShareClick(row.original.id)} />

          </div>
        ),
      },
      {
        Header: '',
        id: 'analysis',
        Cell: ({ row }) => <a href="#" className="analysis-link" onClick={() => handleAnalysisClick(row.original.id)}>Question-wise Analysis</a>,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      {currentComponent ? (
        currentComponent 
      ) : (
        data.length === 0 ? (
          <div className="no-data-message">
            <p>No quizzes available. Please create a quiz to see it here.</p>
          </div>
          ) : (
        <table {...getTableProps()} className="analytic-quiz-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
               const { key, ...rest } = column.getHeaderProps();
               return <th key={key} {...rest}>{column.render('Header')}</th>;
             })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                 {row.cells.map(cell => {
                  const { key, ...rest } = cell.getCellProps();
                  return <td key={key} {...rest}>{cell.render('Cell')}</td>;
                })}
                </tr>
              );
            })}
          </tbody>
        </table>
          )
      )}

      {isDeleteModalOpen && (
        <div className="quiz-popup-overlay">
          <div className="quiz-popup-container" style={{ height: '150px' }}>
            <p className="popup-title" style={{ marginTop: '0px' }}>
              Are you sure you want to delete the quiz "{selectedQuiz.name}"?
            </p>
            <div className="quiz-buttons-container">
              <button className="quiz-delete-button" onClick={confirmDelete}>
                Confirm Delete
              </button>
              <button className="quiz-cancel-button" onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedQuiz({ id: '', name: '' });
                }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

};
export default AnalyticsTable;
