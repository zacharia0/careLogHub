import {useMedicationContext} from "../hooks/useMedicationContext.js";
import {useEffect, useState} from "react";
import{DosageUnits} from "../constants/dosageUnits.js";
import {Link, useParams} from "react-router-dom";
import {useClientContext} from "../hooks/useClientContext.js";

const MedicationForm = () => {

    const {clientId} = useParams()
    const [createMedicationError,setCreateMedicationError] = useState("")
    const {dispatch} = useMedicationContext()
    const [scheduleData,setScheduleData] = useState([])
    const [medicationData, setMedicationData] = useState({
        medication_name: "",
        medication_dosage: "",
        dosage_unit: "MG",
        medication_instruction:""

    })

    const handleTimeSlotChange = (e) => {
        const selectedTimeSlot = e.target.value;
        const isChecked = e.target.checked;


        setScheduleData((prevScheduleData) => {
            if (isChecked) {
                // Add a new schedule object if the time slot is checked
                return [...prevScheduleData, { time_slot: selectedTimeSlot, schedule_time: "" }];
            } else {
                // Remove the schedule object if the time slot is unchecked
                return prevScheduleData.filter((schedule) => schedule.time_slot !== selectedTimeSlot);
            }
        });
    };

    const handleScheduleTimeChange = (time_slot, newTime) => {
        setScheduleData((prevScheduleData) =>
            prevScheduleData.map((schedule) => {
                if (schedule.time_slot === time_slot) {
                    // Extract the date part from the existing schedule_time or use today's date if it's not set
                    const currentDate = schedule.schedule_time
                        ? schedule.schedule_time.split("T")[0] // Extract "YYYY-MM-DD"
                        : new Date().toISOString().split("T")[0];

                    const fullDateTime = `${currentDate}T${newTime}:00.000Z`;
                    return { ...schedule, schedule_time: fullDateTime };
                }
                return schedule;
            })
        );
    };

    const handleSubmit = async (e) => {

        e.preventDefault()

        if(!scheduleData || scheduleData.length === 0){
            // setCreateMedicationError("Time Slot is required.")
        }
        let missingFields = []
        if (!medicationData.medication_name) {
            missingFields.push("Medication name")
        }
        if (!medicationData.medication_dosage) {
            missingFields.push("Medication dosage")
        }
        if (!medicationData.dosage_unit) {
            missingFields.push("Dosage Unit")
        }
        scheduleData.forEach((schedule) =>{
            if(!schedule.time_slot){
                missingFields.push("time slot")
            }
            if(!schedule.schedule_time){
                missingFields.push("schedule time")
            }
        })

        if (missingFields.length > 0) {
            setCreateMedicationError(`The following fields are required: ${missingFields.join(", ")}`)
        }

        console.log(missingFields)
        console.log(scheduleData)

        console.log("schedule data: ", scheduleData)

        const response = await fetch("http://localhost:4000/api/med", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({medicationData,clientId,scheduleData})
        })
        console.log("CLIENT ID::::::",clientId)
        const json = await response.json()

        if (response.ok) {
            dispatch({type: "CREATE_MEDICATION",payload:json})
            console.log("Created new meds")
            setCreateMedicationError("")
             setMedicationData({
                medication_name: "",
                medication_dosage: "",
                dosage_unit: "MG",
                medication_instruction:""

            })
            setScheduleData([])

        }else {
            console.log("Failed to create new medication")
            setCreateMedicationError(json.error)
        }


    }



    return (
        <div>
            <h1>Medication Form</h1>
            <Link className={"navigation-btn"} to ="/all-medication">All Medications</Link>
            <form onSubmit={handleSubmit}>

                {/*MEDICATION DATA*/}
                <label>Medication Name</label>
                <input
                    className={"border-2"}
                    type="text"
                    value={medicationData.medication_name}
                    onChange={(e) => setMedicationData({...medicationData, medication_name: e.target.value})}
                />
                <label>Medication Dosage</label>
                <input
                    className={"border-2"}
                    type="number"
                    value={medicationData.medication_dosage}
                    onChange={(e) => setMedicationData({...medicationData, medication_dosage: e.target.value})}

                />

                <label>Dosage Unit</label>
                <select
                    className={"border-2"}
                    value={medicationData.dosage_unit}
                    onChange={(e) => setMedicationData({...medicationData, dosage_unit: e.target.value})}
                >
                    {
                        Object.values(DosageUnits).map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))
                    }
                </select>
                <label>Medication Instruction: </label>
                <input
                    className={"border-2"}
                    value = {medicationData.medication_instruction}
                    type="text"
                    onChange={(e) => setMedicationData({...medicationData,medication_instruction:e.target.value})}
                />
                <div>

                    {/*TIME SLOT*/}
                    <label>Timeslot: </label>
                    <div className={"inline-flex"}>
                        {["morning", "afternoon", "evening", "bedtime"].map((time_slot) => (
                            <div key={time_slot}>
                                <label htmlFor="">

                                    <input
                                        className={" border-2 py-1 mt-2 ml-2"}
                                        type="checkbox"
                                        value={time_slot}
                                        checked={scheduleData.some((schedule) => schedule.time_slot === time_slot)}
                                        onChange={handleTimeSlotChange}
                                    />
                                    <div className={"ml-1 inline-flex"}>

                                    {time_slot}
                                    </div>

                                    {scheduleData.some((schedule) => schedule.time_slot === time_slot) && (
                                        <input
                                            type="time"
                                            value={
                                                // Extract just the time part for the input value
                                                scheduleData.find((schedule) => schedule.time_slot === time_slot).schedule_time
                                                    ? new Date(scheduleData.find((schedule) => schedule.time_slot === time_slot).schedule_time)
                                                        .toISOString()
                                                        .slice(11, 16) // Get "HH:MM" part of the ISO string
                                                    : ""
                                            }
                                            onChange={(e) => handleScheduleTimeChange(time_slot, e.target.value)}
                                        />
                                    )}

                                </label>
                            </div>
                        ))}
                    </div>
                    {createMedicationError && <p className={"text-red-400"}>{createMedicationError}</p>}

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
