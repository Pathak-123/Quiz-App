import React from 'react'
import '../style/LeftNavbarStyle.css'
function LeftNavbarItem({text,isActive, action }) {
  return (
    <div className={`left-navbar-item ${isActive ? 'active' : ''}`}
    onClick={ action}>
      {text}
    </div>
  )
}

export default LeftNavbarItem