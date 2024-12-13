import {createContext, useEffect, useReducer} from "react";

export const PassMedsContext = createContext()

const passMedsReducer = (state,action)=>{
    console.log("Hello From the Context",...state.passMeds,action.payload)
    switch(action.type){
        case "SET_PASS_MEDS":
            return{
                ...state,
                passMeds:action.payload
            }

        // case "CREATE_PASS_MEDS":
        //     return{
        //
        //         ...state,
        //         // passMeds: [...state.passMeds, ...action.payload]
        //         passMeds: Array.isArray(action.payload) ? [...state.passMeds, ...action.payload] : [...state.passMeds, action.payload],
        //     }


        case "CREATE_PASS_MEDS":
            // Ensure new pass meds are added to the existing array
            return {
                ...state,
                passMeds: Array.isArray(action.payload)
                    ? [...state.passMeds, ...action.payload]
                    : [...state.passMeds, action.payload]
            };

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
            try{

                const response = await fetch("http://localhost:4000/api/pass-meds/all-pass-meds")
                const json = await response.json()
                if(response.ok){
                    dispatch({type:"SET_PASS_MEDS",payload:json})
                }
            }catch(error){
                console.error("Failed to fetch passed medications:", error)
            }
        }
        fetchPassedMeds()
    },[dispatch])


    return(
        <PassMedsContext.Provider value={{...state,dispatch,passMeds:state.passMeds}}>
            {
                children
            }
        </PassMedsContext.Provider>
    )


}