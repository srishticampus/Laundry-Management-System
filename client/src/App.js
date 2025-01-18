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
import CustViewAllShops from './Components/Customer/CustViewAllShops';
import CustPlaceOrder1 from './Components/Customer/CustPlaceOrder1';
import CustOrderAddress from './Components/Customer/CustOrderAddress';
import CustPickUpDate from './Components/Customer/CustPickUpDate';
import CustPayment from './Components/Customer/CustPayment';
import CustOrderSuccess from './Components/Customer/CustOrderSuccess';
import CustTrackOrder from './Components/Customer/CustTrackOrder';
import AgentSignup from './Components/Delivery/AgentSignup';
import AgentLogin from './Components/Delivery/AgentLogin';
import AgentHome from './Components/Delivery/AgentHome';
import AgentNav from './Components/Navbars/AgentNav';
import AgentOrderReqs from './Components/Delivery/AgentOrderReqs';
import AgentAssignedOrders from './Components/Delivery/AgentAssignedOrders';
import CommonNav2 from './Components/Navbars/CommonNav2';
import AgentDropReqs from './Components/Delivery/AgentDropReqs';
import AgentHistoryPickup from './Components/Delivery/AgentHistoryPickup';
import AgentHistoryDrop from './Components/Delivery/AgentHistoryDrop';
import AgentAssignedDeliveryOrders from './Components/Delivery/AgentAssignedDeliveryOrders';
import CustEnquiries from './Components/Customer/CustEnquiries';
import CustForgotPassword from './Components/Customer/CustForgotPassword';
import CustResetPassword from './Components/Customer/CustResetPassword'
import ShopViewFeedback from './Components/Shop/DashBoard/ShopViewFeedback';

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
          <Route path='/contact-us' element={[<CommonNav2 />, <ContactUs />, <Footer />]} />
          <Route path='/about-us' element={[<CommonNav2 />, <TopComponent />, <AboutUs />, <Footer />]} />
          <Route path='/services' element={[<CommonNav />, <Services />, <Footer />]} />

          {/* Admin  */}

          <Route path='/admin-login' element={[<CommonNav />, <AdminLogin />, <Footer />]} />
          <Route path='/admin-resetpwd' element={<AdminMain data="admin-resetpwd" />} />
          <Route path='/admin-home' element={<AdminMain data="admindashboard" />} />
          <Route path='/admin-home' element={<AdminMain data="admindashboard" />} />
          <Route path='/admin-add-shop' element={<AdminMain data="admin-add-shop" />} />
          <Route path='/admin-view-shop' element={<AdminMain data="admin-view-shop" />} />
          <Route path='/admin-edit-shop/:id' element={<AdminMain data="admin-edit-shop" />} />
          <Route path='/admin-view-single-shop/:id' element={<AdminMain data="admin-view-single-shop" />} />
          <Route path='/admin-view-users' element={<AdminMain data="admin-view-users" />} />
          <Route path='/admin-agent-requests' element={<AdminMain data="admin-agent-requests" />} />
          <Route path='/admin-agent-details' element={<AdminMain data="admin-agent-details" />} />
          <Route path='/admin-order-details' element={<AdminMain data="admin-order-details" />} />
          <Route path='/admin-feedback' element={<AdminMain data="admin-feedback" />} />

          {/* Shop */}

          <Route path='/shop-login' element={[<CommonNav />, <ShopLogin />, <Footer />]} />
          <Route path='/shop-home' element={<ShopMain data="shop-home" />} />
          <Route path='/shop-view-service' element={<ShopMain data="shop-view-service" />} />
          <Route path='/shop-edit-service/:id' element={<ShopMain data="shop-edit-service" />} />
          <Route path='/shop-view-material' element={<ShopMain data="shop-view-material" />} />
          <Route path='/shop-edit-material/:id' element={<ShopMain data="shop-edit-material" />} />
          <Route path='/shop-view-workinghours' element={<ShopMain data="shop-view-workinghours" />} />
          <Route path='/shop-edit-workinghours/:id' element={<ShopMain data="shop-edit-workinghours" />} />
          <Route path='/shop-orders' element={<ShopMain data="shop-orders" />} />
          
          <Route path='/shop-view-single-order/:id' element={<ShopMain data="shop-view-single-order" />} />
          <Route path='/shop-order-history' element={<ShopMain data="shop-order-history" />} />
          <Route path='/shop-view-single-comp-order/:id' element={<ShopMain data="shop-view-single-comp-order" />} />
          <Route path='/shop-feedback' element={<ShopMain data="shop-feedback" />} />
          <Route path='/shop-issues' element={<ShopMain data="shop-issues" />} />

          {/* Customer */}

          <Route path='/cust-login' element={[<CommonNav2 />, <CustLogin />, <Footer />]} />
          <Route path='/cust-signup' element={[<CommonNav />, <CustSignup />, <Footer />]} />
          <Route path='/cust-home' element={[<CustNavbar />, <CustHome />, <Footer />]} />
          <Route path='/cust-view-shops' element={[<CustNavbar />, <CustViewAllShops />, <Footer />]} />
          <Route path='/place-order1/:id' element={[<CustNavbar />, <CustPlaceOrder1 />, <Footer />]} />
          <Route path='/order-address/:id' element={[<CustNavbar />, <CustOrderAddress />, <Footer />]} />
          <Route path='/cust-pickup-date/:id' element={[<CustNavbar />, <CustPickUpDate />]} />
          <Route path='/cust-payment/:id' element={[<CustNavbar />, <CustPayment />]} />
          <Route path='/cust-order-success/:id' element={[<CustNavbar />, <CustOrderSuccess />]} />
          <Route path='/cust-track-order' element={[<CustNavbar />, <CustTrackOrder />]} />

          <Route path='/cust-enquiries' element={[<CustNavbar />, <CustEnquiries />]} />
          <Route path='/cust-forgot' element={[<CustNavbar />, <CustForgotPassword />]} />
          
          <Route path='/reset-password/:id' element={[<CustNavbar />, <CustResetPassword />]} />

          {/* Del Agent */}
          <Route path='/agent-signup' element={[<CommonNav />, <AgentSignup />, <Footer />]} />
          <Route path='/agent-login' element={[<CommonNav />, <AgentLogin />, <Footer />]} />
          <Route path='/agent-home' element={[<AgentNav />, <AgentHome />, <Footer />]} />
          <Route path='/agent-order-reqs' element={[<AgentNav />, <AgentOrderReqs />, <Footer />]} />
          <Route path='/agent-orders' element={[<AgentNav />, <AgentAssignedOrders />, <Footer />]} />
          <Route path='/agent-drop-orders' element={[<AgentNav />, <AgentDropReqs />, <Footer />]} />
          <Route path='/agent-pickup-orders-con' element={[<AgentNav />, <AgentHistoryPickup />, <Footer />]} />
          <Route path='/agent-delivery-orders-con' element={[<AgentNav />, <AgentHistoryDrop />, <Footer />]} />
          <Route path='/agent-delivery-orders' element={[<AgentNav />, <AgentAssignedDeliveryOrders />, <Footer />]} />
          <Route path='/view-feedback-agent' element={[<AgentNav />, <ShopViewFeedback />, <Footer />]} />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
