
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Pest_Home.css'; // Make sure to create the corresponding CSS file
import Navigation from '../../components/Navigation';



import pest1 from '../../images/Pests/img1.jpg';
import pest2 from '../../images/Pests/img2.jpg';
import pest3 from '../../images/Pests/img3.jpg';
import pest4 from '../../images/Pests/img4.jpg';
import pest5 from '../../images/Pests/img5.jpg';
import pest6 from '../../images/Pests/img6.jpg';
import pest7 from '../../images/Pests/img7.jpg';
import pest8 from '../../images/Pests/img8.jpg';
import pest9 from '../../images/Pests/img9.jpg';
import pest10 from '../../images/Pests/img10.jpg';
import pest11 from '../../images/Pests/img11.jpg';
import pest12 from '../../images/Pests/img12.jpg';
import coverImage from '../../images/Pests/img13.jpg';

const pestData = [
  { name: 'Whiteflies', imgSrc: pest1 },
  { name: 'Aphids', imgSrc: pest2 },
  { name: 'Caterpillars ', imgSrc: pest3 },
  { name: 'Spider Mites', imgSrc: pest4 },
  { name: 'Powdery Mildew', imgSrc: pest5 },
  { name: 'Downy Mildew', imgSrc: pest6 },
  { name: 'Blight', imgSrc: pest7 },
  { name: 'Rust', imgSrc: pest8 },
  { name: 'Leaf Spot', imgSrc: pest9 },
  { name: 'White Mildew', imgSrc: pest10 },
  { name: 'Gray Mold', imgSrc: pest11 },
  { name: 'Root Disease', imgSrc: pest12 },
];


function Pest_Home() {

  const [pests, setPests] = useState([]); // <- Add this line
  const [searchQuery, setSearchQuery] = useState('');

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/pgetall`);
        setPests(response.data);
      } catch (error) {
        console.error('Error fetching pests:', error);
      }
    };

    fetchData();
  }, []);

  const filteredPests = pests.filter(pest => {
    console.log('Filtering:', pest.pname, searchQuery); // Debugging: Check filter values
    return pest.pname.toLowerCase().includes(searchQuery.toLowerCase());
  });


   
  

  return (
    <div className="pest-home">
      {/* First Section: Cover Image with Quote */}
      <section className="cover-section">
        <img
          src={coverImage} // Add the actual path to your cover image
          alt="Cover"
          className="cover-image"
        />
        <div className="quote-overlay">
          
          <h2 className="about_title">Protect your crops, save your future</h2>
        </div>
      </section>

      <section className="pest-section">
      
      <h2 className='about_title'>Pest and Disease Management</h2>
      <h3 className='about_subtitle'>Smart Solutions for Effective Crop Protection</h3>
  <div className="pest-grid">
    {pestData && pestData.length > 0 ? (
      pestData.map((pest, index) => (
        <div key={index} className="pest-item">
          <img src={pest.imgSrc} alt={pest.name} className="pest-image" />
          <p className="pests-name">{pest.name}</p>
        </div>
      ))
    ) : (
      <p>No pests or diseases available</p> // Fallback if pestData is empty or null
    )}
  </div>
</section>


{/* Search Input */}
<section className="search-section">
<h2 className='about_subtitle'>Protecting crops from pests and diseases ensures a stronger, healthier harvest.</h2>
        <input 
          type="text" 
          placeholder="Search for pests or diseases" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="search-input"
        />
      </section>

      <section className="pest-section2">
  
  <div className="pest-cards-container">
    {filteredPests.length > 0 ? (
      filteredPests.map(pest => (
        <div className="pest-card" key={pest._id}>
          <div className="pest-name">{pest.pname} ({pest.ptype})</div>

          {/* Symptoms displayed first */}
          <div className="symptoms-container">
            <h3>Symptoms:</h3>
            <ul className="symptom-list">
              {pest.symptom.map((sym, index) => (
                <li key={index}>{sym}</li>
              ))}
            </ul>
          </div>

          {/* Treatments displayed below symptoms */}
          <div className="treatments-container">
            <h3>Treatments:</h3>
            <ul className="treatment-list">
              {pest.treatment.map((treat, index) => (
                <li key={index}>{treat}</li>
              ))}
            </ul>
          </div>
        </div>
      ))
    ) : (
      <p>No pests or diseases found matching your search.</p>
    )}
  </div>
</section>

{/* Button to navigate to Disease page */}

     </div>


  );
}


export default Pest_Home