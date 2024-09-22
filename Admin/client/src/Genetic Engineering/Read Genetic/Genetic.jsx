
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Genetic.css';

const Genetic = () => {
    const [genetic, setGenetic] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState(null); // State to store the selected crop

    useEffect(() => {
        const fetchGeneticData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getallgenetic');
                setGenetic(response.data);

                // Set the first crop as the selected crop if data is available
                if (response.data.length > 0) {
                    setSelectedCrop(response.data[0].crop);
                }
            } catch (error) {
                console.error('Error getting genetic data', error);
            }
        };
        fetchGeneticData();
    }, []);

    const deleteGeneticData = async (geneticId) => {
        try {
            const confirmDeletion = window.confirm('Are you sure you want to remove this data?');
            if (!confirmDeletion) return;

            const response = await axios.delete(`http://localhost:8000/api/deletegenetic/${geneticId}`);
            setGenetic((prevGenetic) => prevGenetic.filter((genetic) => genetic._id !== geneticId));
            toast.success(response.data.msg, { position: 'top-center', className: 'alert' });
        } catch (error) {
            console.error('Error deleting genetic data:', error);
        }
    };

    // Function to handle crop button click
    const handleCropClick = (crop) => {
        setSelectedCrop(crop);
    };

    // Get unique crops for buttons
    const uniqueCrops = Array.from(new Set(genetic.map(item => item.crop)));

    return (
        <div className="card-container">
            <Link to={"/create_genetic"} className='add-btn'>Add New Genetic Data</Link>

            {/* Crop Buttons */}
            <div className="crop-buttons">
                {uniqueCrops.map((crop, index) => (
                    <button
                        key={index}
                        onClick={() => handleCropClick(crop)}
                        className={`crop-btn ${selectedCrop === crop ? 'active' : ''}`}
                    >
                        {crop}
                    </button>
                ))}
            </div>

            {/* Display Selected Crop Details */}
            {genetic.filter(genetic => genetic.crop === selectedCrop).map((genetic, index) => (
                <div key={index} className="card">
                    <h3 className='heading'>{genetic.crop} - {genetic.scientific_name}</h3>
                    <p><strong>Variety:</strong> {genetic.variety}</p>
                    <p><strong>Region:</strong> {genetic.region}</p>
                    <hr />
                    <h4 className='topics'>Genetic Traits</h4>
                    <p><strong>Trait Name:</strong> {genetic.trait_name}</p>
                    <p><strong>Gene Associated:</strong> {genetic.gene_associated}</p>
                    <p><strong>Modification Method:</strong> {genetic.modification_method}</p>
                    <p><strong>Description:</strong> {genetic.description}</p>
                    <hr />
                    <h4 className='topics'>Modification Details</h4>
                    <p><strong>Modification ID:</strong> {genetic.modification_id}</p>
                    <p><strong>Target Gene:</strong> {genetic.target_gene}</p>
                    <p><strong>Modification Technique:</strong> {genetic.modification_technique}</p>
                    <p><strong>Outcomes:</strong> {genetic.outcomes}</p>
                    <hr />
                    <h4 className='topics'>Environmental Conditions</h4>
                    <p><strong>Soil Type:</strong> {genetic.soil_type}</p>
                    <p><strong>Climate:</strong> {genetic.climate}</p>
                    <p><strong>Pests/Diseases:</strong> {genetic.pests_diseases}</p>
                    <hr />
                    <h4 className='topics'>Impact Analysis</h4>
                    <p><strong>Economic Impact:</strong> {genetic.economic_impact}</p>
                    <p><strong>Environmental Impact:</strong> {genetic.environmental_impact}</p>
                    <p><strong>Social Impact:</strong> {genetic.social_impact}</p>
                    <hr />
                    <div className="action-buttons">
                        <Link to={`/editgenetic/${genetic._id}`}>
                            <button className="update-btn">Update</button>
                        </Link>
                        <button onClick={() => deleteGeneticData(genetic._id)} className="delete-btn">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Genetic;
