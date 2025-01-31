import React, { useEffect, useState } from "react";
import "../../Styles/AdminLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import img from "../../Assets/adminlogin.png";

function AdminLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  // useEffect(() => {
  //     if (localStorage.getItem("admin") == 1)
  //         navigate('/admin-home');
  // }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email) {
      console.log("here");

      newErrors.email = "Email is required";
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
    const hardCodedUsername = "admin";
    const hardCodedPassword = "admin@123";
    if (
      data.email === hardCodedUsername &&
      data.password === hardCodedPassword
    ) {
      localStorage.setItem("admin", 1);
      toast.success("Login successful!");
      navigate("/admin-home");
    } else {
      toast.error("Incorrect Username or Password");
    }
  };

  return (
    <div>
      <div className="adminloginmain">
        <div className="container adminlogincontainer">
          <div className="row mt-2">
            <div className="col-6">
              <div className="container justify-content-center">
                <img src={img} className="img-fluid w-100" alt="user_reg_img" />
              </div>
            </div>
            <div className="col-6">
              <div className="admin-login-div1">
                <h3 className="admin-login-h3">Admin Login</h3>
                <form>
                  <div className="mt-5">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      placeholder="Enter Username"
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
      </div>
    </div>
  );
}

export default AdminLogin;
