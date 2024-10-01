import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./UpdateWarehouse.css";
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateWarehouse = () => {

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

    const { id } = useParams();

    const navigate = useNavigate();

    const [warehouse, setWarehouse] = useState(warehouses);

    // Input Change Handler
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setWarehouse({ ...warehouse, [name]: value });
    }

    // useEffect(): React hook for handling side effects in function components. Here, it fetches user data based on the id parameter when the component mounts or when id changes.
    useEffect(() => {

        // axios.get(): Fetches user data from the specified API endpoint.
        axios.get(`http://localhost:8000/api/getWarehouse/${id}`)
            .then((response) => {
                //setUser(): Updates the user state with the received data.
                setWarehouse(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])

    // 
    const submitForm = async (e) => {
        // e.preventDefault(): Prevents the default form submission behavior.
        e.preventDefault();
        // axios.put(): Sends an HTTP PUT request to update the user data.
        await axios.patch(`http://localhost:8000/api/updateWarehouse/${id}`, warehouse)
            .then((response) => {
                // toast.success(): Displays a success message using the react-hot-toast library upon successful data update.
                toast.success(response.data.msg, { position: "top-center", className: "alert" });
                // navigate("/"): Navigates back to the home page after a successful update
                navigate("/warehouses");
            }).catch(error => console.log(error));
    }

    // JSX Rendering the form
    return (
        <div className='addUser'>
            <Link to={"/warehouses"} className='backHome'>Back to Home</Link>
            <h3>Update Warehouse</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="idofwarehouse">Warehouse ID</label>
                    <input type="text" value={warehouse.idofwarehouse} onChange={inputChangeHandler} name="idofwarehouse" id="idofwarehouse" autoComplete='off' placeholder='Enter Warehouse ID' disabled/>
                </div>
                <div className='inputGroup'>
                    <label htmlFor="warehousename">Name</label>
                    <input type="text" value={warehouse.warehousename} onChange={inputChangeHandler} name="warehousename" id="warehousename" autoComplete='off' placeholder='Enter Warehouse Name ' disabled/>
                </div>
                <div className='inputGroup'>
                    <label htmlFor="location">Location</label>
                    <input type="text" value={warehouse.location} onChange={inputChangeHandler} name="location" id="location" autoComplete='off' placeholder='Enter Location' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="region">Region</label>
                    <input type="text" value={warehouse.region} onChange={inputChangeHandler} name="region" id="region" autoComplete='off' placeholder='Enter  Region' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="contactnumber">Contact Number</label>
                    <input type="number" value={warehouse.contactnumber} onChange={inputChangeHandler} name="contactnumber" id="contactnumber" autoComplete='off' placeholder='Enter Email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="text" value={warehouse.email} onChange={inputChangeHandler} name="email" id="email" autoComplete='off' placeholder='Enter Email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="totalcapacity">Capacity</label>
                    <input type="number" value={warehouse.totalcapacity} onChange={inputChangeHandler} name="totalcapacity" id="totalcapacity" autoComplete='off' placeholder='capacity' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="distance">Distance</label>
                    <input type="number" value={warehouse.distance} onChange={inputChangeHandler} name="distance" id="distance" autoComplete='off' placeholder='Distance' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="managername">Manager Name</label>
                    <input type="text" value={warehouse.managername} onChange={inputChangeHandler} name="managername" id="managername" autoComplete='off' placeholder='manager' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Update Warehouse</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateWarehouse;
