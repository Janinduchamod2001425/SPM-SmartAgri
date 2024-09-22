import React, { useEffect, useState } from 'react'
import "./User.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const User = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/getall");
                setUsers(response.data);
            } catch (error) {
                console.error('Error getting users', error);
            }
        };
        fetchUsers();
    }, []);

    // Delete user function
    const deleteUser = async (userId) => {
        try {

            const confirmDeletion = window.confirm('Are you sure you want to remove this user');
            if (!confirmDeletion) return;

            const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            toast.success(response.data.msg, { position: "top-center", className: "alert" });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="table-container">
            <Link to={"/create"} className='add-btn'>Add New User</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>District</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.contact}</td>
                            <td>{user.location}</td>
                            <td>
                                <Link to={`/edit/` + user._id}><button onClick={() => onUpdate(user)} className="update-btn">Update</button></Link>
                                <button onClick={() => deleteUser(user._id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default User