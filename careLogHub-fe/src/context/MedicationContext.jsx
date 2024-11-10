import {createContext, useReducer} from "react";

export const MedicationContext = createContext()

const medicationReducer = (state,action) =>{
    switch (action.type){
        case "SET_MEDICATION":
            return{
                medications: action.payload
            }
        case "CREATE_MEDICATION":
            return{
                medications: [...state.medications,action.payload]
            }
        case "UPDATE_MEDICATION":
            return{
                medications: state.medications.map((medication) => medication._id === action.payload._id? action.payload: medication)
            }
        default:
            return state

    }
}

export const MedicationContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(medicationReducer,{
        medications: []
    })


    return (
        <MedicationContext.Provider value={{...state, dispatch}}>
            {children}
        </MedicationContext.Provider>
    )
}


