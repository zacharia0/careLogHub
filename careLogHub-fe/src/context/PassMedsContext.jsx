import {createContext, useReducer} from "react";

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