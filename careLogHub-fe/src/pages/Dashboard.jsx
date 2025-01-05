


import { FaBriefcaseMedical, FaFilePen, FaPeopleRoof, FaPeopleCarryBox } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div >
            {/* Container */}
            <div className="mx-auto  grid-cols-2 gap-4 h-[60vh] w-[50vw] bg-white p-6 rounded-lg shadow-lg">

                <Link
                    to="/all-daily-logs"
                    className="flex flex-col items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                    <FaFilePen className="text-7xl text-yellow-500 mb-4" />
                    <span className="text-lg font-semibold text-gray-700"> Daily Logs</span>
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
                    <span className="text-lg font-semibold text-gray-700">All Staff</span>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;

