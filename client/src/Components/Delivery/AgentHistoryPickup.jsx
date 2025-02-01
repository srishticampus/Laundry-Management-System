import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import { approveById, viewCount } from "../Services/AdminService";
import { toast } from "react-toastify";
import "../../Styles/ViewAllshops.css";
import { useNavigate } from "react-router-dom";
import { IMG_BASE_URL } from "../Services/BaseURL";
import tick from "../../Assets/tick.png";
import "../../Styles/Agent.css";
import { resetPassword, ViewById } from "../Services/CommonServices";
function AgentHistoryPickup() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // Fetch Data
  const fetchData = async () => {
    try {
      const result = await ViewById(
        "viewAllCompletedOrdersByAGIdPickUp",
        localStorage.getItem("agent")
      );
      console.log(result);

      if (result.success) {
        setData(result.user.length > 0 ? result.user : []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("An unexpected error occurred during Data View");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Approve Request
  const approve = async (id) => {
    try {
      const result = await resetPassword(
        { agentId: localStorage.getItem("agent") },
        "approveOrderByAgent",
        id
      );
      if (result.success) {
        toast.success("Request approved successfully");
        fetchData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during approval");
    }
  };

  // Reject Request
  const reject = async (id) => {
    try {
      const result = await approveById("deleteAgentById", id);
      if (result.success) {
        toast.success("Request rejected successfully");
        fetchData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during rejection");
    }
  };

  return (
    <div className="Agent-order">
      <div className="cust-view-shop-main">
        <p className="cust-choose-shop">ORDER HISTORY</p>
      </div>
      {data.length > 0 ? (
        <table className="table table-hover shop-tab2 p-5 mt-3">
          <thead className="ms-5 aks shop-tab2">
            <tr>
              <th className="ps-3">Sl No</th>
              <th>Order Id</th>
              <th>Order date</th>
              <th>Pickup Date</th>
              <th>Service Provider</th>
              <th>Location</th>
              <th>District</th>
              <th>Pickup Location</th>
              <th>Pickup City</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id} className="shop-tab2">
                <td>{index + 1}</td>
                <td>ORD{item?._id?.slice(20, 24).toUpperCase()}</td>
                <td>{item?.createdAt?.slice(0, 10)}</td>
                <td>{item?.pickupDate?.slice(0, 10)}</td>
                <td>{item?.shopId?.name}</td>
                <td>{item?.shopId?.location}</td>
                <td>{item?.shopId?.district}</td>
                <td>{item?.district}</td>
                <td>{item?.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <center>
          <h3 className="mt-5">No New Requests Found !!</h3>
        </center>
      )}
    </div>
  );
}

export default AgentHistoryPickup;
