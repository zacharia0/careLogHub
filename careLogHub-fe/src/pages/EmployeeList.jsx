// import React, {useEffect, useState} from "react";
// import {useEmployeeContext} from "../hooks/useEmployeeContext.js";
// import EmployeeDetail from "../components/EmployeeDetail.jsx";
// import {Link} from "react-router-dom";
// import { IoAdd } from "react-icons/io5";
// import Modal from "react-modal";
// import EmployeeForm from "../components/EmployeeForm.jsx";
//
//
//
// const EmployeeList = () => {
//     const {employees, dispatch} = useEmployeeContext()
//     const [error, setError] = useState("")
//     const [isModalOpen,setIsModalOpen] = useState(false)
//
//
//     const fetchEmployees = async () => {
//         setError("");
//         const response = await fetch("http://localhost:4000/api/employee/all-employees", {
//             method: "GET",
//         });
//         const json = await response.json();
//         if (response.ok) {
//             setError("");
//             dispatch({ type: "SET_EMPLOYEE", payload: json });
//         } else {
//             console.log("Failed to fetch employees");
//             setError("Failed to fetch employees");
//         }
//     };
//
//     useEffect(() => {
//         fetchEmployees();
//     }, [dispatch]);
//
//     const handleModleClose = () => {
//         setIsModalOpen(false);
//         fetchEmployees(); // Fetch the updated list when the modal closes
//     };
//
//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//
//             {/*Page Header*/}
//             <div className=" mx-auto w-3/4 flex justify-between items-center mb-6">
//                 <h1 className=" text-2xl font-semibold text-gray-800">Employee List</h1>
//                 <button onClick={() => setIsModalOpen(true)} className="add-new-btn-link flex items-center "> <IoAdd className={"mr-2 text-2xl"}/>Add New Employee</button>
//             </div>
//
//             <div className=" mx-auto w-3/4 overflow-x-auto bg-white shadow-md rounded-lg">
//                 <table className=" table-auto w-full text-left text-gray-700">
//                     <thead className="bg-gray-200 uppercase text-sm text-gray-600">
//
//                     <tr>
//                         <th className="py-3 px-4">First Name</th>
//                         <th className="py-3 px-4">Last name</th>
//                         <th className="py-3 px-4">Username</th>
//                         <th className="py-3 px-4">Actions</th>
//
//                     </tr>
//                     </thead>
//
//                     <tbody>
//                     {employees && employees?.map((employee) => (
//                                 <EmployeeDetail key = {employee?._id}  employees={employee}/>
//
//                         )
//                     )}
//
//                     </tbody>
//
//                 </table>
//             </div>
//
//             {/*Form Modal*/}
//             <Modal
//                 isOpen ={isModalOpen}
//                 onRequestClose={() => setIsModalOpen(false)}
//                 contentLabel="Create Employee Form"
//                 className="fixed inset-0 z-50 flex items-center justify-center p-4"
//                 overlayClassName="fixed inset-0 bg-black bg-opacity-80"
//             >
//                 <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
//                     <EmployeeForm
//                         onClose ={handleModleClose}
//                     >
//
//                     </EmployeeForm>
//
//                 </div>
//             </Modal>
//
//             <div>
//                 {error && <div>{error}</div>}
//             </div>
//         </div>
//
//
//     )
// }
//
// export default EmployeeList

import React, { useEffect, useState } from "react";
import { useEmployeeContext } from "../hooks/useEmployeeContext.js";
import EmployeeDetail from "../components/EmployeeDetail.jsx";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import Modal from "react-modal";
import EmployeeForm from "../components/EmployeeForm.jsx";

const EmployeeList = () => {
    const { employees, dispatch } = useEmployeeContext();
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEmployees = async () => {
        setError("");
        const response = await fetch("http://localhost:4000/api/employee/all-employees", {
            method: "GET",
        });
        const json = await response.json();
        if (response.ok) {
            setError("");
            dispatch({ type: "SET_EMPLOYEE", payload: json });
        } else {
            console.log("Failed to fetch employees");
            setError("Failed to fetch employees");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [dispatch]);

    const handleModleClose = () => {
        setIsModalOpen(false);
        fetchEmployees(); // Fetch the updated list when the modal closes
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="mx-auto w-full max-w-3xl flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Employee List</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="add-new-btn-link flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    <IoAdd className="mr-2 text-2xl" />
                    Add New Employee
                </button>
            </div>

            {/* Responsive Design */}
            <div className="mx-auto w-full max-w-3xl bg-white shadow-md rounded-lg">
                {/* Table for medium and larger screens */}
                <div className="hidden md:block">
                    <table className="table-auto w-full text-left text-gray-700">
                        <thead className="bg-gray-200 uppercase text-sm text-gray-600">
                        <tr>
                            <th className="py-3 px-4">First Name</th>
                            <th className="py-3 px-4">Last Name</th>
                            <th className="py-3 px-4">Username</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees &&
                            employees.map((employee) => (
                                <EmployeeDetail key={employee?._id} employees={employee} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Card layout for small screens */}
                <div className="md:hidden space-y-4">
                    {employees &&
                        employees.map((employee) => (
                            <div
                                key={employee?._id}
                                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="font-semibold text-lg text-gray-800">
                                        {employee.firstName} {employee.lastName}
                                    </h2>
                                    <Link
                                        to={`/employee-profile/${employee._id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </Link>
                                </div>
                                <p className="text-sm text-gray-600">Username: {employee.username}</p>

                            </div>
                        ))}
                </div>
            </div>

            {/* Form Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Create Employee Form"
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-80"
            >
                <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
                    <EmployeeForm onClose={handleModleClose} />
                </div>
            </Modal>

            {/* Error Message */}
            {error && (
                <div className="mt-4 text-center text-red-600">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;

