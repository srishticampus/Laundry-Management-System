import React, { useEffect, useState } from 'react'
import del from '../../../Assets/delete.png'
import notepad from '../../../Assets/notepad-edit.png'
import inactive from '../../../Assets/inactive.png'
import active from '../../../Assets/active.png'
import { approveById, viewCount } from '../../Services/AdminService'
import { toast } from "react-toastify";
import '../../../Styles/ViewAllshops.css'
import { useNavigate } from 'react-router-dom'
import { register, ViewById } from '../../Services/CommonServices'
import '../../../Styles/ShopDashboard.css'
function ShopWorkingHoursView() {

        const [data, setdata] = useState([]);
       

        const Navigate=useNavigate()
        const [errors, setErrors] = useState({});

        const fetchData = async () => {
            try {
                const result = await ViewById('viewWorkingHoursByShopId',localStorage.getItem('shop'));
    
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
        const viewShop=(id)=>{
    Navigate(`/shop-edit-workinghours/${id}`)
        }
       
      
       
        return (
            <div className='container mt-5 '>
    
    <span className="shop-service-div" >View Working Hours</span>
          
            
    
        <table className="table  table-hover shop-tab2 p-5 mt-3" >
            <thead className='ms-5 aks shop-tab2'>
                <tr >
                    <th className=' ps-3'>Sl No</th>
                    <th className=''>Day</th>
                    <th className=''>Working Hours</th>
               
                    <th className='vo-table-head '>Action</th>

                </tr>
            </thead>
            <tbody className='shop-tab2'>
                {data.map((item, index) => {
                    return (
                        <>
                            <tr className='shop-tab2'>
                                <td>{index + 1}</td>
                                <td>{item.day}</td>
                                <td>{item.startTime ?item.startTime  +'- '+item.endTime:'Holiday'}</td>
                            


                                <td>
                                <img src={notepad} className='ms-2'
                                   onClick={() => { viewShop(item._id)

                                     }}
                                     />
                                  
                                    

                                </td>
                            </tr>
                        </>
                    )
                })

                }

            </tbody>
        </table>
 
            </div>
        )
    }
    
export default ShopWorkingHoursView