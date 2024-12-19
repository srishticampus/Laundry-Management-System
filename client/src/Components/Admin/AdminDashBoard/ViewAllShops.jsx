import React, { useEffect, useState } from 'react'
import eye from '../../../Assets/eye.png'
import notepad from '../../../Assets/notepad-edit.png'
import inactive from '../../../Assets/inactive.png'
import active from '../../../Assets/active.png'
import { approveById, viewCount } from '../../Services/AdminService'
import { toast } from "react-toastify";
import '../../../Styles/ViewAllshops.css'
import { useNavigate } from 'react-router-dom'
function ViewAllShops() {
    const [data, setdata] = useState([]);
    const Navigate=useNavigate()
    const fetchData = async () => {
        try {
            const result = await viewCount('viewAllShops');

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

            <h5 className=' shop-view-head mt-5'>View Laundry Shops</h5>

            {data.length > 0 ?

                (<>
                    <table className="table  table-hover shop-tab2 p-5 mt-3" >
                        <thead className='ms-5 aks shop-tab2'>
                            <tr >
                                <th className=' ps-3'>Sl No</th>
                                <th className=''>Shop Name</th>
                                <th className=''>Reg Number</th>
                                <th className=''>Email</th>
                                <th className='vo-table-head'>Phone Number</th>
                           
                                <th className='vo-table-head '>Action</th>

                            </tr>
                        </thead>
                        <tbody className='shop-tab2'>
                            {data.map((item, index) => {
                                return (
                                    <>
                                        <tr className='shop-tab2'>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.owner}</td>
                                            <td>{item.contact}</td>


                                            <td>{item.password}</td>
                                            <td>
                                                <img src={eye} className='mr-3' 
                                                onClick={() => {viewShop(item._id)

                                                 }}
                                                 />
                                                <img src={notepad} className='ms-2' 
                                                onClick={() => { editShop(item._id) 

                                                }}
                                                 />
                                                 {console.log("j",item.isActive)
                                                 }
                                                 {item.isActive?
                                                <img src={active} className='ms-3 ' onClick={() => { toggleShop(item._id) }}></img> 
                                                :
                                                <img src={inactive} className='ms-2'  onClick={() => { toggleShop(item._id) }}></img>
                                                }

                                            </td>
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

export default ViewAllShops