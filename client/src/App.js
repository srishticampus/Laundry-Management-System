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
import ShopLogin from './Components/Shop/ShopLogin';
import ShopMain from './Components/Shop/DashBoard/ShopMain';
import CustLogin from './Components/Customer/CustLogin';
import CustSignup from './Components/Customer/CustSignup';
import CustNavbar from './Components/Navbars/CustNavbar';
import CustHome from './Components/Customer/CustHome';
import "remixicon/fonts/remixicon.css";

function App() {
  return (
    <BrowserRouter
      basename='laundry' >
      <ScrollToTop />
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        position="top-right"
        closeOnClick


      />
      <div>
        <Routes>
          <Route path='/' element={[<CommonNav />, <TopComponent />, <Working />, <Services />, <ServiceFeatures />, <Footer />]} />
          <Route path='/contact-us' element={[<CommonNav />, <ContactUs />, <Footer />]} />
          <Route path='/about-us' element={[<CommonNav />, <TopComponent />, <AboutUs />, <Footer />]} />

          {/* Admin  */}

          <Route path='/admin-login' element={[<CommonNav />, <AdminLogin />, <Footer />]} />
          <Route path='/admin-resetpwd' element={<AdminMain data="admin-resetpwd" />} />
          <Route path='/admin-home' element={<AdminMain data="admindashboard"/>} />       
             <Route path='/admin-home' element={<AdminMain data="admindashboard" />} />
             <Route path='/admin-add-shop' element={<AdminMain data="admin-add-shop" />} />
             <Route path='/admin-view-shop' element={<AdminMain data="admin-view-shop" />} />
             <Route path='/admin-edit-shop/:id' element={<AdminMain data="admin-edit-shop" />} />
             <Route path='/admin-view-single-shop/:id' element={<AdminMain data="admin-view-single-shop" />} />

{/* Shop */}

<Route path='/shop-login' element={[<CommonNav />, <ShopLogin />, <Footer />]} />
<Route path='/shop-home' element={<ShopMain data="shop-home"/>} />  
<Route path='/shop-view-service' element={<ShopMain data="shop-view-service"/>} />  
<Route path='/shop-edit-service/:id' element={<ShopMain data="shop-edit-service"/>} />  
<Route path='/shop-view-material' element={<ShopMain data="shop-view-material"/>} />  
<Route path='/shop-edit-material/:id' element={<ShopMain data="shop-edit-material"/>} />  
<Route path='/shop-view-workinghours' element={<ShopMain data="shop-view-workinghours"/>} />  
<Route path='/shop-edit-workinghours/:id' element={<ShopMain data="shop-edit-workinghours"/>} />  


{/* Customer */}

<Route path='/cust-login' element={[<CommonNav />, <CustLogin />, <Footer />]} />
<Route path='/cust-signup' element={[<CommonNav />, <CustSignup />, <Footer />]} />
<Route path='/cust-home' element={[<CustNavbar />, <CustHome />,  <Footer />]} />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
