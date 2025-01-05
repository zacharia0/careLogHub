import {createContext, useEffect, useReducer} from "react";

export const EmployeeContext = createContext()

export const employeeReducer = (state,action) =>{
    // console.log("Employee state", state.employees)

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

        case "DELETE_EMPLOYEE":
            return{
                ...state,
                employees:state.employees.filter((employee) => action.payload?._id !== employee?._id),
                singleEmployee:state.singleEmployee?._id !== action.payload._id
            }

        case "UPDATE_EMPLOYEE":
            return{
                ...state,
                employees: state.employees.map((employee) => employee?._id === action.payload?._id ? action.payload : employee),
                singleEmployee: state.singleEmployee?._id === action.payload?._id ? action.payload : state.singleEmployee
            }

        case "SET_SINGLE_EMPLOYEE":
            return{
                ...state,
                singleEmployee:action.payload
            }
        default:
            return state

    }

}

export const EmployeeContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(employeeReducer,{
        employees:[],
        singleEmployee:null

    })

    const getSingleEmployee = async(employeeId) =>{
        const response = await fetch(`http://localhost:4000/api/employee/${employeeId}`)
        const json  = await response.json()
        console.log(json)
        if(!response.ok){
            console.log("failed to fetch single employee")
        }
        dispatch({type:"SET_SINGLE_EMPLOYEE",payload:json})
    }


    return(
        <EmployeeContext.Provider value = {{...state,dispatch,getSingleEmployee}}>
            {children}
        </EmployeeContext.Provider>
    )
}
