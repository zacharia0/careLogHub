import {useState} from "react";
import {useClientContext} from "../hooks/useClientContext.js";
import {Link} from "react-router-dom";

const ClientForm = () =>{
    const {dispatch} = useClientContext()

    const [error,setError] = useState("")
    const [clientData,setClientData] = useState({
        firstName:"",
        lastName:"",
        dateOfBirth:"",
        diagnoses:"",
        moveInDate:""
    })

    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log("Adding new client")
        setError("")
        let formError = []
        if(!clientData.firstName){
            formError.push("First Name")
        }
        if(!clientData.lastName){
            formError.push("Last Name")
        }
        if(!clientData.dateOfBirth){
            formError.push("Date of birth")
        }
        if(!clientData.moveInDate){
            formError.push("Move in date")
        }
        if(!clientData.diagnoses){
            formError.push("diagnoses")
        }
        if(formError.length > 0){
            setError(`The following fields are required ${formError.join(", ")}`)
        }


        const response = await fetch("http://localhost:4000/api/client",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(clientData)
        })

        const json = await response.json()
        if(response.ok){
            setError("")
            console.log("New Client Created.")
            dispatch({type:"CREATE_CLIENT",payload:json})
            setClientData(
                {
                    firstName: "",
                    lastName: "",
                    moveInDate: "",
                    diagnoses: "",
                    dateOfBirth: ""
                }
            )

        }
    }


    return(
        <div>
            <div>
                <h1>New Client</h1>
            </div>
            <div className={"ml-1 mr-1 mt-1 mb-1"}>
            <Link className= "navigation-btn" to= '/all-clients'>All Clients</Link>

            </div>
            <div>
                {error && <div>{error}</div>}
            </div>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input
                    type="text"
                    value = {clientData.firstName}
                    onChange={(e) => setClientData({...clientData,firstName:e.target.value})}
                />

                <label >Last Name:</label>
                <input
                    type="text"
                    value = {clientData.lastName}
                    onChange={(e) =>setClientData({...clientData,lastName:e.target.value})}
                />

                <label>Date Of Birth</label>
                <input
                    type="date"
                    value = {clientData.dateOfBirth}
                    onChange={(e) => setClientData({...clientData,dateOfBirth: e.target.value})}
                />

                <label>Move-In Date</label>
                <input
                    type="date"
                    value = {clientData.moveInDate}
                    onChange={(e) => setClientData({...clientData,moveInDate: e.target.value})}
                />

                <label>Diagnoses</label>
                <textarea
                    value = {clientData.diagnoses}
                    onChange = {(e) => setClientData({...clientData,diagnoses:e.target.value})}
                >
                </textarea>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow" type="submit">Add Client</button>
            </form>
        </div>
    )
}

export default ClientForm