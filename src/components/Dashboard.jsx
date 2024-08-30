import React, { useEffect, useState } from 'react'
import '../style/DashboardStyle.css';
import '../App.css'
import DashboardQuizCard from './shared/DashboardQuizCard';
import TrendingQuizContainer from './TrendingQuizContainer';
import { fetchDashboardData } from '../services/quizService';
import { formatDate } from '../utils/helperFunction';
function Dashboard() {
  const [quizStats, setQuizStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalImpressions: 0,
    trendingQuizzes: [],
  });
  const formatTotalImpressions = (totalImpressionCount) => {
    return totalImpressionCount >= 1000 ? `${(totalImpressionCount / 1000).toFixed(1)}K` : totalImpressionCount;
  };
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData();
        const { quiz } = data;
        const totalQuizzes = quiz.length;
        const totalQuestions = quiz.reduce((count, q) => count + q.questions.length, 0);
        const totalImpressions = quiz.reduce((count, q) => count + q.impressions, 0);


        const trendingQuizzes = quiz
          .filter(q => q.impressions > 10)
          .sort((a, b) => b.impressions - a.impressions);

        setQuizStats({
          totalQuizzes,
          totalQuestions,
          totalImpressions,
          trendingQuizzes,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    loadDashboardData();
  }, []);
  const isNoData = quizStats.totalQuizzes === 0 && quizStats.totalQuestions === 0 && quizStats.totalImpressions === 0;
  const isNoTrendingQuizzes = quizStats.trendingQuizzes.length === 0 && !isNoData;
  return (
    <div className='dashboard-container'>
      {isNoData ? (
        <div className='no-data-message'>
          <h2>Welcome to the Quiz Builder!</h2>
          <p>You haven't created any quizzes yet. Let's get started and create your first quiz now!</p>
        </div>
      ) : (
        <>
      <div className='dashboard-top-container'>
        <DashboardQuizCard numberValue={quizStats.totalQuizzes}
          title={'Quiz Created'}
          color="#FF5D01"
        />
        <DashboardQuizCard numberValue={quizStats.totalQuestions}
          title={'Questions Created'}
          color='#60B84B'
        />
        <DashboardQuizCard numberValue={formatTotalImpressions(quizStats.totalImpressions)}
          title={'Total Impressions'}
          color="#5076FF"
        />
      </div>
      <h4 className='title' style={{ textAlign: 'left' }}>Trending Quizs</h4>
      {isNoTrendingQuizzes ? (
            <div className='no-trending-quizzes-message'>
              <p>Your quizzes haven’t made the trending list yet. Share your quizzes and gather more views to see them shine in the trending section !!</p>
            </div>
          ) : (
      <div className="trending-quiz-list">
        {quizStats.trendingQuizzes.map((quiz, index) => (
          <TrendingQuizContainer key={index}
            title={quiz.name}
            description={formatDate(quiz.createdAt)}
            impression={quiz.impressions}
          />
        ))}
      </div>
          )}
      </>
      )}
    </div>

  )
}

export default Dashboard;