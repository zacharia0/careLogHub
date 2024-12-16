// import {useClientContext} from "../hooks/useClientContext.js";
// import {useEffect, useState} from "react";
// import ClientDetail from "../components/ClientDetail.jsx";
// import {Link} from "react-router-dom";
// import { IoAdd } from "react-icons/io5";
// const ClientList = () => {
//     const {clients} = useClientContext()
//
//     console.log(clients)
//
//     return (
//         <div>
//             <Link
//                 className="add-new-btn-link  "
//                 to="/create-client">
//                 <IoAdd className={"mr-2 text-2xl"}/> Add New Client
//             </Link>
//             {clients && clients.map((client) => (
//                 <div key = {client._id}>
//
//                     <ClientDetail key={client._id} clients={client}/>
//                 </div>
//             ))}
//         </div>
//     )
//
// }
//
// export default ClientList
//
//
//
//
//
//
//
//



import { useClientContext } from "../hooks/useClientContext.js";
import { IoAdd } from "react-icons/io5";
import ClientDetail from "../components/ClientDetail.jsx";
import { Link } from "react-router-dom";

const ClientList = () => {
    const { clients } = useClientContext();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Client List</h1>
                <Link
                    to="/create-client"
                    className="flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                    <IoAdd className="mr-2 text-xl" />
                    Add New Client
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full table-auto text-left text-gray-700">
                    {/* Table Header */}
                    <thead className="bg-gray-100 uppercase text-sm text-gray-600">
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
                    {clients && clients.map((client) => (
                        <ClientDetail key={client._id} clients={client} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientList;

