import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/ContactUs.css";
import { toast } from "react-toastify";
import "../../Styles/AdminLogin.css";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import img from "../../Assets/adminlogin.png";
import "../../Styles/ShopLogin.css";
import "../../Styles/CustomerLoginSignup.css";

import { login, register } from "../Services/CommonServices";
import { API_BASE_URL } from "../Services/BaseURL";
import axios from "axios";
function CustForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Enter a valid E-mail Id";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password Must Contain 1 Uppercase,1 Symbol and 1 Number with minimum 6 characters";
    }
    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (!passwordRegex.test(data.confirmPassword)) {
      newErrors.confirmPassword =
        "Password Must Contain 1 Uppercase,1 Symbol and 1 Number with minimum 6 characters";
    } else if (data.password != data.confirmPassword) {
      newErrors.confirmPassword =
        "Password and Confirm Password must be the same !";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(errors);

    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }
    console.log("test 3", API_BASE_URL);
    try {
      const result = await axios.post(
        `${API_BASE_URL}/cust-forgotPasswordNew`,
        data
      );
      console.log("resu", result);
      if (result.status === 200) {
        toast.success("Password Reset Succesful");
        navigate("/cust-login");
      } else {
        console.error("Error Occured:", result);
        toast.error("Something went wrong. Try again later.");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Please check your mail id");
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred during forgot password");
      }
    }
  };
  return (
    <div className="contact-main1">
      <div className="contact-main">
        <div className="contact_us_main_container">
          <div className="contact_us_head">
            <h4 className="cust-title">Forget Password?</h4>
            <div className="contact_us_circle"></div>
          </div>
          <div className="cust-lgin-input_container">
            <div className="shop-login-div1">
              <div className="row ">
                <div className="col-6">
                  <div className="cust-login-div2">
                    <form>
                      <div className=""></div>
                      <div className=" mt-4">
                        <label className="cust-login-label">E-Mail ID</label>

                        <input
                          type="text"
                          placeholder="Email "
                          name="email"
                          onChange={handleChange}
                          className="form-control border border-dark"
                        ></input>

                        {errors.email && (
                          <span className="text-danger">{errors.email}</span>
                        )}
                      </div>

                      <div className=" mt-4">
                        <label className="cust-login-label">New Password</label>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            name="password"
                            onChange={handleChange}
                            className="form-control border border-dark"
                            style={{ paddingRight: "40px" }}
                          ></input>
                          <div
                            className="admin-login-password-toggle-icon"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <VscEyeClosed /> : <VscEye />}
                          </div>
                        </div>
                        {errors.password && (
                          <span className="text-danger">{errors.password}</span>
                        )}
                      </div>

                      <div className=" mt-4">
                        <label className="cust-login-label">
                          Confirm New Password
                        </label>

                        <div style={{ position: "relative" }}>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm New Password"
                            name="confirmPassword"
                            onChange={handleChange}
                            className="form-control border border-dark"
                            style={{ paddingRight: "40px" }}
                          ></input>
                          <div
                            className="admin-login-password-toggle-icon"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? (
                              <VscEyeClosed />
                            ) : (
                              <VscEye />
                            )}
                          </div>
                        </div>

                        {errors.confirmPassword && (
                          <span className="text-danger">
                            {errors.confirmPassword}
                          </span>
                        )}
                      </div>

                      <div className="text-center mt-3 d-flex justify-content-evenly mb-2">
                        <button
                          type="submit"
                          onClick={handleLogin}
                          className="adminloginbtn"
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact_us_circle2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustForgotPassword;
