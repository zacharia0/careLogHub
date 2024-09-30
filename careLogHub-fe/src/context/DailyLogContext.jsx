

import {createContext, useReducer} from "react";

export const DailyLogContext = createContext()

export const dailyLogReducer = (state,action) =>{
    switch(action.type){

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


