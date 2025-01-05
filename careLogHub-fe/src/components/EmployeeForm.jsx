import {useEmployeeContext} from "../hooks/useEmployeeContext.js";
import {useState} from "react";
import {Link} from "react-router-dom";
import {signupEmployee} from "../ApiCalls/auth.js";
import {getLoggedEmployee} from "../ApiCalls/employees.js";
// import axios from "axios";

const EmployeeForm = ({onClose}) =>{
    const {dispatch} = useEmployeeContext()
    const [registerError,setRegisterError] = useState("")
    const [registerEmployee,setRegisterEmployee] = useState({
        firstName:"",
        lastName:"",
        password: "",
        middleName:"",
        phoneNumber:"",
        dateOfBirth:"",
        hiredDate:"",
        email:""
        // username:""
    })


    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const missingFields = []
            if(!registerEmployee.firstName){
                missingFields.push('First Name')
            }
            if(!registerEmployee.middleName){
                missingFields.push('Middle Name')
            }
            if(!registerEmployee.lastName){
                missingFields.push('Last Name')
            }
            if(!registerEmployee.password){
                missingFields.push('Password')
            }
            if(!registerEmployee.phoneNumber){
                missingFields.push('Phone number')
            }
            if(!registerEmployee.dateOfBirth){
                missingFields.push('Date of birth')
            }
            if(!registerEmployee.hiredDate){
                missingFields.push('Hired date')
            }
            if(!registerEmployee.email){
                missingFields.push('Email')
            }

            if(missingFields.length > 0){
                setRegisterError(`Missing the following fields ${missingFields.join(', ')}`)
            }



            const response = await signupEmployee({registerEmployee})

            const employee = await getLoggedEmployee()

            console.log("Logged INnn user", employee)


            console.log(registerEmployee.firstName)
            if(response.success){
                dispatch({type:"CREATE_EMPLOYEE",payload:response.data.data})
                setRegisterEmployee({
                    firstName: "",
                    lastName: "",
                    password: "",
                    middleName:"",
                    phoneNumber:"",
                    dateOfBirth:"",
                    hiredDate:"",
                    email:""
                })
                onClose(true)
                console.log("*************************", registerEmployee.firstName)
                console.log("The following new employee has been added: ", response.data)
            }

        }catch(error){
            console.error("Unable to create a new employee:", error.response?.data || error.message)
        }


    }

    return(
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6 overflow-auto max-h-[90vh]"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Add New Employee</h3>
                <button
                    onClick={onClose}
                    type="button"
                >
                    &times;
                </button>
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">First Name:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={registerEmployee.firstName}
                    onChange={(e) => setRegisterEmployee({...registerEmployee, firstName: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Middle Name:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={registerEmployee.middleName}
                    onChange={(e) => setRegisterEmployee({...registerEmployee, middleName: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Last Name:</label>

                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={registerEmployee.lastName}
                    onChange={(e) => setRegisterEmployee({...registerEmployee, lastName: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Email:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={registerEmployee.email}
                    onChange={(e) => setRegisterEmployee({...registerEmployee, email: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Phone Number:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={registerEmployee.phoneNumber}
                    onChange={(e) => setRegisterEmployee({...registerEmployee, phoneNumber: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Date of Birth:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="date"
                    value={registerEmployee.dateOfBirth}
                    onChange={(e) => setRegisterEmployee({...registerEmployee, dateOfBirth: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Hired Date:</label>
                <input
                    required

                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="date"
                    value={registerEmployee.hiredDate}
                    onChange={(e) => setRegisterEmployee({...registerEmployee, hiredDate: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Password:</label>
                <input
                    required
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="password"
                    value={registerEmployee.password}
                    onChange={(e) => setRegisterEmployee({...registerEmployee, password: e.target.value})}
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-offset-2"
            >
                Add new Employee
            </button>
            {registerError && <p>{registerError}</p>}
        </form>
    )
}

export default EmployeeForm