import React from 'react'
import logo from '../../../Assets/logo2.png'
import '../../../Styles/AdminNav.css'
function AdminNavber() {
  return (
    <div>
    <div className='admin-nav'>
        <img src={logo} className='admin-nav-img'/>
        
    </div>
    <hr className='admin-nav-hr'/>
    </div>
  )
}

export default AdminNavber