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

function ShopEditWorkingHours() {
    const [data, setdata] = useState([]);
  

    const Navigate=useNavigate()
    const [errors, setErrors] = useState({});
const {id}=useParams()
    const fetchData = async () => {
        try {
            const result = await ViewById('viewWorkingHoursById',id);

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
      

        if (!data.day) {

            newErrors.day = 'Day is required';
        }
        if (!data.startTime) {

            newErrors.startTime = 'Start Time is required';
        } 
        
        if (!data.endTime) {

            newErrors.endTime = 'End Time is required';
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
            const result = await resetPassword(data, 'editWorkingHoursById',id);

            if (result.success) {
                console.log(result);

                toast.success('Hours Updated successfully !');
                navigate('/shop-view-workinghours');


            } else {
                console.error('Registration error:', result);
                toast.error(result.message);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast.error('An unexpected error occurred ');
        }
    };
  return (
    <div className="shop-add-service-container">
    <div className='container ms-5 shop-add-service'>

<h2 className='shop-add-service-mainText mt-5'> Edit Working Hours</h2>
<hr className='shop-add-service-hr'/>

<form onSubmit={handleLogin}>
<div className='row '>

<div className='col-md-12 p-2 '>
    <label className='add-service-label'>Day</label>
    <select placeholder='Day' className='form-control p-2' name='day' onChange={handleChange} value={data.day}>
    <option value="">Select Day</option>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
</select>
    {errors.name && <div id="nameError" className="invalid-feedback">{errors.name}</div>}
</div>
<div className='row '>
<div className='col-md-6 p-2 '>
    <label className='add-service-label'>Start Time</label>
    <input type="time" placeholder='Enter Amount' className='form-control p-2' value={data.startTime} name='startTime' onChange={handleChange}></input>
    {errors.startTime && <div id="nameError" className="invalid-feedback">{errors.startTime}</div>}
</div>
<div className='col-md-6 p-2 '>
    <label className='add-service-label'>End Time</label>
    <input type="time" placeholder='Enter Amount' className='form-control p-2' value={data.endTime} name='endTime' onChange={handleChange}></input>
    {errors.endTime && <div id="nameError" className="invalid-feedback">{errors.endTime}</div>}
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

export default ShopEditWorkingHours