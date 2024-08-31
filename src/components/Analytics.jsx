import React, { useEffect, useState } from 'react'
import AnalyticsTable from './AnalyticsTable'
import '../style/AnalyticsStyle.css'
import { fetchDashboardData } from '../services/quizService'
import { formatDate } from '../utils/helperFunction';
import Loader from './Loader';

function Analytics() {
  
  const [quizzes, setQuizzes] = useState([]);
  const [refreshDataTrigger, setRefreshDataTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const data = await fetchDashboardData(); 
        
        if (data.success) {
          const extractedData = data.quiz.map(quiz => ({
            quizName: quiz.name,
            createdOn: formatDate(quiz.createdAt),
            impressions: quiz.impressions,
            id: quiz._id,
            type: quiz.type,
          }));
          setQuizzes(extractedData);
        }
        else{
          setQuizzes([]);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
      finally {
        setLoading(false); 
      }
    };

    getAnalyticsData();
  }, [refreshDataTrigger]);
  const refreshData = () => {
    setRefreshDataTrigger(prev => !prev);
  };

  return (
    <div className='analytics-container'>
      <h1 className='analytics-title'>Quiz Analysis</h1>
      {loading ? (
        <Loader />
      ) : (
      <div className='table-scroll-container'>
        <AnalyticsTable data={quizzes} onDeleteSuccess={refreshData}/>
      </div>
       )}
 </div>
  )
}

export default Analytics