import {useMedicationContext} from "../hooks/useMedicationContext.js";
import {useEffect, useState} from "react";
import{DosageUnits} from "../constants/dosageUnits.js";
import {Link, useParams} from "react-router-dom";
import {useClientContext} from "../hooks/useClientContext.js";

const MedicationForm = () => {
    const {clientId} = useParams()
    const {medications,dispatch} = useMedicationContext()
    const [medication, setMedication] = useState({
        medName: "",
        medDosage: "",
        dosageUnit: "MG",
        timeSlot:[]
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
        if(medication.timeSlot.length === 0){
            missingFields.push("timeslot")
        }
        if (missingFields.length > 0) {
            throw new Error(`The following fields are required: ${missingFields.join(", ")}`)
        }

        const response = await fetch("http://localhost:4000/api/med", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...medication,clientId})
        })
        const json = await response.json()
        if (!response.ok) {
            console.log("Failed to create new medication")
        }

        if (response.ok) {
            dispatch({type: "CREATE_MEDICATION",payload:json})
            console.log("Created new meds")
        }


    }

    const handleTimeslotChange = (e) => {
        const selectedTimeslot = e.target.value;
        setMedication(prevState => {
            const updatedTimeSlots = prevState.timeSlot.includes(selectedTimeslot)
                ? prevState.timeSlot.filter(slot => slot !== selectedTimeslot) // Remove if already selected
                : [...prevState.timeSlot, selectedTimeslot]; // Add if not selected
            return {...prevState, timeSlot: updatedTimeSlots};
        });
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
                    onChange={(e) => setMedication({...medication, dosageUnit: e.target.value})}
                >
                    {
                        Object.values(DosageUnits).map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))
                    }
                </select>
                <label>Timeslot: </label>
                {/*<select*/}
                {/*    value={medication.timeSlot}*/}
                {/*    onChange={(e) => setMedication({...medication, timeSlot: [e.target.value]})}*/}
                {/*>*/}
                {/*    <option value="morning">Morning</option>*/}
                {/*    <option value="afternoon">Afternoon</option>*/}
                {/*    <option value="evening">Evening</option>*/}
                {/*    <option value="bedtime">Bedtime</option>*/}
                {/*</select>*/}
                <label>Timeslot: </label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="morning"
                            checked={medication.timeSlot.includes("morning")}
                            onChange={handleTimeslotChange}
                        />
                        Morning
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="afternoon"
                            checked={medication.timeSlot.includes("afternoon")}
                            onChange={handleTimeslotChange}
                        />
                        Afternoon
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="evening"
                            checked={medication.timeSlot.includes("evening")}
                            onChange={handleTimeslotChange}
                        />
                        Evening
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="bedtime"
                            checked={medication.timeSlot.includes("bedtime")}
                            onChange={handleTimeslotChange}
                        />
                        Bedtime
                    </label>
                </div>

                <button
                    className="create-btn">
                    Add New Med
                </button>
            </form>

        </div>
    )

}
export default MedicationForm
