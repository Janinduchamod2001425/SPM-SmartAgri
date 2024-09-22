import React, { useState } from 'react'
import "./Add.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Add = () => {

    const navigate = useNavigate();

    const users = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        contact: "",
        location: "",
    }

    const [user, setUser] = useState(users);

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();

        // Check if password and confirmPassword match
        if (user.password !== user.confirmPassword) {
            toast.error("Passwords do not match", { position: "top-center", className: "alert" });
            return;
        }

        await axios.post("http://localhost:8000/api/create", user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-center", className: "alert" });
                navigate("/users");
            }).catch(error => console.log(error));
    }

    return (
        <div className='addUser'>
            <Link to={"/users"} className='backHome'>Back</Link>
            <h3 className='title'>Add New User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="name">Name</label>
                    <input type="text" onChange={inputHandler} name="name" id="name" placeholder='Enter user name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={inputHandler} name="email" id="email" placeholder='Enter user Email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={inputHandler} name="password" id="password" placeholder='password' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" onChange={inputHandler} name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="contact">Contact</label>
                    <input type="number" onChange={inputHandler} name="contact" id="contact" placeholder='Enter user contact' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="location">District</label>
                    <input type="location" onChange={inputHandler} name="location" id="location" placeholder='location' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Add User</button>
                </div>
            </form>
        </div>
    )
}

export default Add;
