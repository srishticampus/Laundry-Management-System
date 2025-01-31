import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";

import AdminNavber from "./AdminNavber";
import AddShop from "./AddShop";
import ViewAllShops from "./ViewAllShops";
import EditShop from "./EditShop";
import AdminViewSingleShop from "./AdminViewSingleShop";
import AdminViewAllUsers from "./AdminViewAllUsers";
import AdminAgentReqs from "./AdminAgentReqs";
import AdminViewAllAgents from "./AdminViewAllAgents";
import AdminViewAllOrders from "./AdminViewAllOrders";
import ShopViewFeedback from "../../Shop/DashBoard/ShopViewFeedback";

function AdminMain({ data }) {
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-3" style={{position: "fixed", overflow: "auto", maxHeight: "100vh"}}>
            <AdminSidebar />
          </div>
          <div className="col-9" style={{marginLeft: "300px"}}>
            <AdminNavber />
            {data === "admindashboard" ? (
              <AdminDashboard />
            ) : data === "admin-add-shop" ? (
              <AddShop />
            ) : data === "admin-view-shop" ? (
              <ViewAllShops />
            ) : data === "admin-edit-shop" ? (
              <EditShop />
            ) : data === "admin-view-single-shop" ? (
              <AdminViewSingleShop />
            ) : data === "admin-view-users" ? (
              <AdminViewAllUsers />
            ) : data === "admin-agent-requests" ? (
              <AdminAgentReqs />
            ) : data === "admin-agent-details" ? (
              <AdminViewAllAgents />
            ) : data === "admin-order-details" ? (
              <AdminViewAllOrders />
            ) : data === "admin-feedback" ? (
              <ShopViewFeedback />
            ) : (
              data === "logout"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
