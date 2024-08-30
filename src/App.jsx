
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {lazy,Suspense} from "react"

import './App.css'
// import Login from './pages/Login';
// import Dashboard from './pages/Home';
// import StartLiveQuizPopup from './components/LiveQuiz/StartLiveQuizPopup';
// import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Home'));
const StartLiveQuizPopup = lazy(() => import('./components/LiveQuiz/StartLiveQuizPopup'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<ProtectedRoute element={Dashboard} />} />
          <Route path="/livequiz/:slugID" element={<StartLiveQuizPopup />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
