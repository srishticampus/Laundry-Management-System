import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../Styles/AdminSidebar.css";
import admin from "../../../Assets/adminlogo.png";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";

function AdminSidebar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLaundryDropdown, setShowLaundryDropdown] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("admin") != 1) navigate("/admin-login");
  }, []);
  const handleLogout = () => {
    localStorage.setItem("admin", 0);
    toast.success("Logged out successfully.");
    navigate("/admin-login");
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
          <img src={admin} className="admin-logo"></img>
          <Link to="/admin-home" className="admin-dash-link">
            <p className="p-2 fw-light admin-border"> Dashboard</p>
          </Link>
          <Link to="/admin-view-users" className="admin-dash-link">
            <p className="p-2 fw-light admin-border"> Registered Users</p>
          </Link>

          <Link
            to=""
            className="admin-dash-link"
            onClick={toggleLaundryDropdown}
          >
            <p className="p-2 fw-light admin-border">
              <span>Laundry Shop</span>
              <span>
                <RiArrowDropDownLine className="admin-drop-icon" />
              </span>
            </p>
          </Link>
          {showLaundryDropdown && (
            <div className="submenu">
              <ul>
                <li>
                  {" "}
                  <Link to="/admin-add-shop" className="admin-sub-link" style={{ ":hover": { backgroundColor: "red" }, marginTop: "5px" }}>
                    Add Shop
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/admin-view-shop" className="admin-sub-link">
                    View Shop
                  </Link>
                </li>
              </ul>{" "}
            </div>
          )}
          <Link
            to=""
            className="admin-dash-link"
            onClick={toggleLaundryDropdown}
          >
            <p className="p-2 fw-light admin-border">
              <span>Delivery Agents</span>
              <span>
                <RiArrowDropDownLine className="admin-drop-icon" />
              </span>
            </p>
          </Link>
          {showLaundryDropdown && (
            <div className="submenu">
              <ul>
                <li>
                  {" "}
                  <Link to="/admin-agent-requests" className="admin-sub-link">
                    View Requests
                  </Link>
                </li>
                <li>
                  {" "}
                  <Link to="/admin-agent-details" className="admin-sub-link">
                    View Details
                  </Link>
                </li>
              </ul>{" "}
            </div>
          )}

          <Link to="/admin-order-details" className="admin-dash-link">
            <p className="p-2 fw-light admin-border">Laundry Orders</p>
          </Link>

          <Link to="/admin-feedback" className="admin-dash-link">
            <p className="p-2 fw-light admin-border">Feedback</p>
          </Link>

          <Link to="" className="admin-dash-link" onClick={handleView}>
            <p className="p-2  fw-light admin-border">Logout</p>
          </Link>
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
  );
}

export default AdminSidebar;
