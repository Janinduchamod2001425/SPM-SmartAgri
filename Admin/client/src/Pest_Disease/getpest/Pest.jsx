import React, { useState, useEffect } from 'react'
import "./pest.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Pest = () => {

    const [pests, setPests] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8000/api/pgetall`)
            setPests(response.data);
        }

        fetchData();
    }, [])

    const deletePest = async (pestId) => {
        await axios.delete(`http://localhost:8000/api/pdelete/${pestId}`)
            .then((response) => {
                setPests((prevPest) => prevPest.filter((pest) => pest._id !== pestId))
                toast.success(response.data.msg, { position: 'top-right' })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    

    return (
        <div className='pestTable'>
            <Link to={"/addpest"} className='addButton'>Add New </Link>
            <Link to={"/admin_disease"} className='addButton'>User Feedback</Link>
            
            
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Type</th>
                        <th>Symptom</th>
                        <th>Treatment</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        pests.map((pest, index) => {
                            return (
                                <tr key={pest._id}>
                                    <td> {pest.pname}</td>
                                    <td> {pest.ptype}</td>
                                    <td>
                                        <ul>
                                            {pest.symptom.map((symptom, index) => (
                                                <li key={index}>{symptom}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <ul>
                                            {pest.treatment.map((treatment, index) => (
                                                <li key={index}>{treatment}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td >
                                        <div className='action_buttons'>
                                            <Link to={'/updatepest/' + pest._id} className="update-btn" >Update</Link>
                                            <button onClick={() => deletePest(pest._id)} className="delete-btn" >Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Pest