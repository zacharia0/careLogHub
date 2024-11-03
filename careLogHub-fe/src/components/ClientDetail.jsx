import {useClientContext} from "../hooks/useClientContext.js";
import {useState} from "react";

const ClientDetail = ({clients}) => {
    const {dispatch} = useClientContext()
    const [isEditing, setIsEditing] = useState(false)
    const [updateClient, setUpdateClient] = useState({
        firstName: clients.firstName || "",
        lastName: clients.lastName || "",
        moveInDate: clients.moveInDate || "",
        dateOfBirth: clients.dateOfBirth || "",
        diagnoses: clients.diagnoses || ""

    })

    const handleDelete = async () => {
        const id = clients._id
        const response = await fetch(`http://localhost:4000/api/client/${id}`, {
            method: "DELETE"
        })
        const json = await response.json()
        if (response.ok) {
            console.log("Client delete")
            dispatch({type: "DELETE_CLIENT", payload: json})
        }
        if (!response.ok) {
            console.log("Failed to delete client.")
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const clientId = clients._id

        const response = await fetch(`http://localhost:4000/api/client/${clientId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateClient)
        })
        const json = await response.json()
        if (response.ok) {
            console.log("Client Updated.")
            dispatch({type: "UPDATE_CLIENT", payload: json})
            setIsEditing(false)
        }
        if (!response.ok) {
            console.log("Failed to update client.")
        }
    }

    return (
        <div>
            {

                isEditing ? (
                        <form onSubmit={handleUpdate}>
                            <label>First Name: </label>
                            <input
                                type="text"
                                value={updateClient.firstName}
                                onChange={(e) => setUpdateClient({...updateClient, firstName: e.target.value})}
                            />

                            <label>Last Name: </label>
                            <input
                                type="text"
                                value={updateClient.lastName}
                                onChange={(e) => setUpdateClient({...updateClient, lastName: e.target.value})}
                            />
                            <label>Move-In Date: </label>
                            <input
                                type="date"
                                value={updateClient.moveInDate}
                                onChange={(e) => setUpdateClient({...updateClient, moveInDate: e.target.value})}

                            />
                            <label>Date Of Birth: </label>
                            <input
                                type="date"
                                value={updateClient.dateOfBirth}
                                onChange={(e) => setUpdateClient({...updateClient, dateOfBirth: e.target.value})}
                            />

                            <label>Diagnoses: </label>
                            <textarea
                                value={updateClient.diagnoses}
                                onChange={(e) => setUpdateClient({...updateClient, diagnoses: e.target.value})}
                            ></textarea>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow" type="submit">Save</button>
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>

                    ) :
                    (
                        <div className="mt-2 "> <hr className="mt-6 mb-2"></hr>


                            <span>Full Name: {clients.firstName} {clients.lastName}</span>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow ml-2 mr-2" onClick={handleDelete}>Delete</button>
                            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded shadow ml-2" onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    )

            }

        </div>
    )

}

export default ClientDetail