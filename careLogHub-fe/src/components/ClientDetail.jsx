// import {useClientContext} from "../hooks/useClientContext.js";
// import {useState} from "react";
// import {Link} from "react-router-dom";
//
// const ClientDetail = ({clients}) => {
//     //Helper function to format date.
//     const formatDate= (date) =>{
//         if(!date) return ""
//
//         const d = new Date(date);
//         return d.toISOString().split("T")[0] // Formats as YYYY-MM-DD
//     }
//
//
//     const {dispatch} = useClientContext()
//     console.log(clients)
//     const [isEditing, setIsEditing] = useState(false)
//     const [updateClient, setUpdateClient] = useState({
//         firstName: clients.firstName || "",
//         lastName: clients.lastName || "",
//         moveInDate: formatDate(clients.moveInDate ),
//         dateOfBirth: formatDate(clients.dateOfBirth) ,
//         diagnoses: clients.diagnoses || ""
//
//     })
//
//
//     const handleDelete = async () => {
//
//         const id = clients._id
//         // console.log("Id: ",id)
//         const response = await fetch(`http://localhost:4000/api/client/${id}`, {
//             method: "DELETE"
//         })
//         const json = await response.json()
//         if (response.ok) {
//             console.log("Client delete")
//             dispatch({type: "DELETE_CLIENT", payload: json})
//         }
//         if (!response.ok) {
//             console.log("Failed to delete client.")
//         }
//     }
//
//     const handleUpdate = async (e) => {
//         // e.preventDefault()
//         const clientId = clients._id
//
//         const response = await fetch(`http://localhost:4000/api/client/${clientId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(updateClient)
//         })
//         const json = await response.json()
//         if (response.ok) {
//             console.log("Client Updated.")
//             dispatch({type: "UPDATE_CLIENT", payload: json})
//             setIsEditing(false)
//         }
//         if (!response.ok) {
//             console.log("Failed to update client.")
//         }
//     }
//
//     return (
//         <div>
//             {
//
//                 isEditing ? (
//                         <form onSubmit={handleUpdate}>
//                             <label>First Name: </label>
//                             <input
//                                 type="text"
//                                 value={updateClient.firstName}
//                                 onChange={(e) => setUpdateClient({...updateClient, firstName: e.target.value})}
//                             />
//
//                             <label>Last Name: </label>
//                             <input
//                                 type="text"
//                                 value={updateClient.lastName}
//                                 onChange={(e) => setUpdateClient({...updateClient, lastName: e.target.value})}
//                             />
//
//                             <label>date of Birth:</label>
//                             <input
//                                 type="date"
//                                 value = {updateClient.dateOfBirth}
//                                 onChange={(e) => setUpdateClient({...updateClient,dateOfBirth: e.target.value})}
//                             />
//
//                             <label>Move in Date:</label>
//                             <input
//                                 type="date"
//                                 value ={updateClient.moveInDate}
//                                 onChange={(e) => setUpdateClient({...updateClient,moveInDate: e.target.value})}
//                             />
//
//
//                             <label>Diagnoses: </label>
//                             <textarea
//                                 type="text"
//                                 value={updateClient.diagnoses}
//                                 onChange={(e) => setUpdateClient({...updateClient, diagnoses: e.target.value})}
//                             ></textarea>
//                             <button className="save-btn" type="submit">Save</button>
//                             <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
//                         </form>
//
//                     ) :
//                     (
//                         <div className="mt-2 "> <hr className="mt-6 mb-2"></hr>
//
//
//
//                                 <div>
//
//                                     <span>Full Name: {clients.firstName} {clients.lastName}</span>
//                                     <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
//                                     <button className="delete-btn" onClick={handleDelete}>Delete</button>
//                                     <Link to ={`/all-clients/${clients._id}`}>View Client Detail</Link>
//                                 </div>
//
//
//
//
//                         </div>
//                     )
//
//             }
//
//         </div>
//     )
//
// }
//
// export default ClientDetail



import { useClientContext } from "../hooks/useClientContext.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const ClientDetail = ({ clients }) => {
    const { dispatch } = useClientContext();

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toISOString().split("T")[0];
    };

    const [isEditing, setIsEditing] = useState(false);
    const [updateClient, setUpdateClient] = useState({
        firstName: clients.firstName || "",
        lastName: clients.lastName || "",
        moveInDate: formatDate(clients.moveInDate),
        dateOfBirth: formatDate(clients.dateOfBirth),
        diagnoses: clients.diagnoses || "",
    });

    const handleDelete = async () => {
        const id = clients._id;

        const response = await fetch(`http://localhost:4000/api/client/${id}`, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_CLIENT", payload: json });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const clientId = clients._id;

        const response = await fetch(`http://localhost:4000/api/client/${clientId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateClient),
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "UPDATE_CLIENT", payload: json });
            setIsEditing(false);
        }
    };

    return (
        <>
            {/* Conditional rendering for editing state */}
            {isEditing ? (
                <tr>
                    <td colSpan="5" className="py-4 px-4">
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-600">First Name</label>
                                    <input
                                        type="text"
                                        value={updateClient.firstName}
                                        onChange={(e) =>
                                            setUpdateClient({ ...updateClient, firstName: e.target.value })
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Last Name</label>
                                    <input
                                        type="text"
                                        value={updateClient.lastName}
                                        onChange={(e) =>
                                            setUpdateClient({ ...updateClient, lastName: e.target.value })
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={updateClient.dateOfBirth}
                                        onChange={(e) =>
                                            setUpdateClient({ ...updateClient, dateOfBirth: e.target.value })
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-600">Move-in Date</label>
                                    <input
                                        type="date"
                                        value={updateClient.moveInDate}
                                        onChange={(e) =>
                                            setUpdateClient({ ...updateClient, moveInDate: e.target.value })
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600">Diagnoses</label>
                                <textarea
                                    value={updateClient.diagnoses}
                                    onChange={(e) =>
                                        setUpdateClient({ ...updateClient, diagnoses: e.target.value })
                                    }
                                    className={"textarea-form placeholder: Write client diagnoses..."}
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </td>
                </tr>
            ) : (
                <tr className="border-b hover:bg-gray-50 transition duration-150">
                    <td className="py-4 px-4">{clients.firstName} {clients.lastName}</td>
                    <td className="py-4 px-4">{formatDate(clients.dateOfBirth)}</td>
                    <td className="py-4 px-4">{formatDate(clients.moveInDate)}</td>
                    <td className="py-4 px-4">{clients.diagnoses}</td>
                    <td className="py-4 px-4 flex space-x-3">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-600 hover:underline"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-red-600 hover:underline"
                        >
                            Delete
                        </button>
                        <Link
                            to={`/all-clients/${clients._id}`}
                            className="text-green-600 hover:underline"
                        >
                            View
                        </Link>
                    </td>
                </tr>
            )}
        </>
    );
};

export default ClientDetail;
