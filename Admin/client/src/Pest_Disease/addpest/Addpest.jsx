import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "./addpest.css";
import { Link, useNavigate } from 'react-router-dom';

const Addpest = () => {

    const pests = {
        pname: "",
        ptype: "",
        symptom: ["", "", ""],
        treatment: ["", "", ""],

    }

    const [pest, setPest] = useState(pests);
    const navigate = useNavigate();


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


    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/pcreate", pest)
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

            <h3>Add New</h3>
            <form className="addPestForm" onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="pname">Name</label>
                    <input type="text" onChange={inputChangeHandler} id="pname" name="pname" autoComplete="off" placeholder="Enter name" />
                </div>

                <div className="inputGroup">
                    <label htmlFor="ptype">Type</label>
                    <select onChange={inputChangeHandler} id="ptype" name="ptype" autoComplete="off" placeholder="Choose type">
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
                    <button type="Submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Addpest 