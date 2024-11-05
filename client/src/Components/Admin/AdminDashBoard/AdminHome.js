import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminDashboard from './AdminDashboard'
import './AdminDashboard.css'

function AdminHome() {
  return (
    <div> <div className='admin_home' >
    <div className='admin_home_sidebar' >
      <AdminSidebar/>
    </div>
    <div className='admin_home_body' >
      <AdminDashboard/>
    </div>
</div></div>
  )
}

export default AdminHome