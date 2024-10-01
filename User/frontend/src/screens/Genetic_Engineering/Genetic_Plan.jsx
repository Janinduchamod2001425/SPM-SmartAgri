import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { useCreatePlanMutation } from '../../slices/traitApiSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

import '../../screens/Genetic_Engineering/Genetic_Plan.css';
import Plan from '../../images/Genetic/plan.svg';

const Genetic_Plan = () => {
  const [username, setUsername] = useState("");
  const [cropType, setCropType] = useState("");
  const [trait, setTrait] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [soilType, setSoilType] = useState("");
  const [pest, setPest] = useState("");
  const [plantingDate, setPlantingDate] = useState(null);

  const [createPlan, { isLoading }] = useCreatePlanMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createPlan({
        username,
        cropType,
        trait,
        farmSize,
        soilType,
        pest,
        plantingDate,
      }).unwrap();
      toast.success("Genetic Plan created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        style: {
          backgroundColor: "#c4f9a9",
          color: "black",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "monospace",
        },
      });
      navigate("/genetic_home");
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        style: {
          backgroundColor: "#ffd5cc",
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "monospace",
        },
      });
    }
  };

  return (
    <div>
      {/* Navigation Panel */}
      <Navigation />

      {/* Cover Image */}
      <img src={Plan} className="cover_image" alt="Cover" />

      {/* Hero Section */}
      <section className="genetic-hero">
        <div className="hero-content">
          <h1>
            Request Your Personalized <br />
            Genetic Engineering Plan
          </h1>
          <p>Tailored Solutions for Optimal Crop Yield and Sustainability</p>
          <button
            className="cta-btn"
            onClick={() =>
              document
                .getElementById("form")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Request Now
          </button>
        </div>
      </section>

      {/* Request Form */}
      <section id="form">
        <div className="form_content">
          <p className="packageTopic">Genetic Engineering Plan Request</p>

          <Form onSubmit={submitHandler}>
            {/* Row 1 */}
            <div className="input-row">
              <Form.Group className="set my-2" controlId="username">
                <Form.Label className="labelName fw-bold">Username</Form.Label>
                <Form.Control
                  className="textview"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="set my-2" controlId="cropType">
                <Form.Label className="labelName fw-bold">Crop Type</Form.Label>
                <Form.Control
                  className="textview"
                  type="text"
                  placeholder="Enter crop type"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

            {/* Row 2 */}
            <div className="input-row">
              <Form.Group className="set my-2" controlId="trait">
                <Form.Label className="labelName fw-bold">Trait</Form.Label>
                <Form.Control
                  className="textview"
                  type="text"
                  placeholder="Enter desired trait"
                  value={trait}
                  onChange={(e) => setTrait(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="set my-2" controlId="farmSize">
                <Form.Label className="labelName fw-bold">Farm Size</Form.Label>
                <Form.Control
                  className="textview"
                  type="text"
                  placeholder="Enter farm size (acres/hectares)"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

            {/* Row 3 */}
            <div className="input-row">
              <Form.Group className="set my-2" controlId="soilType">
                <Form.Label className="labelName fw-bold">Soil Type</Form.Label>
                <Form.Control
                  className="textview"
                  type="text"
                  placeholder="Enter soil type"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="set my-2" controlId="pest">
                <Form.Label className="labelName fw-bold">Pest</Form.Label>
                <Form.Control
                  className="textview"
                  type="text"
                  placeholder="Enter pest information"
                  value={pest}
                  onChange={(e) => setPest(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

            {/* Row 4 */}
            <div className="input-row">
              <Form.Group className="set my-2" controlId="plantingDate">
                <Form.Label className="labelName fw-bold">
                  Planting Date
                </Form.Label>
                <Form.Control
                  className="textview"
                  type="date"
                  placeholder="Select planting date"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

            <div className="text-center my-3">
              {isLoading ? (
                <Loader />
              ) : (
                <Button type="submit" variant="success" className="request_btn">
                  Submit Request
                </Button>
              )}
            </div>
          </Form>

          {/* Instructions for Farmers */}
          <div className="text-center mt-3">
            <p className="instructions">
              We will review your request details, create a personalized plan,
              and send it to you soon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Genetic_Plan;
