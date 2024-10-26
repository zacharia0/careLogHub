import {createContext, useReducer} from "react";


export const ClientContext = createContext()

export const clientReducer = (state,action)=>{
    switch(action.type){
        case "SET_CLIENT":
            return{
                clients:action.payload
            }
        case "CREATE_CLIENT":
            return{
                clients:[action.payload,...state.clients]
            }
        case "DELETE_CLIENT":
            return{
                clients: state.clients.filter((client) => client._id !== action.payload._id )
            }
        default:
            return state
    }
}

export const ClientContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(clientReducer,{
        clients:[]
    })

    return (
        <ClientContext.Provider value = {{...state,dispatch}}>
            {children}
        </ClientContext.Provider>
    )
}