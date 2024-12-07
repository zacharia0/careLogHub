import {createContext, useEffect, useReducer} from "react";

export const PassMedsContext = createContext()

const passMedsReducer = (state,action)=>{
    switch(action.type){
        case "SET_PASS_MEDS":
            return{
                passMeds:action.payload
            }

        case "CREATE_PASS_MEDS":
            return{
                passMeds: [...state.passMeds, action.payload]
            }

        case "UPDATE_PASS_MEDS":
            return{
                ...state,
                passMeds: state.passMeds.map((updateMed) => updateMed._id === action.payload._id ? action.payload : updateMed)
            }
        default:
            return state
    }

}
export const PassMedsContextProvider = ({children}) =>{

    const [state,dispatch] = useReducer(passMedsReducer,{
        passMeds:[]
    })

    useEffect(() =>{
        const fetchPassedMeds = async() =>{
            const response = await fetch("http://localhost:4000/api/pass-meds/all-pass-meds")
            const json = await response.json()
            if(response.ok){
                dispatch({type:"SET_PASS_MEDS",payload:json})
            }
        }
        fetchPassedMeds()
    },[dispatch])


    return(
        <PassMedsContext.Provider value={{...state,dispatch}}>
            {
                children
            }
        </PassMedsContext.Provider>
    )


}