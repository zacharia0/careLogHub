/*
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const ProtectedRoute = ({children}) =>{
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            navigate("/login")
            //write the logic to get the details of the current user.
        }
        return localStorage.getItem('token') ? children: null
    }, []);
}

export default ProtectedRoute*/
//
// import {useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
// import {getLoggedEmployee} from "../ApiCalls/employees.js";
//
// const ProtectedRoute = ({ children }) => {
//     const [loggedInEmployee,setLoggedInEmployee] = useState("")
//     const navigate = useNavigate();
//
//     const LoggedInEmployee = async() =>{
//         let response = null
//         try{
//              response = await getLoggedEmployee()
//             console.log("hellowwwwwwwww" + response)
//             if(response.data.success){
//                 setLoggedInEmployee(`${response.data.firstName} ${response.data.lastName}`)
//             }
//         }catch(error){
//             navigate("/login")
//         }
//     }
//
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate("/login"); // Redirect to login if no token
//         }
//         if(token){
//             LoggedInEmployee()
//         }
//     });
//
//     // Render children if user is authenticated
//     return(
//         <div>
//             <p>Hello: {loggedInEmployee}</p>
//             {
//                 localStorage.getItem('token') ? children : null
//             }
//         </div>
//     )
// };
//
// export default ProtectedRoute;


import {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedEmployee } from "../ApiCalls/employees.js";

const ProtectedRoute = ({ children }) => {
    const [loggedInEmployee, setLoggedInEmployee] = useState("");
    const navigate = useNavigate();

    const LoggedInEmployee = async () => {
        let response = null
        try {
             response = await getLoggedEmployee();
            if (response.success) {
                setLoggedInEmployee(response.data);
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.error("Error fetching employee:", error);
            navigate("/login");
        }
    };


    useEffect(() => {

        if(localStorage.getItem('token')){
            LoggedInEmployee()
        }else{
            navigate("/login")
        }

    }, [navigate]);

    return (
        <div>
            <p>Hello: {`${loggedInEmployee?.firstName} ${loggedInEmployee?.lastName}`}</p>
            {children}
        </div>
    );
};

export default ProtectedRoute;


