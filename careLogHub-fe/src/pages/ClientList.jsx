//
// import { useClientContext } from "../hooks/useClientContext.js";
// import { IoAdd } from "react-icons/io5";
// import ClientDetail from "../components/ClientDetail.jsx";
// import {getLoggedEmployee} from "../ApiCalls/employees.js";
// import {useEffect, useState} from "react";
// import Modal from "react-modal";
// import ClientForm from "../components/ClientForm.jsx";
//
// const ClientList = () => {
//     const { clients } = useClientContext();
//     const [loggedInEmployee, setLoggedInEmployee] = useState(null)
//     const [isModalOpen,setIsModalOpen] = useState(false)
//
//     useEffect(() => {
//          const response = async() =>{
//              const json = await getLoggedEmployee()
//              if(json.data.success){
//                     setLoggedInEmployee(json)
//              }
//          }
//          response()
//
//              console.log(loggedInEmployee)
//
//     }, []);
//
//     const handleCloseModal = () =>{
//         setIsModalOpen(false)
//     }
//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             {/* Page Header */}
//             <div className="w-3/4 mx-auto flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-semibold text-gray-800">Client List</h1>
//                 <button
//                     onClick={() => setIsModalOpen(true)}
//
//                     className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
//                 >
//                     <IoAdd className="mr-2 text-xl" />
//                     Add New Client
//                 </button>
//             </div>
//
//             {/* Table */}
//             <div className=" w-3/4 mx-auto overflow-x-auto bg-white shadow-md rounded-lg">
//                 <table className="w-full table-auto text-left  text-gray-700">
//                     {/* Table Header */}
//                     <thead className="bg-gray-200 uppercase text-sm text-gray-600">
//                     <tr>
//                         <th className="py-3 px-4">Name</th>
//                         <th className="py-3 px-4">Date of Birth</th>
//                         <th className="py-3 px-4">Move-in Date</th>
//                         <th className="py-3 px-4">Diagnoses</th>
//                         <th className="py-3 px-4">Actions</th>
//                     </tr>
//                     </thead>
//
//                     {/* Table Body */}
//                     <tbody>
//                     {clients && clients.map((client) => (
//                         <ClientDetail key={client._id} clients={client} />
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//
//
//         {/*    Form Modal*/}
//             <Modal
//                 isOpen ={isModalOpen}
//                 onRequestClose={() => setIsModalOpen(false)}
//                 contentLabel="Create Client Form"
//                 className="fixed inset-0 z-50 flex items-center justify-center p-4"
//                 overlayClassName="fixed inset-0 bg-black bg-opacity-80"
//             >
//                 <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
//
//                     <ClientForm
//                         onClose = {handleCloseModal}
//                     />
//                 </div>
//             </Modal>
//
//         </div>
//     );
// };
//
// export default ClientList;
//

import { useClientContext } from "../hooks/useClientContext.js";
import { IoAdd } from "react-icons/io5";
import ClientDetail from "../components/ClientDetail.jsx";
import { getLoggedEmployee } from "../ApiCalls/employees.js";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import ClientForm from "../components/ClientForm.jsx";
import {Link} from "react-router-dom";

const ClientList = () => {
    const { clients } = useClientContext();
    const [loggedInEmployee, setLoggedInEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const response = async () => {
            const json = await getLoggedEmployee();
            if (json.data.success) {
                setLoggedInEmployee(json);
            }
        };
        response();

        console.log(loggedInEmployee);
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="w-3/4 mx-auto flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Client List</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                    <IoAdd className="mr-2 text-xl" />
                    Add New Client
                </button>
            </div>

            {/* Table (Hidden on small screens) */}
            <div className="hidden md:block w-3/4 mx-auto overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full table-auto text-left text-gray-700">
                    {/* Table Header */}
                    <thead className="bg-gray-200 uppercase text-sm text-gray-600">
                    <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Date of Birth</th>
                        <th className="py-3 px-4">Move-in Date</th>
                        <th className="py-3 px-4">Diagnoses</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                    {clients &&
                        clients.map((client) => (
                            <ClientDetail key={client._id} clients={client} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View (Hidden on larger screens) */}
            <div className="md:hidden w-3/4 mx-auto">
                <div className="bg-white shadow-md rounded-lg">
                    {clients &&
                        clients.map((client) => (
                            <div
                                key={client._id}
                                className="flex justify-between items-center p-4 border-b border-gray-200"
                            >
                                <div className="text-gray-800 font-semibold">
                                    {client.firstName} {client.lastName}
                                </div>
                                <div className="text-gray-600">{client.diagnoses}</div>
                                <div className="flex space-x-2">
                                    <Link to = {`/client-profile/${client._id}`} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Form Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Create Client Form"
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-black bg-opacity-80"
            >
                <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
                    <ClientForm onClose={handleCloseModal} />
                </div>
            </Modal>
        </div>
    );
};

export default ClientList;
