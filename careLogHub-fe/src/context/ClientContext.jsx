import {createContext, useReducer} from "react";


export const ClientContext = createContext()

export const clientReducer = (state, action) => {
    switch (action.type) {
        case "SET_CLIENT": console.log("Setting clients with:", action.payload);
            return {
                clients: action.payload
            }
        case "CREATE_CLIENT":
            return {
                clients: [action.payload, ...state.clients]
            }
        case "DELETE_CLIENT":
            return {
                clients: state.clients.filter((client) => client._id !== action.payload._id)
            }
        case "UPDATE_CLIENT":
            return {
                clients: state.clients.map((client) => client._id === action.payload._id ? action.payload : client)
            }
        case "SET_SINGLE_CLIENT":
            return{
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

    return (
        <ClientContext.Provider value={{...state, dispatch}}>
            {children}
        </ClientContext.Provider>
    )
}