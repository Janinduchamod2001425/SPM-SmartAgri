// CropDetailModal.js
import React from 'react';
import '../../screens/Genetic_Engineering/CropDetailModel.css';

// Import images
import wheatImage from '../../images/crops/crop4.jpg';
import tomatoImage from '../../images/Genetic/crop5.jpg';
import cornImage from '../../images/Genetic/crop2.jpg';
import riceImage from '../../images/Genetic/crop1.jpg';
import soybeanImage from '../../images/Genetic/crop3.jpg';
import cottonImage from '../../images/Genetic/crop9.jpg';
import potatoImage from '../../images/Genetic/crop0.jpg';
import barleyImage from '../../images/Genetic/crop10.jpg';


const cropImages = {
  wheat: wheatImage,
  tomato: tomatoImage,
  corn: cornImage,
  rice: riceImage,
  soybean: soybeanImage,
  cotton: cottonImage,
  potato: potatoImage,
  barley: barleyImage,
};

const CropDetailModal = ({ crop, isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if the modal isn't open

  // Get the image based on crop name
  const cropImage = cropImages[crop.crop.toLowerCase()] || null;

  return (
    <div className="modal-overlay-crop" onClick={onClose}>
      <div className="modal-content-crop" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="close-btn-crop" onClick={onClose}>
          &times;
        </button>

        {/* Crop Details */}
        <h1 className='cropName'>{crop.crop}</h1>
         {cropImage && <img src={cropImage} alt={crop.crop} className="crops_images" />}
        <br />
        <br />
        <p className='field'><strong>Scientific Name:</strong> {crop.scientific_name}</p>
        <p className='field'><strong>Variety:</strong> {crop.variety}</p>
        <p className='field'><strong>Trait Name:</strong> {crop.trait_name}</p>
        <br />
        <p className='field'><strong>Region:</strong> {crop.region}</p>
        <p className='field'><strong>Gene Associated:</strong> {crop.gene_associated}</p>
        <p className='field'><strong>Modification Method:</strong> {crop.modification_method}</p>
        <p className='field'><strong>Description:</strong> {crop.description}</p>
        <br />
        <p className='field'><strong>Modification ID:</strong> {crop.modification_id}</p>
        <p className='field'><strong>Target Gene:</strong> {crop.target_gene}</p>
        <p className='field'><strong>Modification Technique:</strong> {crop.modification_technique}</p>
        <p className='field'><strong>Outcomes:</strong> {crop.outcomes}</p>
        <br />
        <p className='field'><strong>Soil Type:</strong> {crop.soil_type}</p>
        <p className='field'><strong>Climate:</strong> {crop.climate}</p>
        <p className='field'><strong>Pests/Diseases:</strong> {crop.pests_diseases}</p>
        <br />
        <p className='field'><strong>Economic Impact:</strong> {crop.economic_impact}</p>
        <p className='field'><strong>Environmental Impact:</strong> {crop.environmental_impact}</p>
        <p className='field'><strong>Social Impact:</strong> {crop.social_impact}</p>
      </div>
    </div>
  );
};

export default CropDetailModal;
