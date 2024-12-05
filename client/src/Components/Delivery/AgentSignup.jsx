import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../Styles/ContactUs.css'
import { toast } from "react-toastify";
import "../../Styles/AdminLogin.css";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import img from "../../Assets/adminlogin.png";
import '../../Styles/ShopLogin.css'
import '../../Styles/CustomerLoginSignup.css'
import img1 from '../../Assets/fakeImg.png'

import { login, register, registerWithFile } from "../Services/CommonServices";
function AgentSignup() {


    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [profileImage, setProfileImage] = useState(img1);
    const [ownVehicle, setOwnVehicle] = useState(""); // State for radio button value

    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };
    const handleRadioChange = (e) => {
        const value = e.target.value;
        setOwnVehicle(value);
        if (value === "No") {
            setErrors({ ...errors, ownVehicle: "You cannot register without a two-wheeler." });
        } else {
            setErrors({ ...errors, ownVehicle: "" });
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
        setData({
            ...data,
            image: file,
        });
    };
    const handlechangelic = (e) => {
        const file = e.target.files[0];
       
        setData({
            ...data,
            license: file,
        });
    };
    const handlechangerc = (e) => {
        const file = e.target.files[0];
       
        setData({
            ...data,
            rc: file,
        });
    };
    const handlechangein = (e) => {
        const file = e.target.files[0];
       
        setData({
            ...data,
            insurance: file,
        });
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    };
    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        const phoneRegex = /^\d{10}$/;

        if (!data.name) {


            newErrors.name = 'Name is required';
        }
        if (!data.image) {


            newErrors.image = 'Image is required';
        }
        if (!data.license) {


            newErrors.license = 'License is required';
        }
        if (!data.rc) {


            newErrors.rc = 'RC Copy is required';
        }
        if (!data.insurance) {


            newErrors.insurance = 'Insurance is required';
        }
        if (!data.contact) {


            newErrors.contact = 'Contact is required';
        } else if (!phoneRegex.test(data.contact)) {
            newErrors.contact = 'Enter a valid Contact Number';

        }
        if (!data.email) {


            newErrors.email = 'Email is required';
        }
        else if (!emailRegex.test(data.email)) {
            newErrors.email = 'Enter a valid E-mail Id';

        }
        if (!data.password) {

            newErrors.password = 'Password is required';
        }
        else if (!passwordRegex.test(data.password)) {
            newErrors.password = 'Password Must Contain 1 Uppercase,1 Symbol and 1 Number with minimum 6 characters';
        }
        else if (data.password != data.cpassword) {
            newErrors.password = 'Password and Confirm Password must be the same !';
        }
if(ownVehicle=="No")
    newErrors.ownVehicle = 'You cannot register without a two-wheeler';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(errors);

        console.log("api called", validate());

        if (!validate()) {
            if(ownVehicle=='No'){
                toast.error('You cannot register without a two-wheeler.');
            return;
            }
            toast.error('Please fix the errors in the form.');
            return;
        }
        try {
            console.log(data);
            
            const result = await registerWithFile(data, 'registerAgent');

            if (result.success) {
                console.log(result);
                

                toast.success('Registered successfully !');
                navigate('/agent-login')


            } else {
                console.error('Error Occured:', result);
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Registration');
        }

    };
    return (
        <div className="cust-main1" >
            <div className=''>


                <div className="cust_main_container" >
                    <div className="contact_us_head">
                        <h4 className="cust-signup-title">Registration</h4>

                    </div>
                    <div className="agent-signup-input_container">
                        <div className="cust-login-div1">




                            <div className="cust-login-div2">
                                <form>
                                    <div className="image-upload">
                                        <label htmlFor="file-input">
                                            <img
                                                src={profileImage}
                                                className="img-fluid fake-image-rounded"
                                                alt="User"
                                                style={{ cursor: "pointer" }}
                                            />
                                        </label>
                                        <p className="text-muted mt-2">+ Add Image</p>
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept="image/*"
                                            style={{ display: "none" }}
                                            onChange={handleImageChange}
                                        />
                                    </div>

                                    {errors.image && (
                                        <span className="text-danger left-align-error ">{errors.image}</span>
                                    )}   {/* <img src={img1} className="img-fluid fake-image-rounded " alt="User" /> */}


                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="cust-login-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control border border-dark"
                                                placeholder="Enter Email"
                                                name="name"
                                                value={data.name} onChange={handleChange}

                                            />
                                            {errors.name && (
                                                <span className="text-danger">{errors.name}</span>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="cust-login-label">Location</label>
                                            <input
                                                type="text"
                                                className="form-control border border-dark"
                                                placeholder="Enter Location"
                                                name="location"
                                                onChange={handleChange}

                                            />
                                            {errors.location && (
                                                <span className="text-danger">{errors.location}</span>
                                            )}
                                        </div>

                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label className="cust-login-label">E-Mail ID</label>
                                            <input
                                                type="text"
                                                className="form-control border border-dark"
                                                placeholder="Enter Email"
                                                name="email"
                                                value={data.email} onChange={handleChange}

                                            />
                                            {errors.email && (
                                                <span className="text-danger">{errors.email}</span>
                                            )}
                                        </div>

                                        <div className="col-md-6">
                                            <label className="cust-login-label">City</label>
                                            <input
                                                type="text"
                                                className="form-control border border-dark"
                                                placeholder="Enter Email"
                                                name="city"
                                                value={data.city} onChange={handleChange}

                                            />
                                            {errors.city && (
                                                <span className="text-danger">{errors.city}</span>
                                            )}
                                        </div>

                                    </div>

                                    <div className="row mt-3">


                                        <div className="col-md-6">
                                            <label className="cust-login-label">Conatct Number</label>
                                            <input
                                                type="text"
                                                className="form-control border border-dark"
                                                placeholder="Enter contact number"
                                                name="contact"
                                                value={data.contact} onChange={handleChange}

                                            />
                                            {errors.contact && (
                                                <span className="text-danger">{errors.contact}</span>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="cust-login-label">Pincode</label>
                                            <input
                                                type="text"
                                                className="form-control border border-dark"
                                                placeholder="Enter pincode"
                                                name="pincode"
                                                value={data.pincode} onChange={handleChange}

                                            />
                                            {errors.pincode && (
                                                <span className="text-danger">{errors.pincode}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row   mt-3">
                                        <div className="col-lg-6 ">
                                            <label className="cust-login-label">Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <input type={showPassword ? "text" : "password"}
                                                    placeholder='password'
                                                    name="password"
                                                    onChange={handleChange}
                                                    className="form-control border border-dark"
                                                    style={{ paddingRight: '40px' }} >

                                                </input>
                                                <div className="admin-login-password-toggle-icon" onClick={togglePasswordVisibility}>
                                                    {showPassword ? <VscEyeClosed /> : <VscEye />}
                                                </div>

                                            </div>
                                            {errors.password && (
                                                <span className="text-danger">{errors.password}</span>
                                            )}
                                        </div>
                                        <div className="col-lg-6 ">
                                            <label className="cust-login-label">Confirm Password</label>
                                            <div style={{ position: 'relative' }}>
                                                <input type={showPassword2 ? "text" : "password"}
                                                    placeholder='Re-Type password'
                                                    name="cpassword"
                                                    onChange={handleChange}
                                                    className="form-control border border-dark"
                                                    style={{ paddingRight: '40px' }} >

                                                </input>
                                                <div className="admin-login-password-toggle-icon" onClick={togglePasswordVisibility2}>
                                                    {showPassword2 ? <VscEyeClosed /> : <VscEye />}
                                                </div>

                                            </div>
                                            {errors.cpassword && (
                                                <span className="text-danger">{errors.c}</span>
                                            )}
                                        </div>

                                        <div className="mt-3 mb-4">
                                            <div className="mt-3 mb-4">
                                                <span>Do You Own a Two-wheeler? </span>
                                                <span className="ms-3 me-1">Yes</span>
                                                <input
                                                    type="radio"
                                                    name="ownVehicle"
                                                    id="yes"
                                                    value="Yes"
                                                    checked={ownVehicle === "Yes"}
                                                    onChange={handleRadioChange}
                                                />
                                                <span className="ms-3 me-1">No</span>
                                                <input
                                                    type="radio"
                                                    name="ownVehicle"
                                                    id="no"
                                                    value="No"
                                                    checked={ownVehicle === "No"}
                                                    onChange={handleRadioChange}
                                                />
                                                <div className="mt-2">
                                                {errors.ownVehicle && <span className="text-danger">{errors.ownVehicle}</span>}
                                            </div>
                                            </div>
                                            {/* Conditional file uploads */}
                                            {ownVehicle === "Yes" && (
                                                <div className="row mt-3">
                                                    <div className="col-lg-6 ">
                                                        <label className="cust-login-label">Driving Licence</label>
                                                        <input
                                                            type="file"
                                                            className="form-control border border-dark"
                                                            placeholder="Enter pincode"
                                                            name="license"
                                                            onChange={handlechangelic}

                                                        />
                                                        {errors.license && <span className="text-danger">{errors.license}</span>}
                                                    </div>
                                                    <div className="col-lg-6 ">
                                                        <label className="cust-login-label">RC Book</label>
                                                        <input
                                                            type="file"
                                                            className="form-control border border-dark"
                                                            placeholder="Enter pincode"
                                                            name="rc"
                                                            onChange={handlechangerc}

                                                        />    
                                                           {errors.rc && <span className="text-danger">{errors.rc}</span>}
                                                    </div>
                                                    <div className="col-lg-6 ">
                                                        <label className="cust-login-label">Vehicle Insurance</label>
                                                        <input
                                                            type="file"
                                                            className="form-control border border-dark"
                                                            placeholder="Enter pincode"
                                                            name="insurance"
                                                            onChange={handlechangein}

                                                        /> 
                                                           {errors.insurance && <span className="text-danger">{errors.insurance}</span>}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                    <div className="text-center mt-3 d-flex justify-content-evenly mb-2">

                                        <button type="submit" onClick={handleLogin} className="adminloginbtn">Sign Up</button>
                                    </div>


                                </form>
                                <p className="cust-signup-link mt-3">
                                    Already have an account?<span className="cust-login-link">
                                        <Link className="cust-login-link2" to='/agent-login'>
                                            Login </Link></span></p> </div>



                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}


export default AgentSignup