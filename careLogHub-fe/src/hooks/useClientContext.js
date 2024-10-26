import {ClientContext} from "../context/ClientContext.jsx";
import {useContext} from "react";

export const useClientContext = () =>{
    const context = useContext(ClientContext)
    if(!context){
        throw new Error("useClientContext must be used inside useContextProvider")
    }
    return context
}

