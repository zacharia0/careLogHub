import {useEffect, useState} from "react";
import {useEmployeeContext} from "../hooks/useEmployeeContext.js";
import EmployeeDetail from "../components/EmployeeDetail.jsx";


const EmployeeList = () => {
    const {employees, dispatch} = useEmployeeContext()
    const [error, setError] = useState("")

    useEffect(() => {
        const getAllEmployees = async () => {
            setError("")
            const response = await fetch("http://localhost:4000/api/employee/all-employees", {
                method: "GET"
            })
            const json = await response.json()
            if (response.ok) {
                setError("")
                dispatch({type: "SET_EMPLOYEE", payload: json})
            }
            if (!response.ok) {
                console.log("Failed to fetch employees")
                setError("failed to fetch employees")
            }

        }


        getAllEmployees()


    }, [])

    return (
        <div>
            <div>
                {error && <div>{error}</div>}
            </div>
            <div>
                {employees && employees.map((employee) => (
                        <EmployeeDetail key={employee._id} employees={employee}/>
                    )
                )}
            </div>

        </div>


    )
}

export default EmployeeList
