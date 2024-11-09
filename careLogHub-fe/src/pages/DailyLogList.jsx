import {useEffect, useState} from "react";
import DailyLogDetail from "../components/DailyLogDetail.jsx";
import {Link} from "react-router-dom";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";
import DailyLogForm from "../components/DailyLogForm.jsx";

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
    }, [dispatch])
    // console.log("Current dailyLogs state:", dailyLogs); // Debugging the state

    return (
        <div className="">
            <div >
                <Link className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow" to="/create-dailylog">Create Daily Log</Link>
            </div >
            {error && <div>{error} </div>}
            <div className="" >
                {dailyLogs && dailyLogs.map((log) => (

                        <DailyLogDetail key={log._id} dailyLog={log}/>
                ))}

            </div>


        </div>
    )
}

export default DailyLogList
