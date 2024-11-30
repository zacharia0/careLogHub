import {useClientContext} from "../hooks/useClientContext.js";
import {useEffect, useState} from "react";
import ClientDetail from "../components/ClientDetail.jsx";
import {Link} from "react-router-dom";
import { IoAdd } from "react-icons/io5";
const ClientList = () => {
    const {clients} = useClientContext()
    // const [filterClient,setFilterClient] = useState([])
    // useEffect(()=>{
    //     setFilterClient(clients)
    // },[clients])

    console.log(clients)

    return (
        <div>
            <Link
                className="add-new-btn-link  "
                to="/create-client">
                <IoAdd className={"mr-2 text-2xl"}/> Add New Client
            </Link>
            {clients && clients.map((client) => (
                <div key = {client._id}>

                    <ClientDetail key={client._id} clients={client}/>
                </div>
            ))}
        </div>
    )

}

export default ClientList