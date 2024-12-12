import React, { useEffect, useState } from "react";
    import { Link, useNavigate, useParams } from "react-router-dom";
    import '../../Styles/ContactUs.css'
    import { toast } from "react-toastify";
    import "../../Styles/AdminLogin.css";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import img from "../../Assets/adminlogin.png";
    import '../../Styles/ShopLogin.css'
    import '../../Styles/CustomerLoginSignup.css'

    import { login, register, resetPassword } from "../Services/CommonServices";
function CustResetPassword() {
    

        const navigate = useNavigate();
        const [data, setData] = useState('');
    const {id}=useParams()
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
        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
        const togglePasswordVisibility2 = () => {
            setShowPassword2(!showPassword2);
        };
        const validate = () => {
            const newErrors = {};
            const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    
            if (!data.password) {
    
                newErrors.password = 'Password is required';
            }
         else if (!passwordRegex.test(data.password)) {
            newErrors.password = 'Password Must Contain 1 Uppercase,1 Symbol and 1 Number with minimum 6 characters';
        }
        else if (data.password != data.cpassword) {
            newErrors.cpassword = 'Password and Confirm Password must be the same !';
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
                const result = await resetPassword(data, 'resetPasswordCustomer',id);
    
                if (result.success) {
                    console.log(result);
toast.success("Password Reset Succesful")
                navigate ('/cust-login')
    
    
                } else {
                    console.error('Error Occured:', result);
                    toast.error(result.message);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                toast.error('An unexpected error occurred during Login');
            }
           
        };
        return (
            <div className="contact-main1" >
                <div className='contact-main'>
                   
    
                    <div className="contact_us_main_container" >
                        <div className="contact_us_head">
                            <h4 className="cust-title">Reset Password?</h4>
                            <div className="contact_us_circle">
    
                            </div>
                        </div>
                        <div className="cust-lgin-input_container">
                              <div className="shop-login-div1">
                             
                <div className="row ">
                  
                   
                    <div className="col-6">
                        <div className="cust-login-div2">
                         
                            <form>
                                <p className="forgot-p"> Enter your new password to reset.</p>
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
                                </div><div className=" mt-4">
                                <label className="cust-login-label">Confirm Password</label>
                                     <div style={{ position: 'relative' }}>
                        <input type={showPassword2 ? "text" : "password"}
                            placeholder='password'
                            name="cpassword"
                            onChange={handleChange}
                               className="form-control border border-dark"
                            style={{ paddingRight: '40px' }} >

                        </input>
                        <div className="admin-login-password-toggle-icon" onClick={togglePasswordVisibility2}>
                            {showPassword2 ? <VscEyeClosed  /> : <VscEye />}
                        </div>
                          
                    </div>
                                    {errors.cpassword && (
                                        <span className="text-danger">{errors.cpassword}</span>
                                    )}
                                </div>
                             <div className="text-center mt-3 d-flex justify-content-evenly mb-2">
                                    
                                    <button type="submit" onClick={handleLogin} className="adminloginbtn">Confirm</button>
                                </div>


                            </form> 
                           
                             </div>

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
    

export default CustResetPassword