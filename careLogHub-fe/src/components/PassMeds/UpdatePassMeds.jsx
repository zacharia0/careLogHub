import {usePassMedsContext} from "../../hooks/usePassMedsContext.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const UpdatePassMeds = () =>{
    const {passMeds} = usePassMedsContext()
    const {passMedId} = useParams()


    const [updatePassMed, setUpdatePassMeds] = useState("")

    useEffect(()=>{


        const initialPassMedState = passMeds.map(med => ({
            status:med.status,
            dosageGiven:med.dosageGiven,
            comment:med.comment,
            administeredTimeAndDate:med.administeredTimeAndDate
        }))
        const medicationToUpdate = initialPassMedState.find((med) => med._id === passMedId )

            setUpdatePassMeds(medicationToUpdate)


    },[passMeds])
    console.log(updatePassMed)


    return(
        <div>

            <input
                type="text"
                // value = {updatePassMed.status}
            />
        </div>
    )

}

export default UpdatePassMeds