import {useEffect, useState} from "react";
import {format, parseISO} from "date-fns";
import "../index.css"


//Components
import DailyLogDetails from "../components/dailyLogDetails.jsx";
import {Link} from "react-router-dom";

const Home = () =>{

    const [logs,setLogs] = useState(null)

    useEffect(() =>{
        const fetchLogs = async() =>{
            const response = await fetch("http://localhost:4000/api/dailyLogs")

            const json = await response.json()
            if(response.ok){
                setLogs(json)
            }

        }
        fetchLogs()
    },[])


    return(
        <div>
            {/*<Link to = "/createDailyLog"><button>Create New Log</button></Link>*/}
            <Link to="/createDailyLog" className="button-link">Create New Log</Link>

            <div>{logs && logs.map((log) =>{
                // const parseDate = parseISO(log.date)
                return (
                    <div key = {log._id}>
                        <div>
                            <DailyLogDetails dailyLog={log}/>
                        </div>


                    </div>
                )
            })}</div>

        </div>
    )
}

export default Home