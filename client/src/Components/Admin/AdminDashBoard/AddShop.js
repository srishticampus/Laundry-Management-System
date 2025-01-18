import React, { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { toast } from "react-toastify";

import { VscEye } from "react-icons/vsc";
import "../../../Styles/AddShop.css";
import { Link, useNavigate } from "react-router-dom";
import {
  login,
  register,
  registerWithFile,
} from "../../Services/CommonServices";
function AddShop() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    regNo: "",
    district: "",
    location: "",
    pincode: "",
    owner: "",
    image: null,
    contact: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
    // }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    const phoneRegex = /^\d{10}$/;

    if (!data.email) {
      console.log("here");

      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!data.name) {
      newErrors.name = "Shop Name is required";
    }
    if (!data.location) {
      newErrors.location = "Location is required";
    }
    if (!data.contact) {
      newErrors.contact = "Contact is required";
    } else if (!phoneRegex.test(data.contact)) {
      newErrors.contact = "Invalid Contact Number !";
    }

    if (!data.pincode) {
      newErrors.pincode = "Pincode is required";
    }
    if (!data.regNo) {
      newErrors.regNo = "Register Number is required";
    }
    if (!data.image) {
      newErrors.image = "image is required";
    }
    if (!data.district) {
      newErrors.district = "District is required";
    }
    if (!data.owner) {
      newErrors.owner = "Owner Name is required";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password Must Contain 1 Uppercase,1 Symbol and 1 Number with minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleImageChange = (e) => {

    const file = e.target.files[0];
    setData({
      ...data,
      image: file,
    });
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
      const result = await registerWithFile(data, "addShop");

      if (result.success) {
        console.log(result);

        toast.success("Shop Added successfully !");
        // navigate(-1);
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
    <div className="container" style={{ width: "80%" }}>
      <h2 className="shop-add-staff-mainText mt-5"> Add Laundry Shop</h2>
      <div className="shop-add-staff-mainDiv">
        <form onSubmit={handleLogin}>
          <div className="row ">
            <div className="col-md-6 px-4 py-2 ">
              <label className="add-shop-label">Shop Name</label>
              <input
                type="text"
                placeholder="Enter Shop Name"
                className="form-control p-2"
                name="name"
                onChange={handleChange}
              ></input>
              {errors.name && (
                <div id="nameError" className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="col-md-6 px-4 py-2 ">
              <label className="add-shop-label">Register Number</label>
              <input
                type="text"
                placeholder="Enter Register Number"
                className="form-control p-2"
                name="regNo"
                onChange={handleChange}
              ></input>
              {errors.regNo && (
                <div id="nameError" className="invalid-feedback">
                  {errors.regNo}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 px-4 py-2 ">
              <label className="add-shop-label">Owner Name</label>

              <input
                type="text"
                placeholder="Enter Owner Name"
                className="form-control p-2"
                name="owner"
                onChange={handleChange}
              ></input>

              {errors.owner && (
                <div id="nameError" className="invalid-feedback">
                  {errors.owner}
                </div>
              )}
            </div>
            <div className="col-md-6 px-4 py-2 ">
              <label className="add-shop-label">District</label>

              <select
                placeholder="District"
                className="form-control p-2"
                name="district"
                onChange={handleChange}
                value={data.district}
              >
                <option value="">District</option>

                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Kollam">Kollam</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Idukki">Idukki</option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Wayanad">Wayanad</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
              </select>

              {errors.district && (
                <div id="nameError" className="invalid-feedback">
                  {errors.district}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 px-4 py-2 ">
              <label className="add-shop-label">Contact Number</label>
              <input
                type="text"
                placeholder="Enter Contact Number"
                className="form-control p-2"
                name="contact"
                onChange={handleChange}
              ></input>
              {errors.contact && (
                <div id="nameError" className="invalid-feedback">
                  {errors.contact}
                </div>
              )}
            </div>

            <div className="col-md-6 px-4 py-2 ">
              <label className="add-shop-label">Location</label>
              <input
                type="text"
                placeholder="Add Location"
                className="form-control p-2"
                name="location"
                onChange={handleChange}
              ></input>

              {errors.location && (
                <div id="nameError" className="invalid-feedback">
                  {errors.location}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 px-4 py-2 ">
              <label className="add-shop-label">Email Id</label>
              <input
                type="text"
                placeholder="Enter E-mail ID"
                className="form-control p-2"
                name="email"
                onChange={handleChange}
              ></input>
              {errors.email && (
                <div id="nameError" className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="col-md-6 px-4 py-2 ">
              <label className="add-shop-label">Pincode</label>
              <input
                type="text"
                placeholder="pincode"
                className="form-control p-2"
                name="pincode"
                onChange={handleChange}
              ></input>

              {errors.pincode && (
                <div id="nameError" className="invalid-feedback">
                  {errors.pincode}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 px-4 py-2">
              <label className="add-shop-label">Image Upload</label>
              <input
                type="file"
                className="form-control p-2"
                name="image"
                onChange={handleImageChange}
              ></input>
              {errors.image && (
                <div id="nameError" className="invalid-feedback">
                  {errors.image}
                </div>
              )}
            </div>

            <div className="col-md-6 px-4 py-2">
              <label className="add-shop-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  className="form-control p-2"
                  style={{ paddingRight: "40px" }}
                />
                <div
                  className="shop-signup-password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <VscEyeClosed /> : <VscEye />}
                </div>
              </div>
              {errors.password && (
                <div id="nameError" className="invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>
          </div>
          <div className="shop-signup-button-div">
            <button type="submit" className="shop-signup-button">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddShop;
