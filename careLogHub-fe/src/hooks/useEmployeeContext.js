import {EmployeeContext} from "../context/EmployeeContext.jsx";
import {useContext} from "react";

export const useEmployeeContext = () =>{
    const employeeContext = useContext(EmployeeContext)
    if(!employeeContext){
        throw new Error("useEmployeeContext must be use inside of the EmployeeContextProvider.")
    }
    return employeeContext
}
