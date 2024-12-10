import React, { useEffect, useState } from 'react'
import del from '../../../Assets/delete.png'
import eye from '../../../Assets/eye.png'
import inactive from '../../../Assets/inactive.png'
import active from '../../../Assets/active.png'
import { approveById, viewCount } from '../../Services/AdminService'
import { toast } from "react-toastify";
import '../../../Styles/ViewAllshops.css'
import { useNavigate, useParams } from 'react-router-dom'
import { register, resetPassword, ViewById } from '../../Services/CommonServices'
import '../../../Styles/ShopViewOrder.css'
function ShopOrderViewMorecomp() {
    const {id} = useParams()
    const Navigate = useNavigate()
    const [services, setServices] = useState([])
    const [order,setOrder ] = useState({
        custId:{
            name:''
        },
        agentId:{
            name:'',
            contact:''
        },
        _id:''
    });
   
    useEffect(() => {
        const fetchservices = async () => {
            try {



                const result = await ViewById("viewServiceOrdersByOrderId",id);

                if (result.success) {
                    console.log(result.user);
                    setServices(result.user ||[]);

                }
            } catch (error) {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred during data fetch.");
            }
        };

        fetchservices(); // Invoke the async function
    }, [id]);
    useEffect(() => {
        const fetchorders = async () => {
            try {



                const result = await ViewById("viewOrderById",id);

                if (result.success) {
                    console.log(result.user);
                    setOrder(result.user ||null);

                }
            } catch (error) {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred during data fetch.");
            }
        };

        fetchorders(); // Invoke the async function
    }, [id]);
    return (
    <div className='container'>

        <div className='row'>
            <div className='col-md-5  mt-3'>
                <h3 className='view-more-h3'>Customer Details</h3>
<table className='details-tab'>
    <tr>
        <td>Name</td>
        <td> : </td>
        <td>{order.custId.name}</td>
    </tr>
    <tr>
        <td>E-Mail</td>
        <td> : </td>
        <td>{order.custId.email}</td>
    </tr>
    <tr>
        <td>Phone Number</td>
        <td> : </td>
        <td>{order.custId.contact}</td>
    </tr>
    <tr>
        <td>City</td>
        <td> : </td>
        <td>{order.city}</td>
    </tr>

    <tr>
        <td>Location</td>
        <td> : </td>
        <td>{order.district}</td>
    </tr>
</table>

            </div>

            <div className='col-md-5 mt-3'>
            <h3 className='view-more-h3'>Order Details</h3>
            <p className='view-more-p'>Order ID : {order._id.slice(18,24)}</p>
{services.map(item=>{
    return(
        <>
        <table className='details-tab'>
        
        {item.materials.length > 0 ? (
    item.materials.map((material, index) => (
        <tr key={index}>
            <td>{item.serviceId.name}</td>
            <td>-</td>
            <td>{material.material || "N/A"} - {material.count || "0"}</td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan="3">No materials found</td>
    </tr>
)}



   
</table>
        </>
    )
})}
            </div>
</div>
<div className='row  mt-3'>
            <div className='col-md-5'>
            <h3 className='view-more-h3'>Payment Details</h3>
            <table className='details-tab'>
    <tr>
        <td>Amount Paid</td>
        <td> : </td>
        <td>{order.totalAmount}</td>
    </tr>
    <tr>
        <td>Payment Status</td>
        <td> : </td>
        <td>{order.paymentStatus? 'Paid': 'Pending'}</td>
    </tr>
    <tr>
        <td>Transaction ID</td>
        <td> : </td>
        <td>{order.paymentStatus?order._id.slice(16,24).toUpperCase():'N/A'}</td>
    </tr>
   
</table>
            </div>

            <div className='col-md-5'>
            <h3 className='view-more-h3'>Pickup Details</h3>
            <table className='details-tab'>
    <tr>
        <td>Pickup Agent</td>
        <td> : </td>
        <td>{order.agentStatus?order.agentId.name:'N/A'}</td>
    </tr>
    <tr>
        <td>Contact Numer</td>
        <td> : </td>
        <td>{order.agentStatus?order.agentId.contact:'N/A'}</td>
    </tr>
    <tr>
        <td>Pickup Status</td>
        <td> : </td>
        <td>{order.serviceStatus=='Pickup Requested'?'On Going':(order.serviceStatus=='Pickup Completed'?'PickUp Completed':'Waiting For Pick Up')}</td>
    </tr>
   
</table>
            </div>

            <div className='col-md-5  mt-3'>
            <h3 className='view-more-h3'>Delivery Details</h3>
            <table className='details-tab'>
    <tr>
        <td>Delivery Agent</td>
        <td> : </td>
        <td>{order.dropStatus?order.dropAgentId.name:'N/A'}</td>
    </tr>
    <tr>
        <td>Contact Numer</td>
        <td> : </td>
        <td>{order.dropStatus?order.dropAgentId.contact:'N/A'}</td>
    </tr>
    <tr>
        <td>Delivery Status</td>
        <td> : </td>
        <td>{order.serviceStatus=='Drop Requested'?'On Going':(order.serviceStatus=='Drop Completed'?'Drop Completed':'N/A')}</td>
    </tr>
   
</table>
            </div>
        </div>
    </div>
  )
}

export default ShopOrderViewMorecomp