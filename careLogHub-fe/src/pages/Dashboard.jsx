import {FaBriefcaseMedical, FaBook, FaPeopleCarryBox, FaPeopleRoof, FaFilePen} from "react-icons/fa6";
import {Link} from "react-router-dom";

const Dashboard = () => {

    return (
        <div className={"grid grid-cols-4 h-[50vh] w-[80vw] py-2 px-2 border-2  rounded-lg shadow-lg items-center"}>

            {/*Medications*/}
            <div className={"border py-4 px-4"}>
                <span>
                    <Link to="/all-medication"> <FaBriefcaseMedical className={"text-9xl text-red-500"}/> Create Medications</Link>
                </span>
            </div>
            {/*Daily Logs*/}
            <div className={"border py-4 px-4" }>
                <div>
                    <div >
                        <Link  to="/all-daily-logs"> <div><FaFilePen className={"text-9xl text-[#fbc115]"}/></div>All Daily Logs</Link>
                    </div>

                </div>
            </div>
            {/*Clients*/}
            <div className={"border py-4 px-4"}>
                <Link to = "/all-clients">
                    <div><FaPeopleRoof className={"text-9xl text-blue-500"}/></div>
                    <span >All Clients</span>
                </Link>
            </div>
            {/*Employees*/}
            <div className={"border py-4 px-4"}>
                <Link to = "/all-employees"> <FaPeopleCarryBox className={"text-9xl text-green-500"}/>All Employees</Link>
            </div>
        </div>
    )
}

export default Dashboard