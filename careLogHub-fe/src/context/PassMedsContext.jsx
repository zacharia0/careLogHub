import {createContext, useReducer} from "react";

export const PassMedsContext = createContext()

export const passMedsReducer = (state,action)=>{
    switch(action.payload){
        case "SET_PASS_MEDS":
            return{
                passMeds:state.action.payload
            }

        case "CREATE_PASS_MEDS":
            return{
                passMeds: [state.action.payload,...state.passMeds]
            }
        default:
            return state
    }

}
export const PassMedsContextProvider = ({children}) =>{

    const [state,dispatch] = useReducer(passMedsReducer,{
        passMeds:[]
    })


    return(
        <PassMedsContext.Provider value={{...state,dispatch}}>
            {
                children
            }
        </PassMedsContext.Provider>
    )


}