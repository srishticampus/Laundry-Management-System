import React, { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { register, resetPassword, ViewById } from "../Services/CommonServices";
import { useNavigate, useParams } from "react-router-dom";
import cardimg from '../../Assets/cardimg.png'
import { approveById, viewCount } from "../Services/AdminService";
import { IMG_BASE_URL } from "../Services/BaseURL";
import { IoLocationSharp } from "react-icons/io5";
import bluetick from '../../Assets/bluetick.png'
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import ReactStars from "react-rating-stars-component";

import '../../Styles/TrackDelivery.css'

function CustEnquiries() {

    const custId = localStorage.getItem('customer')
    const Navigate = useNavigate()
    const [services, setServices] = useState([])
    const [orders, setOrders] = useState([]);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [selectedRealIssue, setSelectedRealIssue] = useState(null);

    const [feedback, setFeedback] = useState({
        rating: "",
        comments: "",
        custId: localStorage.getItem('customer')
    });
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
    const handleRatingChange = (newRating) => {
        setFeedback((prevData) => ({
            ...prevData,
            rating: newRating
        }));
    };
    const [order, setOrder] = useState({

    });

    useEffect(() => {
        const fetchenquiries = async () => {
            try {



                const result = await ViewById("viewIssuesByCustId", localStorage.getItem('customer'));

                if (result.success) {
                    console.log(result.user);
                    setOrders(result.user || []);

                }
            } catch (error) {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred during data fetch.");
            }
        };

        fetchenquiries(); // Invoke the async function
    }, [custId]);


    const openFeedbackModal = (issue) => {
        setSelectedIssue(issue.orderId._id);
        setSelectedRealIssue(issue._id)
        setShowFeedbackModal(true);
    };

    const closeFeedbackModal = () => {
        setShowFeedbackModal(false);
        setSelectedIssue(null);
        setSelectedRealIssue(null)

        setFeedback({ rating: "", comments: "" });
    };

    const handleFeedbackSubmit = async () => {

        console.log(feedback);

        console.log(selectedIssue);
        try {
            const result = await resetPassword(feedback, 'updateOrderByIdonPickupIssue',selectedIssue);
            console.log(result);
            if (result.success) {



                toast.success('Updated successfully');


            } else {
                console.error(' error:', result);
                toast.error( 'Not Updated');
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Update Profile');
        }
        try {
            const result = await ViewById('updateIssuesByCustId',selectedRealIssue);
            console.log(result);
            if (result.success) {



             console.log("done ");
             


            } else {
                console.error(' error:', result);
                toast.error(`Not Updated`);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Update Profile');
        }

        closeFeedbackModal();
    };
    return (
        <div>
            <div className="page-wrapper">
                <div className="content-wrapper">
                    <div className="cust-view-shop-main">
                        <p className="cust-choose-shop"> MY ENQUIRIES </p>
                    </div>
                </div>
            </div>
            {orders.length > 0 ?
                (
                    <>

                        {orders.map(item => {
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

                                    <div className="col-md-3 track-col">




                                        <div className="trackdelivery-container">
                                            <h4 className="track-order-sub">ISSUES</h4>

                                            <p>We are unable to process your request due to the  reasons</p>

                                            <p><b>Type Of Issue</b> : {item.issueType}</p>
                                            <p><b>Comments</b> : {item.comments}</p>
                                            {console.log("item.orderId._id",item.orderId._id)
                                            }
                                            <button className="action_button" onClick={() => openFeedbackModal(item)}>Take Action</button>
                                        </div>



                                    </div>
                                </div>
                            )
                        })}
                    </>
                )

                : <h3>No Enquiries found</h3>
            }
            {showFeedbackModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog" style={{ maxWidth: "400px", width: "100%" }}>
                        <div className="modal-content">
                            <div className="modal-header mh1">
                                <h5 className="modal-title">Select an Option</h5>
                                <button type="button" className="btn-close" onClick={closeFeedbackModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="mb-2">Please Choose an Option:</label>
                                    <div className="btn-group w-100" role="group" aria-label="Options">
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="option"
                                            id="reschedulePickup"
                                            value="reschedule"
                                            checked={feedback.option === "reschedule"}
                                            onChange={(e) => setFeedback({ ...feedback, option: e.target.value })}
                                        />
                                        <label className="btn btn-outline-primary" htmlFor="reschedulePickup">
                                            Reschedule My Pickup
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="option"
                                            id="changeAddress"
                                            value="changeAddress"
                                            checked={feedback.option === "changeAddress"}
                                            onChange={(e) => setFeedback({ ...feedback, option: e.target.value })}
                                        />
                                        <label className="btn btn-outline-primary" htmlFor="changeAddress">
                                            Change Address
                                        </label>
                                    </div>
                                </div>

                                {feedback.option === "reschedule" && (
                                    <div className="form-group mt-3">
                                        <label>Select a New Pickup Date:</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={feedback.pickupDate}
                                            onChange={(e) => setFeedback({ ...feedback, pickupDate: e.target.value })}
                                        />
                                    </div>
                                )}

                                {feedback.option === "changeAddress" && (
                                    <div className="mt-3">
                                        <div className="form-group">

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={feedback.houseName}
                                                placeholder="Enter Housename"
                                                onChange={(e) => setFeedback({ ...feedback, houseName: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group mt-2">

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={feedback.street}
                                                placeholder="Enter Street"
                                                onChange={(e) => setFeedback({ ...feedback, street: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group mt-2">

                                            <select placeholder='District' className='form-control' value={feedback.district}
                                                onChange={(e) => setFeedback({ ...feedback, district: e.target.value })}
                                            >
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
                                        </div>
                                        <div className="form-group mt-2">

                                            <select className='form-control p-2' name='city' value={feedback.city}
                                                placeholder=""
                                                onChange={(e) => setFeedback({ ...feedback, city: e.target.value })}>


                                                <option value="">Choose the City</option>
                                                {cities[feedback.district]?.map((city, index) => (
                                                    <option value={city}>{city}</option>
                                                ))
                                                }

                                            </select>

                                        </div>
                                        <div className="form-group mt-2">
                                            
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={feedback.pincode}
                                                placeholder="Enter Pincode"
                                                onChange={(e) => setFeedback({ ...feedback, pincode: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group mt-2">
                                           
                                            <input
                                                type="text"
                                                className="form-control"
                                               placeholder="Enter Landmark"
                                                onChange={(e) => setFeedback({ ...feedback, landmark: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <center>
                                    <button type="button" className="btn btn-primary" onClick={handleFeedbackSubmit}>
                                        Submit
                                    </button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}


export default CustEnquiries