import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../../Styles/AdminSidebar.css'
import admin from '../../../Assets/adminlogo.png'
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';
import { RiArrowDropDownLine } from "react-icons/ri";

function ShopSidebar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLaundryDropdown, setShowLaundryDropdown] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("shop") == null)
      navigate('/shop-login');
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('shop');
    toast.success('Logged out successfully.');
    navigate('/shop-login');
    setShowModal(false);
  };

  const handleView = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const toggleLaundryDropdown = () => {
    setShowLaundryDropdown(!showLaundryDropdown);
  };
  return (
    <div>
      <div className="admin-sidebar-background">
        <div className="pt-5 ms-3 admin-sidebar-h4">
          <img src={admin} className='admin-logo'></img>
          <Link to="/shop-home" className="admin-dash-link"><p className="p-2 fw-light admin-border"> Dashboard</p></Link>
          <Link to='/shop-view-service' className="admin-dash-link"><p className="p-2 fw-light admin-border"> Services</p></Link>
          <Link to='/shop-view-material' className="admin-dash-link"><p className="p-2 fw-light admin-border"> Materials</p></Link>

          <Link to='/shop-view-workinghours' className="admin-dash-link"><p className="p-2 fw-light admin-border"> Operating Hours</p></Link>

          <Link to='/shop-orders' className="admin-dash-link"><p className="p-2 fw-light admin-border"> Orders</p></Link>

          <Link to='/shop-feedback' className="admin-dash-link"><p className="p-2 fw-light admin-border">Feedback</p></Link>
          <Link to='/shop-order-history' className="admin-dash-link"><p className="p-2 fw-light admin-border"> Order History</p></Link>

          <Link to='/admin-' className="admin-dash-link"><p className="p-2 fw-light admin-border">Manage Issues</p></Link>

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

export default ShopSidebar