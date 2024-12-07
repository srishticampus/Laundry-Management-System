import React from 'react'
import '../../Styles/TopComponent.css'
import ico1 from '../../Assets/ico2.png'
import ico2 from '../../Assets/ico1.png'
import ico3 from '../../Assets/ico3.png'
import ico4 from '../../Assets/Vector.png'

function Services() {
    return (
        <div className='container' id='services'>
            <div className='services-head'>
                <h2 className='working-head1'>Service provided by us</h2>
                <div className='services-sec-div'>
                <div className='row'>
                    <div className='col-3'>
                        <div className='services-pics'>
                            <img src={ico2} className='services-img' />
                            <p className='services-img-text mt-5'> Wet Washing</p>
                        </div>
                        </div>
                        <div className='col-3'>
                        <div className='services-pics'>
                            <img src={ico3} className='services-img' />
                            <p className='services-img-text mt-5'> Dry Cleaning</p>
                        </div>
                        </div>
                        <div className='col-3'>
                        <div className='services-pics'>
                            <img src={ico4} className='services-img' />
                            <p className='services-img-text mt-5'> Ironing</p>
                        </div>
                        </div>
                        <div className='col-3'>
                        <div className='services-pics'>
                            <img src={ico1} className='services-img' />
                            <p className='services-img-text mt-5'> Folding</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services