import React, { useEffect, useState } from "react";
import "../addpest/addpest.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Editpest = () => {
    const pests = {
        pname: "",
        ptype: "",
        symptom: ["", "", ""],
        treatment: ["", "", ""],


    }
    const { id } = useParams();
    const navigate = useNavigate();
    const [pest, setPest] = useState(pests);


    const inputChangeHandler = (e, index, type) => {
        const { name, value } = e.target;
        if (type === 'symptom') {
            const newSymptoms = [...pest.symptom];
            newSymptoms[index] = value;
            setPest({ ...pest, symptom: newSymptoms });
        } else if (type === 'treatment') {
            const newTreatments = [...pest.treatment];
            newTreatments[index] = value;
            setPest({ ...pest, treatment: newTreatments });
        } else {
            setPest({ ...pest, [name]: value });
        }
    }


    useEffect(() => {
        axios.get(`http://localhost:8000/api/pgetone/${id}`)
            .then((response) => {
                setPest(response.data)

            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])





    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/pupdate/${id}`, pest)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" })
                navigate("/pest")
            }).catch(error => console.log(error))
    }

    return (
        <div className='addPest'>
            <Link to="/pest">
                <button className="backButton">Back</button>
            </Link>
            <h3>Update details</h3>
            <form className="addPestForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="pname">Name</label>
                    <input type="text" value={pest.pname} onChange={inputChangeHandler} id="pname" name="pname" autoComplete="off" placeholder="Enter name" />
                </div>

                <div className="inputGroup">
                    <label htmlFor="ptype">Type</label>
                    <select value={pest.ptype} onChange={inputChangeHandler} id="ptype" name="ptype" autoComplete="off" placeholder="Choose type">
                        <option value="">Select type</option>
                        <option value="Pest">Pest</option>
                        <option value="Disease">Disease</option>
                    </select>
                </div>
                <div className="inputGroup">
                    <label>Symptoms</label>
                    {pest.symptom.map((symptom, index) => (
                        <input
                            key={index}
                            type="text"
                            value={symptom}
                            onChange={(e) => inputChangeHandler(e, index, 'symptom')}
                            placeholder={`Enter symptom ${index + 1}`}
                        />
                    ))}
                </div>
                <div className="inputGroup">
                    <label>Treatments</label>
                    {pest.treatment.map((treatment, index) => (
                        <input
                            key={index}
                            type="text"
                            value={treatment}
                            onChange={(e) => inputChangeHandler(e, index, 'treatment')}
                            placeholder={`Enter treatment ${index + 1}`}
                        />
                    ))}
                </div>
                <div className="inputGroup">
                    <button type="Submit">Update</button>
                </div>
            </form>
        </div>
    )
}

export default Editpest