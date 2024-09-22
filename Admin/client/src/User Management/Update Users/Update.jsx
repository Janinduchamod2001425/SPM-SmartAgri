import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./Update.css";
import axios from 'axios';
import toast from 'react-hot-toast';

const Update = () => {

    const users = {
        name: "",
        email: "",
        contact: "",
        location: "",
    }

    const { id } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState(users);

    // Input Change Handler
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    // useEffect(): React hook for handling side effects in function components. Here, it fetches user data based on the id parameter when the component mounts or when id changes.
    useEffect(() => {

        // axios.get(): Fetches user data from the specified API endpoint.
        axios.get(`http://localhost:8000/api/getone/${id}`)
            .then((response) => {
                //setUser(): Updates the user state with the received data.
                setUser(response.data);
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
        await axios.put(`http://localhost:8000/api/update/${id}`, user)
            .then((response) => {
                // toast.success(): Displays a success message using the react-hot-toast library upon successful data update.
                toast.success(response.data.msg, { position: "top-center", className: "alert" });
                // navigate("/"): Navigates back to the home page after a successful update
                navigate("/users");
            }).catch(error => console.log(error));
    }

    // JSX Rendering the form
    return (
        <div className='addUser'>
            <Link to={"/users"} className='backHome'>Back to Home</Link>
            <h3>Update User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor="name">Name</label>
                    <input type="text" value={user.name} onChange={inputChangeHandler} name="name" id="name" autoComplete='off' placeholder='Enter User Name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} onChange={inputChangeHandler} name="email" id="email" autoComplete='off' placeholder='Enter User Email' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="contact">Contact</label>
                    <input type="text" value={user.contact} onChange={inputChangeHandler} name="contact" id="contact" autoComplete='off' placeholder='Enter User Contact no.' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="location">District</label>
                    <input type="text" value={user.location} onChange={inputChangeHandler} name="location" id="location" autoComplete='off' placeholder='Enter user location' />
                </div>
                <div className='inputGroup'>
                    <button type='submit'>Update User</button>
                </div>
            </form>
        </div>
    )
}

export default Update;
