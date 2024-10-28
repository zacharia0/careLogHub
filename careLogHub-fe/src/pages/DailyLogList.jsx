import {useEffect, useState} from "react";
import DailyLogDetail from "../components/DailyLogDetail.jsx";
import {Link} from "react-router-dom";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";
import LogForm from "../components/LogForm.jsx";

const DailyLogList = () => {
    const {dailyLogs, dispatch} = useDailyLogContext()
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDailyLogs = async () => {
            const response = await fetch("http://localhost:4000/api/dailyLogs")
            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
                console.log(json)
            }

            if (response.ok) {
                dispatch({type: "SET_DAILY_LOG", payload: json})
                setError(null)
            }
        }
        fetchDailyLogs()
    }, [])
    // console.log("Current dailyLogs state:", dailyLogs); // Debugging the state

    return (
        <div>
            <div>
                <Link to="/create-dailylog">Create Daily Log</Link>
            </div>
            {error && <div>{error} </div>}

            {dailyLogs && dailyLogs.map((log) => (
                <DailyLogDetail key={log._id} dailyLog={log}/>
            ))}

        </div>
    )
}

export default DailyLogList
