import {useMedicationContext} from "../hooks/useMedicationContext.js";
import {useEffect, useState} from "react";
import MedicationDetail from "../components/MedicationDetail.jsx";
import {Link} from "react-router-dom";

const MedicationList = () =>{
    const {medications,dispatch} = useMedicationContext()

    useEffect(() =>{

        const getAllMedication = async( ) =>{

            const response = await fetch("http://localhost:4000/api/med/all-medications",{
                method:"GET"
            })
            const json = await response.json()
            if(!response.ok){
                console.log("Failed to fetch medications")
            }
            if(response.ok){
                dispatch({type:"SET_MEDICATION",payload:json})
            }
        }
        getAllMedication()


    },[dispatch])
    console.log(medications)
    return(
        <div className={"ml-2"}>
            <p>To add or remove a medication, first visit teh All Clients Page.</p>
            <Link className={"add-new-btn-link"} to ={`/all-clients`}>Go to All Clients</Link>
            <p>Once there, click "View Detail" next to a client to manage their medications</p>
            {medications && medications.map((med) =>(
                <MedicationDetail key = {med._id} medications={med}/>
            ))}
        </div>

    )
}

export default MedicationList