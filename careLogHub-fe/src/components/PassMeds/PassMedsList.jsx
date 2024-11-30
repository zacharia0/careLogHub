import {useMedicationContext} from "../../hooks/useMedicationContext.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useClientContext} from "../../hooks/useClientContext.js";


const PassMedsList = () => {
    const {medicationByClient, dispatch} = useMedicationContext();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("morning");
    const {clientId} = useParams();
    const {clients} = useClientContext()
    const [err, setError] = useState("")

    useEffect(() => {
        // Determine active tab based on current time
        const determineActiveTab = () => {
            const currentHour = new Date().getHours();
            if (currentHour >= 0 && currentHour < 12) return "morning";
            if (currentHour >= 12 && currentHour < 16) return "afternoon";
            if (currentHour >= 16 && currentHour < 20) return "evening";
            return "bedtime";
        };
        setActiveTab(determineActiveTab());

        const fetchMedicationById = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:4000/api/med/${clientId}`);
                const json = await response.json();
                console.log("FETCHING MEDICATION BY CLIENT ID: ", json)
                if (response.ok) {
                    dispatch({type: "SET_MEDICATION_BY_CLIENT_ID", payload: json});
                    setError("")
                } else {
                    dispatch({type: "SET_MEDICATION_BY_CLIENT_ID", payload: []});
                    setError(json.error)
                }

            } catch (error) {
                console.log("An error occurred:", error)
                setError("Failed to fetch medication. Please try again later.")
                dispatch({type: "SET_MEDICATION_BY_CLIENT_ID", payload: []});

            } finally {
                setLoading(false)
            }


            console.log("Failed to fetch Medication by Id");

            setLoading(false);
        };
        fetchMedicationById();
    }, [dispatch, clientId]);

    // Handle button clicks
    // const handleAction = (medId, action) => {
    //     if (action === "Administer") {
    //         setAdministeredMeds((prev) => ({
    //             ...prev,
    //             [medId]: activeTab,
    //         }));
    //     }
    //     // Send action to backend
    //     // console.log(`Action: ${action}, Medication ID: ${medId}`);
    //     // Example API call:
    //     // await fetch('/api/med-admin', { method: 'POST', body: JSON.stringify({ medId, action, time: new Date() }) });
    // };


    const handleSubmitForm = (e) => {
        e.preventDefault()


    }

    if (loading) {
        return <p>Loading Medications...</p>;
    }

    const findClient = clients.find((client) => client._id === clientId)
    console.log(findClient)
    const filteredMeds = medicationByClient.filter((med) => med.timeSlot.includes(activeTab));

    const firstName = findClient?.firstName
    const lastName = findClient?.lastName

    return (
        <div>
            <h1>Pass Meds</h1>
            <div className="ml-2 md:flex">
                {/* Tab Navigation */}
                <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    {["morning", "afternoon", "evening", "bedtime"].map((timeslot) => (
                        <li key={timeslot}>
                            <button
                                type="button"
                                onClick={() => setActiveTab(timeslot)}
                                className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                                    activeTab === timeslot
                                        ? "text-white bg-blue-700 dark:bg-blue-600"
                                        : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500"
                                }`}
                            >
                                {timeslot.charAt(0).toUpperCase() + timeslot.slice(1)}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Medications List */}
                <div
                    className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-900 rounded-lg w-full">
                    <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        <label className=" font-medium text-gray-300">Medication(s) For: </label>
                        <div className={"inline-flex ml-3"}>
                            {`${firstName} ${lastName}`}
                        </div>
                    </div>

                    <form onSubmit={handleSubmitForm}>

                        {
                            filteredMeds && filteredMeds.length > 0 ?
                                filteredMeds.map((med) => (
                                        <div key={med._id} className="mb-4">
                                            <div className={"inline-flex"}>
                                                <label className={"pt-2 "}>Medication Name: </label>
                                                <div className={"ml-1 text-3xl text-white"}>

                                                    {med.medName}
                                                </div>
                                            </div>

                                            <div className="flex space-x-2 mt-2">
                                                {["Pass", "Refuse", "Adverse Reaction", "Other"].map((action) => (
                                                    <button
                                                        key={action}

                                                        className={`px-4 py-2 rounded border-1 bg-white text-gray hover:bg-blue-400 hover:text-white `}
                                                    >
                                                        {action}
                                                    </button>
                                                ))}

                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <div>
                                        {err || "No medications found for this client."}
                                    </div>
                                )
                        }
                        <button
                            className={"bg-green-500 hover:bg-green-700 font-medium rounded px-6 py-4 text-white"}
                            type="submit"
                        >Administer
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PassMedsList;
