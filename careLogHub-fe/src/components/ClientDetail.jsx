import {useClientContext} from "../hooks/useClientContext.js";

const ClientDetail = ({clients}) =>{
    const {dispatch} = useClientContext()

    const handleDelete = async() =>{
        const id = clients._id
        const response = await fetch(`http://localhost:4000/api/client/${id}`,{
            method: "DELETE"
        })
        const json = await response.json()
        if(response.ok){
            console.log("Client delete")
            dispatch({type:"DELETE_CLIENT",payload:json})
        }
        if(!response.ok){
            console.log("Failed to delete client.")
        }
    }

    return(
        <div>
            <span>Full Name: {clients.firstName} {clients.lastName}</span>
            <button onClick={handleDelete}>Delete</button>
            <button>Edit</button>

        </div>
    )

}

export default ClientDetail