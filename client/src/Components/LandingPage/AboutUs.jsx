import React from 'react'
import img1 from '../../Assets/abt1.png'
import img2 from '../../Assets/abt2.png'
import img3 from '../../Assets/abt3.png'
import img4 from '../../Assets/abt4.png'
import img15 from '../../Assets/abt5.png'
import img6 from '../../Assets/abt6.png'
import '../../Styles/AboutUs.css'
import { GiCheckMark } from "react-icons/gi";
function AboutUs() {
    return (
        <div>
            <div className='container'>

                <div className='row mt-5'>
                    <div className='col-5'>
                        <img src={img1} className='abt-first-img'></img>
                    </div>
                    <div className='col-7'>
                        <h2 className='abt-about'>About Us</h2>
                        <p className='abt-about-content'>
                            Laundrylynx is a one-of-a-kind laundry aggregator app aimed at connecting customers &
                            laundry partners, serving an entire spectrum of laundry needs ranging from choosing the
                            right laundry expert to price points using
                            search & discovery, We are currently serving Kerala only and will soon be pan India.
                        </p>

                    </div>
                </div>


                <div className='row mt-5'>
                   
                    <div className='col-9'>
                        <h2 className='abt-about'>About Us</h2>
                        <p className='abt-about-content2'>
                        We are a dedicated team of professionals committed to revolutionizing
                         the way laundry services are managed. With years of experience
                          in the laundry and logistics industry, we understand the needs 
                          of both customers and service providers. Our mission is to 
                          simplify laundry management by leveraging technology, ensuring convenience,
                           transparency, and quality for everyone involved.

                        </p>

                    </div>
                    <div className='col-3'>
                        <img src={img3} className='abt-sc-img'></img>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-5'>
                        <img src={img2} className='abt-third-img'></img>
                        <img src={img4} className='abt-fourth-img'></img>
                    </div>
                    <div className='col-7'>
                        <h2 className='abt-about'>Our Mission</h2>
                        <p className='abt-about-content'>
                        Our mission is to make laundry management easier and more 
                        efficient for both customers and service providers. Whether
                         you're a busy individual looking for a reliable laundry 
                         service or a shop owner seeking to streamline operations, LaundryLynx 
                         is here to serve you with the best solutions.

                        </p>

                    </div>
                </div>
                <div className='row mt-5'>
                <h2 className='abt-about'>Why Choose Us?</h2>
                    <div className='col-3'>
                        <h5 className='abt-col-head'>Convenience</h5>
                        <p className='abt-col-content'>
                        Schedule pickups and deliveries with just a few clicks, right from your phone or computer.


                        </p>
                        <h5 className='abt-col-head'>Transparency</h5>
                        <p className='abt-col-content'>
                        Stay informed with real-time updates on your order status, from pickup to delivery.

                        </p>
                        <h5 className='abt-col-head'>Quality Service</h5>
                        <p className='abt-col-content'>
                        We partner with trusted laundry shops that provide high-quality cleaning services for all types of fabrics.

                        </p>
                    </div>
                    <div className='col-5'>
                        <img src={img6} className='abt-fifth-img'></img>
                       
                    </div>
                    <div className='col-4'>
                       
                    <h5 className='abt-col-head'>Affordable Pricing</h5>
                        <p className='abt-col-content'>
                        Our platform ensures competitive pricing, and you can view service costs upfront based on material and item 



                        </p>
                        <h5 className='abt-col-head'>Secure Payment</h5>
                        <p className='abt-col-content'>
                        Make safe payments online with transparent billing and refund policies.
                        </p>
                        <h5 className='abt-col-head'>Eco-Friendly Practices</h5>
                        <p className='abt-col-content'>
                        Our partner shops use environmentally friendly cleaning methods to help reduce our collective carbon footprint.

                        </p>

                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-5'>
                        <img src={img15} className='abt-first-img mt-5'></img>
                    </div>
                    <div className='col-7'>
                        <h2 className='abt-about'>What We Offer
                        </h2>
                      
                      
                        <h5 className='abt-col-head p-2'> <GiCheckMark /> On-Demand Pickup and Delivery</h5> 
                        <p className='abt-col-content2'>No need to leave your home. Our delivery agents collect your laundry and bring it back, fresh and clean. </p>
                        <h5 className='abt-col-head  p-2'> <GiCheckMark /> Easy Order Tracking</h5> 
                        <p className='abt-col-content2'>Track your laundry order status in real-time, from pickup to delivery.
                        </p>
                        <h5 className='abt-col-head  p-2'> <GiCheckMark /> Multiple Service Options</h5> 
                        <p className='abt-col-content2'>Whether you need washing, dry cleaning, or ironing, we’ve got you covered. </p>
                        <h5 className='abt-col-head  p-2'> <GiCheckMark /> Customer Support</h5> 
                        <p className='abt-col-content2'>We provide dedicated customer support to ensure all your questions and concerns are addressed promptly.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs