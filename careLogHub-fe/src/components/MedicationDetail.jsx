import {useState} from "react";
import {useMedicationContext} from "../hooks/useMedicationContext.js";
import {DosageUnits} from "../constants/dosageUnits.js";
import {useClientContext} from "../hooks/useClientContext.js";

const MedicationDetail = ({medications,clients}) => {
    const {dispatch} = useMedicationContext()
    const [isEditing, setIsEditing] = useState(false)
    const [updateMedication, setUpdateMedication] = useState({
        medName: medications.medName,
        medDosage: medications.medDosage,
        dosageUnit: medications.dosageUnit
    })

    // const filterClientById = clients.filter((client) => client._id !== medications.client._id)
    console.log(medications)
    // console.log("FILTER CLIENT BY ID: ",filterClientById)
    const handleUpdate = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/api/med/${medications._id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updateMedication)
        })
        const json = await response.json()
        if (!response.ok) {
            console.warn("failed to update")
        }
        dispatch({type: "UPDATE_MEDICATION", payload: json})
        setIsEditing(false)

    }

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:4000/api/med/${medications._id}`, {
            method: "DELETE"
        })
        const json = await response.json()
        if (!response.ok) {
            console.log("Failed to delete Medication")
        }
        dispatch({type: "DELETE_MEDICATION", payload: json})
    }

    return (

        <div className={"mb-2"}>
            {

                isEditing ?
                    (
                        <form onSubmit={handleUpdate}>
                            <label>Medication Name: </label>
                            <input
                                type="text"
                                value={updateMedication.medName}
                                onChange={(e) => setUpdateMedication({...updateMedication, medName: e.target.value})}
                            />
                            <label>Dosage: </label>
                            <input
                                type="text"
                                value={updateMedication.medDosage}
                                onChange={(e) => setUpdateMedication({...updateMedication, medDosage: e.target.value})}
                            />
                            <label>Dosage Unit</label>
                            <select
                                value={updateMedication.dosageUnit}
                                onChange={(e) => setUpdateMedication({...updateMedication, dosageUnit: e.target.value})}
                            >
                                {
                                    Object.values(DosageUnits).map((unit) => (
                                        <option value={unit} key={unit}>{unit}</option>
                                    ))
                                }

                            </select>
                            <button className={"save-btn"} type="submit">Save</button>
                            <button
                                className={"cancel-btn"}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsEditing(false)
                                }
                                }
                            >Cancel
                            </button>


                        </form>
                    ) : (


                        <div>

                            <label> First Name: </label>
                            {medications.clientFirstName+ " "} <br/>
                            <label>Last Name:</label>
                            {medications.clientLastName + " "}
                            <label>Medication Name: </label>
                            <span className={"mr-1"}>{medications.medName}</span>
                            <label>Dosage: </label>
                            <span className={"mr-1"}>{medications.medDosage}</span>
                            <span>({medications.dosageUnit})</span>

                            <button
                                className={"edit-btn"}
                                onClick={(e) => setIsEditing(true)}
                            >Edit
                            </button>
                            <button
                                className={"delete-btn"}
                                onClick={handleDelete}
                            >Delete
                            </button>
                        </div>

                    )


            }


        </div>

    )
}

export default MedicationDetail