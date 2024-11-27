import React, { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { register, ViewById } from "../Services/CommonServices";
import { useNavigate, useParams } from "react-router-dom";
import cardimg from '../../Assets/cardimg.png'
import { approveById } from "../Services/AdminService";
function CustPayment() {


    const { id } = useParams();
    const Navigate = useNavigate()
    const [data, setData] = useState({
        custId:localStorage.getItem('customer')
    });
    const [card, setCard] = useState({
        cardno:'',
        name:'',
        expiry:''
    });


    const [errors, setErrors] = useState({});
    const [isCardSaved, setIsCardSaved] = useState(false); // State for checkbox


    useEffect(() => {
        const fetchCardDatabyId = async () => {
            try {
                const customerId = localStorage.getItem('customer');
                
    
                const result = await ViewById("viewAllCardsByCustomerId", customerId);
    
                if (result.success) {
                    console.log(result.user);
                    setCard(result.user || { cardno: '', name: '', expiry: '',custId:localStorage.getItem('customer') });
                    setData(result.user || { cardno: '', name: '', expiry: '',custId:localStorage.getItem('customer') });
                    setData((prevData) => ({
                        ...prevData,
                        cvv: '', 
                    }));                } else {
                    console.error("Error fetching card data:", result.message);
                    toast.error("Unable to fetch card data.");
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred during data fetch.");
            }
        };
    
        fetchCardDatabyId(); // Invoke the async function
    }, []); // Empty array ensures this runs only on mount
    

    const handleChange = (e) => {
        const { name, value } = e.target;


        setData({
            ...data,
            [name]: value,
        });
    };



    const validate = () => {
        const newErrors = {};
        const cvvRegex = /^\d{3}$/;
        const cardnoRegex = /^\d{16}$/;


        if (!data.expiry) {


            newErrors.expiry = 'Expiry Date is required';
        }
        if (!data.name) {


            newErrors.name = 'Name is required';
        }
        if (!data.cardno) {


            newErrors.cardno = 'card number is required';
        }
        if (!data.cvv) {


            newErrors.cvv = 'CVV Number is required';
        }
        else if (!cvvRegex.test(data.cvv)) {
            newErrors.cvv = 'Enter a valid CVV Number ';

        }
        else if (!cardnoRegex.test(data.cardno)) {
            newErrors.cardno = 'Enter a valid Card Number ';

        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (e) => {
        e.preventDefault()
        console.log(errors);

        console.log("api called",isCardSaved);

        if (!validate()) {
            toast.error('Please fix the errors in the form.');
            return;
        } 
   console.log("after err");
   let flag=0
   
        if (card.cardno==data.cardno) {
            if(card.cvv!=data.cvv){
                flag=1
            toast.error('Please Check your CVV Number !');
            return;
            }
        }
        console.log("after cvv");
      if(flag==0)
        { if(isCardSaved){
        try {
            console.log(data);
          
            data.custId=localStorage.getItem('customer')
            const result = await register(data, 'addCard');

            if (result.success) {
                console.log(result);
                           

            } else {
                console.log(result);
                
                console.error('Error Occured:', result);
                toast.error(result.message);
            }

        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Registration');
        }
    }
    console.log("after if");
    try {
        const result = await approveById('addPayment',id);

        if (result.success) {
            console.log(result);
            toast.success('Payment Done!');
            Navigate(`/cust-order-success/${id}`)


        } else {
            console.error('Error Occured:', result);
            toast.error(result.message);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred during Registration');
    }
    };
}
    const checkboxchange = (e) => {
        setIsCardSaved(e.target.checked);

    }



    return (
        <div>
            <div className="page-wrapper">
                <div className="content-wrapper">
                    <div className="cust-view-shop-main">
                        <p className="cust-choose-shop">PLACE A NEW ORDER</p>
                    </div>

                    {/* Circle Progress */}
                    <div className="circle-container">
                        <div className="colored-circle">
                            <p className="circle-text">1</p>
                        </div>
                        <div className="circle-line"></div>
                        <div className="colored-circle">
                            <p className="circle-text">2</p>
                        </div>
                        <div className="circle-line"></div>
                        <div className="colored-circle">
                            <p className="circle-text">3</p>
                        </div>
                        <div className="circle-line"></div>
                        <div className="colored-circle">
                            <p className="circle-text">4</p>
                        </div>
                    </div>

                    <div className="order-service-container mt-5">
                        <p className="order-service-title">PAYMENT DETAILS</p>
                        <hr className="cust-order-hr" />

                        {/* Static Row */}
                        <div className="row order-input-container2">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col">
                                        <label className="cust-login-label mb-3">
                                            Credit Card Number
                                        </label>
                                    </div>
                                    <div className="col align-right">
                                        <img src={cardimg} ></img>
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    className="form-control order-align-text p-2"
                                    onChange={handleChange}
                                    name='cardno'
                                    value={data?.cardno}


                                />
                                {errors.cardno && <div id="nameError" className="invalid-feedback">{errors.cardno}</div>}

                            </div>
                            <div className="col-md-6">
                                <label className="cust-login-label mb-3">
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    className="form-control order-align-text p-2"
                                    onChange={handleChange}
                                    name='expiry'
                                    min={new Date().toISOString().split('T')[0]}
                                    value={data?.expiry?data.expiry.slice(0,10):''}


                                />
                                {errors.expiry && <div id="nameError" className="invalid-feedback">{errors.expiry}</div>}

                            </div>
                        </div>
                        <div className="row order-input-container2">
                            <div className="col-md-6">
                                <label className="cust-login-label mb-3">
                                    CVV Number
                                </label>
                                <input
                                    type="number"
                                    className="form-control order-align-text p-2"
                                    onChange={handleChange}
                                    name='cvv'


                                />

                                {errors.cvv && <div id="nameError" className="invalid-feedback">{errors.cvv}</div>}

                            </div>

                            <div className="col-lg-6">
                                <label className="cust-login-label mb-3">
                                    Name on Credit Card
                                </label>
                                <input
                                    type="text"
                                    className="form-control order-align-text p-2"
                                    onChange={handleChange}
                                    name='name'
                                    value={data?.name}

                                />
                                {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}

                            </div>
                            <div className="d-flex align-items-center">
    <input
        type="checkbox"
        className="form-check-input ms-3 mt-2 p-2"
        id="saveCard"
        onChange={checkboxchange}
        name="saveCard"
    />
    <span className="ms-2 mt-2">Save payment information to my  account for future bookings</span>
</div>

                        </div>

                       
                     
                    </div>





                    <center>
                        <button className="shop-signup-button mt-3"
                        onClick={handleSave}
                        >Next</button>
                    </center>
                </div>
            </div>
        </div>
    );
}




export default CustPayment