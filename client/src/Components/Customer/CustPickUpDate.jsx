import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { register, resetPassword, ViewById } from "../Services/CommonServices";
import { useNavigate, useParams } from "react-router-dom";import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CustPickUpDate() {
    const {id}=useParams()
    const [date, setDate] = useState(new Date().setHours(0, 0, 0, 0));  // Set the time to midnight

   
    const Navigate=useNavigate()
    const [errors, setErrors] = useState({});
    const disablePastDates = ({ date }) => {
        return date < new Date();
    };
    const handleDateChange = (selectedDate) => {
        console.log("Raw Selected Date:", selectedDate); // Direct from Calendar
        const formattedDate = formatDate(selectedDate);
        console.log("Stored Date (Local):", formattedDate); // Local Time
        setDate(selectedDate); // Store it
    };
    
    
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // YYYY-MM-DD format
    };
        
    
    
    
    
    const handleSave = async (e) => {
        e.preventDefault()
      
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD format
        console.log(formattedDate);
      
        try {
            console.log("date",formattedDate);
            
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
                        <Calendar onChange={handleDateChange}
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