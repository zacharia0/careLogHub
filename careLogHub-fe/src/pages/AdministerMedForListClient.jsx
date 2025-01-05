
import {useClientContext} from "../hooks/useClientContext.js";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


const AdministerMedForListClient = () =>{
    const {clients} = useClientContext()
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState("")

    useEffect(() =>{
        if(clients){
            setLoading(false)
        }
    },[clients])
    return(
        <div>
            {
                loading ?
                    (
                        <p>Loading clients...</p>
                    ): clients && clients.length > 0 ?
                    (

                   clients.map((client) => (
                        <div key={client._id}>
                            <Link to={`/pass-med-list/${client._id}`}>
                                {client.firstName + " " + client.lastName}
                            </Link>
                        </div>
                    ))
                ): (
                        <p>No clients found.</p>
                    )

            }
        </div>
    )

}



export default AdministerMedForListClient