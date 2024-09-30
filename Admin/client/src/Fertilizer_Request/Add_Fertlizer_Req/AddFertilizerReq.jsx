import React, { useState } from 'react'
import "./AddFertilizerReq.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddFertilizerReq = () => {

    const navigate = useNavigate();

    const fertilizerReqs = {
        farmerid: "",
        fertilizertype: "",
        quantity: "",
        prioritylevel: "",
        email: "",

    }

    const [fertilizerReq, setfertilizerReq] = useState(fertilizerReqs);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setfertilizerReq({ ...fertilizerReq, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();


        await axios.post("http://localhost:8000/api/createFertilizerReq", fertilizerReq)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-center", className: "alert" });
                navigate("/fertilizerRequests");
            }).catch(error => console.log(error));
    }

    return (
        <div className='addUser'>
            <Link to={"/fertilizerRequests"} className='backHome'>Back</Link>
            <h3>Add New Request</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="farmerid">Farmer ID</label>
                    <input type="text" onChange={inputHandler} name="farmerid" id="farmerid" placeholder='Enter Farmer ID' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="fertilizertype">Fertilizer Type</label>
                    <input type="text" onChange={inputHandler} name="fertilizertype" id="fertilizertype" placeholder='Enter fertilizer requests type ' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" onChange={inputHandler} name="quantity" id="quantity" placeholder='Enter quantity' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="prioritylevel">Priority Level</label>
                    <input type="text" onChange={inputHandler} name="prioritylevel" id="prioritylevel" placeholder='Enter  priority level' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={inputHandler} name="email" id="email" placeholder='Enter Email' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Add Request</button>
                </div>
            </form>
        </div>
    )
}

export default AddFertilizerReq;
