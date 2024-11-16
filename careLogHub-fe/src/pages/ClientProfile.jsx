import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useClientContext} from "../hooks/useClientContext.js";

const ClientProfile = () => {
    const {singleClient,dispatch} = useClientContext()
    // const [singleClient, setSingleClient] = useState("")
    const {clientId} = useParams()


    console.log( "Printing client information" , singleClient)

    useEffect(() => {
        const getSingleClient = async () => {
            const response = await fetch(`http://localhost:4000/api/client/${clientId}`, {
                method: "GET"
            })
            const json = await response.json()
            if (!response.ok) {
                console.error("Failed to fetch a single client")
            }
            // setSingleClient(json)
            dispatch({type:"SET_SINGLE_CLIENT",payload:json})

        }
        getSingleClient()

    }, [clientId])
    return (
        <div>
            {singleClient &&
                (
                    <div className={"ml-2"}>
                        <label>First Name: </label>
                        {singleClient.firstName + " "}<br/>
                        <label>last Name: </label>
                        {singleClient.lastName} <br/>
                        <label >Client Id: </label>
                        {singleClient._id}
                        <label>Move In Date</label>

                        {singleClient.moveInDate} <br/>
                        <Link to = {`/create-medication/${singleClient._id}`} className={"create-btn"}>Add New Medication</Link>
                    </div>
                )

            }
        </div>
    )

}

export default ClientProfile



