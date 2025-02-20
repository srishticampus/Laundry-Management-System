import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../Assets/logo2.png";
import arrow from "../../Assets/arrow-up.png";

import "../../Styles/CommonNav.css";
import { resetPassword, ViewById } from "../Services/CommonServices";
import "../../Styles/CustProfile.css";
import { IMG_BASE_URL } from "../Services/BaseURL";

function CustNavbar() {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [data, setdata] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [errors, setErrors] = useState({});

  const openEditModal = () => setShowEditModal(true);
  const closeEditModal = () => setShowEditModal(false);
  useEffect(() => {
    if (localStorage.getItem("customer") == null) {
      navigate("/");
    }
  }, [navigate]);
  const fetchData = async () => {
    try {
      const result = await ViewById(
        "viewCustomer",
        localStorage.getItem("customer")
      );

      if (result.success) {
        console.log(result);
        if (result.user) {
          setdata(result.user);
          setSelectedImage(`${IMG_BASE_URL}/${result.user.image.filename}`); // Set initial image
        } else setdata(null);
      } else {
        console.error("Data error:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Data View");
    }
  };
  useEffect(() => {
    fetchData(); // Call the async function
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("customer");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 300);
  };
  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const closeModal = () => {
    setShowProfileModal(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("here");

    setdata({
      ...data,
      [name]: value,
    });
    // }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result); // Update the image preview
      };
      reader.readAsDataURL(file);
      console.log("Selected file:", file);
    }
    setdata({
      ...data,
      image: file,
    });
  };
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!data.name.length > 0) {
      console.log("here");

      newErrors.name = "Name is required";
    } else if (!phoneRegex.test(data.contact)) {
      newErrors.contact = "Enter a valid Contact Number";
    }
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Enter a valid E-mail Id";
    }
    if (!data.contact) {
      newErrors.contact = "Contact is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(errors);

    console.log("api called", validate());

    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const result = await resetPassword(
        data,
        "editCustomer",
        localStorage.getItem("customer")
      );

      if (result.success) {
        console.log(result);

        toast.success("Profile Updated successfully !");
        navigate("/cust-home");
      } else {
        console.error("Registration error:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Registration");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo on the Left */}
          <Link to="/" className="navbar-brand">
            <img src={logo} className="img-fluid nav-img" alt="logo" />
          </Link>

          {/* Text Links in the Middle */}
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              <li className="nav-item mx-3">
                <Link to="/cust-home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/cust-view-shops" className="nav-link">
                  Book Now
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link to="/cust-track-order" className="nav-link">
                  My Orders
                </Link>
              </li>

              <li className="nav-item mx-3">
                <Link to="/cust-enquiries" className="nav-link">
                  Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* User Icon on the Right */}
          <div className="dropdown">
            <i
              className="ri-user-3-line"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer", fontSize: "1.5rem" }}
            ></i>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" onClick={handleProfileClick}>
                  Profile
                </Link>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div
            className="modal-dialog"
            style={{
              maxWidth: "350px",
              width: "100%",
              marginTop: "10px",
              position: "absolute",
              right: "20px",
              top: "50px"
            }}
          >
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-link text-dark"
                  onClick={closeModal}
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  <img src={arrow} alt="arow"/>
                </button>
                <img
                  src={
                    selectedImage || `${IMG_BASE_URL}/${data.image.filename}`
                  }
                  className="img-fluid cust-pro-image-rounded"
                  alt="User"
                  style={{ marginTop: "-21px" }}
                />
              </div>
              <div className="modal-body text-center">
                <p className="cust-pro-name-color">
                  <strong> {data.name}</strong>
                </p>
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <td className="cust-pro-label-color text-start">Phone Number</td>
                      <td className="cust-pro-label text-start">: {data.contact}</td>
                    </tr>
                    <tr>
                      <td className="cust-pro-label-color text-start">Email Id</td>
                      <td className="cust-pro-label text-start">: {data.email}</td>
                    </tr>
                  </tbody>
                </table>
                <button className="shop-signup-button" onClick={openEditModal}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div
            className="modal-dialog custom-modal-dialog"
            style={{
              marginTop: "1px",
              maxWidth: "420px",
              width: "100%",
              maxHeight: "200px",
            }}
          >
            <div className="modal-content">
              <div
                className="modal-header d-flex align-items-center justify-content-between"
                style={{ color: "white" }}
              >
                <button
                  type="button"
                  className="btn btn-link text-white"
                  onClick={closeEditModal}
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textDecoration: "none",
                    marginTop: "0px",
                  }}
                >
                  <img src={arrow} alt="Back Arrow" />
                </button>
                <h5 className="cust-prof-modal-title">Edit Profile</h5>
              </div>

              {/* Image Section */}
              <div
                className="d-flex flex-column align-items-center py-4"
                style={{ color: "white", marginTop: "0px" }}
              >
                <div className="position-relative">
                  {/* Profile Picture */}
                  <img
                    src={
                      selectedImage || `${IMG_BASE_URL}/${data.image.filename}`
                    }
                    className="cust-pro-image-rounded"
                    alt="User"
                  />
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    id="profileImageInput"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageChange(e)}
                  />
                  {/* Pen Icon */}
                  <i
                    className="ri-edit-2-fill position-absolute"
                    style={{
                      bottom: "0",
                      right: "-10px",
                      fontSize: "1.5rem",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      padding: "5px",
                      color: "#3070F5",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      document.getElementById("profileImageInput").click()
                    }
                  ></i>
                </div>
              </div>

              {/* Body Section */}
              <div className="modal-body" style={{ marginTop: "0px" }}>
                <form>
                  <div className="mb-3 text-start">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      placeholder={data.name}
                    />
                    {errors.name && (
                      <span className="text-danger">{errors.name}</span>
                    )}
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      placeholder={data.email}
                    />
                    {errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </div>
                  <div className="mb-3 text-start">
                    <label htmlFor="contact" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contact"
                      name="contact"
                      onChange={handleChange}
                      value={data.contact}
                      placeholder={data.contact}
                    />
                    {errors.contact && (
                      <span className="text-danger">{errors.contact}</span>
                    )}
                  </div>
                </form>
              </div>

              {/* Footer Section */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeEditModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustNavbar;
