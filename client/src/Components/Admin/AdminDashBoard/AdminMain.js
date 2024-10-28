import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";

import AdminNavber from "./AdminNavber";



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
            
            // ) : data === "viewallpolicestation" ? (
            //   <ViewAllPoliceStation />
            // ) : data === "viewallpoliceprofile" ? (
            //   <ViewProfile_Policestation />
            ) : data === "viewallpolicereqprofile" }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
