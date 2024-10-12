//ICONS
import {FaBeer,FaTrash,FaPencilAlt} from "react-icons/fa"


//
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
                                className=" w-1/7 p-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-500 transition duration:300 ease-in-out text-gray-700"
                                value = {updatedLog.dailyLogType}
                                onChange={(e) => setUpdatedLog({...updatedLog, dailyLogType:e.target.value})}
                            >
                                <option value="Daily Log">Daily Log</option>
                                <option value="Incident Report">Incident Report</option>
                            </select>

                            <textarea
                                className="w-1/3 h-40 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out resize-none"
                                value = {updatedLog.body}
                                onChange={(e) => setUpdatedLog({...updatedLog,body:e.target.value})}
                            ></textarea>

                            <input
                                className="w-2/7 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focust:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out text-gray-700"
                                type="datetime-local"
                                value = {updatedLog.date}
                                onChange = {(e) => setUpdatedLog({...updatedLog,date:e.target.value})}
                            />

                            <button className= "bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-7 mr-4 rounded" type = "submit">Save</button>
                            <button className= "bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-7 rounded" type ="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) :
                    (
                        <div className="pl-3 mb-10">
                            <label className= "block text-gray-700 font-medium mb-1">Type:</label><strong>{dailyLog.dailyLogType}</strong>
                            <label className="block -text-gray-700 font-medum mb-1">Observation:</label><p>{dailyLog.body}</p>
                            <label>Occurred:</label><small> {format(parseDate, "MMMM dd, yyyy h:mm a")}</small>
                            <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => setIsEditing(true)}><FaPencilAlt/></button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded " onClick={handleDelete}><FaTrash/></button>
                        </div>
                    )
            }
        </div>
    )
}
export default DailyLogDetails

