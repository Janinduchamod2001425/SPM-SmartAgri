import React, { useState } from 'react';
import { useCreateDiseaseMutation } from '../../slices/diseaseApiSlice'; 
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import '../../screens/Pest_Disease/Disease_Home.css';

const Disease = () => {
  const [disename, setDisename] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  const [createDisease, { isLoading }] = useCreateDiseaseMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createDisease({
        disename,
        rating,
        feedback,
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

      navigate("/disease");
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
      {/* Request Form */}
      <section id="form">
        <div className="form_content">
          <p className="packageTopic">Feedback for Treatments</p>

          <Form onSubmit={submitHandler}>
            {/* Row 1 */}
            <div className="input-row">
              <Form.Group className="set my-2" controlId="disename">
                <Form.Label className="labelName fw-bold">Pest Or Disease Name</Form.Label>
                <Form.Control
                  className="textview"
                  type="text"
                  placeholder="Enter name"
                  value={disename}
                  onChange={(e) => setDisename(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="set my-2">
                <Form.Label className="labelName fw-bold">Rating: Do the treatments work?</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                >
                  <option value="">Select rating</option> {/* Default option */}
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>
            </div>

            {/* Row 2 */}
            <div className="input-row">
              <Form.Group className="set my-2" controlId="feedback">
                <Form.Label className="labelName fw-bold">Message</Form.Label>
                <Form.Control
                  className="textview"
                  type="text"
                  placeholder="Enter feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

            <div className="text-center my-3">
              {isLoading ? (
                <Loader />
              ) : (
                <Button type="submit" variant="success" className="request_btn">
                  Submit
                </Button>
              )}
            </div>
          </Form>

          {/* Instructions for Farmers */}
          <div className="text-center mt-3">
            <p className="instructions">
              Thank you so much for your valuable feedback.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Disease;
