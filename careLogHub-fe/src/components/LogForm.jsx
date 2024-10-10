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

        // if(!dailyLogType || !body || !date){
        //     setError("All fields are required")
        //     return
        // }
        if(!dailyLogType){
            setError("Daily Log type is required")
            return
        }
        if(!body){
            setError("Daily Log body is required")
            return
        }
        if(!date){
            setError("Daily Log date is required")
            return
        }
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
            // setError(json.message)
        }
        if(response.ok){
            setError('')
            setBody('')
            setDate('')
            setDailyLogType('')
            dispatch({type:"CREATE_DAILY_LOG",payload:json})
            console.log("New Observation added")
            // navigate("/")

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
                <option value="">Select One</option>
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
            {error && <div style={{color:'red'}}>{error}</div>}

        </form>
    )
}

export default LogForm