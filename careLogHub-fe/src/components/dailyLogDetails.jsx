import {format, parseISO} from "date-fns";

const DailyLogDetails = ({dailyLog}) =>{
    const parseDate = parseISO(dailyLog.date)

    return(
        <div>

            <strong>{dailyLog.dailyLogType}</strong>
            <p>{dailyLog.body}</p>
            <small>{format(parseDate,"MMMM dd, yyyy h:mm a")}</small>
        </div>
    )
}
export default DailyLogDetails