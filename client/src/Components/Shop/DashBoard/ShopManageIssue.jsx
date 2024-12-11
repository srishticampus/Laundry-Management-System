import React, { useEffect, useState } from 'react';
import '../../../Styles/ViewFeedback.css';
import '../../../Styles/ViewComplaints.css';
import { viewCount } from '../../Services/AdminService';
import { toast } from "react-toastify";
import ReactStars from 'react-stars'; // Import ReactStars
import { IMG_BASE_URL } from '../../Services/BaseURL';
import { resetPassword, ViewById } from '../../Services/CommonServices';

function ShopManageIssue() {
    console.log('bjhj');

    const [feedbacks, setFeedbacks] = useState([]);

    // Fetch feedback data
    const fetchData = async () => {
        try {
            console.log('in use');

            const result = await ViewById('viewIssuesByShopId', localStorage.getItem('shop'));
            console.log(result);

            if (result.success) {
                if (result.user.length > 0) setFeedbacks(result.user);
                else setFeedbacks([]);
            } else {
                console.error('Data error:', result);
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred during Data View');
        }
    };

    useEffect(() => {
        fetchData(); // Call the async function
    }, []);
const enquire=async(id)=>{
    try {
        console.log('in use');

        const result = await ViewById('updateIssuesByShopId', id);
        console.log(result);

        if (result.success) {
           toast.success('Enquiry Send Successfully')
           fetchData(); 
        } else {
            console.error('Data error:', result);
            toast.error(result.message);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred during Data View');
    }

}
    return (
        <div className="container mt-3">

            {feedbacks.length > 0 ? (
                <>
                    <h5 className="mt-5">View Issues</h5>
                    <div className="complaints-grid">
                        {feedbacks.map((item, index) => (
                            <div key={index} className="admin-comp-container">
                                <div className="row align-items-center">

                                    <p className="comp-footer">
                                        Issue ID : ID{item._id.slice(21, 24)} &nbsp; .&nbsp;
                                        Issue Type : {item.issueType}

                                    </p>
                                </div>


                                <button type='button' className='issue_button' onClick={()=>{enquire(item._id)}}>Enquire The Issue</button>

                                <p className="feedback-comments ">{item.comments}</p>
                                <p className="comp-footer">
                                    {item.agentId.name} &nbsp;&nbsp;&nbsp; .&nbsp;&nbsp;&nbsp;
                                    {item.agentId.contact}&nbsp;&nbsp;&nbsp; . &nbsp;&nbsp;&nbsp;
                                    {item.createdAt.slice(0, 10)} &nbsp;&nbsp;&nbsp; . {/* Formatting date */}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <center>
                    <h3>No Issues Found</h3>
                </center>
            )}
        </div>
    );
}

export default ShopManageIssue;
