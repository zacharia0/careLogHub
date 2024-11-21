import {PassMedsContext} from "../context/PassMedsContext.jsx";
import {useContext} from "react";

export const usePassMedsContext = () =>{
    const context = useContext(PassMedsContext)
    if(!context){
        throw new Error("usePassMedsContext must be used inside of PassMedsContextProvider.")
    }
    return context
}