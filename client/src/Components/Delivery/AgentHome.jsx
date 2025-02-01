import React from 'react'
import '../../Styles/UserHome.css'
import ico1 from '../../Assets/ico2.png'
import ico2 from '../../Assets/ico1.png'
import ico3 from '../../Assets/ico3.png'
import ico4 from '../../Assets/Vector.png'
import img2 from '../../Assets/abt2.png'
import rev1 from '../../Assets/rev1.png'
import rev2 from '../../Assets/rev2.png'
import rev3 from '../../Assets/rev3.png'
import rating from '../../Assets/rating.png'
import img4 from '../../Assets/abt4.png'
function AgentHome() {
  return (
    <div>

      <div>
        <div className='uh-top-compo-img'>
          <div className='uh-div1'>
            <p className='uh-text1'>Welcome To <span className='uh-text2'>Laundry Lynx</span></p>
            <p className='uh-text3'> Fresh Clothes, Zero Hassle – Laundry Made Effortless!</p>
            <p className='uh-text4'>From doorstep pickup to on-time delivery, enjoy spotless, soft laundry without lifting a finger.</p>
            {/* <div className='uh-div3-btn'> Schedule Pickup</div> */}
          </div>
        </div>
      </div>



      <h2 className='uh-service-head'>Service provided by us</h2>
      <h2 className='uh-service-prov'>What we provide</h2>


      <div className='row mt-5'>
        <div className='col-3'>


          <div class="container">
            <div className='uh-cards'>
              <img src={ico2} className="top uh-card" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title mb-3"><center>Wet Washing</center></h5>
                <p class="card-text uh-card-text">Our wet washing service is ideal for everyday clothes that need a deep clean.
                  We use gentle, eco-friendly detergents to keep your fabrics fresh.</p>

              </div>
            </div>
          </div>
        </div>
        <div className='col-3'>


          <div class="container">
            <div className='uh-cards'>
              <img src={ico3} className="top uh-card" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title mb-3"><center>Dry cleaning</center></h5>
                <p class="card-text uh-card-text">Our professional dry cleaning service removes tough stains and refreshes delicate
                  garments without water,
                  preserving the fabric’s quality.</p>

              </div>
            </div>
          </div>
        </div>
        <div className='col-3 '>


          <div class="container">
            <div className='uh-cards'>
              <img src={ico4} className="top uh-card" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title mb-3"><center>Ironing</center></h5>
                <p class="card-text uh-card-text">Look sharp without the hassle! Our ironing service ensures your clothes are smooth,
                  wrinkle-free, and ready to wear, saving you time and effort.</p>

              </div>
            </div>
          </div>
        </div>
        <div className='col-3'>


          <div class="container">
            <div className='uh-cards'>
              <img src={ico1} className="top uh-card" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title mb-3"><center>Folding</center></h5>
                <p class="card-text uh-card-text">After washing, we fold your clothes neatly so they’re ready to put away.
                  Perfectly folded clothes keep
                  your wardrobe organized and hassle-free.</p>

              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='row mt-5 ms-2 mb-5'>
                    <div className='col-6'>
                        <img src={img2} className='uh-third-img'></img>
                        <img src={img4} className='uh-fourth-img'></img>
                    </div>
                    <div className='col-6 mt-5 mb-5'>
                        <h2 className='uh-mission mt-5'>Making Laundry Simple, So You Can Focus on Life.</h2>
                        <p className='uh-mission-p'>
                        Laundrylynx is a one-of-a-kind laundry aggregator app aimed at connecting customers & 
                        laundry partners, serving an entire spectrum of laundry needs ranging from choosing the right
                         laundry expert to price points using search & discovery,
                         We are currently serving Kerala only and will soon be pan India.

                        </p>

                    </div>
                </div>
                <div>

                <div className=''>
                  <h4 className='uh-testimonials'>Testimonials</h4>
                <h2 className='uh-review-mainhead'>What our customer says!</h2>
            </div>
            <div className='row mt-5'>
                <div className="col-md-4">
                    <div className='uh-review-prov-div'>
                        <img src={rev1} className='review-prov-img' />
                        <h5 className='review-prov-head'>Lora Smith</h5>
                        <img src={rating} className='review-prov-rating' />
                        <p className='uh-review-prov-reviews'>
                        Your attention to detail and care for my clothes is top-notch
v                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='uh-review-prov-div'>
                    <img src={rev2} className='review-prov-img' />
                    <h5 className='review-prov-head'>Maria zayn</h5>
                    <img src={rating} className='review-prov-rating' />
                    <p className='uh-review-prov-reviews'>
                    Excellent service! My clothes have never looked better
                        </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='uh-review-prov-div'>
                    <img src={rev3} className='review-prov-img' />
                    <h5 className='review-prov-head'>John Doe</h5>
                    <img src={rating} className='review-prov-rating' />
                    <p className='uh-review-prov-reviews'>
                        Fast, friendly, and fantastic cleaning , I'm a customer for life
                        </p>
                    </div>
                </div>
            </div>

                </div>
    </div>
  )
}

export default AgentHome