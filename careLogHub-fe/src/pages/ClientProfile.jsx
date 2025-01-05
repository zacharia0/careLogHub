
import React, { useEffect, useState } from "react";
import {Link, Route, useNavigate, useParams} from "react-router-dom";
import { useClientContext } from "../hooks/useClientContext.js";
import Modal from "react-modal";
import EditClientProfile from "../components/EditClientProfile.jsx";
import MedicationForm from "../components/MedicationForm.jsx";
import { FaPlus } from "react-icons/fa";
import { GiPill } from "react-icons/gi";

const ClientProfile = () => {
    Modal.setAppElement("#root");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to the month (0-based)
        const day = String(date.getDate()).padStart(2, '0'); // Day with padding
        const year = date.getFullYear(); // Full year
        return `${month}/${day}/${year}`;
    };



    const { singleClient, getSingleClient, dispatch } = useClientContext();
    const { clientId } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateMedicationModalOpen, setIsCreateMedicationModalOpen] = useState(false);


    const navigate = useNavigate();

    const handleDeleteClient = async () => {
        const response = await fetch(`http://localhost:4000/api/client/${clientId}`, {
            method: "DELETE",
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: "DELETE_CLIENT", payload: json });
            navigate("/all-clients");
        } else {
            console.log("failed to delete client");
        }
    };


    useEffect(() => {
        getSingleClient(clientId);
        console.log(singleClient)
    }, [clientId]);

    const handleCloseModal = () =>{
        setIsEditModalOpen(false)
    }

    const handleCloseCreateMedicationModal = () =>{
        setIsCreateMedicationModalOpen(false)

    }

    return (

        <div className="min-h-screen py-8">

            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                <Link
                    to="/all-clients"
                    className="inline-block mb-4 text-blue-500 hover:underline"
                >
                    ← Back to Client List
                </Link>
                {singleClient && (
                    <>
                        {/* Header Section */}
                        <div className="flex items-center gap-6 mb-6">
                            <div
                                className="bg-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
                                {singleClient.firstName.charAt(0).toUpperCase()}
                                {singleClient.lastName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-800">
                                    {singleClient.firstName} {singleClient.middleName} {singleClient.lastName}
                                </h1>
                                <p className="text-gray-500">Room {singleClient.roomNumber || "N/A"}</p>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex gap-4 mb-8">
                            <Link
                                to={`/client-medications/${clientId}`}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                            >
                                <GiPill
                                    className={"inline-block text-2xl pb-1 mr-1"}
                                />
                                View Medications
                            </Link>

                            <button
                                className={"bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"}
                                onClick={() => setIsCreateMedicationModalOpen(true)}
                            > <FaPlus
                                className={"inline-block pb-1 text-xl mr-1"}
                            /> Add New Medication</button>

                            <Modal
                                isOpen = {isCreateMedicationModalOpen}
                                onRequestClose={handleCloseCreateMedicationModal}
                                contentLabel="Edit Daily Log"
                                className="relative bg-white p-6 rounded-lg shadow-md w-[800px] mx-auto my-16"
                                overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center"

                            >

                                <MedicationForm
                                    // clientId = {clientId}
                                    onClose = {handleCloseCreateMedicationModal}
                                />
                            </Modal>

                        </div>

                        {/* Information Sections */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* Personal Info */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                                    Personal Information
                                </h2>
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-medium text-gray-600">Date of Birth:</span>{" "}
                                        {singleClient.dateOfBirth ? formatDate(singleClient.dateOfBirth) : "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-600">Move In Date:</span>{" "}
                                        {singleClient.moveInDate ? formatDate(singleClient.moveInDate) : "N/A"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-600">Room Number:</span>{" "}
                                        {singleClient.roomNumber || "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Medical Info */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                                    Medical Information
                                </h2>
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-medium text-gray-600">Diagnoses:</span>{" "}
                                        {singleClient.diagnoses || "None"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-600">Food Allergy:</span>{" "}
                                        {singleClient.foodAllergy || "NONE"}
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-600">Medical Allergy:</span>{" "}
                                        {singleClient.medicalAllergy || "NONE"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contacts Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
                                Contacts
                            </h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium text-gray-600">Emergency Contact:</span>{" "}
                                    {singleClient.emergencyContact || "Not provided"}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-600">Guardian:</span>{" "}
                                    {singleClient.guardian || "Not provided"}
                                </p>
                                <p>
                            <span className="font-medium text-gray-600">
                                Primary Medical Contact:
                            </span>{" "}
                                    {singleClient.primaryMedicalContact || "Not provided"}
                                </p>
                            </div>
                        </div>

                        {/*Action Buttons*/}
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDeleteClient}
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                            >
                                Remove Client
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}

            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Edit Client Details"
                className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >

                <EditClientProfile
                    isModalOpen = {isEditModalOpen}
                    onClose = {handleCloseModal}
                />

            </Modal>
        </div>

    );
};

export default ClientProfile;

