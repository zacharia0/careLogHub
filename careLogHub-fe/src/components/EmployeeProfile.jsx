
import Modal from "react-modal";
import { useEmployeeContext } from "../hooks/useEmployeeContext.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import EditEmployeeProfile from "./EditEmployeeProfile.jsx";
import EmployeeForm from "./EmployeeForm.jsx";

const EmployeeProfile = () => {
    Modal.setAppElement("#root");


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to the month (0-based)
        const day = String(date.getDate()).padStart(2, '0'); // Day with padding
        const year = date.getFullYear(); // Full year
        return `${month}/${day}/${year}`;
    };

    const navigate = useNavigate();
    const { singleEmployee, getSingleEmployee, dispatch } = useEmployeeContext();
    const { employeeId } = useParams();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDeleteEmployee = async () => {
        const response = await fetch(
            `http://localhost:4000/api/employee/${employeeId}`,
            {
                method: "DELETE",
            }
        );
        const json = await response.json();
        if (!response.ok) {
            console.warn("FAILED TO DELETE");
            return;
        }
        if (response.ok) {
            console.log("Deleted employee...");
            dispatch({ type: "DELETE_EMPLOYEE", payload: json });
            navigate("/all-employees");
        }
    };

    useEffect(() => {
        getSingleEmployee(employeeId);
    }, [employeeId]);

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    to="/all-employees"
                    className="inline-block mb-4 text-blue-500 hover:underline"
                >
                    ← Back to Employee List
                </Link>

                <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
                    {singleEmployee && (
                        <>
                            {/* Header Section */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                                <div className="flex-shrink-0 w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                                    {/* Display initials if available */}
                                    {singleEmployee?.data?.firstName?.charAt(0).toUpperCase()}
                                    {singleEmployee?.data?.lastName?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                                        {/* Display full name, with middle name optional */}
                                        {singleEmployee?.data?.firstName || "Not Provided"}{" "}
                                        {singleEmployee?.data?.middleName &&
                                            singleEmployee.data.middleName + " "}
                                        {singleEmployee?.data?.lastName}
                                    </h1>
                                </div>
                            </div>

                            {/* Information Sections */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Personal Information */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
                                        Personal Information
                                    </h2>
                                    <div className="space-y-3">
                                        {/* Use grid for better layout on smaller screens */}
                                        <div className="grid grid-cols-2 ">
                                            <p className="text-gray-600 font-medium">
                                                Date of Birth:
                                            </p>
                                            <p>
                                                {singleEmployee?.data?.dateOfBirth ? formatDate(singleEmployee?.data?.dateOfBirth) :  "Not Provided"}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 ">
                                            <p className="text-gray-600 font-medium">Hired Date:</p>
                                            <p>{singleEmployee?.data?.hiredDate ? formatDate(singleEmployee?.data?.hiredDate) :  "Not Provided"}</p>
                                        </div>
                                        <div className="grid grid-cols-2 ">
                                            <p className="text-gray-600 font-medium">
                                                Phone Number:
                                            </p>
                                            <p>{singleEmployee?.data?.phoneNumber || "N/A"}</p>
                                        </div>
                                        <div className="grid grid-cols-2 ">
                                            <p className="text-gray-600 font-medium">Email:</p>
                                            <p>{singleEmployee?.data?.email || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Staff Contact Information */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-4">
                                        Staff Contact Information
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 ">
                                            <p className="text-gray-600 font-medium">
                                                Phone Number:
                                            </p>
                                            <p>
                                                {singleEmployee.data?.phoneNumber || "Not provided"}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 ">
                                            <p className="text-gray-600 font-medium">Email:</p>
                                            <p>{singleEmployee?.data?.email || "Not provided"}</p>
                                        </div>
                                        <div className="grid grid-cols-2 ">
                                            <p className="text-gray-600 font-medium">Username:</p>
                                            <p>{singleEmployee?.data?.username || "Not provided"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex justify-end gap-4 ">
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDeleteEmployee}
                                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
                                >
                                    Remove Employee
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/*Edit Modal Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Edit Employee Details"
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-80"
            >
                <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
                    <EditEmployeeProfile
                        isModalOpen={isEditModalOpen}
                        onClose={handleCloseModal}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default EmployeeProfile;