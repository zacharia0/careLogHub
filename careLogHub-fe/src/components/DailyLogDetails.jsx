import {format, parseISO} from "date-fns";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";

const DailyLogDetails = ({dailyLog}) => {
    const parseDate = parseISO(dailyLog.date)
    const {dispatch} = useDailyLogContext()


    const handleDelete = async() =>{

        const response = await fetch("http://localhost:4000/api/dailyLogs/"+dailyLog._id,{
            method:"DELETE"
        })
        const json = await response.json()
        console.log(json)
        if(response.ok){
            console.log(dailyLog._id  + " deleted.")
            dispatch({type:"DELETE_DAILY_LOG",payload:json})
        }

    }


    return (
        <div>
            {
                (
                    <div>
                        <label>Type:</label><strong>{dailyLog.dailyLogType}</strong> <br/>
                        <label>Observation:</label><p>{dailyLog.body}</p>
                        <label>Created At:</label><small> {format(parseDate, "MMMM dd, yyyy h:mm a")}</small><br/>
                        <button onClick = {handleDelete}>Delete</button>
                    </div>
                )
            }
        </div>
    )
}
export default DailyLogDetails

