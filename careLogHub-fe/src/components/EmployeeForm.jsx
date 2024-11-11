import {useEmployeeContext} from "../hooks/useEmployeeContext.js";
import {useState} from "react";
import {Link} from "react-router-dom";

const EmployeeForm = () =>{
    const {dispatch} = useEmployeeContext()
    const [employee,setEmployee] = useState({
        firstName:"",
        lastName:"",
        middleName:"",
        username:""
    })

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const response = await fetch( "http://localhost:4000/api/employee",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(employee)
        })

        const json = await response.json()
        if(response.ok){
            dispatch({type:"CREATE_EMPLOYEE",payload:json})
            setEmployee({
                firstName: "",
                middleName: "",
                lastName: "",
                username: ""
            })
            console.log("The following new employee has been added",json)
        }else{
            console.log("Unable to create a new employee")
        }
    }

    return(
        <div>
            <Link className={"navigation-btn"} to = "/all-employees">All Employees</Link>
            <form>
                <label >First Name:</label>
                <input
                    type="text"
                    value = {employee.firstName}
                    onChange={(e) => setEmployee({...employee,firstName: e.target.value})}
                />
                <label >Last Name:</label>

                <input
                    type="text"
                    value = {employee.lastName}
                    onChange = {(e) => setEmployee({...employee,lastName: e.target.value})}
                />
                <label >Middle Name:</label>

                <input
                    type="text"
                    value = {employee.middleName}
                    onChange={(e) => setEmployee({...employee,middleName: e.target.value})}
                />

                <label >username:</label>
                <input
                    type="text"
                    value = {employee.username}
                    onChange={(e) => setEmployee({...employee,username: e.target.value})}
                />

                <button className="create-btn" onClick={handleSubmit}>Add new Employee</button>
            </form>
        </div>
    )
}

export default EmployeeForm