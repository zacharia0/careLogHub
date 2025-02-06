import {useEffect, useState} from "react";
import {useEmployeeContext} from "../hooks/useEmployeeContext.js";
import {useParams} from "react-router-dom";
import { parseISO, format } from 'date-fns';
const EditEmployeeProfile = ({onClose}) => {
    const {getSingleEmployee, singleEmployee, dispatch} = useEmployeeContext()
    const {employeeId} = useParams()

    const formatDateForInput = (dateString) => {
        const date = parseISO(dateString); // Parses ISO 8601 string to Date object
        return format(date, 'yyyy-MM-dd'); // Formats to YYYY-MM-DD
    };


    const [updateEmployee, setUpdateEmployee] = useState({
        firstName: " ",
        lastName: "",
        middleName: "",
        username: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        hiredDate: ""
    })

    useEffect(() => {

        if (singleEmployee) {
            setUpdateEmployee({
                    firstName: singleEmployee?.data.firstName,
                    lastName: singleEmployee?.data.lastName,
                    middleName: singleEmployee?.data.middleName,
                    username: singleEmployee?.data.username,
                    phoneNumber: singleEmployee?.data.phoneNumber,
                    // dateOfBirth: singleEmployee?.data.dateOfBirth,
                    // hiredDate: singleEmployee?.data.hiredDate,
                dateOfBirth: singleEmployee?.data.dateOfBirth
                    ? formatDateForInput(singleEmployee?.data.dateOfBirth) // Format to YYYY-MM-DD
                    : "",
                hiredDate: singleEmployee?.data.hiredDate
                    ? formatDateForInput(singleEmployee?.data.hiredDate) // Format to YYYY-MM-DD
                    : "",
                    email: singleEmployee?.data.email
                }
            )
        }


    }, [singleEmployee]);

    const handleEmployeeUpdate = async (e) => {
        e.preventDefault()
        console.log(employeeId)
        const response = await fetch(`http://localhost:4000/api/employee/${employeeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateEmployee)
        })
        const json = await response.json()
        console.log(json)
        if (response.ok) {
            console.log("Updated")
            dispatch({type: "UPDATE_EMPLOYEE", payload: json})
            getSingleEmployee(employeeId)
            onClose(false)
            // setIsEditing(false)
        } else {

            console.warn("failed to update")
        }
    }


    useEffect(() => {
        console.log(singleEmployee)
        getSingleEmployee(employeeId)
    }, [employeeId]);

    return (
        <>
            <div className={"w-full max-w-3xl bg-white rounded-lg shadow-lg flex flex-col max-h-[90vh]"}>
                <div className="p-6 overflow-auto flex-1">
                    <h1>Edit Employee Details</h1>

                    <form className="space-y-6" id={"employeeEditForm"} onSubmit={handleEmployeeUpdate}>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>

                                <label className="block font-semibold mb-1">Middle Name:</label>
                                <input
                                    type="text"
                                    value={updateEmployee.firstName}
                                    onChange={(e) => setUpdateEmployee({...updateEmployee, firstName: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div>

                                <label className="block font-semibold mb-1">Middle Name:</label>
                                <input
                                    type="text"
                                    value={updateEmployee.lastName}
                                    onChange={(e) => setUpdateEmployee({...updateEmployee, lastName: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div>

                                <label className="block font-semibold mb-1">Middle Name:</label>
                                <input
                                    type="text"
                                    value={updateEmployee.middleName}
                                    onChange={(e) => setUpdateEmployee({...updateEmployee, middleName: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-1">Username:</label>
                                <input
                                    type="text"
                                    value={updateEmployee.username}
                                    onChange={(e) => setUpdateEmployee({...updateEmployee, username: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Email:</label>
                                <input
                                    type="text"
                                    value={updateEmployee.email}
                                    onChange={(e) => setUpdateEmployee({...updateEmployee, email: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Phone Number:</label>
                                <input
                                    type="text"
                                    value={updateEmployee.phoneNumber}
                                    onChange={(e) => setUpdateEmployee({
                                        ...updateEmployee,
                                        phoneNumber: e.target.value
                                    })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Hired Date:</label>
                                <input
                                    type="date"
                                    value={updateEmployee.hiredDate}
                                    onChange={(e) => setUpdateEmployee({...updateEmployee, hiredDate: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Date Of Birth:</label>
                                <input
                                    type="date"
                                    value={updateEmployee.dateOfBirth}
                                    onChange={(e) => setUpdateEmployee({
                                        ...updateEmployee,
                                        dateOfBirth: e.target.value
                                    })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                        </div>
                    </form>
                </div>
                <div className="p-4 border-t bg-gray-100 flex justify-end space-x-4">
                    <button
                        form="employeeEditForm"
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save
                    </button>
                    <button onClick={(e) => onClose(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        cancel
                    </button>

                </div>
            </div>

        </>
    )
}

export default EditEmployeeProfile