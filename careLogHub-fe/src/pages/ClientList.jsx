import {useClientContext} from "../hooks/useClientContext.js";
import {useEffect} from "react";
import ClientDetail from "../components/ClientDetail.jsx";
import {Link} from "react-router-dom";

const ClientList = () =>{
    const {clients,dispatch} = useClientContext()

     useEffect(() =>{

         const fetchAllClients = async () =>{
             const response = await fetch("http://localhost:4000/api/client/all-clients")
             const json = await response.json()
             if(response.ok){
                 console.log("Fetched all Clients...")
                 dispatch({type:"SET_CLIENT",payload:json})
             }
             if(!response){
                 console.log("Failed to fetch all clients...")
             }
         }
         fetchAllClients()

    },[dispatch])

    return(
        <div>
            <Link to = "/create-client">Add New Client</Link>
            {clients.map((client) =>(
                <ClientDetail key = {client._id} clients={client}/>
            ))}
        </div>
    )

}

export default ClientList