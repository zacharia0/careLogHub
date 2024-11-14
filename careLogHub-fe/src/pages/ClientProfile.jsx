import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const ClientProfile = () => {
    const [singleClient, setSingleClient] = useState("")
    const {clientId} = useParams()


    useEffect(() => {
        const getSingleClient = async () => {
            const response = await fetch(`http://localhost:4000/api/client/${clientId}`, {
                method: "GET"
            })
            const json = await response.json()
            if (!response.ok) {
                console.error("Failed to fetch a single client")
            }
            setSingleClient(json)
            console.log(singleClient)

        }

        getSingleClient()
    }, [clientId])

    return (
        <div>
            {singleClient &&
                (
                    <div>
                        <label>First Name: </label>
                        {singleClient.firstName + " "}<br/>
                        <label>last Name: </label>
                        {singleClient.lastName} <br/>
                        <label >Client Id: </label>
                        {singleClient._id}
                        <label>Move In Date</label>
                        {singleClient.moveInDate}
                    </div>
                )

            }
        </div>
    )

}

export default ClientProfile



