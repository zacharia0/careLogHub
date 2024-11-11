import {useMedicationContext} from "../hooks/useMedicationContext.js";
import {useState} from "react";
import{DosageUnits} from "../constants/dosageUnits.js";
import {Link} from "react-router-dom";

const MedicationForm = () => {
    const {dispatch} = useMedicationContext()
    const [medication, setMedication] = useState({
        medName: "",
        medDosage: "",
        dosageUnit: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        let missingFields = []
        if (!medication.medName) {
            missingFields.push("Medication name")
        }
        if (!medication.medDosage) {
            missingFields.push("Medication dosage")
        }
        if (!medication.dosageUnit) {
            missingFields.push("Dosage Unit")
        }
        if (missingFields.length > 0) {
            throw new Error(`The following fields are required: ${missingFields.join(", ")}`)
        }

        const response = await fetch("http://localhost:4000/api/med", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medication)
        })
        const json = await response.json()
        if (!response.ok) {
            console.log("Failed to create new medication")
        }

        if (response.ok) {
            dispatch({type: "CREATE_MEDICATION"})
            console.log("Created new meds")
        }

    }

    return (
        <div>
            <h1>Medication Form</h1>
            <Link className={"navigation-btn"} to ="/all-medication">All Medications</Link>
            <form onSubmit={handleSubmit}>
                <label>Medication Name</label>
                <input
                    type="text"
                    value={medication.medName}
                    onChange={(e) => setMedication({...medication, medName: e.target.value})}
                />
                <label>Medication Dosage</label>
                <input
                    type="text"
                    value={medication.medDosage}
                    onChange={(e) => setMedication({...medication, medDosage: e.target.value})}

                />
                <label>Dosage Unit</label>
                <select
                    value={medication.dosageUnit}
                    onChange={(e) => setMedication({...medication,dosageUnit: e.target.value})}
                >
                    {
                        Object.values(DosageUnits).map((unit) =>(
                            <option key = {unit} value={unit}>{unit}</option>
                        ))
                    }
                </select>

                <button
                    className="create-btn">Add
                    New Med
                </button>
            </form>

        </div>
    )

}
export default MedicationForm
