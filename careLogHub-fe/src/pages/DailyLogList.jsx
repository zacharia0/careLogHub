
import { useEffect, useState } from "react";
import DailyLogDetail from "../components/DailyLogDetail.jsx";
import Modal from "react-modal";
import DailyLogForm from "../components/DailyLogForm.jsx";
import { useDailyLogContext } from "../hooks/useDailyLogContext.js";
import { IoAdd } from "react-icons/io5";

const DailyLogList = () => {
    const { dailyLogs, dispatch } = useDailyLogContext();
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDailyLogs = async () => {
            const response = await fetch("http://localhost:4000/api/dailyLogs?deleted=false");
            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                console.log(json);
            }

            if (response.ok) {
                dispatch({ type: "SET_DAILY_LOG", payload: json });
                setError(null);
            }
        };
        fetchDailyLogs();
    }, [dispatch]);


    const handleModalClose = () =>{
        setIsModalOpen(false)
    }

    return (
        <div className="container mx-auto px-4 mt-7">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Daily Logs</h1>
                <button
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    <IoAdd className="mr-2 text-2xl" />
                    Create New Daily Log
                </button>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-200 uppercase text-sm text-gray-600" >
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Type</th>
                        <th className="border px-4 py-2">Observation</th>
                        <th className="border px-4 py-2">Occurred</th>
                        <th className="border px-4 py-2">Client</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dailyLogs &&
                        dailyLogs.map((log) => <DailyLogDetail key={log._id} dailyLog={log} />)}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel = "Create Daily Log"
                overlayClassName = "fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center"
                className="relative bg-white p-6 rounded-lg shadow-md w-[800px] mx-auto my-16"


            >
                <DailyLogForm onClose={handleModalClose} />
            </Modal>

            {error && <div className="text-red-500">{error}</div>}

        </div>
    );
};

export default DailyLogList;






//
// import { useEffect, useState } from "react";
// import DailyLogDetail from "../components/DailyLogDetail.jsx";
// import Modal from "react-modal";
// import DailyLogForm from "../components/DailyLogForm.jsx";
// import { useDailyLogContext } from "../hooks/useDailyLogContext.js";
// import { IoAdd } from "react-icons/io5";
//
// const DailyLogList = () => {
//     const { dailyLogs, dispatch } = useDailyLogContext();
//     const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//
//     useEffect(() => {
//         const fetchDailyLogs = async () => {
//             const response = await fetch("http://localhost:4000/api/dailyLogs?deleted=false");
//             const json = await response.json();
//
//             if (!response.ok) {
//                 setError(json.error);
//                 console.log(json);
//             }
//
//             if (response.ok) {
//                 dispatch({ type: "SET_DAILY_LOG", payload: json });
//                 setError(null);
//             }
//         };
//         fetchDailyLogs();
//     }, [dispatch]);
//
//     const handleModalClose = () => {
//         setIsModalOpen(false);
//     };
//
//     return (
//         <div className="container mx-auto px-4 mt-7">
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-xl font-bold">Daily Logs</h1>
//                 <button
//                     className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     onClick={() => setIsModalOpen(true)}
//                 >
//                     <IoAdd className="mr-2 text-2xl" />
//                     Create New Daily Log
//                 </button>
//             </div>
//
//             {/* Table (Hidden on small screens) */}
//             <div className="hidden md:block overflow-x-auto shadow-md rounded-lg">
//                 <table className="table-auto w-full border-collapse border border-gray-200">
//                     <thead className="bg-gray-200 uppercase text-sm text-gray-600">
//                     <tr className="bg-gray-100">
//                         <th className="border px-4 py-2">Type</th>
//                         <th className="border px-4 py-2">Observation</th>
//                         <th className="border px-4 py-2">Occurred</th>
//                         <th className="border px-4 py-2">Client</th>
//                         <th className="border px-4 py-2">Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {dailyLogs &&
//                         dailyLogs.map((log) => <DailyLogDetail key={log._id} dailyLog={log} />)}
//                     </tbody>
//                 </table>
//             </div>
//
//             {/* Mobile View (Hidden on larger screens) */}
//             <div className="md:hidden">
//                 {dailyLogs &&
//                     dailyLogs.map((log) => (
//                         <div
//                             key={log._id}
//                             className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
//                         >
//                             <div className="font-bold text-lg">{log.dailyLogType}</div>
//                             <div className="text-gray-700">{log.body}</div>
//                             <div className="text-gray-600">{new Date(log.date).toLocaleString()}</div>
//                             <div className="text-gray-700">Client: {log.client.firstName} {log.client.lastName}</div>
//                             <div className="flex space-x-2 mt-2">
//                                 <button
//                                     onClick={() => setIsModalOpen(true)} // This triggers the modal for editing
//                                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(log._id)}
//                                     className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//             </div>
//
//             {/* Modal */}
//             <Modal
//                 isOpen={isModalOpen}
//                 onRequestClose={() => setIsModalOpen(false)}
//                 contentLabel="Create Daily Log"
//                 overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center"
//                 className="relative bg-white p-6 rounded-lg shadow-md w-[800px] mx-auto my-16"
//             >
//                 <DailyLogForm onClose={handleModalClose} />
//             </Modal>
//
//             {error && <div className="text-red-500">{error}</div>}
//         </div>
//     );
// };
//
// export default DailyLogList;
//
