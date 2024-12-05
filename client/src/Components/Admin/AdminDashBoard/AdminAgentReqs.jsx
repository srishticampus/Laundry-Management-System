import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import { approveById, viewCount } from '../../Services/AdminService';
import { toast } from "react-toastify";
import '../../../Styles/ViewAllshops.css';
import { useNavigate } from 'react-router-dom';
import { IMG_BASE_URL } from '../../Services/BaseURL';
import tick from '../../../Assets/tick.png'
function AdminAgentReqs() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const navigate = useNavigate();

  // Fetch Data
  const fetchData = async () => {
    try {
      const result = await viewCount('viewAgentsforApproval');
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

  // Handle Evidence Click
  const handleEvidenceClick = (filename, e) => {
    e.preventDefault();
    console.log("file",filename);
    
    if (!filename) {
      setFileType('none');
      setEvidenceUrl(null);
    } else {
      const fileUrl = `${IMG_BASE_URL}/${filename}`;
      const fileExtension = fileUrl.split('.').pop().toLowerCase();
      setFileType(fileExtension);
      setEvidenceUrl(fileUrl);
    }
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Approve Request
  const approve = async (id) => {
    try {
      const result = await approveById('approveAgentById', id);
      if (result.success) {
        toast.success('Request approved successfully');
        fetchData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred during approval');
    }
  };

  // Reject Request
  const reject = async (id) => {
    try {
      const result = await approveById('deleteAgentById', id);
      if (result.success) {
        toast.success('Request rejected successfully');
        fetchData();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An unexpected error occurred during rejection');
    }
  };

  return (
    <div className="container mt-3">
      <h3 className="shop-view-main-head mt-5">View Delivery Agents Requests</h3>
      {data.length > 0 ? (
        <table className="table table-hover shop-tab2 p-5 mt-3">
          <thead className="ms-5 aks shop-tab2">
            <tr>
              <th className="ps-3">Sl No</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email ID</th>
              <th>Licence</th>
              <th>RC Book</th>
              <th>Insurance</th>
              <th className="vo-table-head">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id} className="shop-tab2">
                <td>{index + 1}</td>
                <td>
                  {item.image?.filename ? (
                    <img
                      src={`${IMG_BASE_URL}/${item.image.filename}`}
                      alt="Profile"
                      className="ms-2 user-image"
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.contact}</td>
                <td>{item.email}</td>
                <td>
                   
                  <a
                    href="#"
                    onClick={(e) => handleEvidenceClick(item.license?.filename, e)}
                  >
                    Click here
                  </a>
                </td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => handleEvidenceClick(item.rc?.filename, e)}
                  >
                    Click here
                  </a>
                </td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => handleEvidenceClick(item.insurance?.filename, e)}
                  >
                    Click here
                  </a>
                </td>
                <td>
                  <img
                    src={tick}
                    alt="Approve"
                    className="ms-3"
                    onClick={() => approve(item._id)}
                  />
                  <AiOutlineCloseCircle
                    className="ms-2"
                    onClick={() => reject(item._id)}
                    style={{ color: 'red', height: '50px', width: '22px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <center>
          <h3 className='mt-5'>No New Requests Found !!</h3>
        </center>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Evidence</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {fileType === 'none' ? (
            <p>No Evidence Added</p>
          ) : fileType === 'pdf' ? (
            <iframe src={evidenceUrl} width="100%" height="500px" title="Evidence PDF" />
          ) : (
            <img src={evidenceUrl} alt="Evidence" className="img-fluid" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminAgentReqs;
