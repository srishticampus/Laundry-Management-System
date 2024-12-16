
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../Assets/logo2.png'
import '../../Styles/CommonNav.css'

function CommonNav2() {
          return (
    <div>
    <nav className="navbar navbar-expand">
      <div className="container-fluid">
        <Link to='/admin_home' className="text-decoration-none">
          <div className="navbar_logo">
            
            <img src={logo} className="img-fluid nav-img" alt="logo" />
           {/* <h3>laundrylynx</h3>  */}
           
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse flex-grow-0 mt-3 landingnavbar_text" >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 " >
              <li className="nav-item m-3">
                <Link
                  to='/'
                  className="nav-link landingnavbar_text"
                  aria-current="page"
                
                >
                  Home
                </Link>
              </li>
              
              <li className="nav-item m-3">
                <Link
                  to='/about-us'
                  className="nav-link landingnavbar_text"
                  aria-current="page"
                
                >
                  About Us
                </Link>
              </li>
          
              <li className="nav-item m-3">
                <Link
                   to='/contact-us'
                  className="nav-link landingnavbar_text "
                  role="button"
                  // data-bs-toggle="dropdown"
                  aria-expanded="false"
               
                >
                  Contact Us<i className="bi bi-chevron-down"></i>
                </Link>
              
              </li>
          
          
              <li className="nav-item m-3 dropdown">
                             <Link
                               to="#"
                               className="nav-link dropdown-toggle landin-nav-btn"
                               role="button"
                               id="loginDropdown"
                               data-bs-toggle="dropdown"
                               aria-expanded="false"
                             >
                               Login
                             </Link>
                             <ul className="dropdown-menu" aria-labelledby="loginDropdown">
                             <li>
                                 <Link to="/cust-login" className="dropdown-item">
                                   Customer Login
                                 </Link>
                               </li>
                               <li>
                                 <Link to="/admin-login" className="dropdown-item">
                                   Admin Login
                                 </Link>
                               </li>
                               <li>
                                 <Link to="/shop-login" className="dropdown-item">
                                   Shop Login
                                 </Link>
                               </li>
                               <li>
                                 <Link to="/agent-login" className="dropdown-item">
                                   Agent Login
                                 </Link>
                               </li>
                             </ul>
                           </li>
              
            
            </ul>
            
          </div>
      </div>
    </nav>
  </div>
)
  
}



export default CommonNav2