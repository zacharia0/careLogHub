

// PassMedsList.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMedicationContext } from "../../hooks/useMedicationContext.js";
import { useClientContext } from "../../hooks/useClientContext.js";
import PassMedsForm from "./PassMedsForm.jsx";

const PassMedsList = () => {
    const { medicationByClient, dispatch } = useMedicationContext();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("morning");
    const { clientId } = useParams();
    const { clients } = useClientContext();
    const [err, setError] = useState("");

    useEffect(() => {
        const determineActiveTab = () => {
            const currentHour = new Date().getHours();
            if (currentHour >= 0 && currentHour < 12) return "morning";
            if (currentHour >= 12 && currentHour < 16) return "afternoon";
            if (currentHour >= 16 && currentHour < 20) return "evening";
            return "bedtime";
        };
        setActiveTab(determineActiveTab());

        const fetchMedicationById = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/api/med/${clientId}`);
                const json = await response.json();
                if (response.ok) {
                    dispatch({ type: "SET_MEDICATION_BY_CLIENT_ID", payload: json });
                    setError("");
                } else {
                    setError(json.error);
                }
            } catch (error) {
                console.log("An error occurred:", error);
                setError("Failed to fetch medication. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchMedicationById();
    }, [dispatch, clientId]);

    const handleMedicationSubmit = () => {
        // Optional: Refresh medications or show success message
    };

    if (loading) {
        return <p>Loading Medications...</p>;
    }

    const findClient = clients.find((client) => client._id === clientId);
    const filteredMeds = medicationByClient
        .filter((med) => med.timeSlot.includes(activeTab));

    const firstName = findClient?.firstName;
    const lastName = findClient?.lastName;

    return (
        <div>
            <h1>Pass Meds</h1>
            <div className="ml-2 md:flex">
                <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 text-center">
                    {["morning", "afternoon", "evening", "bedtime"].map((timeslot) => (
                        <li key={timeslot}>
                            <button
                                type="button"
                                onClick={() => setActiveTab(timeslot)}
                                className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                                    activeTab === timeslot
                                        ? "text-white bg-blue-700 dark:bg-blue-600 font-bold"
                                        : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-300 font-normal"
                                }`}
                            >
                                {timeslot.charAt(0).toUpperCase() + timeslot.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-700 rounded-lg w-full">
                    <div>
                        <label className="font-medium">Medication For: </label>
                        <div className="inline-flex ml-3 font-bold text-white">{`${firstName} ${lastName}`}</div>
                    </div>

                    <PassMedsForm
                        filteredMeds={filteredMeds}
                        clientInfo={clientId}
                        onMedicationSubmit={handleMedicationSubmit}
                    />

                </div>
            </div>
        </div>
    );
};

export default PassMedsList;