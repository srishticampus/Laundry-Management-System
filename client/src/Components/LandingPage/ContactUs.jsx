import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/ContactUs.css";
import { toast } from "react-toastify";
import { register } from "../Services/CommonServices";
function ContactUs() {
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
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!data.email) {
      console.log("here");

      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Enter a valid E-mail Id";
    }

    if (!data.name) {
      newErrors.name = "Name is required";
    }
    if (!data.msg) {
      newErrors.msg = "Message is required";
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
      const result = await register(data, "addContat");

      if (result.success) {
        console.log(result);

        toast.success("Message Send successfully !");
        navigate("/");
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
            <h4 className="contact-us-title">Contact Us</h4>
            <div className="contact_us_circle"></div>
          </div>
          <div className="contact_us_input_container">
            <div className="contact-us-div1">
              <form className="mt-5" onSubmit={handleLogin}>
                <div className="mt-5">
                  <label>FullName</label>
                  <input
                    type="text"
                    className="form-control border border-dark"
                    placeholder="Enter Your Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>
                <div className="mt-3">
                  <label>Email Address</label>
                  <input
                    type="text"
                    className="form-control border border-dark"
                    placeholder="Enter Your Message"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="mt-3">
                  <label>Your Message</label>
                  <textarea
                    className="form-control border border-dark"
                    placeholder="Enter Your Message"
                    name="msg"
                    rows="5"
                    value={data.msg}
                    onChange={handleChange}
                  />
                  {errors.msg && (
                    <span className="text-danger">{errors.msg}</span>
                  )}
                </div>
                <div className="text-center mt-5 d-flex justify-content-evenly">
                  <button type="submit" className="contact_usbtn">
                    Send Message
                  </button>
                </div>
              </form>{" "}
            </div>
            <div className="contact_us_circle2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
