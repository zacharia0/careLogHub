const MedicationDetail =({medications}) =>{
    return(
        <div>
            <label>Medication Name: </label>
            <span className={"mr-1"}>{medications.medName}</span>
            <label>Dosage</label>
            <span className={"mr-1"}>{medications.medDosage}</span>
            <span>({medications.dosageUnit})</span>
        </div>

    )
}

export default MedicationDetail