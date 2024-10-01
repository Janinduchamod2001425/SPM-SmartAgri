import React, { useState } from 'react'
import Navigation from '../../components/Navigation'
import {useCreatePlanMutation} from '../../slices/traitApiSlice';
import {useNavigate} from 'react-router-dom';
import {useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import Gene from '../../images/Genetic/gene.svg'

const Genetic_Trait = () => {

  return (
    <div>
      {/* Navigation Panel */}
      <Navigation />

      {/* Cover Image */}
      <img src={Gene} className="cover_image" />

      {/* Hero Section */}
      <section className="genetic-hero">
        <div className="hero-content">
          <h1>
            Unlock the Power of <br />
            Genetic Engineering
          </h1>
          <p>
            Empowering Farmers with Enhanced Crop Performance and Resilience
          </p>
          <button
            className="cta-btn"
            onClick={() =>
              document
                .getElementById("why")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore More
          </button>
        </div>
      </section>
    </div>
  )
}

export default Genetic_Trait