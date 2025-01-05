import {TIME_SLOT} from "../utils/timeSlotUtils.js";
import {useParams} from "react-router-dom";
import {useMedicationContext} from "../hooks/useMedicationContext.js";
import {DosageUnits} from "../constants/dosageUnits.js"
import {useState} from "react";

const MedicationForm = ({clientIds, onClose}) => {
    const {clientId} = useParams()
    const {dispatch} = useMedicationContext()
    const [error, setError] = useState("")
    const [medicationData, setMedicationData] = useState({
        medication_name: "",
        medication_dosage: "",
        dosage_unit: "MG",
        medication_instruction: "",
        schedule_time: "",
        time_slot: {}

    })


    const handleScheduleTimeChange = (slot, time) => {

        setMedicationData((prevState) => ({
            ...prevState,
            time_slot: {
                ...prevState.time_slot,
                [slot]: time
            }
        }))
    }

    const handleTimeSlotChange = (slot) => {
        setMedicationData((prevData) => {
            const updatedSlots = {...prevData.time_slot};
            const theWholeThing = {...prevData}
            console.log(theWholeThing)
            console.log(updatedSlots)
            if (updatedSlots[slot]) {
                // Remove the time slot if it's already selected
                delete updatedSlots[slot];
            } else {
                // Add the time slot with an empty time value
                updatedSlots[slot] = "";
            }
            return {...prevData, time_slot: updatedSlots};
        });
    };


    const submitMedicationForm = (e) => {
        e.preventDefault()
        const missingFields = []
        if (!medicationData.medication_name) {
            missingFields.push("Medication Name")
        }
        if (!medicationData.medication_dosage) {
            missingFields.push("Medication Dosage")
        }
        if (!medicationData.dosage_unit) {
            missingFields.push("Medication Unit")
        }
        if (!medicationData.medication_instruction) {
            missingFields.push("Medication Instruction")
        }
        if (!medicationData.schedule_time) {
            missingFields.push("Schedule Time")
        }
        // if(!medicationData.time_slot){
        //     missingFields.push("Time Slot")
        // }
        if (Object.keys(medicationData.time_slot).length === 0) {
            missingFields.push("Time Slot")

        }
        if (missingFields.length > 0) {
            setError(`Missing the following fields: ${missingFields.join(", ")} `)
            // return
        }

        const today = new Date().toISOString().split("T")[0]
        const timeSlotArray = Object.keys(medicationData.time_slot)
        const scheduleTimeArray = Object.values(medicationData.time_slot).map(
            (time) => new Date(`${today}T${time}:00.000Z`) // Convert to full Date
        );

        const payLoad = {
            medication_name: medicationData.medication_name,
            medication_dosage: medicationData.medication_dosage,
            dosage_unit: medicationData.dosage_unit,
            medication_instruction: medicationData.medication_instruction,
            time_slot: timeSlotArray,
            schedule_time: scheduleTimeArray,
        }

        const createMedicationForm = async () => {
            const response = await fetch("http://localhost:4000/api/med", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({medicationData: payLoad, clientId})
            })
            const json = await response.json()
            if (response.ok) {
                setError("")
                dispatch({type: "CREATE_MEDICATION", payload: json.data})
                onClose(false)

            } else {
                setError(json.error)
            }

        }

        createMedicationForm()

    }

    if(!onclose){
        console.log("Yes")
    }
    return (
        <div className="relative bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Add New Medication</h3>
            <button
                onClick={() => onClose(true)}
                className="absolute top-3 right-3 text-gray-500 text-2xl hover:text-gray-900"
            >
                &times;
            </button>

            <form onSubmit={submitMedicationForm}
                  >


                {/* Error Message */}
                {error && <div className="text-red-500 mb-4">{error}</div>}

                {/* Medication Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Medication Name</label>
                    <input
                        type="text"
                        value={medicationData.medication_name}
                        onChange={(e) => setMedicationData({...medicationData, medication_name: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Medication Dosage */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Medication Dosage</label>
                    <input
                        type="number"
                        value={medicationData.medication_dosage}
                        onChange={(e) => setMedicationData({...medicationData, medication_dosage: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Dosage Unit */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Dosage Unit</label>
                    <select
                        value={medicationData.dosage_unit}
                        onChange={(e) => setMedicationData({...medicationData, dosage_unit: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {Object.entries(DosageUnits).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Medication Instruction */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Medication Instruction</label>
                    <input
                        type="text"
                        value={medicationData.medication_instruction}
                        onChange={(e) => setMedicationData({...medicationData, medication_instruction: e.target.value})}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Time Slot */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Time Slot</label>
                    {Object.entries(TIME_SLOT).map(([key, slot]) => (
                        <div key={key} className="flex items-center space-x-4 mb-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={!!medicationData.time_slot[slot]}
                                    onChange={() => handleTimeSlotChange(slot)}
                                    className="w-5 h-5 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="text-gray-700">{slot}</label>
                            </div>

                            {/* Schedule Time Input */}
                            {medicationData.time_slot[slot] !== undefined && (
                                <div className="flex items-center space-x-2">
                                    <label className="text-gray-700">Schedule Time:</label>
                                    <input
                                        required
                                        type="time"
                                        value={medicationData.time_slot[slot] || ""}
                                        onChange={(e) => handleScheduleTimeChange(slot, e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Create Medication
                </button>
            </form>
        </div>

    )
}

export default MedicationForm
