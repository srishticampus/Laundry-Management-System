import React, { useEffect, useState } from "react";
import del from "../../../Assets/delete.png";
import eye from "../../../Assets/eye.png";
import inactive from "../../../Assets/inactive.png";
import active from "../../../Assets/active.png";
import { approveById, viewCount } from "../../Services/AdminService";
import { toast } from "react-toastify";
import "../../../Styles/ViewAllshops.css";
import { useNavigate } from "react-router-dom";
import {
  register,
  resetPassword,
  ViewById,
} from "../../Services/CommonServices";
import "../../../Styles/ShopDashboard.css";
function ShopViewOrders({title = "View Orders"}) {
  const [data, setdata] = useState([]);

  const Navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await ViewById(
        "viewAllOrderByShopId",
        localStorage.getItem("shop")
      );

      if (result.success) {
        console.log(result);
        if (result.user.length > 0) setdata(result.user);
        else setdata([]);
      } else {
        console.error("Data error:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Data View");
    }
  };

  useEffect(() => {
    fetchData(); // Call the async function
  }, []);
  const viewShop = (id) => {
    Navigate(`/shop-view-single-order/${id}`);
  };

  const [statuses, setStatuses] = useState({});

  const handleStatusChange = async (e, id) => {
    const newStatus = e.target.value;
    setStatuses((prev) => ({ ...prev, [id]: newStatus }));
  };
  const UpdateService = async (id) => {
    try {
      console.log("stats", statuses.id, "id", id);

      const result = await resetPassword(
        { serviceStatus: "Requested Pickup" },
        "UpdateServiceStatus",
        id
      );

      if (result.success) {
        console.log(result);
        fetchData();
      } else {
        console.error("Error Occured:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Registration");
    }
  };
  const UpdateServiceforDrop = async (id) => {
    try {
      console.log("stats", statuses.id, "id", id);

      const result = await resetPassword(
        { serviceStatus: "Requested Drop" },
        "UpdateServiceStatus",
        id
      );

      if (result.success) {
        console.log(result);
        fetchData();
      } else {
        console.error("Error Occured:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Registration");
    }
  };

  const UpdateServiceforCompletion = async (id) => {
    try {
      console.log("stats", statuses.id, "id", id);

      const result = await resetPassword(
        { serviceStatus: "Process Completed" },
        "UpdateServiceStatus",
        id
      );

      if (result.success) {
        console.log(result);
        fetchData();
      } else {
        console.error("Error Occured:", result);
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred during Registration");
    }
  };

  console.log('data', data)
  return (
    <div className="container mt-5 ">
      <h2 className="shop-add-service-mainText"> {title} </h2>

      {data.length > 0 ? (
        <>
          <table className="table  table-hover shop-tab2 p-5 mt-3">
            <thead className="ms-5 aks shop-tab2">
              <tr>
                <th className=" ps-3">Sl No</th>
                <th className="">Order no</th>
                <th className="">Customer Name</th>
                <th className="">Pickup City</th>
                <th className="">Amount</th>
                <th className="">Choose</th>
                <th className="">Service Status</th>
                <th className="vo-table-head ">View More</th>
              </tr>
            </thead>
            <tbody className="shop-tab2">
              {data.map((item, index) => {
                return (
                  <>
                    <tr className="shop-tab2" key={index}>
                      <td>{index + 1}</td>
                      <td>ORD{item._id.slice(20, 24).toUpperCase()}</td>
                      {/* <td>date</td> */}

                      <td>{item.custId.name}</td>
                      <td>{item.city}</td>
                      <td>{item.totalAmount}</td>
                      <td>
                        <select
                          onChange={(e) => handleStatusChange(e, item._id)}
                        >
                          <option value="">Choose One </option>
                          {item.serviceStatus === "Pending" && (
                            <option value="Request Pickup">
                              Request Pickup
                            </option>
                          )}
                          {item.serviceStatus === "Reschedule Pickup" && (
                            <option value="Request Pickup">
                              Reschedule Pickup
                            </option>
                          )}
                          {item.serviceStatus === "Pickup Completed" && (
                            <option value="Process Completed">
                              Process Completed
                            </option>
                          )}
                          {item.serviceStatus === "Reschedule Drop" && (
                            <option value="Request Drop">
                              Reschedule Drop
                            </option>
                          )}
                          {item.serviceStatus === "Process Completed" && (
                            <option value="Request Drop">Request Drop</option>
                          )}
                        </select>
                      </td>
                      <td>
                        {item.serviceStatus === "Pending" ? (
                          <button
                            className="shop-signup-button"
                            onClick={() => {
                              UpdateService(item._id);
                            }}
                          >
                            Request PickUp
                          </button>
                        ) : item.serviceStatus === "Process Completed" ? (
                          <button
                            className="shop-signup-button"
                            onClick={() => {
                              UpdateServiceforDrop(item._id);
                            }}
                          >
                            Request Drop
                          </button>
                        ) : item.serviceStatus === "Pickup Completed" ? (
                          <button
                            className="shop-signup-button"
                            
                            onClick={() => {
                              UpdateServiceforCompletion(item._id);
                            }}
                          >
                            Completed
                          </button>
                        ) : item.serviceStatus === "Delivery Completed" ? (
                          <p style={{ color: "green" }}>Service Completed</p>
                        ) : item.serviceStatus === "Reschedule Pickup" ? (
                          <button
                            className="shop-signup-button"
                            onClick={() => {
                              UpdateService(item._id);
                            }}
                          >
                            Request PickUp
                          </button>
                        ) : item.serviceStatus === "Reschedule Drop" ? (
                          <button
                            className="shop-signup-button"
                            onClick={() => {
                              UpdateServiceforDrop(item._id);
                            }}
                          >
                            Request Drop
                          </button>
                        ) : (
                          <p style={{ color: "red" }}>
                            Waiting for an Update from Delivery Agent
                          </p>
                        )}
                      </td>
                      <td>
                        <img
                          src={eye}
                          className="ms-2"
                          onClick={() => {
                            viewShop(item._id);
                          }}
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <center>
            {" "}
            <h3>No New Requests Found</h3>
          </center>
        </>
      )}
    </div>
  );
}

export default ShopViewOrders;
