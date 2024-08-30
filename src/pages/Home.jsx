import React, { useState, useEffect,lazy,Suspense } from 'react'
// import Dashboard from '../components/Dashboard';
// import Analytics from '../components/Analytics';
// import CreateQuiz from '../components/CreateQuiz';
// import LeftNavbar from '../components/LeftNavbar';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import '../style/DashboardStyle.css';
// import QaQuizAnalysis from '../components/QaQuizAnalysis';
// import PollQuizAnalysis from '../components/PollQuizAnalysis';
import Loader from '../components/Loader';

const Dashboard = lazy(() => import('../components/Dashboard'));
const Analytics = lazy(() => import('../components/Analytics'));
const CreateQuiz = lazy(() => import('../components/CreateQuiz'));
const LeftNavbar = lazy(() => import('../components/LeftNavbar'));
const QaQuizAnalysis = lazy(() => import('../components/QaQuizAnalysis'));
const PollQuizAnalysis = lazy(() => import('../components/PollQuizAnalysis'));


function Home() {
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.slice(1);
    setSelectedPage(path || 'dashboard');
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleQuizClose = () => {
    setIsQuizOpen(false);
    navigate('/dashboard');
  };
  const handleCreateQuizContinue = () => {
    navigate('/create-question');
  };
  const handlePageChange = (page) => {
    setSelectedPage(page);
    navigate(`/${page}`);
  };


  return (
    <div className='home-container'>
      <Suspense fallback={<Loader />}>
      <LeftNavbar selectedPage={selectedPage} setSelectedPage={handlePageChange} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </Suspense>

      <div className="right-screen">
        {!isSidebarOpen && (<div className="hamburger-icon" onClick={toggleSidebar}>
          &#9776;
        </div>
        )}

        <Suspense fallback={<Loader />}>

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/create-quiz" element={<CreateQuiz onClose={handleQuizClose} isOpen={handleCreateQuizContinue} />} />
          <Route path="/analytics/question-analysis" element={<QaQuizAnalysis />} />
          <Route path="/analytics/poll/question-analysis" element={<PollQuizAnalysis />} />
          
        </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default Home