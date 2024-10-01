import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import "../addfertilizer/addfertilizerS.css";
import axios from 'axios';
import toast from "react-hot-toast"

function Editfertilizer() {

  const fertilizers ={
    fername:"",
    ferdetails:"",
    fertype:"",
    fermade:"",
    fersoil:"",
    fercrop:"",
    ferclimate:""
  }


const {id} = useParams();
const  navigate =useNavigate();
const [fertilizer,setFertilizer] = useState(fertilizers);


const inputChangeHandler = (e) =>{

  const {name,value} = e.target;
  setFertilizer({...fertilizer, [name]:value});
  console.log(fertilizer);
}

useEffect(() =>{

  axios.get(`http://localhost:3000/api/fgetone/${id}`)
  .then((response) =>{
    setFertilizer(response.data);
  }).catch((error) =>{
    console.log(error);
  })
},[id])


const submitForm = async (e) => {
  e.preventDefault();
  await axios.put(`http://localhost:3000/api/fupdate/${id}`, fertilizer)
    .then((response) => {
     toast.success(response.data.msg, {position:"top-right"})
      navigate("/fertilizer")
    })
    
  .catch (error => console.log(error))  
}


  return (

    <div className='addUser'>
            <Link to={"/"} className='backHome'> Back </Link>
            <h3>Update  Fertilizer</h3>

            <form className='addUserForm' onSubmit={submitForm}>

                <div className="inputGroup">
                    <label htmlFor="fname">Fertilizer Name</label>
                    <input type="text" value={fertilizer.fername} onChange={inputChangeHandler}     id="fname" name="fername" autoComplete="off" placeholder="Fertilizer name"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="fname">Fertilizer Details</label>
                    <input type="text" value={fertilizer.ferdetails}   onChange={inputChangeHandler} id="details" name="ferdetails" autoComplete="off" placeholder="Fertilizer Details"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="ftype">Fertilizer Type</label>
                    <input type="text"     value={fertilizer.fertype}    onChange={inputChangeHandler} id="ftype" name="fertype" autoComplete="off" placeholder="Fertilizer Type"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="company">Manufacturing company</label>
                    <input type="text"  value={fertilizer.fermade}  onChange={inputChangeHandler} id="company" name="fermade" autoComplete="off" placeholder="Manufacturing company"></input>
                </div>

                <div className="inputGroup">
                    <label htmlFor="soil">Soil Type</label>
                    <input type="text"  value={fertilizer.fersoil}  onChange={inputChangeHandler} id="soil" name="fersoil" autoComplete="off" placeholder="Soil Type"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="crop">Crop Type</label>
                    <input type="text"  value={fertilizer.fercrop}  onChange={inputChangeHandler} id="crop" name="fercrop" autoComplete="off" placeholder="Crop Type"></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="climate">Climate Type</label>
                    <input type="text"  value={fertilizer.ferclimate}  onChange={inputChangeHandler} id="climate" name="ferclimate" autoComplete="off" placeholder="Climate Type"></input>
                </div>

                <div className="inputGroup">
                  <button type="submit">Update Fertilizer</button>
                </div>
            </form>
       </div>
  )
}

export default Editfertilizer
