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

function AdminViewAllAgents() {

        const [data, setdata] = useState([]);
        const Navigate=useNavigate()
        const fetchData = async () => {
            try {
                const result = await viewCount('viewApprovedAgents');
    
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
                                    <th className=''>Profile</th>
                                    <th className=''>Name</th>
                                    <th className=''>Phone Number</th>
                                    <th className=''>Email Id</th>
                                

    
                                </tr>
                            </thead>
                            <tbody >
                                {data.map((item, index) => {
                                    return (
                                        <>
                                            <tr className='shop-tab2'>
                                                <td>{index + 1}</td>
                                                <td>                                                  
                                                <img src={`${IMG_BASE_URL}/${item.image.filename}`} className='ms-2 user-image'></img>
                                                </td>
                                                <td>{item.name}</td>
                                               
                                                <td>{item.contact}</td>
    
    
                                                <td>{item.email}</td>
                                                
                                                  
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
    


export default AdminViewAllAgents