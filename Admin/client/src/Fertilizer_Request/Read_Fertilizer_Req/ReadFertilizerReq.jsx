import React, { useEffect, useState } from 'react'
import "./ReadFertilizerReq.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const FertilizerReq = () => {

    const [fertilizerReqs, setFertilizerReqs] = useState([]);

    useEffect(() => {
        const fetchFertilizerReqs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/geFertilizerReqs");
                console.log(response.data)
                setFertilizerReqs(response.data.data);
            } catch (error) {
                console.error('Error getting fertilizer requests', error);
            }
        };
        fetchFertilizerReqs();

    }, []);

    // Delete user function
const deleteFertilizerReq = async (fertilizerreqId) => {
    try {
        const confirmDeletion = window.confirm('Are you sure you want to remove this fertilizer request');
        if (!confirmDeletion) return;

        const response = await axios.delete(`http://localhost:8000/api/deleteFertilizerReq/${fertilizerreqId}`);
        setFertilizerReqs((prevFertilizerReq) => prevFertilizerReq.filter((fertilizerreq) => fertilizerreq._id !== fertilizerreqId));
        
        // Show success message
        toast.success(response.data.msg, { position: "top-center", className: "alert" });
    } catch (error) {
        console.error('Error deleting Fertilizer Request:', error);
    }
};

    return (
        <div className="table-container">
            <Link to={"/create_req"} className='add-btn'>Add New Fertilizer Request</Link>
            <Link to={"/manage_req"} className='add-btn'>Fertilizer Manager</Link>
            <table>
                <thead>
                    <tr>
                        <th>Farmer ID</th>
                        <th>Fertilizer Type</th>
                        <th>Quantity</th>
                        <th>Priority Level</th>
                        <th>Email</th>
                        <th>Warehouse Name</th>
                        <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Actions</th>
                    </tr>
                </thead>
                <tbody>


                    {fertilizerReqs.map((fertilizerreq, index) => (
                        <tr key={index}>
                            <td>{fertilizerreq.farmerid}</td>
                            <td>{fertilizerreq.fertilizertype}</td>
                            <td>{fertilizerreq.quantity}</td>
                            <td>{fertilizerreq.prioritylevel}</td>
                            <td>{fertilizerreq.email}</td>
                            <td>{fertilizerreq.warehousename}</td>
                            <td>
                                <button onClick={() => deleteFertilizerReq(fertilizerreq._id)} className="delete-btn">Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FertilizerReq