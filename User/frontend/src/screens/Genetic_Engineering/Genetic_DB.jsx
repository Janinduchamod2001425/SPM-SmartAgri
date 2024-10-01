import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';
import Genedb from '../../images/Genetic/genedb.svg';
import { useGetAllCropsMutation } from '../../slices/cropApiSlice';
import CropDetailModal from '../../screens/Genetic_Engineering/CropDetailModel'; // Import the modal
import Loader from '../../components/Loader';
import '../../screens/Genetic_Engineering/Genetic_DB.css';

// Import crop images
import wheatImage from '../../images/crops/c1.png';
import tomatoImage from '../../images/crops/c2.png';
import cornImage from '../../images/crops/c3.png';
import riceImage from '../../images/crops/c4.png';
import soybeanImage from '../../images/crops/c5.png';
import cottonImage from '../../images/crops/c6.png';
import potatoImage from '../../images/crops/c7.png';
import barleyImage from '../../images/crops/c8.png';


// Mapping of crop names to their images
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

const Genetic_DB = () => {
  const [getAllCrops, { data: crops = [], isLoading, isError }] = useGetAllCropsMutation();
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllCrops();
  }, [getAllCrops]);

  const handleOpenModal = (crop) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCrop(null);
  };

  return (
    <div>
      {/* Navigation Panel */}
      <Navigation />

      {/* Cover Image */}
      <img src={Genedb} className="cover_image" alt="Genetic DB" />

      {/* Hero Section */}
      <section className="genetic-hero">
        <div className="hero-content">
          <h1>
            Explore Our Extensive <br />
            Genetic Engineering Database
          </h1>
          <p>
            Discover In-Depth Information on Genetically Modified Crops and
            Traits
          </p>
          <button
            className="cta-btn"
            onClick={() =>
              document
                .getElementById("database")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            View Database
          </button>
        </div>
      </section>

      {/* Crop List Section */}
      <section id="database" className="crop-list-section">
        <h1 className='crop_head'>Genetically Modified Crops</h1>
        <h4 className='crop_subhead'>Explore the Benefits of Genetically Enhanced Crops</h4>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <div>Error loading crops</div>
        ) : (
          <div className="crop-grid">
            {crops.map((crop) => (
              <div key={crop._id} className="crop-card">
                {cropImages[crop.crop.toLowerCase()] && (
                  <img
                    src={cropImages[crop.crop.toLowerCase()]}
                    alt={crop.crop}
                    className="crop-image"
                  />
                )}
                <h2>{crop.crop}</h2>
                <button
                  className="see-more-btn"
                  onClick={() => handleOpenModal(crop)}
                >
                  See More
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal for showing full details */}
      <CropDetailModal
        crop={selectedCrop}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Genetic_DB;
