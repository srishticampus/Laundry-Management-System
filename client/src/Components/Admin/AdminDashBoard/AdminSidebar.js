import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../../Styles/AdminSidebar.css'
import admin from '../../../Assets/varkala.png'
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
function AdminSidebar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("admin") != 1)
      navigate('/admin-login');
  }, []);
  const handleLogout = () => {
    localStorage.setItem('admin', 0);   
     toast.success('Logged out successfully.');
    navigate('/admin-login');
    setShowModal(false);  
};

const handleView = () => {
    setShowModal(true); 
};

const handleClose = () => {
    setShowModal(false); 
};

  return (
    <div>
      <div className="admin-sidebar-background">
        <div className="pt-5 ms-3 admin-sidebar-h4">
            <img src={admin} className='admin-logo'></img>
          <Link to="/admin-home" className="admin-dash-link"><p className="p-2 fw-light admin-border"> Dashboard</p></Link>
          <Link to='/admin-' className="admin-dash-link"><p className="p-2 fw-light admin-border"> Order Analysis</p></Link>
          <Link to='/admin_' className="admin-dash-link"><p className="p-2  fw-light admin-border">  User Analysis</p></Link>
          <Link to='/' className="admin-dash-link"><p className="p-2  fw-light admin-border">Report</p></Link>
          <Link to='/' className="admin-dash-link"><p className="p-2  fw-light admin-border">Manage Laundry Shop</p></Link>
          <Link to='/admin-' className="admin-dash-link"><p className="p-2 fw-light admin-border">Users</p></Link>
          <Link to='/admin-' className="admin-dash-link"><p className="p-2 fw-light admin-border">Delivery Agents</p></Link>

          <Link to='/admin-' className="admin-dash-link"><p className="p-2 fw-light admin-border">Orders</p></Link>
          <Link to='/admin-' className="admin-dash-link"><p className="p-2 fw-light admin-border">Feedback</p></Link>

          <Link to='' className="admin-dash-link" onClick={handleView}><p className="p-2  fw-light admin-border">Logout</p></Link>

        </div>
      </div>
      {/* Modal for logout confirmation */}
      <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Yes, Logout
                    </Button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default AdminSidebar