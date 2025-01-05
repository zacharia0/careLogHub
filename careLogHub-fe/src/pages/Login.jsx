// import {Link, useNavigate} from "react-router-dom";
// import {useState} from "react";
//
// import {loginEmployee} from "../ApiCalls/auth.js";
// import toast from "react-hot-toast";
//
// const Login = ()=>{
//     const navigate = useNavigate()
//     const [loginError,setLoginError] = useState("")
//     const [employeeLogin,setEmployeeLogin] = useState({
//         username: "",
//         password: ""
//
//     })
//
//     const login = async(e) =>{
//         e.preventDefault()
//         const missingFields = []
//         if(employeeLogin.username.length === 0){
//             missingFields.push("Username")
//         }
//         if(employeeLogin.password.length === 0){
//             missingFields.push("Password")
//         }
//         if(missingFields.length > 0){
//             setLoginError(`Missing the following fields: ${missingFields.join(", ")}.`)
//             return;
//         }
//         let response = null
//
//         try{
//              response = await loginEmployee({employeeLogin})
//             // const json = await response.json()
//             console.log(response.data.token)
//
//             if(response.data.success){
//                 setLoginError("")
//                 toast.success("logged successfully")
//                 console.log("logged successfully")
//                 localStorage.setItem('token',response.data.token)
//                 navigate("/all-clients")
//                 // window.location.href = "/all-clients"
//             }
//         }catch(error){
//             console.log(response)
//             toast.error("Failed To login")
//             setLoginError(response?.response.data.message)
//         }
//     }
//
//     return(
//         <div>
//             <div>Login</div>
//             <form className={"flex justify-center"} onSubmit={login}>
//
//                 <div className=" flex justify-around border-2 w-1/2" >
//
//                     <label htmlFor="username">Username: </label>
//                     <input
//                         type="text"
//                         value = {employeeLogin.username }
//                         onChange={(e) => setEmployeeLogin({...employeeLogin,username: e.target.value})}
//                     />
//                     <label htmlFor="password">Password</label>
//                     <input
//                         type="password"
//                         value = {employeeLogin.password }
//                         onChange={(e) => setEmployeeLogin({...employeeLogin,password:e.target.value })}
//
//                     />
//                 </div>
//                 <div>
//
//                     <button className="bg-blue-500 rounded-md p-2 w-full hover:bg-blue-600" type = "submit">Login</button>
//                 </div>
//                 {loginError && <p className={"text-red-400"}>{loginError}</p>}
//             </form>
//             <Link to = "/dashboard" className={"bg-blue-400 rounded-md p-2"}>Dashboard</Link>
//         </div>
//     )
// }
//
// export default Login


import { Link, useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import { loginEmployee } from "../ApiCalls/auth.js";
import toast from "react-hot-toast";
import {useClientContext} from "../hooks/useClientContext.js";

const Login = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [employeeLogin, setEmployeeLogin] = useState({
        username: "",
        password: "",
    });


    const login = async (e) => {
        e.preventDefault();
        const missingFields = [];
        if (employeeLogin.username.length === 0) {
            missingFields.push("Username");
        }
        if (employeeLogin.password.length === 0) {
            missingFields.push("Password");
        }
        if (missingFields.length > 0) {
            setLoginError(`Missing the following fields: ${missingFields.join(", ")}.`);
            return;
        }
        let response = null;

        try {
            response = await loginEmployee({ employeeLogin });
            console.log(response.data.token);

            if (response.data.success) {
                setLoginError("");
                localStorage.setItem('token',response.data.token)
                toast.success("Logged in successfully");
                    navigate("/all-clients");
            }
        } catch (error) {
            toast.error("Failed to login");
            setLoginError(response?.response.data.message);
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {/* Logo */}
            <div className="mb-8 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl font-bold">MT</span>
                </div>
            </div>

            {/* Login Form */}
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

                {loginError && (
                    <p className="text-red-500 text-sm text-center mb-4">{loginError}</p>
                )}

                <form onSubmit={login} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={employeeLogin.username}
                            onChange={(e) =>
                                setEmployeeLogin({ ...employeeLogin, username: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={employeeLogin.password}
                            onChange={(e) =>
                                setEmployeeLogin({ ...employeeLogin, password: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">

                </div>
            </div>
        </div>
    );
};

export default Login;
