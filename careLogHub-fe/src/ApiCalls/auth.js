import {axiosInstance} from "./index.js";

export const signupEmployee = async (registerEmployee) =>{
    try{
        const response = await axiosInstance.post("http://localhost:4000/api/employee",registerEmployee,{
        headers:{
            "Content-type":"application/json"
        }
        })
        return response.data;
    }catch(error){

        return error
    }
}

export const loginEmployee = async(employeeLogin) =>{
    try{
        const response = await axiosInstance.post("http://localhost:4000/api/employee/login",employeeLogin,{
            headers:{
                "Content-type":"application/json"
            }
        })
        return response
    }catch(error){

        return error;

    }
}