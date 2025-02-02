import React, { useEffect, useState } from "react";
import { FaLessThan, FaGreaterThan, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { register, ViewById } from "../Services/CommonServices";
import { useNavigate, useParams } from "react-router-dom";
import cardimg from "../../Assets/cardimg.png";
import { approveById, viewCount } from "../Services/AdminService";
import { IMG_BASE_URL } from "../Services/BaseURL";
import { IoLocationSharp } from "react-icons/io5";
import bluetick from "../../Assets/bluetick.png";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import ReactStars from "react-rating-stars-component";

import "../../Styles/TrackDelivery.css";
function CustTrackOrder() {
  const custId = localStorage.getItem("customer");
  const Navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [order, setOrder] = useState({});
  const [feedback, setFeedback] = useState({
    rating: "",
    comments: "",
    custId: localStorage.getItem("customer"),
  });
  const handleRatingChange = (newRating) => {
    setFeedback((prevData) => ({
      ...prevData,
      rating: newRating,
    }));
  };
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

  const openFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  const closeFeedbackModal = () => {
    setShowFeedbackModal(false);

    setFeedback({ rating: "", comments: "" });
  };

  const handleFeedbackSubmit = async () => {
    console.log(feedback);

    try {
      const result = await register(feedback, "registerFeedback");
      console.log(result);
      if (result.success) {
        toast.success("Rating Added updated successfully");
      } else {
        console.error(" error:", result);
        toast.error(`Rating Not Added`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Update Profile");
    }

    closeFeedbackModal();
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content-wrapper">
          <div className="cust-view-shop-main">
            <p className="cust-choose-shop"> MY ORDERS </p>
          </div>
        </div>
      </div>
      {orders.length > 0 ? (
        <>
          <button
            onClick={() => openFeedbackModal()}
            className="align-feed  mt-5 mb-3"
          >
            Add Feedback
          </button>
          {orders.map((item) => {
            return (
              <div className="row track-row">
                <div className="col-md-3 track-col">
                  <img
                    src={`${IMG_BASE_URL}/${item.shopId.image.filename}`}
                    className="ms-2 shop-image2"
                  ></img>
                  <div className="cust-shop-content">
                    <h5>{item.shopId.name}</h5>

                    <p> {item.shopId.contact}</p>
                    <p> {item.shopId.email}</p>
                    <p>
                      <IoLocationSharp />
                      <b>{item.shopId.location}</b>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 track-col">
                  <h4 className="track-order-sub">ORDER DETAILS</h4>
                  <p className="track-order-sub-p">
                    {" "}
                    Order Id : ORD{item._id.slice(20, 24).toUpperCase()}
                  </p>
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
                                  <td style={{ padding: "4px" }}>
                                    {service.serviceId.name || "N/A"}
                                  </td>
                                  <td>-</td>
                                  <td className="order-table2-td">
                                    {material.material || "N/A"}
                                  </td>
                                  <td>-</td>
                                  <td className="order-table2-td">
                                    {material.count || "0"}
                                  </td>
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
                  <p className="track-order-sub-p">
                    Total amount: ₹ {item.totalAmount} /-
                  </p>
                </div>

                <div className="col-md-3 track-col">
                  {/*  */}

                  <div className="trackdelivery-container">
                    <div className="status-item">
                      <FaCheckCircle className="blue-tick" />
                      <div className="status-text">
                        <span className="trackdelivery-main_text">
                          Ordered {item.updatedAt.slice(0, 10)}
                        </span>
                        {item.paymentStatus && (
                          <p className="trackdelivery-sub-text">
                            Order Confirmed
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="status-line"></div>

                    <div className="status-item">
                      {item.serviceStatus == "Pending" ||
                      item.serviceStatus == "Requested Pickup" ? (
                        <div className="grey-circle-track"></div>
                      ) : (
                        <FaCheckCircle className="blue-tick" />
                      )}
                      <div className="status-text">
                        {console.log("o", item.agentStatus)}

                        <span className="trackdelivery-main_text">
                          Pick Up {item?.pickupDate?.slice(0, 10)}
                        </span>

                        {item.agentStatus && (
                          <div className="trackdelivery-agent-container">
                            <img
                              className="trackdelivery-sub-img"
                              src={`${IMG_BASE_URL}/${item.agentId.image.filename}`}
                              alt={item.agentId.name}
                            />
                            <span className="trackdelivery-sub-text">
                              {item.agentId.name}
                            </span>{" "}
                            .
                            <span className="trackdelivery-sub-text">
                              {item.agentId.contact}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="status-line"></div>
                    <div className="status-item">
                      {item.serviceStatus === "Pickup Completed" ||
                      item.serviceStatus === "Pending" ||
                      item.serviceStatus === "Request Pickup" ||
                      item.serviceStatus == "Requested Pickup" ? (
                        <div className="grey-circle-track"></div>
                      ) : (
                        <FaCheckCircle className="blue-tick" />
                      )}
                      <div className="status-text">
                        <span className="trackdelivery-main_text">Process</span>
                        <p className="trackdelivery-sub-text">
                          {item.serviceStatus}
                          
                        </p>
                      </div>
                    </div>
                    <div className="status-line"></div>
                    <div className="status-item">
                      {item.serviceStatus === "Pickup Completed" ||
                      item.serviceStatus === "Pending" ||
                      item.serviceStatus === "Request Pickup" ||
                      item.serviceStatus == "Process Completed" ||
                      item.serviceStatus == "Requested Pickup" ||
                      item.serviceStatus == "Request Drop" ||
                      item.serviceStatus == "Drop accepted" ? (
                        <div className="grey-circle-track"></div>
                      ) : (
                        <FaCheckCircle className="blue-tick" />
                      )}
                      <div className="status-text">
                        <span className="trackdelivery-main_text">
                          Delivery {item?.deliveryDate?.slice(0, 10)}
                        </span>
                        {item.dropStatus && (
                          <div className="trackdelivery-agent-container">
                            <img
                              className="trackdelivery-sub-img"
                              src={`${IMG_BASE_URL}/${item.dropAgentId.image.filename}`}
                              alt={item.dropAgentId.name}
                            />
                            <span className="trackdelivery-sub-text">
                              {item.dropAgentId.name}
                            </span>{" "}
                            .
                            <span className="trackdelivery-sub-text">
                              {item.dropAgentId.contact}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/*  */}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <h3>No orders found</h3>
      )}
      {showFeedbackModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div
            className="modal-dialog"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <div className="modal-content">
              <div className="modal-header mh1">
                <h5 className="modal-title">Rate Now</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeFeedbackModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Rate Us </label>
                  <div className="d-flex justify-content-center">
                    <ReactStars
                      count={5}
                      size={60}
                      value={feedback.rating}
                      onChange={handleRatingChange}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
                <div className="">
                  <label className="mb-2">Enter your valuable comments</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={feedback.comments}
                    onChange={(e) =>
                      setFeedback({ ...feedback, comments: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <center>
                  {" "}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleFeedbackSubmit}
                  >
                    Submit
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustTrackOrder;
