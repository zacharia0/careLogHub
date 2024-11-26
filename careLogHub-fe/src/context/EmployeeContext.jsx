import {createContext, useReducer} from "react";

export const EmployeeContext = createContext()

export const employeeReducer = (state,action) =>{
    console.log("Employee state", state.employees)

    switch(action.type){
        case "SET_EMPLOYEE":
            return{
                ...state,
                employees:action.payload
            }
        case "CREATE_EMPLOYEE":
            return{
                ...state,
                employees: [action.payload,...state.employees]
            }
        case "UPDATE_EMPLOYEE":
            return{
                ...state,
                employees: state.employees.map((employee) => employee._id === action.payload._id ? action.payload : employee)
            }
        case "DELETE_EMPLOYEE":
            return{
                ...state,
                employees:state.employees.filter((employee) => action.payload._id !== employee._id)
            }
        default:
            return state

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
