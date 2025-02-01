import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../Styles/AdminSidebar.css";
import admin from "../../../Assets/adminlogo.png";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ViewById } from "../../Services/CommonServices";

function ShopSidebar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [shopData, setShopData] = useState({});
  const [showLaundryDropdown, setShowLaundryDropdown] = useState(false);
  useEffect(() => {
    const shopId = localStorage.getItem("shop") || null;
    if (!shopId) {
      navigate("/shop-login");
      return;
    }

    fetchShopData(shopId);
  }, []);
  const fetchShopData = async (id) => {
    try {
      const result = await ViewById("viewShop", id);

      if (result.success) {
        console.log(result);

        setShopData(result.user);
      } else {
        console.error("Data error:", result);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  console.log("sho ", shopData);
  const handleLogout = () => {
    localStorage.removeItem("shop");
    toast.success("Logged out successfully.");
    navigate("/shop-login");
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
    <div style={{height: "100vh", overflow: "scroll"}}>
      <div className="admin-sidebar-background">
        <div className="admin-sidebar-h4">
          <div className="p-3 d-flex flex-column align-items-center justify-content-center">
            <img src={admin} alt="logo" style={{width: "40%"}} />
            <h5 className="mt-3"> {shopData?.name} </h5>
          </div>

          <Link to="/shop-home" className="admin-dash-link">
            <p className="p-2 fw-light admin-border"> Dashboard</p>
          </Link>
          <Link to="/shop-view-service" className="admin-dash-link">
            <p className="p-2 fw-light admin-border"> Services</p>
          </Link>
          <Link to="/shop-view-material" className="admin-dash-link">
            <p className="p-2 fw-light admin-border"> Materials</p>
          </Link>

          <Link to="/shop-view-workinghours" className="admin-dash-link">
            <p className="p-2 fw-light admin-border"> Operating Hours</p>
          </Link>

          <Link to="/shop-orders" className="admin-dash-link">
            <p className="p-2 fw-light admin-border"> Orders</p>
          </Link>

          <Link to="/shop-feedback" className="admin-dash-link">
            <p className="p-2 fw-light admin-border">Feedback</p>
          </Link>
          <Link to="/shop-order-history" className="admin-dash-link">
            <p className="p-2 fw-light admin-border"> Order History</p>
          </Link>

          <Link to="/shop-issues" className="admin-dash-link">
            <p className="p-2 fw-light admin-border">Manage Issues</p>
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

export default ShopSidebar;
