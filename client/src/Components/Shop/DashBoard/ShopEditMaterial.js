import React, { useEffect, useState } from 'react'
import del from '../../../Assets/delete.png'
import notepad from '../../../Assets/notepad-edit.png'
import inactive from '../../../Assets/inactive.png'
import active from '../../../Assets/active.png'
import { approveById, viewCount } from '../../Services/AdminService'
import { toast } from "react-toastify";
import '../../../Styles/ViewAllshops.css'
import { useNavigate, useParams } from 'react-router-dom'
import { register, resetPassword, ViewById } from '../../Services/CommonServices'
import '../../../Styles/ShopDashboard.css'

function ShopEditMaterial() {
    const [data, setdata] = useState([]);
  

    const Navigate=useNavigate()
    const [errors, setErrors] = useState({});
const {id}=useParams()
    const fetchData = async () => {
        try {
            const result = await ViewById('viewMaterialById',id);

            if (result.success) {
                console.log(result);
                if (result.user)
                    setdata(result.user);
                else
                    setdata({})
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

   
  const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;

        setdata({
            ...data,
            [name]: value,
        });
        // }
    };
    const validate = () => {
        const newErrors = {};
      

        if (!data.name) {
            console.log("here");

            newErrors.name = 'Material Name is required';
        }
        if (!data.amount) {

            newErrors.amount = 'Amount is required';
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
            const result = await resetPassword(data, 'editmaterialById',id);

            if (result.success) {
                console.log(result);

                toast.success('Material Updated successfully !');
                navigate('/shop-view-material');


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
    <div className="shop-add-service-container">
    <div className='container ms-5 shop-add-service'>

<h2 className='shop-add-service-mainText mt-5'> Edit Service</h2>
<hr className='shop-add-service-hr'/>

<form onSubmit={handleLogin}>
<div className='row '>

<div className='col-md-12 p-2 '>
    <label className='add-service-label'>Material Name</label>
    <input type="text" placeholder='Enter Service Name' className='form-control p-2' name='name' value={data.name} onChange={handleChange}></input>
    {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
</div>
<div className='row '>
<div className='col-md-12 p-2 '>
    <label className='add-service-label'>Amount</label>
    <input type="text" placeholder='Enter Amount' className='form-control p-2' value={data.amount} name='amount' onChange={handleChange}></input>
    {errors.amount && <div id="nameError" className="invalid-feedback">{errors.amount}</div>}
</div>
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
  )
}

export default ShopEditMaterial