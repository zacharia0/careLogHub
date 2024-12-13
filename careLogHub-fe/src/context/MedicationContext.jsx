import {createContext, useEffect, useReducer} from "react";

export const MedicationContext = createContext()

export const medicationReducer = (state,action) =>{
    switch (action.type){
        case "SET_MEDICATION":
            return{
                ...state,
                medications: action.payload
            }
        case "CREATE_MEDICATION":
            return{
                ...state,
                medications: [...state.medications,action.payload]
            }
        case "UPDATE_MEDICATION":
            return{
                ...state,
                medications: state.medications.map((medication) => medication._id === action.payload._id? action.payload: medication)
            }
        case "DELETE_MEDICATION":
            return{
                ...state,
                medications: state.medications.filter((med) => med._id !== action.payload._id)
            }
        case "SET_MEDICATION_BY_CLIENT_ID":
            return{
                ...state,
                medicationByClient: action.payload
            }
        default:
            return state

    }
}

export const MedicationContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(medicationReducer,{
        medications: [],
        medicationByClient:[]
    })


    useEffect(() => {
        const getAllMedication = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/med/all-medications?deleted=false");
                const json = await response.json();
                if (response.ok) {
                    dispatch({ type: "SET_MEDICATION", payload: json });
                } else {
                    console.log("Failed to fetch medications");
                }
            } catch (error) {
                console.error("Error, fetching medications", error);
            }
        };

        getAllMedication()
            .then(() => {
                console.log("Medications successfully fetched.");
            })
            .catch((error) => {
                console.error("Error during medication fetch", error);
            });
    }, []); // Fetch all medications only on mount


    return (
        <MedicationContext.Provider value={{...state, dispatch}}>
            {children}
        </MedicationContext.Provider>
    )
}


