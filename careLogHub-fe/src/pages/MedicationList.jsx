import {useMedicationContext} from "../hooks/useMedicationContext.js";
import MedicationDetail from "../components/MedicationDetail.jsx";
import {Link} from "react-router-dom";
import { IoAdd } from "react-icons/io5";


const MedicationList = () =>{
    const {medications} = useMedicationContext()
    console.log("Current medication in context" ,medications)
    return(
        <div className={"ml-2"}>
            <p>To add or remove a medication, first visit teh All Clients Page.</p>
            <Link className={"add-new-btn-link"} to ={`/all-clients`}> <IoAdd className={"mr-2 text-2xl"}/> Go to All Clients</Link>
            <p>Once there, click "View Detail" next to a client to manage their medications</p>
            {medications && medications.map((med) =>(
                <MedicationDetail key = {med._id} medications={med}/>
            ))}

            <button>ADMINISTER MEDICATION</button>
            

        </div>

    )
}

export default MedicationList