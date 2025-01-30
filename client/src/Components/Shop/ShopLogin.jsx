import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/ContactUs.css";
import { toast } from "react-toastify";
import "../../Styles/AdminLogin.css";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import img from "../../Assets/adminlogin.png";
import "../../Styles/ShopLogin.css";
import { login, register } from "../Services/CommonServices";
function ShopLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Enter a valid E-mail Id";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
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
      const result = await login(data, "shopLogin");

      if (result.success) {
        console.log(result);
        localStorage.setItem("shop", result.user._id);

        toast.success("Login Successfull !");
        navigate("/shop-home");
      } else {
        console.error("Error Occured:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Registration");
    }
  };
  return (
    <div className="contact-main1">
      <div className="contact-main">
        <div className="contact_us_main_container">
          <div className="contact_us_head">
            <h4 className="shop-title">Login</h4>
            <div className="contact_us_circle"></div>
          </div>
          <div className="shop-lgin-input_container">
            <div className="shop-login-div1">
              <div className="row mt-2">
                <div className="col-6">
                  <img
                    src={img}
                    className="img-fluid shop-login-img"
                    alt="user_reg_img"
                  />
                </div>

                <div className="col-6">
                  <div className="shop-login-div2">
                    <form>
                      <div className="mt-5">
                        <label>E mail</label>
                        <input
                          type="text"
                          className="form-control border border-dark"
                          placeholder="Enter Email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                        />
                        {errors.email && (
                          <span className="text-danger">{errors.email}</span>
                        )}
                      </div>
                      <div className=" mt-4">
                        <label>Password</label>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
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

                      <div className="text-center mt-5 d-flex justify-content-evenly">
                        <button
                          type="submit"
                          onClick={handleLogin}
                          className="adminloginbtn"
                        >
                          Login
                        </button>
                      </div>
                    </form>{" "}
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

export default ShopLogin;
