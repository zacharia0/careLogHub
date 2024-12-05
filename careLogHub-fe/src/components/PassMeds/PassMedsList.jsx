// import {useMedicationContext} from "../../hooks/useMedicationContext.js";
// import {useEffect, useState} from "react";
// import {useParams} from "react-router-dom";
// import {useClientContext} from "../../hooks/useClientContext.js";
// import PassMedsForm from "./PassMedsForm.jsx";
//
//
// const PassMedsList = () => {
//     const {medicationByClient, dispatch} = useMedicationContext();
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState("morning");
//     const {clientId} = useParams();
//     const {clients} = useClientContext()
//     const [err, setError] = useState("")
//
//     useEffect(() => {
//         // Determine active tab based on current time
//         const determineActiveTab = () => {
//             const currentHour = new Date().getHours();
//             if (currentHour >= 0 && currentHour < 12) return "morning";
//             if (currentHour >= 12 && currentHour < 16) return "afternoon";
//             if (currentHour >= 16 && currentHour < 20) return "evening";
//             return "bedtime";
//         };
//         setActiveTab(determineActiveTab());
//
//         const fetchMedicationById = async () => {
//             setLoading(true)
//             try {
//                 const response = await fetch(`http://localhost:4000/api/med/${clientId}`);
//                 const json = await response.json();
//                 console.log("FETCHING MEDICATION BY CLIENT ID: ", json)
//                 if (response.ok) {
//                     dispatch({type: "SET_MEDICATION_BY_CLIENT_ID", payload: json});
//                     setError("")
//                 } else {
//                     // dispatch({type: "SET_MEDICATION_BY_CLIENT_ID", payload: []});
//                     setError(json.error)
//                 }
//
//             } catch (error) {
//                 console.log("An error occurred:", error)
//                 setError("Failed to fetch medication. Please try again later.")
//                 // dispatch({type: "SET_MEDICATION_BY_CLIENT_ID", payload: []});
//
//             } finally {
//                 setLoading(false)
//             }
//
//
//             console.log("Failed to fetch Medication by Id");
//
//             setLoading(false);
//         };
//         fetchMedicationById();
//     }, [dispatch, clientId]);
//
//     // Handle button clicks
//     // const handleAction = (medId, action) => {
//     //     if (action === "Administer") {
//     //         setAdministeredMeds((prev) => ({
//     //             ...prev,
//     //             [medId]: activeTab,
//     //         }));
//     //     }
//     //     // Send action to backend
//     //     // console.log(`Action: ${action}, Medication ID: ${medId}`);
//     //     // Example API call:
//     //     // await fetch('/api/med-admin', { method: 'POST', body: JSON.stringify({ medId, action, time: new Date() }) });
//     // };
//
//
//     const handleSubmitForm = (e) => {
//         e.preventDefault()
//
//
//     }
//
//     if (loading) {
//         return <p>Loading Medications...</p>;
//     }
//
//     const findClient = clients.find((client) => client._id === clientId)
//     console.log(findClient)
//     const filteredMeds = medicationByClient.filter((med) => med.timeSlot.includes(activeTab));
//
//     const firstName = findClient?.firstName
//     const lastName = findClient?.lastName
//
//     return (
//         <div>
//
//             <h1>Pass Meds</h1>
//             <div className="ml-2 md:flex">
//                 {/* Tab Navigation */}
//                 <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 text-center">
//                     {["morning", "afternoon", "evening", "bedtime"].map((timeslot) => (
//                         <li key={timeslot}>
//                             <button
//                                 type="button"
//                                 onClick={() => setActiveTab(timeslot)}
//                                 className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
//                                     activeTab === timeslot
//                                         ? "text-white bg-blue-700 dark:bg-blue-600 font-bold"
//                                         : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-300 font-normal"
//                                 }`}
//                             >
//                                 {timeslot.charAt(0).toUpperCase() + timeslot.slice(1)}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//
//                 {/* Medications List */}
//                 <div
//
//                     className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-700 rounded-lg w-full">
//                     <div>
//                         <label className=" font-medium ">Medication For: </label>
//                         <div className={"inline-flex ml-3 font-bold text-white "}>{`${firstName} ${lastName}`}</div>
//                     </div>
//
//                     <PassMedsForm className={""} filteredMeds={filteredMeds} clientInfo={clientId}/>
//
//
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default PassMedsList;


import {useMedicationContext} from "../../hooks/useMedicationContext.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useClientContext} from "../../hooks/useClientContext.js";
import PassMedsForm from "./PassMedsForm.jsx";

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
                if (response.ok) {
                    dispatch({type: "SET_MEDICATION_BY_CLIENT_ID", payload: json});
                    setError("")
                } else {
                    setError(json.error)
                }
            } catch (error) {
                console.log("An error occurred:", error)
                setError("Failed to fetch medication. Please try again later.")
            } finally {
                setLoading(false)
            }
        };
        fetchMedicationById();
    }, [dispatch, clientId]);

    if (loading) {
        return <p>Loading Medications...</p>;
    }

    const findClient = clients.find((client) => client._id === clientId)

    // Updated filtering to add unique time slot ID
    const filteredMeds = medicationByClient
        .filter((med) => med.timeSlot.includes(activeTab))
        .map(med => ({
            ...med,
            // Create a unique key that combines medication ID and time slot
            uniqueTimeSlotId: `${med._id}-${activeTab}`
        }));

    const firstName = findClient?.firstName
    const lastName = findClient?.lastName

    return (
        <div>
            <h1>Pass Meds</h1>
            <div className="ml-2 md:flex">
                {/* Tab Navigation */}
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

                {/* Medications List */}
                <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-700 rounded-lg w-full">
                    <div>
                        <label className=" font-medium ">Medication For: </label>
                        <div className={"inline-flex ml-3 font-bold text-white "}>{`${firstName} ${lastName}`}</div>
                    </div>

                    <PassMedsForm
                        allMedications = {medicationByClient}
                        filteredMeds={filteredMeds}
                        clientInfo={clientId}
                    />
                </div>
            </div>
        </div>
    );
};

export default PassMedsList;
