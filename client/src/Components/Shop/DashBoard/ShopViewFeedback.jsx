import React, { useEffect, useState } from "react";
import "../../../Styles/ViewFeedback.css";
import "../../../Styles/ViewComplaints.css";
import { viewCount } from "../../Services/AdminService";
import { toast } from "react-toastify";
import ReactStars from "react-stars"; // Import ReactStars
import { IMG_BASE_URL } from "../../Services/BaseURL";

function ShopViewFeedback() {
  console.log("bjhj");

  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedback data
  const fetchData = async () => {
    try {
      console.log("in use");

      const result = await viewCount("viewFeedbacks");
      console.log(result);

      if (result.success) {
        if (result.user.length > 0) setFeedbacks(result.user);
        else setFeedbacks([]);
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

  return (
    <div className="container mt-3" style={{minHeight: "80vh  "}}>
      <h5 className="mt-5">View Feedbacks</h5>
      {feedbacks.length > 0 ? (
        <div className="complaints-grid">
          {feedbacks.map((item, index) => (
            <div key={index} className="admin-comp-container">
              <div className="row align-items-center">
                <div className="col-6 text-start">
                  <img
                    src={`${IMG_BASE_URL}${item?.custId?.image?.filename}`}
                    alt="User Image"
                    className="small-profile"
                  />
                  <strong>{item?.custId?.name}</strong>
                </div>
                <div className="col-6 text-end">
                  <ReactStars
                    count={5}
                    value={item?.rating} // Display rating from feedback data
                    size={28}
                    color1={"#dcdcdc"} // Default color for stars
                    color2={"#3070F5"} // Green color for filled stars
                    edit={false} // Disable editing
                  />
                </div>
              </div>

              <p className="feedback-comments ">{item.comments}</p>
              <p className="comp-footer">
                {item?.custId?.contact} &nbsp;&nbsp;&nbsp; .&nbsp;&nbsp;&nbsp;
                {item?.custId?.email} &nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp;
                {item?.createdAt?.slice(0, 10)} &nbsp;&nbsp;&nbsp; .{" "}
                {/* Formatting date */}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <center>
          <h3>No Feedbacks Found</h3>
        </center>
      )}
    </div>
  );
}

export default ShopViewFeedback;
