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
            <Link className="text-blue-500 hover:underline font-semibold" to="/">View All Logs</Link>
            <h3><strong>Create Daily Log</strong></h3>
            <label>Type:</label><br/>
            <select
                className="w-1/5 p-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out text-gray-700"
                value = {dailyLogType}
                onChange={ (e) => setDailyLogType(e.target.value)}
            >
                <option value="">Select One</option>
                <option value="Daily Log">Daily Log</option>
                <option value="Incident Report">Incident Report</option>
            </select><br/>

            <label>Observation Summary:</label><br/>
            <textarea
                className= "w-1/3 h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus-ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out resize-none"
                type="text"
                value = {body}
                onChange = { (e) =>setBody(e.target.value)}
            /><br/>

            <label>Date:</label><br/>
            <input
                className= "w-2/7 p-3 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out text-gray-700"
                type="date"
                value={date}
                onChange={(e) => {
                    setDate(e.target.value);
                    e.target.blur()
                }}
            /><br/>
            <button className= "bg-green-500 hover:bg-green-700 py-1 px-4 text-white rounded" >Create Observation</button>
            {error && <div style={{color:'red'}}>{error}</div>}

        </form>
    )
}

export default LogForm