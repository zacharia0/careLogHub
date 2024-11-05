import {createContext, useReducer} from "react";

export const EmployeeContext = createContext()

export const employeeReducer = (state,action) =>{
    console.log("Employee state", state.employees)

    switch(action.type){
        case "SET_EMPLOYEE":
            return{
                employees:action.payload
            }
        case "CREATE_EMPLOYEE":
            return{
                employees: [action.payload,...state.employees]
            }
    }

}

export const EmployeeContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(employeeReducer,{
        employees:[]
    })

    return(
        <EmployeeContext.Provider value = {{...state,dispatch}}>
            {children}
        </EmployeeContext.Provider>
    )
}
