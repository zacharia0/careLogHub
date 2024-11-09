import {useContext} from "react";
import {MedicationContext} from "../context/MedicationContext.jsx";

export const useMedicationContext = () =>{
    const medicationContext = useContext(MedicationContext)
    if(!medicationContext){
        throw new Error("useMedicationContext must be used inside of MedicationContextProvider. ")
    }
    return medicationContext
}

