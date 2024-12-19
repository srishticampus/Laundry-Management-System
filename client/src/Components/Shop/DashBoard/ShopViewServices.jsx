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
function ShopViewServices() {

        const [data, setdata] = useState([]);
        const [data2, setData] = useState({
            shopId:localStorage.getItem('shop')
        });

        const Navigate=useNavigate()
        const [errors, setErrors] = useState({});

        const [isAddingService, setIsAddingService] = useState(false);
        const fetchData = async () => {
            try {
                const result = await ViewById('viewAllServiceByShopId',localStorage.getItem('shop'));
    
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
        const handleAddServiceClick = () => {
            setIsAddingService(true);
        };
    
        const handleViewServicesClick = () => {
            setIsAddingService(false); 
        };
        useEffect(() => {
    
    
            fetchData(); // Call the async function
        }, []);
        const viewShop=(id)=>{
    Navigate(`/shop-edit-service/${id}`)
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
        const handleChange = (e) => {
            const { name, value } = e.target;
    
            setData({
                ...data2,
                [name]: value,
            });
            // }
        };
        const validate = () => {
            const newErrors = {};
          
    
            if (!data2.name) {
                console.log("here");
    
                newErrors.name = 'Service Name is required';
            }
            if (!data2.amount) {
    
                newErrors.amount = 'Amount is required';
            } if (!data2.description) {
                newErrors.description = 'Description is required';
            }
            
         
            
    
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };
        const handleLogin = async (e) => {
            e.preventDefault()
            console.log(errors);
    
            console.log("api called", validate());
    
            if (!validate()) {
                toast.error('Please fix the errors in the form.');
                return;
            }
    
            try {
                const result = await register(data2, 'addService');
    
                if (result.success) {
                    console.log(result);
    
                    toast.success('Service Added successfully !');
                    // navigate(-1);
    
    
                } else {
                    console.error('Registration error:', result);
                    toast.error(result.message);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
                toast.error('An unexpected error occurred during Registration');
            }
        };
        return (
            <div className='container mt-5 '>
    
    <span className="shop-service-div" onClick={handleViewServicesClick}>Services</span>
            <span className="shop-service-div" onClick={handleAddServiceClick}>Add Service</span>
            {isAddingService ? (
                <>
                <div className="shop-add-service-container">
                <div className='container ms-5 shop-add-service'>

<h2 className='shop-add-service-mainText mt-5'>  Add Service</h2>
<hr className='shop-add-service-hr'/>

    <form onSubmit={handleLogin}>
        <div className='row '>

            <div className='col-md-12 p-2 '>
                <label className='add-service-label'>Service Name</label>
                <input type="text" placeholder='Enter Service Name' className='form-control p-2' name='name' onChange={handleChange}></input>
                {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className='row '>
            <div className='col-md-12 p-2 '>
                <label className='add-service-label'>Amount</label>
                <input type="text" placeholder='Enter Amount' className='form-control p-2' name='amount' onChange={handleChange}></input>
                {errors.amount && <div id="nameError" className="invalid-feedback">{errors.amount}</div>}
            </div>
</div>
        </div>
        
      
        <div className='row'>

            <div className='col-md-12 p-2 '>
                <label className='add-service-label'>Description</label>
                <textarea placeholder='Enter Description' className='form-control p-2' name='description' rows='3' cols='10' onChange={handleChange}></textarea>
                {errors.description && <div id="nameError" className="invalid-feedback">{errors.description}</div>}
            </div>


        

        </div>


       
        <div className="shop-signup-button-div">
            <button
                type="submit"
                className="shop-signup-button"
            >Save</button>
        </div>
    </form>

</div>
</div>
                </>
            ):(
                <>
                            {data.length > 0 ?
    
    (<>
        <table className="table  table-hover shop-tab2 p-5 mt-3" >
            <thead className='ms-5 aks shop-tab2'>
                <tr >
                    <th className=' ps-3'>Sl No</th>
                    <th className=''>Services</th>
                    <th className=''>Amount</th>
                    <th className=''>Description</th>
               
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
                                <td>{item.amount}</td>
                            


                                <td>{item.description}</td>
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
    </>) : (<>
        <center>  <h3>No Services Found</h3></center>
    </>)
}
                    </>
            )
        }
            </div>
        )
    }
    
export default ShopViewServices