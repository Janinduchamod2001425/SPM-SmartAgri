import React, { useState, useEffect } from 'react';
import "./getpest/pest.css";
import axios from 'axios';




function Disease() {
    const [diseases, setDiseases] = useState([]);
    
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:3000/api/diseasegetAll`);
            setDiseases(response.data);
        };

        fetchData();
    }, []);

    const downloadReport = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/generateDiseaseReport', {
                responseType: 'blob', // Important for file download
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'disease_report.pdf'); // File name
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error downloading report", error);
        }
    };

  
    return (
        <div className="table-container">
            <div className="action-bar">
               <p>User Feedback</p>
               <button onClick={downloadReport}>Download Report</button>
               
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Disease name</th>
                        <th>Rating</th>
                        <th>Message</th>
                        
                    </tr>
                </thead>

                <tbody>
                    {diseases.map((disease) => (
                        <tr key={disease._id}>
                            <td>{disease.disename}</td>
                            <td>{disease.rating}</td>
                            <td>{disease.feedback}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default  Disease;