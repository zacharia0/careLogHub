import {createContext, useEffect, useReducer} from "react";


export const ClientContext = createContext()

export const clientReducer = (state, action) => {
    switch (action.type) {
        case "SET_CLIENT":
            return {
                ...state,
                clients: action.payload
            }
        case "CREATE_CLIENT":
            return {
                ...state,
                clients: [action.payload, ...state.clients]
            }
        case "DELETE_CLIENT":
            return {
                ...state,
                clients: state.clients.filter((client) => client._id !== action.payload._id)
            }
        case "UPDATE_CLIENT":
            return {
                ...state,
                clients: state.clients.map((client) => client._id === action.payload._id ? action.payload : client)
            }
        case "SET_SINGLE_CLIENT":
            return{
                ...state,
                singleClient:action.payload
            }
        default:
            return state
    }
}

export const ClientContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(clientReducer, {
        clients: [],
        singleClient:null
    })

    useEffect(() => {

        const fetchAllClients = async () => {
            const response = await fetch("http://localhost:4000/api/client/all-clients?deleted=false")
            const json = await response.json()
            if (response.ok) {
                console.log("Fetched all Clients...", json)
                dispatch({type: "SET_CLIENT", payload: json})
            }
            if (!response) {
                console.log("Failed to fetch all clients...")
            }
        }
        fetchAllClients()

    }, [])

    return (
        <ClientContext.Provider value={{...state, dispatch}}>
            {children}
        </ClientContext.Provider>
    )
}