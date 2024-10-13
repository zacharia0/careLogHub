
import {useState} from "react";

const ClientForm = () =>{
    const [clientData,setClientData] = useState({
        firstName:"",
        middleName:"",
        lastName:"",
        dateOfBirth:'',
        moveInDate:"",
        roomNumber:"",
        foodAllergy:"",
        medicalAllergy:"",
        emergencyContact:"",
        diagnoses:"",
        primaryMedicalContact:"",
        guardian:""

    })
    const [error,setError] = useState('')
    const handleSubmit = async(e) =>{
        e.preventDefault()
        setError("")
        if(!clientData.firstName){
            setError("First Name is required")
        }
        if(!clientData.lastName){
            setError("Last Name is required")
        }
        if(!clientData.dateOfBirth){
            setError("Date of is required")
        }
        if(!clientData.moveInDate){
            setError("Move-in date is required")
        }
        if(!clientData.diagnoses){
            setError("Diagnoses is required")
        }
        const clientInfo = {
            firstName: clientData.firstName,
            lastName: clientData.lastName,
            dateOfBirth:clientData.dateOfBirth,
            moveInDate:clientData.moveInDate,
            diagnoses:clientData.diagnoses
        }
        console.log(clientInfo)

        const response = await fetch("http://localhost:4000/api/client",{
            method:"POST",
            body:JSON.stringify(clientInfo),
            headers:{
                "Content-Type":"application/json"
            },
        })
        if(!response.ok){
            console.log("Failed to create client")
        }

        if(response.ok){
            const json = await response.json()
            setError("")

        }
        console.log("Added Client")
    }

    return(
        <div>
            <h1>Add New Client</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input
                    type="text"
                    value = {clientData.firstName}
                    onChange={(e) =>setClientData({...clientData,firstName:e.target.value})}
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    value = {clientData.lastName}
                    onChange={(e) => setClientData({...clientData,lastName: e.target.value})}
                />
                <label>Date of Birth:</label>
                <input
                    type="date"
                    value = {clientData.dateOfBirth}
                    onChange={(e) => setClientData({...clientData,dateOfBirth: e.target.value})}
                />
                <label>Move-in Date</label>
                <input
                    type="date"
                    value = {clientData.moveInDate}
                    onChange={(e) => setClientData({...clientData,moveInDate: e.target.value})}
                />
                <label>Diagnose(s)</label>
                <textarea
                    type="text"
                    value ={clientData.diagnoses}
                    onChange={(e) => setClientData({...clientData,diagnoses: e.target.value})}
                ></textarea>
                <button className="bg-green-500 hover:bg-green-700 rounded py-2 px-3 text-white" type="submit">Add Client</button>
            </form>
        </div>
    )

}

export default ClientForm