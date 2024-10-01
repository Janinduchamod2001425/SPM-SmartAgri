import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addfertilizerS.css";
import axios from "axios";
import toast from "react-hot-toast";

function Addfertilizer() {
  const fertilizers = {
    fername: "",
    ferdetails: "",
    fertype: "",
    fermade: "",
    fersoil: "",
    fercrop: "",
    ferclimate: "",
  };
  const [fertilizer, setFertilizer] = useState(fertilizers);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateTextOnly = (value) => {
    // Updated regex to allow letters, spaces, parentheses, periods, and hyphens
    const textOnlyRegex = /^[A-Za-z\s().-]*$/;
    return textOnlyRegex.test(value);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    // Validate input for text-only fields
    if (name !== "fersoil" && name !== "ferclimate") {
      if (validateTextOnly(value)) {
        setFertilizer({ ...fertilizer, [name]: value });
        setErrors({ ...errors, [name]: "" });
      } else {
        setErrors({
          ...errors,
          [name]: "Invalid input, only text and special characters like (), ., - are allowed",
        });
      }
    } else {
      // For dropdown fields, directly set the value
      setFertilizer({ ...fertilizer, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const isFormValid = Object.values(errors).every((error) => error === "");
    if (isFormValid) {
      await axios
        .post("http://localhost:3000/api/fcreate", fertilizer)
        .then((response) => {
          toast.success(response.data.msg, { position: "top-right" });
          navigate("/fertilizer");
        })
        .catch((error) => console.log(error));
    } else {
      toast.error("Please fix validation errors before submitting.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="addUser">
      <Link to={"/fertilizer"} className="backHome">
        Back
      </Link>
      <h3>Add New Fertilizer</h3>

      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fername">Fertilizer Name</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fername"
            name="fername"
            autoComplete="off"
            placeholder="Fertilizer name"
          />
          {errors.fername && <p className="error">{errors.fername}</p>}
        </div>

        <div className="inputGroup">
          <label htmlFor="ferdetails">Fertilizer Details</label>
          <input
            type="text"
            onChange={inputHandler}
            id="ferdetails"
            name="ferdetails"
            autoComplete="off"
            placeholder="Fertilizer Details"
          />
          {errors.ferdetails && <p className="error">{errors.ferdetails}</p>}
        </div>

        <div className="inputGroup">
          <label htmlFor="fertype">Fertilizer Type</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fertype"
            name="fertype"
            autoComplete="off"
            placeholder="Fertilizer Type"
          />
          {errors.fertype && <p className="error">{errors.fertype}</p>}
        </div>

        <div className="inputGroup">
          <label htmlFor="fermade">Manufacturing Company</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fermade"
            name="fermade"
            autoComplete="off"
            placeholder="Manufacturing company"
          />
          {errors.fermade && <p className="error">{errors.fermade}</p>}
        </div>

        {/* Dropdown for Soil Type */}
        <div className="inputGroup">
          <label htmlFor="fersoil">Soil Type</label>
          <select
            id="fersoil"
            name="fersoil"
            onChange={inputHandler}
            value={fertilizer.fersoil}
          >
            <option value="">Select Soil Type</option>
            <option value="Sandy">Sandy</option>
            <option value="Loam">Loam</option>
            <option value="Clay">Clay</option>
          </select>
          {errors.fersoil && <p className="error">{errors.fersoil}</p>}
        </div>

        <div className="inputGroup">
          <label htmlFor="fercrop">Crop Type</label>
          <input
            type="text"
            onChange={inputHandler}
            id="fercrop"
            name="fercrop"
            autoComplete="off"
            placeholder="Crop Type"
          />
          {errors.fercrop && <p className="error">{errors.fercrop}</p>}
        </div>

        {/* Dropdown for Climate Type */}
        <div className="inputGroup">
          <label htmlFor="ferclimate">Climate Type</label>
          <select
            id="ferclimate"
            name="ferclimate"
            onChange={inputHandler}
            value={fertilizer.ferclimate}
          >
            <option value="">Select Climate Type</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Wet">Wet</option>
            <option value="Dry">Dry</option>
          </select>
          {errors.ferclimate && <p className="error">{errors.ferclimate}</p>}
        </div>

        <div className="inputGroup">
          <button type="submit">Add Fertilizer</button>
        </div>
      </form>
    </div>
  );
}

export default Addfertilizer;
