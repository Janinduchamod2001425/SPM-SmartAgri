import React, { useState } from 'react';
import Navigation from '../../components/Navigation';
import { useCreatePlanMutation } from '../../slices/traitApiSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
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
  const [planDetails, setPlanDetails] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const [createPlan, { isLoading }] = useCreatePlanMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);
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

      setIsSubmitted(true);
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

      // Generate the genetic plan details
      const generatedPlan = generatePlan(username, cropType, trait, farmSize, soilType, pest, plantingDate);
      setPlanDetails(generatedPlan);
      setShowPlanModal(true);

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

  // Function to generate the genetic plan based on user inputs
  const generatePlan = (username, cropType, trait, farmSize, soilType, pest, plantingDate) => {
    const steps = getCultivationSteps(cropType, soilType);
    return {
      title: `${username}'s Genetic Engineering Plan`,
      details: [
        `Crop Type: ${cropType}`,
        `Desired Trait: ${trait}`,
        `Farm Size: ${farmSize}`,
        `Soil Type: ${soilType}`,
        `Pest Information: ${pest}`,
        `Planting Date: ${plantingDate}`,
      ],
      steps, // Add steps to the plan details
    };
  };

  // Function to get step-by-step cultivation guide based on crop type and soil type
  const getCultivationSteps = (cropType, soilType) => {
    switch (cropType) {
      case 'Rice':
        return [
          "1. Prepare the field by plowing and leveling.",
          "2. Create bunds (embankments) to retain water.",
          "3. Flood the field to a depth of 5-10 cm.",
          "4. Sow seeds directly or transplant seedlings when 25-30 days old.",
          "5. Maintain water levels throughout the growing period.",
          "6. Apply fertilizers as per soil tests.",
          "7. Monitor for pests and diseases, and apply treatments as needed.",
          "8. Harvest when grains are firm and moisture content is low."
        ];
      case 'Wheat':
        return [
          "1. Prepare the land by tilling and leveling.",
          "2. Apply well-rotted manure and fertilizers as needed.",
          "3. Sow seeds in rows 15-20 cm apart.",
          "4. Irrigate as necessary, especially during dry spells.",
          "5. Control weeds through mechanical or chemical means.",
          "6. Monitor for pests, and take action if necessary.",
          "7. Harvest when grains are hard and golden."
        ];
      case 'Corn':
        return [
          "1. Prepare the soil with good tillage.",
          "2. Plant seeds 2-3 cm deep in rows 70-90 cm apart.",
          "3. Water regularly, especially during flowering and grain filling.",
          "4. Fertilize based on soil tests.",
          "5. Watch for pest infestations and apply pesticides if needed.",
          "6. Harvest when kernels are firm and the husks turn brown."
        ];
      default:
        return ["No specific steps available for this crop type."];
    }
  };

  const handleClose = () => {
    setShowPlanModal(false);
  };

  return (
    <div>
      <Navigation />
      <img src={Plan} className="cover_image" alt="Cover" />
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

      <section id="form">
        <div className="form_content">
          <p className="packageTopic">Genetic Engineering Plan Request</p>

          <Form onSubmit={submitHandler}>
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
                  as="select"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  required
                >
                  <option value="">Select crop type</option>
                  <option value="Rice">Rice</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Corn">Corn</option>
                  {/* Add more crop types as needed */}
                </Form.Control>
              </Form.Group>
            </div>

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
                  as="select"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  required
                >
                  <option value="">Select farm size</option>
                  <option value="1 acre">1 acre</option>
                  <option value="2 acres">2 acres</option>
                  <option value="5 acres">5 acres</option>
                  <option value="10 acres">10 acres</option>
                  {/* Add more sizes as needed */}
                </Form.Control>
              </Form.Group>
            </div>

            <div className="input-row">
              <Form.Group className="set my-2" controlId="soilType">
                <Form.Label className="labelName fw-bold">Soil Type</Form.Label>
                <Form.Control
                  className="textview"
                  as="select"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  required
                >
                  <option value="">Select soil type</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Clay">Clay</option>
                  {/* Add more soil types as needed */}
                </Form.Control>
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

          {isSubmitted && (
            <div className="text-center mt-3">
              <p className="instructions">
                We will review your request details, create a personalized plan,
                and send it to you soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal to display the generated plan */}
      <Modal show={showPlanModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{planDetails?.title || "Genetic Plan"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {planDetails ? (
            <>
              <ul>
                {planDetails.details && planDetails.details.length > 0 ? (
                  planDetails.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))
                ) : (    
                  <li>No details available.</li>
                )}
              </ul>  
              <h5>Step-by-Step Cultivation Guide:</h5>
              <ol>
                {planDetails.steps && planDetails.steps.length > 0 ? (
                  planDetails.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))
                ) : (
                  <li>No steps available.</li>
                )}
              </ol>
            </>
          ) : (
            <p>Loading plan details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Genetic_Plan;
