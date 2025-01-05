import {useState} from "react";
import {useMedicationContext} from "../hooks/useMedicationContext.js";
import {DosageUnits} from "../constants/dosageUnits.js";
import {useClientContext} from "../hooks/useClientContext.js";

const UpdateMedication = ({medications, clients, medication, onClose}) => {
    const {dispatch} = useMedicationContext()

    console.log(medication)

    const [updateMedication, setUpdateMedication] = useState({
        medication_name: medication?.medication_name,
        medication_dosage: medication?.medication_dosage,
        dosage_unit: medication?.dosage_unit
    })

    // console.log(medications_id)
    const handleUpdate = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/api/med/${medication._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updateMedication)
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type: "UPDATE_MEDICATION", payload: json})
            // dispatch({ type: "UPDATE_MEDICATION_BY_CLIENT_ID", payload: { clientId: medication.clientId, medications: [json] } });
            // setIsEditing(false)
            onClose(false)
        } else {
            console.warn("failed to update")

        }

    }


    return (

        <div className={"bg-white p-6 rounded-lg shadow-md relative max-w-lg mx-auto border "}>

            <button
                className={"absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl"}
                onClick={() => onClose(false)}
            >
                &times;
            </button>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Medication</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label
                        htmlFor="medication_name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Medication Name:
                    </label>
                    <input
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        id="medication_name"
                        type="text"
                        value={updateMedication.medication_name}
                        onChange={(e) => setUpdateMedication({...updateMedication, medication_name: e.target.value})}
                    />
                </div>
                <div>

                    <label
                        htmlFor="medication_dosage"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Dosage:
                    </label>
                    <input
                        className=" mt-1 w-full p-2 block border border-gray-300 rounded-md shadow-sm focus:ring-blue500 focus:border-blue-500"
                        id ="medication_dosate"
                        type="text"
                        value={updateMedication.medication_dosage}
                        onChange={(e) => setUpdateMedication({...updateMedication, medication_dosage: e.target.value})}
                    />
                </div>

                <div>

                    <label
                        htmlFor="dosage_unit"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Dosage Unit
                    </label>
                    <select
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={updateMedication.dosage_unit}
                        onChange={(e) => setUpdateMedication({...updateMedication, dosage_unit: e.target.value})}
                    >
                        {
                            Object.values(DosageUnits).map((unit) => (
                                <option value={unit} key={unit}>{unit}</option>
                            ))
                        }

                    </select>
                </div>
                <div className=" mt-1 flex justify-end space-x-4">
                    <button className={"px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"} type="submit">Save</button>
                    <button
                        className={"px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"}
                        onClick={() => onClose(false)}
                    >Cancel
                    </button>
                </div>


            </form>

        </div>

    )
}

export default UpdateMedication