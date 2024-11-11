import {format, parseISO} from "date-fns";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";
import {useState} from "react";

const DailyLogDetail = ({dailyLog}) => {
    const parseDate = parseISO(dailyLog.date)
    const {dispatch} = useDailyLogContext()
    const [isEditing,setIsEditing] = useState(false)
    const [updateDailyLog,setUpdateDailyLog] = useState({
        dailyLogType:dailyLog.dailyLogType,
        body:dailyLog.body,
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

    const handleUpdate = async(e) =>{
        e.preventDefault()
        if(!updateDailyLog.dailyLogType){
            setError("Daily Log Type must be selected")
            return
        }
        if(!updateDailyLog.body){
            setError("Observation cannot be empty")
            return
        }
        if(!updateDailyLog.date){
            setError("Date must be selected")
            return
        }
        const response = await fetch("http://localhost:4000/api/dailyLogs/update/"+dailyLog._id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updateDailyLog)
        })
        const json = await response.json()
        if(!response.ok){
            setError("failed to update")
            console.log("failed to update")
            return
        }
        if(response.ok){
            dispatch({type:"UPDATE_DAILY_LOG",payload:json})
            setIsEditing(false)
        }
    }


    return (

        <div>
            {
                isEditing ? (
                        <form onSubmit={handleUpdate}>
                            <div>EDITING FORM</div>
                            <select
                                value = {updateDailyLog.dailyLogType}
                                onChange={(e) => setUpdateDailyLog({...updateDailyLog, dailyLogType:e.target.value})}
                            >
                                <option value="Daily Log">Daily Log</option>
                                <option value="Incident Report">Incident Report</option>
                            </select>

                            <textarea
                                value = {updateDailyLog.body}
                                onChange={(e) => setUpdateDailyLog({...updateDailyLog,body:e.target.value})}
                            ></textarea>

                            <input
                                type="datetime-local"
                                value = {updateDailyLog.date}
                                onChange = {(e) => setUpdateDailyLog({...updateDailyLog,date:e.target.value})}
                            />

                            <button className= "save-btn" type = "submit">Save</button>
                            <button className="cancel-btn" type ="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) :
                    (
                        <div className="mb-6"> <hr className="mb-2 mt-4"></hr>
                            <label>Type:</label><strong>{dailyLog.dailyLogType}</strong> <br/>
                            <label>Observation:</label><p>{dailyLog.body}</p>
                            <label>Occurred:</label><small> {format(parseDate, "MMMM dd, yyyy h:mm a")}</small><br/>
                            <label> Client Name:</label>
                            <span>{dailyLog.client?.firstName} {dailyLog.client?.lastName}</span>
                            <button className= "edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                            <button className="delete-btn" onClick={handleDelete}>Delete</button>
                        </div>
                    )
            }
        </div>
    )
}
export default DailyLogDetail

