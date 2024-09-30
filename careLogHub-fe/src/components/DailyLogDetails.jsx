import {format, parseISO} from "date-fns";

const DailyLogDetails = ({dailyLog}) => {
    const parseDate = parseISO(dailyLog.date)
    return (
        <div>
            {
                (
                    <div>
                        <label>Type:</label><strong>{dailyLog.dailyLogType}</strong> <br/>
                        <label>Observation:</label><p>{dailyLog.body}</p>
                        <label>Created At:</label><small> {format(parseDate, "MMMM dd, yyyy h:mm a")}</small><br/>
                    </div>
                )
            }
        </div>
    )
}
export default DailyLogDetails

