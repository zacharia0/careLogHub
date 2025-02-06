
import {useEffect, useState} from "react";
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


