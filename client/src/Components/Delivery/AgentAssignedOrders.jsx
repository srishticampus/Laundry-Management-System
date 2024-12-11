import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { approveById, viewCount } from '../Services/AdminService';
import { toast } from "react-toastify";
import '../../Styles/ViewAllshops.css';
import { useNavigate } from 'react-router-dom';
import { IMG_BASE_URL } from '../Services/BaseURL';
import tick from '../../Assets/tick.png'
import '../../Styles/Agent.css'
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { IoMdCall } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import { register, resetPassword, ViewById } from '../Services/CommonServices';
function AgentAssignedOrders() {
  const [data, setData] = useState([]);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [issueDetails, setIssueDetails] = useState({
    issueType: "",
    comments: "",
    type:'Pickup',
    agentId: localStorage.getItem('agent'),
  });
  const navigate = useNavigate();

  // Fetch Data
  const fetchData = async () => {
    try {
      const result = await ViewById('viewAllAssignedOrdersByAGIdPickUp',localStorage.getItem('agent'));
      if (result.success) {
        setData(result.user.length > 0 ? result.user : []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred during Data View');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [statuses, setStatuses] = useState({});

  const handleStatusChange = async(e, id) => {
      const newStatus = e.target.value;
      setStatuses((prev) => ({ ...prev, [id]: newStatus }));
     
   await UpdateService(id)
      

  };
const UpdateService=async(id)=>{
  try {
      console.log("stats",statuses.id,"id", id);
      
      const result = await resetPassword({serviceStatus:'Pickup Completed'}, 'UpdateServiceStatus',id);

      if (result.success) {
          console.log(result);
          fetchData();
      } else {
          console.error('Error Occured:', result);
          toast.error(result.message);
      }
  } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred during Registration');
  }
}


const openIssueModal = (orderId) => {
  setCurrentOrderId(orderId);
  setShowIssueModal(true);
};

const closeIssueModal = () => {
  setShowIssueModal(false);
  setIssueDetails({ issueType: "", comments: "", agentId: localStorage.getItem('agent'),type:"Pickup" });
};

const handleIssueSubmit = async () => {
  try {
    console.log(issueDetails);
    
    const result = await register(
      { ...issueDetails, orderId: currentOrderId },
      'registerIssue'
    );
    if (result.success) {
      toast.success('Issue generated successfully');
      fetchData();
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    toast.error('An unexpected error occurred during issue generation');
  }
  closeIssueModal();
};

  return (
    <div className="Agent-order">
       <div className="cust-view-shop-main">
                        <p className="cust-choose-shop">ASSIGNED ORDERS</p>
                    </div>
      {data.length > 0 ? (
        <table className="table table-hover shop-tab2 p-5 mt-3">
          <thead className="ms-5 aks shop-tab2">
            <tr>
              <th className="ps-3">Sl No</th>
              <th>Order Id</th>
              <th>Shop Details</th>
              <th>Order date</th>
              <th>Pickup Date</th>
              <th>Customer details</th>
              <th>Update Status</th>
              <th>Amount</th>
            
              <th className="vo-table-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id} className="shop-tab2">
                <td>{index + 1}</td>
                <td>
                ORD{(item._id.slice(20,24)).toUpperCase()}
                </td>
                <td>{item.shopId.name}<br/>
                <IoMdCall />
 {item.shopId.contact}<br/>
                 <IoMdMail />
                 {item.shopId.email}<br/>
                <IoLocationSharp />{item.shopId.location}</td>

                <td>{item.orderDate?.slice(0,10)}</td>
                <td>{item.pickupDate.slice(0,10)}</td>
                <td>{item.custId.name}<br/>
                <IoMdCall />
 {item.custId.contact}<br/>
                 <IoMdMail />
                 {item.custId.email}<br/>
                <IoLocationSharp />{item.houseName} {item.street}
                <br/>{item.landmark}
                {item.district}</td>
                <td>
                <select onChange={(e) => handleStatusChange(e, item._id)}>
                                                    <option value="">Choose One </option>
                                                    
                                                        <option value="Pickup Completed">Pickup Completed</option>
                                                    
                                                </select>
                </td>
                <td>{item.totalAmount}</td>
                
               
               
                <td>
                <button className="shop-signup-button"
                                                     onClick={() => openIssueModal(item._id)}>Genenrate Issue</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <center>
          <h3 className='mt-5'>No Orders Found !!</h3>
        </center>
      )}


{showIssueModal && (
        <Modal show={showIssueModal} onHide={closeIssueModal}>
          <Modal.Header closeButton>
            <Modal.Title>Generate Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Issue Type</label>
              <select
                className="form-control"
                value={issueDetails.issueType}
                onChange={(e) =>
                  setIssueDetails({ ...issueDetails, issueType: e.target.value })
                }
              >
                <option value="">Select Issue Type</option>
                <option value="Address not found">Address not found

</option>
                <option value="Customer not in place">Customer not in place</option>
                <option value="Couldn’t reach on given mobile number">Couldn’t reach on given mobile number</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Comments</label>
              <textarea
                className="form-control"
                rows="3"
                value={issueDetails.comments}
                onChange={(e) =>
                  setIssueDetails({ ...issueDetails, comments: e.target.value })
                }
              ></textarea>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeIssueModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleIssueSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
     
    </div>
  );
}

export default AgentAssignedOrders;
