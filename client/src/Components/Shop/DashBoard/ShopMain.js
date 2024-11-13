import React from "react";
import ShopSidebar from "./ShopSidebar";
import ShopDashboard from "./ShopDashboard";

import ShopNavbar from "./ShopNavbar";
import ShopViewServices from "./ShopViewServices";
import ShopEditService from "./ShopEditService";
import ShopViewMaterial from "./ShopViewMaterial";
import ShopEditMaterial from "./ShopEditMaterial";
import ShopWorkingHoursView from "./ShopWorkingHoursView";
import ShopEditWorkingHours from "./ShopEditWorkingHours";




function ShopMain({ data }) {
  return (
    <div>
        
      <div>
        <div className="row">
          <div className="col-3">
            <ShopSidebar />
          </div>
          <div className="col-9">
          <ShopNavbar/>
          {data === "shop-home" ? (
              <ShopDashboard />
            
            ) : data === "shop-view-service" ? (
              <ShopViewServices />
            ) : data === "shop-edit-service" ? (
              <ShopEditService />
            ) : data === "shop-view-material" ? (
              <ShopViewMaterial />
            ) : data === "shop-edit-material" ? (
              <ShopEditMaterial />
            ) : data === "shop-view-workinghours" ? (
              <ShopWorkingHoursView />
            ) : data === "shop-edit-workinghours" ? (
              <ShopEditWorkingHours/>
            ) : data === "logout" }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopMain;
