import React from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/CommonNav.css'
function Footer() {
  return (
    <div className='footer-div'>
         <nav className="navbar navbar-expand-lg navbar_bg">
          <div className="container-fluid">
           <p></p>
          
              <div className="collapse navbar-collapse flex-grow-0 mt-3 landingnavbar_text" >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 " >
                  <li className="nav-item m-3">
                    
                  </li>
                  <li className="nav-item m-3">
                    <Link
                      to='/admin_home'
                      className="nav-link landingnavbar_text"
                      aria-current="page"
                  
                    >
                    Our Services
                    </Link>
                  </li>
                  <li className="nav-item m-3">
                    <Link
                      to='/'
                      className="nav-link landingnavbar_text"
                      aria-current="page"
                    
                    >
                      Help Center
                    </Link>
                  </li>
              
                  <li className="nav-item m-3">
                    <Link
                      to="#"
                      className="nav-link landingnavbar_text "
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      id="text_color_white"
                    >
                      About Us<i className="bi bi-chevron-down"></i>
                    </Link>
                  
                  </li>
              
              
                  
                
                </ul>
                
              </div>
          </div>
        </nav>
    </div>
  )
}

export default Footer