import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { register, resetPassword, ViewById } from "../Services/CommonServices";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import img from '../../Assets/orderSuccess.png'
function CustOrderSuccess() {
 
    const navigate=useNavigate()
const {id}=useParams()
const [order,setOrder]=useState({
    _id:id,
    pickupDate:'',
    totalAmount:0
})
    const fetchOrderData = async () => {
        try {
            const result = await ViewById("viewOrderById", id);
            if (result.success) {
                setOrder(result.user);
                
            } else {
                
            }
        } catch (error) {
            toast.error("An unexpected error occurred during Data View");
        }
    };
   
    useEffect(() => {
        fetchOrderData();
    }, []);
    
    const track=()=>{
        navigate(`/cust-track-order`)
    }
    return (
        <div>
            <div className="page-wrapper">
                <div className="content-wrapper">
                    <div className="cust-view-shop-main">
                        <p className="cust-choose-shop">ORDER SUCCESSFUL !</p>
                    </div>
                   
                </div>
            </div>
            <div className='order-thanks'>
                        <div className='order-success-img'>
                            <img src={img}></img>
                           
                        </div>
                       
                    </div>
                    <div>
                        <h3 className='order-success-h3'>THANK YOU FOR CHOOSING US !</h3>
                        <p className='order-success-h3'>Your Pick Up has been Confirmed</p>
                        </div>

                        <div className='order-success-sec-div'>
                            <table className='order-table'>
                                <tr>
                                    <td>Order Id</td>
                                    <td>:</td>
                                    <td> ORD{(id.slice(20,24)).toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td>Pick Up Date</td>
                                    <td>:</td>
                                    <td> {order.pickupDate.slice(0,10)}</td>
                                </tr>
                                <tr>
                                    <td>Amount</td>
                                    <td>:</td>
                                    <td>{order.totalAmount}</td>
                                </tr>
                            </table>
                        </div>
                        <center>
                        <button className="shop-signup-button mt-3 mb-3"
                        onClick={track}
                        >Track Order</button>
                    </center>
        </div>
    )
}

export default CustOrderSuccess