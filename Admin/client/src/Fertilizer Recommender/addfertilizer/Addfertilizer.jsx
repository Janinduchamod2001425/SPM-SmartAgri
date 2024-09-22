import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./addfertilizerS.css";
import axios from "axios"
import toast from "react-hot-toast"

function Addfertilizer() {


    const fertilizers = {
        fername:"",
        ferdetails:"",
        fertype:"",
        fermade:""
    }
    const [fertilizer ,setFertilizer] = useState(fertilizers);


    const navigate = useNavigate();

    const inputHandler =(e) => {
        const {name ,value} = e.target;
        setFertilizer({...fertilizer, [name]:value});
       
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/api/fcreate", fertilizer)
          .then((response) => {
            toast.success(response.data.msg, {position:"top-right"})
            navigate("/fertilizer")
          })
          
        .catch (error => console.log(error))  
      }






  return (

     <div className='addUser'>
            <Link to={"/fertilizer"} className='backHome'>Back</Link>
            <h3>Add New Fertilizer</h3>

            <form className='addUserForm'  onSubmit={submitForm}>

                <div className="inputGroup">
                    <label htmlFor="fname">Fertilizer Name</label>
                    <input type="text"  onChange ={inputHandler} id="fername" name="fername" autoComplete="off" placeholder="Fertilizer name"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="fname">Fertilizer Details</label>
                    <input type="text" onChange ={inputHandler} id="ferdetails" name="ferdetails" autoComplete="off" placeholder="Fertilizer Details"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="ftype">Fertilizer Type</label>
                    <input type="text" onChange ={inputHandler} id="fertype" name="fertype" autoComplete="off" placeholder="Fertilizer Type"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="company">Manufacturing company</label>
                    <input type="text" onChange ={inputHandler} id="fermade" name="fermade" autoComplete="off" placeholder="Manufacturing company"></input>
                </div>

                <div className="inputGroup">
                  <button type="submit">Add Fertilizer</button>
                </div>
            </form>
       </div>
  )
}

export default Addfertilizer
