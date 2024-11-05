import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";

import AdminNavber from "./AdminNavber";
import AddShop from "./AddShop";
import ViewAllShops from "./ViewAllShops";
import EditShop from "./EditShop";



function AdminMain({ data }) {
  return (
    <div>
        
      <div>
        <div className="row">
          <div className="col-3">
            <AdminSidebar />
          </div>
          <div className="col-9">
          <AdminNavber/>
            {data === "admindashboard" ? (
              <AdminDashboard />
            
            ) : data === "admin-add-shop" ? (
              <AddShop />
            ) : data === "admin-view-shop" ? (
              <ViewAllShops />
            ) : data === "admin-edit-shop" ? (
              <EditShop />
            ) : data === "logout" }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
