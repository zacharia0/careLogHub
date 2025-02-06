import {axiosInstance} from "./index.js";

export const getLoggedEmployee = async() =>{
    try{
        const response = await axiosInstance.get('http://localhost:4000/api/employee/current-logged-in-employee')
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}