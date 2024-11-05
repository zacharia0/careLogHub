import {useEmployeeContext} from "../hooks/useEmployeeContext.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const EmployeeDetail = ({employees}) => {
    const {dispatch} = useEmployeeContext()
    const [isEditing, setIsEditing] = useState(false)
    const [updateEmployee, setUpdateEmployee] = useState({
        firstName: employees.firstName,
        lastName: employees.lastName,
        middleName: employees.middleName,
        username: employees.username
    })

    const handleEmployeeUpdate = async(e) => {
        e.preventDefault()
        const employeeId = employees._id
        console.log(employeeId)
        const response = await fetch(`http://localhost:4000/api/employee/${employeeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateEmployee)
        })
        const json = await response.json()
        if (response.ok) {
            console.log("Updated")
            dispatch({type: "UPDATE_EMPLOYEE", payload: json})
            setIsEditing(false)
        }
        if (!response.ok) {
            console.log("failed to update")
        }
    }


    return (
        <div>

            <hr/>
            {

                isEditing ? (
                        <form onSubmit={handleEmployeeUpdate}>

                            <label>Middle Name:</label>
                            <input
                                type="text"
                                value={updateEmployee.firstName}
                                onChange={(e) => setUpdateEmployee({...updateEmployee, firstName: e.target.value})}
                            />

                            <label>Middle Name:</label>
                            <input
                                type="text"
                                value={updateEmployee.lastName}
                                onChange={(e) => setUpdateEmployee({...updateEmployee, lastName: e.target.value})}
                            />

                            <label>Middle Name:</label>
                            <input
                                type="text"
                                value={updateEmployee.middleName}
                                onChange={(e) => setUpdateEmployee({...updateEmployee, middleName: e.target.value})}
                            />

                            <label>Username:</label>
                            <input
                                type="text"
                                value={updateEmployee.username}
                                onChange={(e) => setUpdateEmployee({...updateEmployee, username: e.target.value})}
                            />

                            <button type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white font-semibold rounded py-1 px 3 shadow mr-2">Update
                            </button>
                            <button onClick={(e) => setIsEditing(false)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-semibold rounded py-1 px-3 shadow ml-2">cancel
                            </button>


                        </form>

                    ) :
                    (

                        <div className="font-thin">
                            <label>Name: </label>
                            <span>
                            {employees.firstName}

                        </span>
                            <span>
                            {employees.lastName}

                        </span>
                            {employees.middleName}
                            {employees.username}

                            <button onClick={(e) => setIsEditing(true)}
                                    className="  bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded shadow py-1 px-4 ml-3">Edit
                            </button>
                            <button
                                className=" bg-red-500 hover:bg-red-700 text-white font-semibold rounded shadow py-1 px-4 ml-2">Remove
                            </button>

                        </div>
                    )
            }

        </div>
    )
}

export default EmployeeDetail