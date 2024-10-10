import {format, parseISO} from "date-fns";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";
import {useState} from "react";

const DailyLogDetails = ({dailyLog}) => {
    const parseDate = parseISO(dailyLog.date)
    const {dispatch} = useDailyLogContext()
    const [isEditing, setIsEditing] = useState(false)
    const [updatedLog, setUpdatedLog] = useState({
        dailyLogType: dailyLog.dailyLogType,
        body: dailyLog.body,
        date:dailyLog.date
    })
    const [error,setError] = useState("")


    const handleDelete = async () => {

        const response = await fetch("http://localhost:4000/api/dailyLogs/" + dailyLog._id, {
            method: "DELETE"
        })
        const json = await response.json()
        console.log(json)
        if (response.ok) {
            console.log(dailyLog._id + " deleted.")
            dispatch({type: "DELETE_DAILY_LOG", payload: json})
        }

    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("")
        const response = await fetch("http://localhost:4000/api/dailyLogs/update/" + dailyLog._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedLog)
        });
        const json = await response.json();
        console.log(json.body.length)
        // if(json.body.length <= 0){
        //     setError("Observation cannot be empty!")
        //     console.log("Observation cannot be empty!")
        // }
        // if (response.ok) {
        //     dispatch({type: "UPDATE_DAILY_LOG", payload: json})
        //     setIsEditing(false)
        //
        // } else {
        //     setError(json.message || "failed to update log.") // Display server error message or a fallback
        //     console.error("Failed to update log:", json)
        // }

        if(!response.ok){
            setError(json.message || "Failed to update log.")
            console.error("failed to update Log", json)
            return
        }
        if(!updatedLog.body || updatedLog.body.trim() ===""){
            //Check if body is empty
            setError("Observation cannot be empty!")
            console.error(json.message)
            return
        }
        dispatch({type:"UPDATE_DAILY_LOG",payload:json})
        setIsEditing(false)

    }


    return (
        <div>
            {error && <div style ={{color:'red'}}>{error}</div>}
            {
                isEditing ? (
                        <form onSubmit={handleUpdate}>
                            <select
                                value = {updatedLog.dailyLogType}
                                onChange={(e) => setUpdatedLog({...updatedLog, dailyLogType:e.target.value})}
                            >
                                <option value="Daily Log">Daily Log</option>
                                <option value="Incident Report">Incident Report</option>
                            </select>

                            <textarea
                                value = {updatedLog.body}
                                onChange={(e) => setUpdatedLog({...updatedLog,body:e.target.value})}
                            ></textarea>

                            <input
                                type="datetime-local"
                                value = {updatedLog.date}
                                onChange = {(e) => setUpdatedLog({...updatedLog,date:e.target.value})}
                            />

                            <button type = "submit">Save</button>
                            <button type ="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) :
                    (
                        <div>
                            <label>Type:</label><strong>{dailyLog.dailyLogType}</strong> <br/>
                            <label>Observation:</label><p>{dailyLog.body}</p>
                            <label>Occured:</label><small> {format(parseDate, "MMMM dd, yyyy h:mm a")}</small><br/>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    )
            }
        </div>
    )
}
export default DailyLogDetails

