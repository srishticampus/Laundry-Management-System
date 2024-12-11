import React, { useEffect, useState } from 'react'
import eye from '../../../Assets/eye.png'
import notepad from '../../../Assets/notepad-edit.png'
import inactive from '../../../Assets/inactive.png'
import active from '../../../Assets/active.png'
import { approveById, viewCount } from '../../Services/AdminService'
import { toast } from "react-toastify";
import '../../../Styles/ViewAllshops.css'
import { useNavigate } from 'react-router-dom'
import { IMG_BASE_URL } from '../../Services/BaseURL';
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { IoMdCall } from "react-icons/io";
function AdminViewAllOrders() {

        const [data, setdata] = useState([]);
        const Navigate=useNavigate()
        const fetchData = async () => {
            try {
                const result = await viewCount('viewAllOrders');
    
                if (result.success) {
                    console.log(result);
                    if (result.user.length > 0)
                        setdata(result.user);
                    else
                        setdata([])
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
        const editShop=(id)=>{
    Navigate(`/admin-edit-shop/${id}`)
        }
        const viewShop=(id)=>{
            Navigate(`/admin-view-single-shop/${id}`)
                }
        const toggleShop = async (id) => {
    
            try {
                const result = await approveById('toggleShopActivation', id);
    
                if (result.success) {
                    console.log(result);
    
                    toast.success('Request Done Succesfully')
                    await fetchData()
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
            <div className='container mt-3'>
      <h3 className=' shop-view-main-head mt-5'>View Registered Agents</h3>
                <h5 className=' shop-view-head mt-3'>Registered Agents</h5>
    
                {data.length > 0 ?
    
                    (<>
                        <table className="table  table-hover shop-tab2 p-5 mt-3" >
                            <thead className='ms-5 aks shop-tab2'>
                                <tr >
                                <th className=' ps-3'>Sl No</th>
                                <th className=''>Order ID</th>
                                <th className=''>Customer Name</th>
                                <th className=''>Shop Name</th>

                                <th className=''>Order Date</th>
                                <th className=''>Total Amount</th>
                                <th className=''>Order Status</th>


    
                                </tr>
                            </thead>
                            <tbody >
                                {data.map((item, index) => {
                                    return (
                                        <>
                                            <tr className='shop-tab2'>
                                            <td>{index + 1}</td>
                                            <td>ORD{item._id.slice(20, 24).toUpperCase()}</td>
                                            <td>{item.custId.name}</td>
                                            <td>{item.shopId.name}</td>



                                         
                                            <td>{item.orderDate.slice(0,10)}</td>
                                            <td>{item.totalAmount}</td>
                                            <td>{item.serviceStatus}</td>
                                            </tr>
                                        </>
                                    )
                                })
    
                                }
    
                            </tbody>
                        </table>
                    </>) : (<>
                        <center>  <h3>No New Requests Found</h3></center>
                    </>)
                }
            </div>
        )
    }
    


export default AdminViewAllOrders