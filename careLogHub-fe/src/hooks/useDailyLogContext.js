
import {DailyLogContext} from "../context/DailyLogContext.jsx";
import {useContext} from "react";

export const useDailyLogContext = () =>{
    const context = useContext(DailyLogContext)
    if(!context){
        throw Error("useDailyLogContext must be used inside of dailyLogContextProvider")
    }
    return context
}
