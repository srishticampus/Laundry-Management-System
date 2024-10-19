import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import CommonNav from './Components/Navbars/CommonNav';
import ScrollToTop from './Components/ScrollToTop';
import TopComponent from './Components/LandingPage/TopComponent';
import Working from './Components/LandingPage/Working';
import Services from './Components/LandingPage/Services';
import ServiceFeatures from './Components/LandingPage/ServiceFeatures';
import Footer from './Components/Navbars/Footer';

function App() {
  return (
    <BrowserRouter 
    basename='laundrlynx' >
      <ScrollToTop />
      <ToastContainer
        autoClose={3000} 
        hideProgressBar={true}  
        position="top-right"  
      />
      <div className="App">
        <Routes>
          <Route path='/' element={[<CommonNav />,<TopComponent/>,<Working/>,<Services/>,<ServiceFeatures/>,<Footer/>]} />
          
          
          
          </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
