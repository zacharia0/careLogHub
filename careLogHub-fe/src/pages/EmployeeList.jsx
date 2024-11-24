import {useEffect, useState} from "react";
import {useEmployeeContext} from "../hooks/useEmployeeContext.js";
import EmployeeDetail from "../components/EmployeeDetail.jsx";
import {Link} from "react-router-dom";
import { IoAdd } from "react-icons/io5";



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


    }, [dispatch])

    return (
        <div>
            <Link className={"add-new-btn-link"} to ="/create-employee"> <IoAdd className={"mr-2 text-2xl"}/>Add New Employee</Link>
            <div>
                {error && <div>{error}</div>}
            </div>
            <div>
                {employees && employees?.map((employee) => (
                        <EmployeeDetail key={employee._id} employees={employee}/>
                    )
                )}
            </div>

        </div>


    )
}

export default EmployeeList
