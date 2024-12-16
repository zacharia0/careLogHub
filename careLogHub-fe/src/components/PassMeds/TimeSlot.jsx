import AdministerButtons from "./AdministerButtons.jsx";

const TimeSlot = ({label,medications}) =>{
    return(
        <div>
            {/*<h2>{label}</h2>*/}
            {
                medications.length > 0 ?(
                    <ul>
                        {
                            medications.map((med) =>(
                                <li key = {med._id}>
                                    <div>
                                        <strong>{`${med.medication_name} `}</strong>

                                        { med.medication_dosage} {med.dosage_unit}
                                        <AdministerButtons
                                        />
                                    </div>
                                    <div className={"border-2 px-2 w-1/4 bg-gray-100"}>
                                        <label className={"font-bold"} >Instructions: </label> { med.medication_instruction}
                                    </div>

                                </li>
                            ))
                        }
                    </ul>

                ):(
                    <p>No medications for this time slot.</p>
                )
            }
            {
                medications.length > 0 &&
                <button>Administer</button>

            }
        </div>
    )
}

export default TimeSlot