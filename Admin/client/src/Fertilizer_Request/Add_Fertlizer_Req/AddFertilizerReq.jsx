import React, { useState } from 'react';
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
        warehousename: "",
    };

    const [fertilizerReq, setfertilizerReq] = useState(fertilizerReqs);
    const [emailError, setEmailError] = useState("");

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setfertilizerReq({ ...fertilizerReq, [name]: value });

        // Perform email validation when user types in the email field
        if (name === "email") {
            validateEmail(value);
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError(""); // Clear error if email is valid
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();

        // Ensure email is valid before submitting
        if (!fertilizerReq.email || emailError) {
            toast.error("Please provide a valid email address.", { position: "top-center", className: "alert" });
            return;
        }

        await axios.post("http://localhost:8000/api/createFertilizerReq", fertilizerReq)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-center", className: "alert" });
                navigate("/fertilizerRequests");
            }).catch(error => console.log(error));
    };

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
                    <select onChange={inputHandler} name="fertilizertype" id="fertilizertype">
                        <option value="">Select Fertilizer Type</option>
                        <option value="Urea">Urea</option>
                        <option value="TSP">TSP</option>
                        <option value="MOP">MOP</option>
                        <option value="SOA">SOA</option>
                    </select>
                </div>
                <div className='inputGroup'>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" onChange={inputHandler} name="quantity" id="quantity" placeholder='Enter quantity' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="prioritylevel">Priority Level</label>
                    <select onChange={inputHandler} name="prioritylevel" id="prioritylevel">
                        <option value="">Select Priority Level</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        onChange={inputHandler}
                        name="email"
                        id="email"
                        placeholder='Enter Email'
                        className={emailError ? "inputError" : ""}
                    />
                    {emailError && <span className="error">{emailError}</span>}
                </div>
                <div className='inputGroup'>
                    <label htmlFor="warehousename">Warehouse Name</label>
                    <input type="text" onChange={inputHandler} name="warehousename" id="warehousename" placeholder='Enter Warehouse Name' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Add Request</button>
                </div>
                {emailError && <span className="error">{emailError}</span>}
            </form>
        </div>
    );
}

export default AddFertilizerReq;
