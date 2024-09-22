import React, { useState } from 'react'
import "./AddWarehouse.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddWarehouse = () => {

    const navigate = useNavigate();

    const warehouses = {
        idofwarehouse: "",
        warehousename: "",
        location: "",
        region: "",
        contactnumber: "",
        email: "",
        totalcapacity: "",
        distance: "",
        managername: "",

    }

    const [warehouse, setwarehouse] = useState(warehouses);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setwarehouse({ ...warehouse, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();


        await axios.post("http://localhost:8000/api/createWarehouse", warehouse)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-center", className: "alert" });
                navigate("/warehouses");
            }).catch(error => console.log(error));
    }

    return (
        <div className='addUser'>
            <Link to={"/warehouses"} className='backHome'>Back</Link>
            <h3>Add New Warehouse</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="idofwarehouse">Warehouse ID</label>
                    <input type="text" onChange={inputHandler} name="idofwarehouse" id="idofwarehouse" placeholder='Enter Warehouse ID' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="warehousename">Name</label>
                    <input type="text" onChange={inputHandler} name="warehousename" id="warehousename" placeholder='Enter Warehouse Name ' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="location">Location</label>
                    <input type="text" onChange={inputHandler} name="location" id="location" placeholder='Enter Location' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="region">Region</label>
                    <input type="text" onChange={inputHandler} name="region" id="region" placeholder='Enter  Region' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="contactnumber">Contact Number</label>
                    <input type="number" onChange={inputHandler} name="contactnumber" id="contactnumber" placeholder='Enter Email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="text" onChange={inputHandler} name="email" id="email" placeholder='Enter Email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="totalcapacity">Capacity</label>
                    <input type="number" onChange={inputHandler} name="totalcapacity" id="totalcapacity" placeholder='capacity' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="distance">Distance</label>
                    <input type="number" onChange={inputHandler} name="distance" id="distance" placeholder='Distance' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="managername">Manager Name</label>
                    <input type="text" onChange={inputHandler} name="managername" id="managername" placeholder='manager' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Add Warehouse</button>
                </div>
            </form>
        </div>
    )
}

export default AddWarehouse;
