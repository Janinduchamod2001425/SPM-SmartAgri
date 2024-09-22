import React, { useState, useEffect } from 'react';
import './UpdateGenetic.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateGenetic = () => {

    const initialState = {
        crop: '',
        scientific_name: '',
        variety: '',
        region: '',
        trait_name: '',
        gene_associated: '',
        modification_method: '',
        description: '',
        modification_id: '',
        target_gene: '',
        modification_technique: '',
        outcomes: '',
        soil_type: '',
        climate: '',
        pests_diseases: '',
        economic_impact: '',
        environmental_impact: '',
        social_impact: '',
    };

    const { id } = useParams();

    const navigate = useNavigate();

    const [geneticData, setGeneticData] = useState(initialState);

    // Input Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGeneticData({ ...geneticData, [name]: value });
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getonegenetic/${id}`)
            .then((response) => {
                setGeneticData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/updategenetic/${id}`, geneticData)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-center", className: "alert" });
                navigate("/genetics");
            }).catch(error => console.log(error));
    }

    return (
        <div className='addGenetic'>
            <Link to={'/genetics'} className='backHome'>Back</Link>
            <h3 className='title'>Add New Genetic Data</h3>
            <form className='addGeneticForm' onSubmit={submitForm}>
                <div className='inputGroup'>
                    <label htmlFor='crop'>Crop</label>
                    <input type='text' name='crop' onChange={handleChange} value={geneticData.crop} placeholder='Enter crop name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='scientific_name'>Scientific Name</label>
                    <input type='text' name='scientific_name' onChange={handleChange} value={geneticData.scientific_name} placeholder='Enter scientific name' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='variety'>Variety</label>
                    <input type='text' name='variety' onChange={handleChange} value={geneticData.variety} placeholder='Enter variety' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor='region'>Region</label>
                    <input type='text' name='region' onChange={handleChange} value={geneticData.region} placeholder='Enter region' />
                </div>

                <br />
                {/* Genetic Traits */}
                <h4>Genetic Traits</h4>
                <div className='inputGroup'>
                    <input type='text' name='trait_name' onChange={handleChange} value={geneticData.trait_name} placeholder='Trait Name' />
                </div>
                <div className='inputGroup'>
                    <input type='text' name='gene_associated' onChange={handleChange} value={geneticData.gene_associated} placeholder='Gene Associated' />
                </div>
                <div className='inputGroup'>
                    <input type='text' name='modification_method' onChange={handleChange} value={geneticData.modification_method} placeholder='Modification Method' />
                </div>
                <div className='inputGroup'>
                    <textarea name='description' onChange={handleChange} value={geneticData.description} placeholder='Description'></textarea>
                </div>

                <br />
                {/* Modification Details */}
                <h4>Modification Details</h4>
                <div className='inputGroup'>
                    <input type='text' name='modification_id' onChange={handleChange} value={geneticData.modification_id} placeholder='Modification ID' />
                </div>
                <div className='inputGroup'>
                    <input type='text' name='target_gene' onChange={handleChange} value={geneticData.target_gene} placeholder='Target Gene' />
                </div>
                <div className='inputGroup'>
                    <input type='text' name='modification_technique' onChange={handleChange} value={geneticData.modification_technique} placeholder='Modification Technique' />
                </div>
                <div className='inputGroup'>
                    <textarea name='outcomes' onChange={handleChange} value={geneticData.outcomes} placeholder='Outcomes'></textarea>
                </div>

                <br />
                {/* Environmental Conditions */}
                <h4>Environmental Conditions</h4>
                <div className='inputGroup'>
                    <input type='text' name='soil_type' onChange={handleChange} value={geneticData.soil_type} placeholder='Soil Type' />
                </div>
                <div className='inputGroup'>
                    <input type='text' name='climate' onChange={handleChange} value={geneticData.climate} placeholder='Climate' />
                </div>
                <div className='inputGroup'>
                    <input type='text' name='pests_diseases' onChange={handleChange} value={geneticData.pests_diseases} placeholder='Pests/Diseases' />
                </div>

                <br />
                {/* Impact Analysis */}
                <h4>Impact Analysis</h4>
                <div className='inputGroup'>
                    <input type='text' name='economic_impact' onChange={handleChange} value={geneticData.economic_impact} placeholder='Economic Impact' />
                </div>
                <div className='inputGroup'>
                    <input type='text' name='environmental_impact' onChange={handleChange} value={geneticData.environmental_impact} placeholder='Environmental Impact' />
                </div>
                <div className='inputGroup'>
                    <input type='text' name='social_impact' onChange={handleChange} value={geneticData.social_impact} placeholder='Social Impact' />
                </div>

                <button type='submit' className='submit-btn'>Add Genetic Data</button>
            </form>
        </div>
    );
};

export default UpdateGenetic;
