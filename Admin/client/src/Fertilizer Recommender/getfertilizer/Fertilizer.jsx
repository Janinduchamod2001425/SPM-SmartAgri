import React, { useState,useEffect } from 'react'
import "./fertilizerS.css";
import axios from 'axios';
import toast from "react-hot-toast"


import { Link } from "react-router-dom";

function Fertilizer() {

    const [fertilizers ,setFertilizers] = useState([]);

    useEffect(() =>{

        const fetchData = async() =>{
            const response = await axios.get("http://localhost:3000/api/fgetall")
            setFertilizers(response.data);
        }

        fetchData();
    },[])


    const fertilizerdelete = async(fertilizerId)=>{
       await axios.delete(`http://localhost:3000/api/fdelete/${fertilizerId}`)
       .then((response) =>{
       setFertilizers((preFertilizer) => preFertilizer.filter((fertilizer)=> fertilizer._id !== fertilizerId))
       toast.success(response.data.msg, {position:"top-right"})
    }).catch((error) =>{
        console.log(error);
      })

    }

  return (

    <div className="table-container">

    <Link to={"/addfertilizer"} className='add-btn'>Add Fertilizer</Link>
        <table>
            <thead>
                <tr>
                    <th>Fertilizer Name</th>
                    <th>Fertilizer Details</th>
                    <th>Fertilizer Type</th>
                    <th>Manufacturing company</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    fertilizers.map((fertilizer,index)=>{

                        return(
                            <tr key={fertilizer._id}>
                              
                            <td>{fertilizer.fername}</td>
                            <td>{fertilizer.ferdetails}</td>
                            <td>{fertilizer.fertype}</td>
                            <td>{fertilizer.fermade}</td>
                            <td >
                                <div className='action-buttons'>
                                <Link to={'/editfertilizer/'+ fertilizer._id} className="update-btn" >Update</Link>
                                <button onClick={() =>fertilizerdelete(fertilizer._id)} className="delete-btn" >Delete</button>
                                </div>
                            </td>
                        </tr>

                        )



                    })

                }
               
            </tbody>


        </table>


</div>
  )
}

export default Fertilizer
