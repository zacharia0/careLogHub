import {format, parseISO} from "date-fns";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";
import {useState} from "react";

const DailyLogDetails = ({dailyLog}) => {
    const parseDate = parseISO(dailyLog.date)
    const {dispatch} = useDailyLogContext()
    const [isEditing,setIsEditing] = useState(false)
    const [updateDailyLog,setUpdateDailyLog] = useState({
        dailyLogType:dailyLog.dailyLogType,
        body:dailyLog.body,
        date:dailyLog.date
    })
    const [error,setError] = useState("")


    const handleDelete = async(e) =>{
        e.preventDefault()

        const response = await fetch("http://localhost:4000/api/dailyLogs/"+dailyLog._id,{
            method:"DELETE"
        })
        const json = await response.json()
        console.log( "DELETION" ,json)
        if(response.ok){
            console.log(dailyLog._id  + " deleted.")
            dispatch({type:"DELETE_DAILY_LOG",payload:json})
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
                            <select  value ={updateDailyLog.dailyLogType} onChange={(e) => setUpdateDailyLog({...updateDailyLog,dailyLogType:e.target.value})}>
                                <option value="Daily Log">Daily Log</option>
                                <option value="Incident">Incident</option>
                            </select>
                            <textarea
                                value = {updateDailyLog.body}
                                onChange={(e) => setUpdateDailyLog({...updateDailyLog,body:e.target.value})}
                            >
                            </textarea>
                            <input
                                type="datetime-local"
                                value = {updateDailyLog.date}
                                onChange={(e) => setUpdateDailyLog({...updateDailyLog,date:e.target.value})}
                            />
                            <button type="submit">Save</button>
                            <button onClick={(e) => setIsEditing(false)}>Cancel</button>
                        </form>
                ):
                (
                    <div>
                        <label>Type:</label><strong>{dailyLog.dailyLogType}</strong> <br/>
                        <label>Observation:</label><p>{dailyLog.body}</p>
                        <label>Created At:</label><small> {format(parseDate, "MMMM dd, yyyy h:mm a")}</small><br/>
                        <button onClick = {handleDelete}>Delete</button>
                        <button onClick={e => setIsEditing(true)}>Update</button>
                    </div>
                )
            }
        </div>
    )
}
export default DailyLogDetails

