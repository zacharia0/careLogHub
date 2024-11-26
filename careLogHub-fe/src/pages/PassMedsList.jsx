import {usePassMedsContext} from "../hooks/usePassMedsContext.js";
import {useEffect, useState} from "react";
import {useMedicationContext} from "../hooks/useMedicationContext.js";
import {useParams} from "react-router-dom";

const PassMedsList = () => {

    const {medicationByClient, dispatch} = useMedicationContext()
    const [loading, setLoading] = useState(true)
    const [activeTab,setActiveTab] = useState("morning")

    const {clientId} = useParams()

    useEffect(() => {
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

    if (loading) {
        return <p>Loading Medications...</p>
    }
    if (!medicationByClient || medicationByClient.length === 0) {
        return <p>No Medications to pass.</p>
    }

    const clientName = `${medicationByClient[0]?.client.firstName} ${medicationByClient[0].client.lastName}`

    const filteredMeds = medicationByClient.filter((med) => med.timeSlot.includes(activeTab))
    console.log("filtered meds",filteredMeds)


    return (
        <div>
            <h1>Pass Meds</h1>

            <div className="ml-2 md:flex">
                <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    <li>
                        <button
                            onClick={() => setActiveTab("morning")}
                           className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                               activeTab === "morning"
                                   ? "text-white bg-blue-700 dark:bg-blue-600"
                                   : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500"
                           }`}>

                            Morning
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() =>  setActiveTab("afternoon")}
                           className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                               activeTab === "afternoon"
                                   ? "text-white bg-blue-700 dark:bg-blue-600"
                                   : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800  text-gray-500"
                           }`}>
                            Afternoon
                        </button>



                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab("evening")}
                           className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                               activeTab === "evening"
                                   ? "text-white bg-blue-700 dark:bg-blue-600"
                                   : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800  text-gray-500"
                           }`}>
                            Evening
                        </button>
                    </li>
                    <li>

                        <button
                            onClick={() => setActiveTab("bedtime")}
                           className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                               activeTab === "bedtime"
                                   ? "text-white bg-blue-700 dark:bg-blue-600"
                                   : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800  text-gray-500"
                           }`}>
                            Bedtime
                        </button>
                    </li>

                </ul>
                <div
                    className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Medications for: {clientName} </h3>


                    {
                        filteredMeds.length > 0 ? (
                        filteredMeds.map((med) => (
                            <div key={med._id}>
                                {/*<label>Client Name:</label>*/}
                                {/*{med.client.firstName} <br/>*/}
                                <label>Medication Name: </label>
                                {med.medName}
                            </div>
                        ))

                            ):(
                                <p>No Medications to pass.</p>
                            )
                    }

                </div>
            </div>


        </div>
    )

}

export default PassMedsList

