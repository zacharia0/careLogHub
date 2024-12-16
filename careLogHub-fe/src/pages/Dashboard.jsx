// import {FaBriefcaseMedical, FaBook, FaPeopleCarryBox, FaPeopleRoof, FaFilePen} from "react-icons/fa6";
// import {Link} from "react-router-dom";
//
// const Dashboard = () => {
//
//     return (
//         <div className={" grid h-[90vh] border-2 items-center justify-center"}>
//
//             <div className={"grid grid-cols-4 h-[50vh] w-[80vw] py-2 px-2 border-2  rounded-lg shadow-lg items-center justify-center"}>
//
//                 {/*Medications*/}
//                 <div className={"border py-4 px-4"}>
//                     <span>
//                         <Link to="/all-medication"> <FaBriefcaseMedical className={"text-9xl text-red-500"}/> All Medications</Link>
//                     </span>
//                 </div>
//                 {/*Daily Logs*/}
//                 <div className={"border py-4 px-4" }>
//                     <div>
//                         <div >
//                             <Link  to="/all-daily-logs"> <div><FaFilePen className={"text-9xl text-[#fbc115]"}/></div>All Daily Logs</Link>
//                         </div>
//
//                     </div>
//                 </div>
//                 {/*Clients*/}
//                 <div className={"border py-4 px-4"}>
//                     <Link to = "/all-clients">
//                         <div><FaPeopleRoof className={"text-9xl text-blue-500"}/></div>
//                         <span >All Clients</span>
//                     </Link>
//                 </div>
//                 {/*Employees*/}
//                 <div className={"border py-4 px-4"}>
//                     <Link to = "/all-employees"> <FaPeopleCarryBox className={"text-9xl text-green-500"}/>All Employees</Link>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Dashboard

//
// import { FaBriefcaseMedical, FaFilePen, FaPeopleRoof, FaPeopleCarryBox } from "react-icons/fa6";
// import { Link } from "react-router-dom";
//
// const Dashboard = () => {
//     return (
//         <div className="flex h-[90vh] items-center justify-center bg-gray-50">
//             {/* Container */}
//             <div className="grid grid-cols-2 gap-6 h-[60vh] w-[80vw] bg-white p-6 rounded-lg shadow-lg">
//                 {/* Medications */}
//                 <div className="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
//                     <Link to="/all-medication" className="flex flex-col items-center text-center">
//                         <FaBriefcaseMedical className="text-7xl text-red-500 mb-4" />
//                         <span className="text-lg font-semibold text-gray-700">All Medications</span>
//                     </Link>
//                 </div>
//
//                 {/* Daily Logs */}
//                 <div className="flex flex-col items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
//                     <Link to="/all-daily-logs" className="flex flex-col items-center text-center">
//                         <FaFilePen className="text-7xl text-yellow-500 mb-4" />
//                         <span className="text-lg font-semibold text-gray-700">All Daily Logs</span>
//                     </Link>
//                 </div>
//
//                 {/* Clients */}
//                 <div className="flex flex-col items-center justify-center bg-blue-50 border border-blue-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
//                     <Link to="/all-clients" className="flex flex-col items-center text-center">
//                         <FaPeopleRoof className="text-7xl text-blue-500 mb-4" />
//                         <span className="text-lg font-semibold text-gray-700">All Clients</span>
//                     </Link>
//                 </div>
//
//                 {/* Employees */}
//                 <div className="flex flex-col items-center justify-center bg-green-50 border border-green-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
//                     <Link to="/all-employees" className="flex flex-col items-center text-center">
//                         <FaPeopleCarryBox className="text-7xl text-green-500 mb-4" />
//                         <span className="text-lg font-semibold text-gray-700">All Employees</span>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Dashboard;



import { FaBriefcaseMedical, FaFilePen, FaPeopleRoof, FaPeopleCarryBox } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex h-[90vh] items-center justify-center bg-gray-50">
            {/* Container */}
            <div className="grid grid-cols-2 gap-6 h-[60vh] w-[80vw] bg-white p-6 rounded-lg shadow-lg">
                {/* Medications */}
                <Link
                    to="/all-medication"
                    className="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                    <FaBriefcaseMedical className="text-7xl text-red-500 mb-4" />
                    <span className="text-lg font-semibold text-gray-700">All Medications</span>
                </Link>

                {/* Daily Logs */}
                <Link
                    to="/all-daily-logs"
                    className="flex flex-col items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                    <FaFilePen className="text-7xl text-yellow-500 mb-4" />
                    <span className="text-lg font-semibold text-gray-700">All Daily Logs</span>
                </Link>

                {/* Clients */}
                <Link
                    to="/all-clients"
                    className="flex flex-col items-center justify-center bg-blue-50 border border-blue-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                    <FaPeopleRoof className="text-7xl text-blue-500 mb-4" />
                    <span className="text-lg font-semibold text-gray-700">All Clients</span>
                </Link>

                {/* Employees */}
                <Link
                    to="/all-employees"
                    className="flex flex-col items-center justify-center bg-green-50 border border-green-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                    <FaPeopleCarryBox className="text-7xl text-green-500 mb-4" />
                    <span className="text-lg font-semibold text-gray-700">All Employees</span>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

