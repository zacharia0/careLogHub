

import {createContext, useReducer} from "react";

export const DailyLogContext = createContext()

export const dailyLogReducer = (state,action) =>{
    console.log("Out putting the current state.", state.dailyLogs)
    switch(action.type){
        case "SET_DAILY_LOG":
            return{
                dailyLogs:action.payload
            }
        case "CREATE_DAILY_LOG":
            return{
                dailyLogs: [action.payload,...state.dailyLogs]
            }
        case "DELETE_DAILY_LOG":
            return{
                dailyLogs: state.dailyLogs.filter((dailyLog) => dailyLog._id !== action.payload._id)
            }



    }
}
export const DailyLogContextProvider = ({children}) =>{

    const [state,dispatch] = useReducer(dailyLogReducer, {
        dailyLogs:[]
    })

    return(
        <DailyLogContext.Provider value = {{...state,dispatch}}>
            {children}
        </DailyLogContext.Provider>
    )
}


