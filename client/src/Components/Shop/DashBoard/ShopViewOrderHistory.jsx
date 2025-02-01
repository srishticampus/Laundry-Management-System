import React, { useEffect, useState } from "react";
import del from "../../../Assets/delete.png";
import eye from "../../../Assets/eye.png";
import inactive from "../../../Assets/inactive.png";
import active from "../../../Assets/active.png";
import { approveById, viewCount } from "../../Services/AdminService";
import { toast } from "react-toastify";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { IoMdCall } from "react-icons/io";
import "../../../Styles/ViewAllshops.css";
import { useNavigate } from "react-router-dom";
import {
  register,
  resetPassword,
  ViewById,
} from "../../Services/CommonServices";
import "../../../Styles/ShopDashboard.css";
function ShopViewOrderHistory() {
  const [data, setdata] = useState([]);

  const Navigate = useNavigate();

  const fetchData = async () => {
    try {
      const result = await ViewById(
        "viewAllCompletedOrderByShopId",
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
    Navigate(`/shop-view-single-comp-order/${id}`);
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
  return (
    <div className="container mt-5 ">
      <h2 className="shop-add-service-mainText"> View Completed Orders</h2>

      {data.length > 0 ? (
        <>
          <table className="table  table-hover shop-tab2 p-5 mt-3">
            <thead className="ms-5 aks shop-tab2">
              <tr>
                <th className=" ps-3">Sl No</th>
                <th className="">Order ID</th>
                <th className="">Customer Details</th>
                <th className="">Order Date</th>
                <th className="">Total Amount</th>

                <th className="vo-table-head ">Action</th>
              </tr>
            </thead>
            <tbody className="shop-tab2">
              {data.map((item, index) => {
                return (
                  <>
                    <tr className="shop-tab2">
                      <td>{index + 1}</td>
                      <td>ORD{item._id.slice(20, 24).toUpperCase()}</td>
                      <td>
                        {item.custId.name}
                        <br />
                        <IoMdCall />
                        {item.custId.contact}
                        <br />
                        <IoLocationSharp /> {item.houseName} {item.street}
                      </td>
                      {/* <td>date</td> */}

                      <td>{item.orderDate.slice(0, 10)}</td>
                      <td>{item.totalAmount}</td>

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
            <h3>No History Found</h3>
          </center>
        </>
      )}
    </div>
  );
}

export default ShopViewOrderHistory;
