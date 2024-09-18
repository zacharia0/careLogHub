import {useEffect, useState} from "react";
import {format, parseISO} from "date-fns";


//Components
import DailyLogDetails from "../components/dailyLogDetails.jsx";

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
        <div>{logs && logs.map((log) =>{
            const parseDate = parseISO(log.date)
            return (
                <div>
                    {/*<h3>{log.dailyLogType}</h3>*/}
                    {/*<p>{log.body}</p>*/}
                    {/*<small>{format(parseDate, "MMMM dd, yyyy h:mm a")}</small>*/}

                    <DailyLogDetails  key={log._id} dailyLog={log}/>
                </div>
            )
        })}</div>
    )
}

export default Home