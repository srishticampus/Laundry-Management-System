
    import React from 'react'
    import { Link } from 'react-router-dom'
    import logo from '../../Assets/navbarlogo.png'
    import '../../Styles/CommonNav.css'

    function CommonNav() {
              return (
        <div>
        <nav className="navbar navbar-expand">
          <div className="container-fluid">
            <Link to='/admin_home' className="text-decoration-none">
              <div className="navbar_logo">
                {/* <img src={logo} className="img-fluid" alt="logo" /> */}
               <h3>laundrylynx</h3> 
               
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
                      to='/admin_home'
                      className="nav-link landingnavbar_text"
                      aria-current="page"
                    
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item m-3">
                    <Link
                      to='/admin_home'
                      className="nav-link landingnavbar_text"
                      aria-current="page"
                  
                    >
                    Services
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
              
              
                  <li className="nav-item m-3">
                    <Link
                      to="#"
                      className="nav-link landin-nav-btn"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      id="text_color_white"
                    >
                    Login
                    </Link>
                  
                  </li>
                  
                
                </ul>
                
              </div>
          </div>
        </nav>
      </div>
    )
      
    }
    
   

export default CommonNav