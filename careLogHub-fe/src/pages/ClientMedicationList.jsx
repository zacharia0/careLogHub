
import { Link, useParams } from "react-router-dom";
import { useMedicationContext } from "../hooks/useMedicationContext.js";
import { useEffect, useState } from "react";
import { useClientContext } from "../hooks/useClientContext.js";
import Modal from "react-modal";
import UpdateMedication from "../components/UpdateMedication.jsx";

const ClientMedicationList = () => {
    const { clientId } = useParams();
    const { singleClient, getSingleClient } = useClientContext();
    const { medicationByClientId, fetchMedicationByClientId, dispatch } = useMedicationContext();
    const medications = medicationByClientId[clientId] || [];
    const client = medications.length > 0 ? medications[0].client : {};
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState(null);

    useEffect(() => {
        fetchMedicationByClientId(clientId);
        getSingleClient(clientId);
    }, [clientId]);

    const handleDelete = async (medicationId) => {
        const response = await fetch(`http://localhost:4000/api/med/${medicationId}`, {
            method: "DELETE",
        });
        const json = await response.json();
        if (!response.ok) {
            console.log("Failed to delete Medication");
        }
        dispatch({ type: "DELETE_MEDICATION", payload: json });
        console.log("Deleted", medicationId);
    };

    const handleCloseEditMedicationModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEdit = (medication) => {
        setSelectedMedication(medication);
        setIsEditModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 mt-7">
            <Link
                to={`/client-profile/${clientId}`}
                className="text-blue-600 hover:underline font-medium"
            >
                ← Back to Client Profile
            </Link>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Medications for: {singleClient?.firstName} {singleClient?.lastName || "Unknown"}
                </h2>

                {medications.length > 0 ? (
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead >
                        <tr className="bg-gray-50">
                            <th className="border px-4 py-2">Medication Name</th>
                            <th className="border px-4 py-2">Dosage</th>
                            <th className="border px-4 py-2">Time Slot</th>
                            <th className="border px-4 py-2">Schedule Time</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {medications.map((med) => (
                            <tr key={med._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                                    {med.medication_name}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                                    {med.medication_dosage} {med.dosage_unit}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                                    {med.time_slot.join(", ")}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                                    {med.schedule_time}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEdit(med)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring focus:ring-blue-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(med._id)}
                                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:ring focus:ring-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <p className="text-gray-600">No medications found for this client. </p>
                    </div>
                )}

                <Modal
                    isOpen={isEditModalOpen}
                    onRequestClose={handleCloseEditMedicationModal}
                    contentLabel="Edit Medication"
                    overlayClassName = "fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center"

                    className="relative bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-2xl mx-auto my-16"
                >
                    {selectedMedication && (
                        <UpdateMedication
                            medication={selectedMedication}
                            onClose={handleCloseEditMedicationModal}
                        />
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default ClientMedicationList;