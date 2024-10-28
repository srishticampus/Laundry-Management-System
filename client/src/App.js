import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CommonNav from './Components/Navbars/CommonNav';
import ScrollToTop from './Components/ScrollToTop';
import TopComponent from './Components/LandingPage/TopComponent';
import Working from './Components/LandingPage/Working';
import Services from './Components/LandingPage/Services';
import ServiceFeatures from './Components/LandingPage/ServiceFeatures';
import Footer from './Components/Navbars/Footer';
import AdminLogin from './Components/Admin/AdminLogin';
import ContactUs from './Components/LandingPage/ContactUs';
import AboutUs from './Components/LandingPage/AboutUs';
import AdminMain from './Components/Admin/AdminDashBoard/AdminMain';

function App() {
  return (
    <BrowserRouter
      basename='laundrlynx' >
      <ScrollToTop />
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        position="top-right"
        closeOnClick


      />
      <div className="App">
        <Routes>
          <Route path='/' element={[<CommonNav />, <TopComponent />, <Working />, <Services />, <ServiceFeatures />, <Footer />]} />
          <Route path='/contact-us' element={[<CommonNav />, <ContactUs />]} />
          <Route path='/about-us' element={[<CommonNav />, <TopComponent />, <AboutUs />, <Footer />]} />

          {/* Admin  */}

          <Route path='/admin-login' element={[<CommonNav />, <AdminLogin />]} />
          <Route path='/admin-resetpwd' element={<AdminMain data="admin-resetpwd" />} />
          <Route path='/admin-home' element={<AdminMain data="admindashboard"/>} />       
             <Route path='/admin-home' element={<AdminMain data="admindashboard" />} />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
