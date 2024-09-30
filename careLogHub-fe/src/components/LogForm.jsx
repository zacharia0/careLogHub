import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";

const LogForm = () =>{
    const {dispatch} = useDailyLogContext()
    const [dailyLogType, setDailyLogType] = useState("")
    const [body,setBody] = useState("")
    const [date, setDate] = useState("")
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit =  async (e) =>{
        e.preventDefault()
        const dailyLogObservation = {dailyLogType,body,date}

        const response = await fetch('http://localhost:4000/api/dailyLogs',{
            method:'POST',
            body: JSON.stringify(dailyLogObservation),
            headers:{
                'Content-Type':"application/json"
            }
        })

        const json = await response.json();
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError('')
            setBody('')
            setDate('')
            setDailyLogType('')
            console.log("New Observation added")
            navigate("/")

        }

    }

    return(
        <form onSubmit={handleSubmit}>
            <Link to = "/">View Logs</Link>
            <h3><strong>Create Daily Log</strong></h3>
            <label>Type:</label><br/>
            <select
                value = {dailyLogType}
                onChange={ (e) => setDailyLogType(e.target.value)}
            >
                <option value="Daily Log">Select One</option>
                <option value="Daily Log">Daily Log</option>
                <option value="Incident Report">Incident Report</option>
            </select><br/>

            <label>Observation Summary:</label><br/>
            <textarea
                type="text"
                value = {body}
                onChange = { (e) =>setBody(e.target.value)}
            /><br/>

            <label>Date:</label><br/>
            <input
                type="date"
                value={date}
                onChange={(e) => {
                    setDate(e.target.value);
                    e.target.blur()
                }}
            /><br/>
            {body}
            {date}
            {dailyLogType}
            <button>Create Observation</button>
            {error && <div>{error}</div>}

        </form>
    )
}

export default LogForm