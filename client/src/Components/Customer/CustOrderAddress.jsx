import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { register, resetPassword, ViewById } from "../Services/CommonServices";
import { useNavigate, useParams } from "react-router-dom";

function CustOrderAddress() {

    const {id} = useParams()
    const [data, setData] = useState({
        orderId:id,
        custId:localStorage.getItem('customer')
    })
    const [amount,setAmount]=useState(0)

    const Navigate=useNavigate()
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;


        setData({
            ...data,
            [name]: value,
        });
    };
    const fetchOrderData = async () => {
        try {
            const result = await ViewById("viewOrderById", id);
            if (result.success) {
                setAmount(result.user.totalAmount);
                
            } else {
                
            }
        } catch (error) {
            toast.error("An unexpected error occurred during Data View");
        }
    };
   
    useEffect(() => {
        fetchOrderData();
    }, []);
    const cities = {
        Thiruvananthapuram: [
            "Thiruvananthapuram",
            "Neyyattinkara",
            "Attingal",
            "Kazhakoottam",
            "Varkala"
        ],
        Kollam: [
            "Kollam",
            "Paravur",
            "Punalur",
            "Chathannoor",
            "Sasthamkotta"
        ],
        Pathanamthitta: [
            "Pathanamthitta",
            "Adoor",
            "Thiruvalla",
            "Pandalam",
            "Ranni"
        ],
        Alappuzha: [
            "Alappuzha",
            "Cherthala",
            "Haripad",
            "Kayamkulam",
            "Mavelikkara"
        ],
        Kottayam: [
            "Kottayam",
            "Changanassery",
            "Pala",
            "Ettumanoor",
            "Kumarakom"
        ],
        Idukki: [
            "Thodupuzha",
            "Munnar",
            "Kattappana",
            "Adimali",
            "Kumily"
        ],
        Ernakulam: [
            "Kochi",
            "Aluva",
            "Perumbavoor",
            "Muvattupuzha",
            "North Paravur"
        ],
        Thrissur: [
            "Thrissur",
            "Chalakudy",
            "Kodungallur",
            "Guruvayoor",
            "Irinjalakuda"
        ],
        Palakkad: [
            "Palakkad",
            "Chittur",
            "Ottapalam",
            "Mannarkkad",
            "Shoranur"
        ],
        Malappuram: [
            "Malappuram",
            "Manjeri",
            "Perinthalmanna",
            "Nilambur",
            "Tirur"
        ],
        Kozhikode: [
            "Kozhikode",
            "Vadakara",
            "Koyilandy",
            "Feroke",
            "Beypore"
        ],
        Wayanad: [
            "Kalpetta",
            "Mananthavady",
            "Sulthan Bathery",
            "Meenangadi",
            "Vythiri"
        ],
        Kannur: [
            "Kannur",
            "Thalassery",
            "Payyannur",
            "Taliparamba",
            "Mattanur"
        ],
        Kasaragod: [
            "Kasaragod",
            "Kanhangad",
            "Nileshwar",
            "Manjeshwar",
            "Uppala"
        ]
    };
    const validate = () => {
        const newErrors = {};
        const pincodeRegex = /^\d{6}$/;
       
        if (!data.houseName) {
            

            newErrors.houseName = 'Name is required';
        }
        if (!data.city) {
            

            newErrors.city = 'City is required';
        }
        if (!data.street) {
            

            newErrors.street = 'Street is required';
        } 
        if (!data.pincode) {
            

            newErrors.pincode = 'Pincode is required';
        }
        else  if (!pincodeRegex.test(data.pincode)) {
            newErrors.pincode = 'Enter a valid Pincode ';

        }if (!data.district) {
            

            newErrors.district = 'District is required';
        }
        if (!data.landmark) {
            

            newErrors.landmark = 'Landmark is required';
        }
   

      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSave = async (e) => {
        e.preventDefault()
        console.log(errors);

        console.log("api called", validate());

        if (!validate()) {
            toast.error('Please fix the errors in the form.');
            return;
        }
        try {
            const result = await resetPassword(data, 'addAddressOrderById',data.orderId);

            if (result.success) {
                console.log(result);
                // localStorage.setItem("shop", result.user._id);

            Navigate (`/cust-pickup-date/${id}`)


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
        <div>
            <div className="page-wrapper">
                <div className="content-wrapper">
                    <div className="cust-view-shop-main">
                        <p className="cust-choose-shop">PLACE A NEW ORDER</p>
                    </div>

                    <div className="circle-container">
                        <div className="colored-circle">
                            <p className="circle-text">1</p>
                        </div>
                        <div className="colored-circle-line"></div>
                        <div className="colored-circle">
                            <p className="circle-text">2</p>
                        </div>
                        <div className="circle-line"></div>
                        <div className="uncolored-circle">
                            <p className="circle-text">3</p>
                        </div>
                        <div className="circle-line"></div>
                        <div className="uncolored-circle">
                            <p className="circle-text">4</p>
                        </div>
                    </div>


                    <div className="order-service-container mt-5">
                        <p className="order-service-title">ADDRESS DETAILS</p>
                        <p className="cust-order-amount">Payable Amount : {amount}</p>
                        <hr className="cust-order-hr" />

                        {/* Static Row */}
                        <div className="row order-input-container2">
                            <div className="col-md-6">
                                <label className="cust-login-label mb-3">
                                    House Name / House Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control order-align-text p-2"
                                    onChange={handleChange}
                                    name='houseName'


                                />
                                {errors.houseName && <div id="nameError" className="invalid-feedback">{errors.houseName}</div>}

                            </div>
                            <div className="col-md-6">
                                <label className="cust-login-label mb-3">
                                 Street
                                </label>
                                <input
                                    type="text"
                                    className="form-control order-align-text p-2"
                                    onChange={handleChange}
                                    name='street'



                                />
                                {errors.street && <div id="nameError" className="invalid-feedback">{errors.street}</div>}

                            </div>
                            </div>
                        <div className="row order-input-container2">
                            <div className="col-md-6">
                                <label className="cust-login-label mb-3">
                                    District
                                </label>
                                <select placeholder='District' className='form-control' name='district' onChange={handleChange} value={data.district}>
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

                                {errors.district && <div id="nameError" className="invalid-feedback">{errors.district}</div>}

                            </div>

                            <div className="col-lg-6">
                                <label className="cust-login-label mb-3">
                                    City
                                </label>
                                <select className='form-control p-2' name='city' onChange={handleChange} value={data.city}>


                                    <option value="">Choose the City</option>
                                    {cities[data.district]?.map((city, index) => (
                                        <option value={city}>{city}</option>
                                    ))
                                    }
                                </select>
                                {errors.city && <div id="nameError" className="invalid-feedback">{errors.city}</div>}

                            </div>


                        </div>
                        <div className="row order-input-container2">
                            <div className="col-md-6">
                                <label className="cust-login-label mb-3">
                                    Landmark
                                </label>
                                <input
                                    type="text"
                                    className="form-control"

                                    name='landmark'
                                    onChange={handleChange}

                                />
                                {errors.landmark && <div id="nameError" className="invalid-feedback">{errors.landmark}</div>}

                            </div>
                            <div className="col-md-6">
                                <label className="cust-login-label mb-3">
                                 Pincode
                                </label>
                                <input
                                    type="text"
                                    className="form-control  p-2"
onChange={handleChange}
                                    name='pincode'


                                />
                                {errors.pincode && <div id="nameError" className="invalid-feedback">{errors.pincode}</div>}

                            </div>
                            </div>

                        <hr className="cust-order-hr mt-5" />
                        <center>
                        <button className="shop-signup-button mt-3" onClick={handleSave}>Next</button>
                    </center>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CustOrderAddress