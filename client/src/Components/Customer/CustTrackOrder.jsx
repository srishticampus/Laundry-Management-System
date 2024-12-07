import React, { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { register, ViewById } from "../Services/CommonServices";
import { useNavigate, useParams } from "react-router-dom";
import cardimg from '../../Assets/cardimg.png'
import { approveById, viewCount } from "../Services/AdminService";
import { IMG_BASE_URL } from "../Services/BaseURL";
import { IoLocationSharp } from "react-icons/io5";
import bluetick from '../../Assets/bluetick.png'

function CustTrackOrder() {
    const custId = localStorage.getItem('customer')
    const Navigate = useNavigate()
const [services,setServices]=useState([])
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState({

    });
    useEffect(() => {
        const fetchorders = async () => {
            try {



                const result = await ViewById("viewAllOrderByCustId", custId);

                if (result.success) {
                    console.log(result.user);
                    setOrders(result.user || []);

                }
            } catch (error) {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred during data fetch.");
            }
        };

        fetchorders(); // Invoke the async function
    }, [custId]);
    useEffect(() => {
        const fetchServices = async () => {
            try {



                const result = await ViewById("viewServiceOrdersBycustId", custId);

                if (result.success) {
                    console.log(result.user);
                    setServices(result.user || []);

                }
            } catch (error) {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred during data fetch.");
            }
        };

        fetchServices(); // Invoke the async function
    }, [custId]);
    return (
        <div>
            <div className="page-wrapper">
                <div className="content-wrapper">
                    <div className="cust-view-shop-main">
                        <p className="cust-choose-shop">TRACK MY ORDER</p>
                    </div>
                </div>
            </div>
            {orders.length > 0 ?
                orders.map(item => {
                    return (

                        <div className="row track-row">
                            <div className="col-md-3 track-col">
                                <img src={`${IMG_BASE_URL}/${item.shopId.image.filename}`} className='ms-2 shop-image2'></img>
                                <div className="cust-shop-content"><h5>{item.shopId.name}</h5>
                               

                                <p> {item.shopId.contact}</p>
                                <p> {item.shopId.email}</p>
                                <p><IoLocationSharp /><b>{item.shopId.location}</b></p>
                                </div>
                            </div>
                            <div className="col-md-4 track-col">
    <h4 className="track-order-sub">ORDER DETAILS</h4>
    <p className="track-order-sub-p"> Order Id : ORD{item._id.slice(20, 24).toUpperCase()}</p>
    <table className="order-table2">
        
    {services.length > 0 ? (
    services
        .filter((service) => service.orderId._id === item._id) // Match the current order ID
        .map((service) => (
            <React.Fragment key={service._id}>
                {console.log("Order:", service.orderId)}
               
                {service.materials.length > 0 ? (
                    service.materials.map((material, index) => (
                        <tr key={index} style={{ padding: "4px" }}>
                            <td style={{ padding: "4px" }} >{service.serviceId.name || "N/A"}</td> 
                            <td>-</td>
                            <td className="order-table2-td">{material.material || "N/A"}</td>
                            <td>-</td>
                            <td className="order-table2-td">{material.count || "0"}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No materials found</td>
                    </tr>
                )}
               
                
            </React.Fragment>
        ))
) : (
    <tr>
        <td colSpan="3">No services found for this order</td>
    </tr>
)}

    </table>
    <p className="track-order-sub-p">Total amount: ₹ {item.totalAmount} /-</p>
</div>

                            <div className="col-md-3 track-col"></div>
                        </div>
                    )
                })
                : <p>No orders found</p>
            }

        </div>
    )
}

export default CustTrackOrder