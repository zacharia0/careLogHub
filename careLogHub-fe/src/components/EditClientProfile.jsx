import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useClientContext} from "../hooks/useClientContext.js";
import {format, parseISO} from "date-fns";

const EditClientProfile = ({onClose}) =>{

    // const navigate = useNavigate();
    const { singleClient, getSingleClient, dispatch } = useClientContext();
    const { clientId } = useParams();

    const formatDateForInput = (dateString) => {
        const date = parseISO(dateString); // Parses ISO 8601 string to Date object
        return format(date, 'yyyy-MM-dd'); // Formats to YYYY-MM-DD
    };

    const [updateClient, setUpdateClient] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        moveInDate: "",
        roomNumber: "",
        foodAllergy: "",
        medicalAllergy: "",
        emergencyContact: "",
        diagnoses: "",
        primaryMedicalContact: "",
        guardian: "",
    });

    useEffect(() => {
        if (singleClient) {
            setUpdateClient({
                firstName: singleClient?.firstName,
                middleName: singleClient?.middleName,
                lastName: singleClient?.lastName,
                dateOfBirth: singleClient?.dateOfBirth ? formatDateForInput(singleClient?.dateOfBirth) : "",
                moveInDate: singleClient?.moveInDate ? formatDateForInput(singleClient?.moveInDate): "",
                roomNumber: singleClient?.roomNumber,
                foodAllergy: singleClient?.foodAllergy,
                medicalAllergy: singleClient?.medicalAllergy,
                emergencyContact: singleClient?.emergencyContact,
                diagnoses: singleClient?.diagnoses,
                primaryMedicalContact: singleClient?.primaryMedicalContact,
                guardian: singleClient?.guardian,
            });
        }
    }, [singleClient]);


    const handleClientUpdate = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/api/client/${clientId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateClient),
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: "UPDATE_CLIENT", payload: json });
            onClose(false);
        } else {
            console.warn("failed to updated client");
        }
    };


    useEffect(() => {
        getSingleClient(clientId);
    }, [clientId]);

    return (
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg flex flex-col max-h-[90vh]">
                <div className="p-6 overflow-auto flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Client Details</h2>
                    <form onSubmit={handleClientUpdate}  className="space-y-6" id={"clientEditForm"}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block font-semibold mb-1">First Name:</label>
                                <input
                                    required
                                    type="text"
                                    value={updateClient.firstName}
                                    onChange={(e) => setUpdateClient({...updateClient, firstName: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Middle Name:</label>
                                <input
                                    type="text"
                                    value={updateClient.middleName}
                                    onChange={(e) => setUpdateClient({...updateClient, middleName: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Last Name:</label>
                                <input
                                    type="text"
                                    value={updateClient.lastName}
                                    onChange={(e) => setUpdateClient({...updateClient, lastName: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-semibold mb-1">Date of Birth:</label>
                                <input
                                    type="date"
                                    value={updateClient.dateOfBirth}
                                    onChange={(e) =>
                                        setUpdateClient({
                                            ...updateClient,
                                            dateOfBirth: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Move In Date:</label>
                                <input
                                    type="date"
                                    value={updateClient.moveInDate}
                                    onChange={(e) =>
                                        setUpdateClient({
                                            ...updateClient,
                                            moveInDate: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block font-semibold mb-1">Room Number:</label>
                                <input
                                    type="text"
                                    value={updateClient.roomNumber}
                                    onChange={(e) =>
                                        setUpdateClient({
                                            ...updateClient,
                                            roomNumber: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Food Allergy:</label>
                                <input
                                    type="text"
                                    value={updateClient.foodAllergy}
                                    onChange={(e) =>
                                        setUpdateClient({
                                            ...updateClient,
                                            foodAllergy: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Medical Allergy:</label>
                                <input
                                    type="text"
                                    value={updateClient.medicalAllergy}
                                    onChange={(e) =>
                                        setUpdateClient({
                                            ...updateClient,
                                            medicalAllergy: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block font-semibold mb-1">Emergency Contact:</label>
                                <input
                                    type="text"
                                    value={updateClient.emergencyContact}
                                    onChange={(e) =>
                                        setUpdateClient({
                                            ...updateClient,
                                            emergencyContact: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Primary Medical Contact:</label>
                                <input
                                    type="text"
                                    value={updateClient.primaryMedicalContact}
                                    onChange={(e) =>
                                        setUpdateClient({
                                            ...updateClient,
                                            primaryMedicalContact: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Guardian:</label>
                                <input
                                    type="text"
                                    value={updateClient.guardian}
                                    onChange={(e) =>
                                        setUpdateClient({
                                            ...updateClient,
                                            guardian: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-4 border-t bg-gray-100 flex justify-end space-x-4">
                    <button
                        onClick={() => onClose(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        form="clientEditForm"
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
        </div>
    )
}

export default EditClientProfile