const TimeSlot = ({label,medications}) =>{
    return(
        <div>
            <h2>{label}</h2>
            {
                medications.length > 0 ?(
                    <ul>
                        {
                            medications.map((med) =>(
                                <li key = {med._id}>
                                    <strong>{med.medication_name}</strong>
                                    {med.medication_dosage} { med.medication_instruction}
                                </li>
                            ))
                        }
                    </ul>

                ):(
                    <p>No medications for this time slot.</p>
                )
            }
        </div>
    )
}

export default TimeSlot