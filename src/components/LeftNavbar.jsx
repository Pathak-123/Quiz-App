import React from 'react'
import { useNavigate } from 'react-router-dom';
import LeftNavbarItem from './LeftNavbarItem'
import '../style/LeftNavbarStyle.css'
import '../App.css';
import { toast } from 'react-toastify';

function LeftNavbar({ selectedPage, setSelectedPage, isSidebarOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const onClickLeftNavbar = (value) => () => {
    setSelectedPage(value)

  }
  function logouthandler() {
    localStorage.removeItem('token');
    toast.success('User Logged Out Successfully');
    navigate('/');

  }
  return (
    <div className={`left-navbar-container ${isSidebarOpen ? 'open' : ''}`}>
      <div>
        {isSidebarOpen && (<p className='close-sidebar' onClick={toggleSidebar}>
          X
        </p>
        )}
        <h1 className='title'>QUIZZIE</h1>
      </div>
      <div className='left-navbar'>
        <LeftNavbarItem text='Dashboard' isActive={selectedPage === 'dashboard'} action={onClickLeftNavbar('dashboard')} />
        <LeftNavbarItem text='Analytics' isActive={selectedPage === 'analytics'} action={onClickLeftNavbar('analytics')} />
        <LeftNavbarItem text='Create Quiz' isActive={selectedPage === 'create-quiz'} action={onClickLeftNavbar('create-quiz')} />
      </div>
      <div>
        <hr className='left-navbar-horizontal-line' />
        <p className='logout-text' onClick={logouthandler}>Log Out</p>
      </div>

    </div>
  )
}

export default LeftNavbar