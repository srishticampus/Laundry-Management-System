import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { register, resetPassword, ViewById } from "../Services/CommonServices";
import { useNavigate, useParams } from "react-router-dom";import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CustPickUpDate() {
    const {id}=useParams()
    const [date, setDate] = useState(new Date());

   
    const Navigate=useNavigate()
    const [errors, setErrors] = useState({});
    const disablePastDates = ({ date }) => {
        return date < new Date();
    };

   
    
    const handleSave = async (e) => {
        e.preventDefault()
      
console.log(date);
const formattedDate = date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD

      
        try {
            const result = await resetPassword({date:formattedDate}, 'addPickUpDateOrderById',id);

            if (result.success) {
                console.log(result);
           

            Navigate (`/cust-payment/${id}`)


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
                        <div className="colored-circle-line"></div>
                        <div className="colored-circle">
                            <p className="circle-text">3</p>
                        </div>
                        <div className="circle-line"></div>
                        <div className="uncolored-circle">
                            <p className="circle-text">4</p>
                        </div>
                    </div>


                    <div className="order-service-container mt-5">
                        <p className="order-service-title">PICK UP DATE</p>
                        <hr className="cust-order-hr" />
                        <Calendar onChange={setDate}
                         value={date}
                         tileDisabled={disablePastDates}
                         />


                    </div>
                    <center>
                        <button className="shop-signup-button mt-3" onClick={handleSave}>Next</button>
                    </center>
                </div>
            </div>
        </div>
    )
}

export default CustPickUpDate