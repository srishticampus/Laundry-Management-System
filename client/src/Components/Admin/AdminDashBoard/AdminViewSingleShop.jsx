import React, { useEffect, useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { toast } from "react-toastify";
import { IMG_BASE_URL } from "../../Services/BaseURL";
import { VscEye } from "react-icons/vsc";
import "../../../Styles/AddShop.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  registerWithFile,
  updateWithFile,
  ViewById,
} from "../../Services/CommonServices";

function AdminViewSingleShop() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    regNo: "",
    district: "",
    location: "",
    pincode: "",
    owner: "",
    image: { filename: "" },
    contact: "",
  });
  const fetchData = async () => {
    try {
      const result = await ViewById("viewShop", id);

      if (result.success) {
        console.log(result);

        setData(result.user);
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

  const Navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    Navigate(`/admin-edit-shop/${id}`);
  };
  return (
    <div className="container">
      <div className="shop-add-staff-mainDiv">
        <form onSubmit={handleLogin}>
          <div className="row">
            <img
              src={`${IMG_BASE_URL}/${data.image.filename}`}
              className="img-fluid image-rounded "
              alt="User"
            />
          </div>
          <div className="row mt-5">
            <div className="col-md-5 p-2 ">
              <label className="add-shop-label">Shop Name</label>
              <input
                type="text"
                readOnly
                value={data.name}
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

            <div className="col-md-5 p-2 ">
              <label className="add-shop-label">Register Number</label>
              <input
                type="text"
                value={data.regNo}
                readOnly
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
            <div className="col-md-5 p-2 ">
              <label className="add-shop-label">Owner Name</label>

              <input
                type="text"
                readOnly
                value={data.owner}
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
            <div className="col-md-5 p-2 ">
              <label className="add-shop-label">District</label>
              <input
                type="text"
                readOnly
                value={data.district}
                className="form-control p-2"
                name="owner"
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 p-2 ">
              <label className="add-shop-label">Contact Number</label>
              <input
                type="text"
                readOnly
                value={data.contact}
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

            <div className="col-md-5 p-2 ">
              <label className="add-shop-label">Location</label>
              <input
                type="text"
                readOnly
                value={data.location}
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
            <div className="col-md-5 p-2 ">
              <label className="add-shop-label">Email Id</label>
              <input
                type="text"
                readOnly
                value={data.email}
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

            <div className="col-md-5 p-2 ">
              <label className="add-shop-label">Pincode</label>
              <input
                type="text"
                readOnly
                value={data.pincode}
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

          <div className="shop-signup-button-div">
            <button type="submit" className="shop-signup-button">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminViewSingleShop;
