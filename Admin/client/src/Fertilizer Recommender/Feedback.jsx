import React, { useState, useEffect } from 'react';
import "./fertilizerS.css";
import axios from 'axios';
import toast from "react-hot-toast";



function Feedback() {
    const [feedbacks, setFeedbacks] = useState([]);
    

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3000/api/feedbackgetall");
            setFeedbacks(response.data);
        };

        fetchData();
    }, []);

    const feedbackdelete = async(feedbackId) => {
        await axios.delete(`http://localhost:3000/api/feedbackdelete/${feedbackId}`)
        .then((response) => {
            setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== feedbackId));
            toast.success(response.data.msg, {position: "top-right"});
        }).catch((error) => {
            console.log(error);
        });
    };

  
  

   

    return (
        <div className="table-container">
            <div className="action-bar">
               
                
               
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Fertilizer Name</th>
                        <th>Concern</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredFeedbacks.map((feedback) => (
                        <tr key={feedback._id}>
                            <td>{feedback.feedbackname}</td>
                            <td>{feedback.feedbackconsern}</td>
                            <td>{feedback.feedbackemail}</td>
                            <td>{feedback.feedbacknumber}</td>
                            <td>
                                <div className='action-buttons'>
                                    
                                    <button onClick={() => feedbackdelete(feedback._id)} className="delete-btn">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Feedback;
