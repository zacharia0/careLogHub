import {usePassMedsContext} from "../hooks/usePassMedsContext.js";
import {useEffect, useState} from "react";
import {useMedicationContext} from "../hooks/useMedicationContext.js";
import {useParams} from "react-router-dom";

const PassMedsList = () => {

    const {medicationByClient, dispatch} = useMedicationContext()
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("morning")
    const [administerMeds, setAdministerMeds] = useState({})
    const {clientId} = useParams()


    // useEffect(() =>{
    //
    // }

    useEffect(() => {
        const determineActiveTab = () => {
            const currentHour = new Date().getHours();
            if (currentHour >= 0 && currentHour < 12) {
                return "morning"
            }
            if (currentHour >= 12 && currentHour < 16) {
                return "afternoon"
            }
            if (currentHour >= 16 && currentHour < 20) {
                return "evening"
            }
            return "bedtime"
        }
        setActiveTab(determineActiveTab())


        if (medicationByClient) {
            setLoading(false)
        }
        const fetchMedicationById = async () => {
            const response = await fetch(`http://localhost:4000/api/med/${clientId}`)
            const json = await response.json()
            if (response.ok) {
                dispatch({type: "SET_MEDICATION_BY_CLIENT_ID", payload: json})
            } else {
                console.log("Failed to fetch Medication by Id: Line 23 PassMedsList.jsx")
            }
        }
        fetchMedicationById()
    }, [dispatch, clientId])


    // Handle button clicks
    const handleAction = (medId, action) =>{
        if(action === "administerer"){
            setAdministerMeds((prev) =>({
                ...prev,
                [medId]:activeTab
            }))
        }
    }

    if (loading) {
        return <p>Loading Medications...</p>
    }
    if (!medicationByClient || medicationByClient.length === 0) {
        return <p>No Medications to pass.</p>
    }

    const clientName = `${medicationByClient[0]?.client.firstName} ${medicationByClient[0].client.lastName}`

    const filteredMeds = medicationByClient.filter((med) => med.timeSlot.includes(activeTab))
    console.log("filtered meds", filteredMeds)


    return (
        <div>
            <h1>Pass Meds</h1>

            <div className="ml-2 md:flex">
                <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                        {["morning","afternoon","evening","bedtime"].map((timeSlot) =>(

                            <li key = {timeSlot}>
                                <button
                                    onClick={() => setActiveTab(timeSlot)}
                                    className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                                        activeTab === timeSlot
                                            ?"text-white bg-blue-700 dark:bg-blue-600"
                                            : "bg-gray-50 hover:Bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500"
                                    }`}

                                >
                                    {timeSlot[0].toUpperCase()+ timeSlot.slice(1)}
                                </button>

                            </li>

                        ))}
                    {/*<li>*/}
                    {/*    <button*/}
                    {/*        onClick={() => setActiveTab("morning")}*/}
                    {/*        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${*/}
                    {/*            activeTab === "morning"*/}
                    {/*                ? "text-white bg-blue-700 dark:bg-blue-600"*/}
                    {/*                : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500"*/}
                    {/*        }`}>*/}

                    {/*        Morning*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <button*/}
                    {/*        onClick={() => setActiveTab("afternoon")}*/}
                    {/*        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${*/}
                    {/*            activeTab === "afternoon"*/}
                    {/*                ? "text-white bg-blue-700 dark:bg-blue-600"*/}
                    {/*                : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800  text-gray-500"*/}
                    {/*        }`}>*/}
                    {/*        Afternoon*/}
                    {/*    </button>*/}


                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <button*/}
                    {/*        onClick={() => setActiveTab("evening")}*/}
                    {/*        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${*/}
                    {/*            activeTab === "evening"*/}
                    {/*                ? "text-white bg-blue-700 dark:bg-blue-600"*/}
                    {/*                : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800  text-gray-500"*/}
                    {/*        }`}>*/}
                    {/*        Evening*/}
                    {/*    </button>*/}
                    {/*</li>*/}
                    {/*<li>*/}

                    {/*    <button*/}
                    {/*        onClick={() => setActiveTab("bedtime")}*/}
                    {/*        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${*/}
                    {/*            activeTab === "bedtime"*/}
                    {/*                ? "text-white bg-blue-700 dark:bg-blue-600"*/}
                    {/*                : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800  text-gray-500"*/}
                    {/*        }`}>*/}
                    {/*        Bedtime*/}
                    {/*    </button>*/}
                    {/*</li>*/}

                </ul>
                <div
                    className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Medications
                        for: {clientName} </h3>


                    {
                        filteredMeds.length > 0 ? (
                            filteredMeds.map((med) => (
                                <div key={med._id} className={"mb-4"}>
                                    <div>

                                        <label>Medication Name: </label>
                                        {med.medName}
                                    </div>
                                    <div className={"flex space-x-2 mt-2"}>
                                        {["Pass","Refuse","Adverse Reaction", "Administer"].map((action) =>(
                                            <button
                                                key = {action}
                                                onClick={() => handleAction(med._id,action)}
                                                className={`px-4 py-2 rounded ${
                                                    action === "administer" && administerMeds[med._id] ===activeTab
                                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                        :"bg-blue-500 text-white hover:bg-blue-600"
                                                        
                                                }`}
                                                disabled={
                                                action === "administer" &&
                                                    administerMeds[med._id] === activeTab
                                                }
                                            >
                                                {action}
                                            </button>
                                        ))}

                                    </div>
                                </div>
                            ))

                        ) : (
                            <p>No Medications to pass.</p>
                        )
                    }

                </div>
            </div>


        </div>
    )

}

export default PassMedsList

