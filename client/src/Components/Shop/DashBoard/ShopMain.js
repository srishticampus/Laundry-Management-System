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
import ShopViewOrders from "./ShopViewOrders";
import ShopOrderViewMore from "./ShopOrderViewMore";
import ShopViewOrderHistory from "./ShopViewOrderHistory";
import ShopOrderViewMorecomp from "./ShopOrderViewMorecomp";
import ShopViewFeedback from "./ShopViewFeedback";




function ShopMain({ data }) {
  return (
    <div>
        
      <div>
        <div className="row">
          <div className="col-2">
            <ShopSidebar />
          </div>
          <div className="col-10">
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
            ) : data === "shop-orders" ? (
              <ShopViewOrders/>
            ) : data === "shop-view-single-order" ? (
              <ShopOrderViewMore/>
            ) : data === "shop-order-history" ? (
              <ShopViewOrderHistory/>
            ) : data === "shop-view-single-comp-order" ? (
              <ShopOrderViewMorecomp/>
            ) : data === "shop-feedback" ? (
              <ShopViewFeedback/>
            ) : data === "logout" }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopMain;
