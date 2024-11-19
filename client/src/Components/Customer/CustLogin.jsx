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

    import { login, register } from "../Services/CommonServices";
function CustLogin() {
    

        const navigate = useNavigate();
        const [data, setData] = useState('');
    
        const [showPassword, setShowPassword] = useState(false)
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
                
    
                newErrors.email = 'Email is required';
            }
            else  if (!emailRegex.test(data.email)) {
                newErrors.email = 'Enter a valid E-mail Id';
    
            }
            if (!data.password) {
    
                newErrors.password = 'Password is required';
            }
    
          
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };
    
        const handleLogin = async (e) => {
            e.preventDefault()
            console.log(errors);
    
            console.log("api called", validate());
    
            if (!validate()) {
                toast.error('Please fix the errors in the form.');
                return;
            }
            try {
                const result = await login(data, 'custLogin');
    
                if (result.success) {
                    console.log(result);
                    localStorage.setItem("customer", result.user._id);

                navigate ('/cust-home')
    
    
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
            <div className="contact-main1" >
                <div className='contact-main'>
                   
    
                    <div className="contact_us_main_container" >
                        <div className="contact_us_head">
                            <h4 className="cust-title">Login</h4>
                            <div className="contact_us_circle">
    
                            </div>
                        </div>
                        <div className="cust-lgin-input_container">
                              <div className="shop-login-div1">
                             
                <div className="row ">
                  
                   
                    <div className="col-6">
                        <div className="cust-login-div2">
                         
                            <form>
                                <div className="">
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
                                <div className=" mt-4">
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
                            {showPassword ? <VscEyeClosed  /> : <VscEye />}
                        </div>
                          
                    </div>
                                    {errors.password && (
                                        <span className="text-danger">{errors.password}</span>
                                    )}
                                </div>
<p className="cust-login-forgot">Forgot password</p>
                                <div className="text-center mt-3 d-flex justify-content-evenly mb-2">
                                    
                                    <button type="submit" onClick={handleLogin} className="adminloginbtn">Login</button>
                                </div>


                            </form> 
                            <p className="cust-signup-link mt-3">
                            Don’t have an account?<span className="cust-login-link"><Link className="cust-login-link2" to='/cust-signup'> Sign Up</Link></span></p> </div>

                    </div>

                </div>


            
                               
                               </div>
                            <div className="contact_us_circle2">
    
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        )
    }
    

export default CustLogin