import {PassMedsContext} from "../context/PassMedsContext.jsx";

export const usePassMedsContext = () =>{
    const context = PassMedsContext
    if(!context){
        throw new Error("usePassMedsContext must be used inside of PassMedsContextProvider.")
    }
    return context
}