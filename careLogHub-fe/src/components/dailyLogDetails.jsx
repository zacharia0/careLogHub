import {format, parseISO} from "date-fns";

const DailyLogDetails = ({dailyLog}) =>{
    const parseDate = parseISO(dailyLog.date)

    return(
        <div >

            <label >Type:</label><strong>{dailyLog.dailyLogType}</strong> <br/>
            <label>Observation:</label><p>{dailyLog.body}</p>
            <label>Created At:</label><small> { format(parseDate,"MMMM dd, yyyy h:mm a")}</small><br/>
            <button>Delete</button>
            <button>Update</button>
        </div>
    )
}
export default DailyLogDetails