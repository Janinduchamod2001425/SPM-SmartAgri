import React, { useState, useEffect } from 'react';
import "./fertilizerS.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'; // Import FontAwesome search icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Fertilizer() {
    const [fertilizers, setFertilizers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Hook for navigation  
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/api/fgetall");
            setFertilizers(response.data);
        };

        fetchData();
    }, []);

    const fertilizerdelete = async(fertilizerId) => {

        try {
            const confirmDeletion = window.confirm('Are you sure you want to fertilizer details');
            if (!confirmDeletion) return;

            const response = await axios.delete(`http://localhost:8000/api/fdelete/${fertilizerId}`)
            setFertilizers((prevFertilizers) => prevFertilizers.filter((fertilizer) => fertilizer._id !== fertilizerId));
            toast.success(response.data.msg, {position: "top-right"});
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function to handle report download
    const downloadReport = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/FertilizerAdminReport", {
                responseType: 'blob' // Important for downloading files
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'fertilizer_report.pdf'); // Set the file name
            document.body.appendChild(link);
            link.click(); // Simulate a click on the link to trigger download
            document.body.removeChild(link); // Clean up
        } catch (error) {
            console.error("Error downloading the report:", error);
            toast.error("Failed to download report");
        }
    };

    // Function to handle user feedback
    const navigateToFeedbackPageadmin = () => {
        navigate('/admin_feedback'); // Navigate to the feedback page
        //toast.info("User feedback functionality not implemented yet!");
    };

    // Filter fertilizers based on the search term
    const filteredFertilizers = fertilizers.filter((fertilizer) => {
        return (
            fertilizer.fername.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fertilizer.fermade.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="table-container">
            <div className="action-bar">
                {/* Left-side buttons */}
                <div className="button-group">
                    <Link to={"/addfertilizer"} className='add-btn'>Add Fertilizer</Link>
                    <button className='add-btn' onClick={downloadReport} style={{ marginRight: '10px' }}>Download Report</button>
                    <button className='add-btn' onClick={navigateToFeedbackPageadmin}>User Feedback</button> {/* New User Feedback Button */}
                </div>
                
                {/* Right-side search bar */}
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Search by Name or Company" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Fertilizer Name</th>
                        <th>Fertilizer Details</th>
                        <th>Manufacturing Company</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredFertilizers.map((fertilizer) => (
                        <tr key={fertilizer._id}>
                            <td>{fertilizer.fername}</td>
                            <td>{fertilizer.ferdetails}</td>
                            <td>{fertilizer.fermade}</td>
                            <td>
                                <div className='action-buttons'>
                                    <Link to={'/editfertilizer/' + fertilizer._id} className="update-btn">Update</Link>
                                    <button onClick={() => fertilizerdelete(fertilizer._id)} className="delete-btn">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Fertilizer;
