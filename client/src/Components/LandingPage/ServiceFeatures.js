import React, { useEffect, useState } from "react";
import "../../Styles/TopComponent.css";
import Slider from "react-slick";
import shop1 from "../../Assets/shop1.png";
import shop2 from "../../Assets/shop2.png";
import shop3 from "../../Assets/shop3.png";
import tvm from "../../Assets/tvm.png";
import vark from "../../Assets/varkala.png";
import cal from "../../Assets/calicut.png";
import rev1 from "../../Assets/rev1.png";
import rev2 from "../../Assets/rev2.png";
import rev3 from "../../Assets/rev3.png";
import rating from "../../Assets/rating.png";
import { IMG_BASE_URL } from "../Services/BaseURL";
import ReactStars from "react-stars"; // Import ReactStars
import { viewCount } from "../Services/AdminService";
import { toast } from "react-toastify";

function ServiceFeatures() {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedback data
  const fetchData = async () => {
    try {
      const result = await viewCount("viewFeedbacks");

      if (result.success) {
        if (result.user.length>0) setFeedbacks(result.user.reverse().slice(0, 3));
        else setFeedbacks([]);
      } else {
        console.error("Data error:", result);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call the async function
  }, []);

  console.log(feedbacks);
  

  const [data, setData] = useState([]);
  console.log("data", data);

  const fetchShopData = async () => {
    try {
      const result = await viewCount("viewActiveShops");
      if (result.success) {
        if (result.user.length > 0) {
          setData(result.user.reverse().slice(0, 3));
        } else {
          setData([]);
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred during Data View");
    }
  };

  useEffect(() => {
    fetchShopData();
  }, []);


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
    <div className="container">
      <div className="services-feature-head">
        <h2 className="working-head1 ">Service Features</h2>
      </div>
      <div className="services-feature-div">
        <div className="services-feature-carousel-container">
          <Slider {...settings}>
            <div>
              <h2 className="services-feature-h2">
                No Minimum order, pay only as much as you use
              </h2>
            </div>
            <div>
              <h2 className="services-feature-h2">
                Choose Pickup and Drop timing of your convenience
              </h2>
            </div>
            <div>
              <h2 className="services-feature-h2">
                Choose from a wide range of service providers
              </h2>
            </div>
            <div>
              <h2 className="services-feature-h2">Track your order</h2>
            </div>
            <div>
              <h2 className="services-feature-h2">
                Now use a service from any corner of the city
              </h2>
            </div>
            <div>
              <h2 className="services-feature-h2">Fully safe and secure</h2>
            </div>
          </Slider>
        </div>
      </div>

      <div className="services-prov-head">
        <h2 className="working-head1 mb-5">Our Service provider</h2>
      </div>

      {data.length > 0 ? (
        <div className="row mt-5">
          {
            data.length?data.map((item)=>{
              return(
                <div className="col-md-4">
          <div className="services-prov-div">
            <img src={`${IMG_BASE_URL}/${item.image.filename}`} className="services-prov-img" />
            <h5 className="ms-5">{item.name}</h5>
          </div>
        </div>
              )
            }):''
          }
        
       
        
      </div>
      ) : (
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="services-prov-div">
              <img src={shop1} className="services-prov-img" />
              <h5 className="ms-5">Shine bright landomat</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="services-prov-div">
              <img src={shop2} className="services-prov-img" />
              <h5 className="ms-5">Laundry heaven</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="services-prov-div">
              <img src={shop3} className="services-prov-img" />
              <h5 className="ms-5">Clean as a whistle</h5>
            </div>
          </div>
        </div>
      )}

      <div className="services-prov-head">
        <h2 className="working-head1">Our Operational areaS</h2>
      </div>
      <div className="row mt-5">
        <div className="col-md-4">
          <div className="services-prov-div">
            <img src={tvm} className="services-prov-img" />
            <h5 className="ms-5">Thiruvananthapuram</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div className="services-prov-div">
            <img src={vark} className="services-prov-img" />
            <h5 className="ms-5">Varkala</h5>
          </div>
        </div>
        <div className="col-md-4">
          <div className="services-prov-div">
            <img src={cal} className="services-prov-img" />
            <h5 className="ms-5">Calicut</h5>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="review-prov-mainhead">
          What our customer says about Us
        </h2>
      </div>
      {feedbacks.length > 0 ? (
        <div className="row mt-5">
          {feedbacks.map((item) => {
            return (
              <>
                <div className="col-md-4">
                  <div className="review-prov-div px-2">
                    <img
                      src={`${IMG_BASE_URL}/${item.custId.image.filename}`}
                      className="review-prov-img"
                    />
                    <h5 className="review-prov-head">{item.custId.name}</h5>
                    <ReactStars
                      count={5}
                      value={item.rating} // Display rating from feedback data
                      size={38}
                      color1={"#dcdcdc"} // Default color for stars
                      color2={"	#ffe234"} // Green color for filled stars
                      edit={false} // Disable editing
                    />
                    <p className="review-prov-reviews">
                      {item.custId.comments}v{" "}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="review-prov-div">
              <img src={rev1} className="review-prov-img" />
              <h5 className="review-prov-head">Lora Smith</h5>
              <img src={rating} className="review-prov-rating" />
              <p className="review-prov-reviews">
                Your attention to detail and care for my clothes is top-notch v{" "}
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="review-prov-div">
              <img src={rev2} className="review-prov-img" />
              <h5 className="review-prov-head">Maria zayn</h5>
              <img src={rating} className="review-prov-rating" />
              <p className="review-prov-reviews">
                Excellent service! My clothes have never looked better
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="review-prov-div">
              <img src={rev3} className="review-prov-img" />
              <h5 className="review-prov-head">John Doe</h5>
              <img src={rating} className="review-prov-rating" />
              <p className="review-prov-reviews">
                Fast, friendly, and fantastic cleaning , I'm a customer for life
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceFeatures;
