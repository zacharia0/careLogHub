import {createContext, useEffect, useReducer} from "react";

export const MedicationContext = createContext()

export const medicationReducer = (state, action) => {
    console.log("JSON", state.medications)
    console.log("JSON", state.medicationByClientId[action.payload.client])

    switch (action.type) {
        case "SET_MEDICATION":
            return {
                ...state,
                medications: action.payload
            }
        case "CREATE_MEDICATION":
            return {
                ...state,
                medications: [...state.medications, action.payload]
            }

        case "UPDATE_MEDICATION":
            return {
                ...state,
                medications: state.medications.map((medication) =>
                    medication._id === action.payload._id ? action.payload : medication
                ),
                medicationByClientId: {
                    ...state.medicationByClientId,
                    [action.payload.client]: state.medicationByClientId[action.payload.client].map((med) =>
                        med._id === action.payload._id ? action.payload : med
                    ),
                }
            };


        case "DELETE_MEDICATION":
            return {
                ...state,
                medications: state.medications.filter((med) => med._id !== action.payload._id),
                medicationByClientId: {
                    ...state.medicationByClientId,
                    [action.payload.client]: state.medicationByClientId[action.payload.client].filter(
                        (med) => med._id !== action.payload._id
                    ),
                }
            };


        case "SET_MEDICATION_BY_CLIENT_ID":
            return {
                ...state,
                medicationByClientId: {
                    ...state.medicationByClientId,
                    [action.payload.clientId]: action.payload.medications,

                }
            }
        default:
            return state

    }
}

export const MedicationContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(medicationReducer, {
        medications: [],
        // medicationByClient:[]
        medicationByClientId: {}

    })


    const fetchMedicationByClientId = async (clientId) => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`http://localhost:4000/api/med/${clientId}?deleted=false`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const json = await response.json();
            if (response.ok) {
                // console.log("JSON",json)
                dispatch({type: "SET_MEDICATION_BY_CLIENT_ID", payload: {clientId, medications: json}});
            } else {
                console.log("Failed to fetch medications");
            }
        } catch (error) {
            console.error("Error, fetching medications", error);
        }
    };


    return (
        <MedicationContext.Provider value={{...state, dispatch, fetchMedicationByClientId}}>
            {children}
        </MedicationContext.Provider>
    )
}


