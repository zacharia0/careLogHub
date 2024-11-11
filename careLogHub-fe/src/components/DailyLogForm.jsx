import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";

const DailyLogForm = () => {

    const {dispatch} = useDailyLogContext()
    //Client
    const [client, setClient] = useState([])
    //Form
    const [clientId,setClientId] = useState("")
    const [dailyLogType, setDailyLogType] = useState("")
    const [body, setBody] = useState("")
    const [date, setDate] = useState("")
    const [error, setError] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        const fetchClients = async () => {
            const response = await fetch("http://localhost:4000/api/client/all-clients")
            const json = await response.json()
            if(response.ok){
                setClient(json)
            }else{
                setError("Failed to fetch clients")
            }
        }
        fetchClients()
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const dailyLogObservation = {dailyLogType, body, date,clientId}

        const response = await fetch('http://localhost:4000/api/dailyLogs', {
            method: 'POST',
            body: JSON.stringify(dailyLogObservation),
            headers: {
                'Content-Type': "application/json"
            }
        })

        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setError('')
            setBody('')
            setDate('')
            setDailyLogType('')
            dispatch({type: "CREATE_DAILY_LOG", payload: json})
            console.log("New Observation added")
            // navigate("/")

        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <Link className = "navigation-btn" to="/">View Logs</Link>
            <h3><strong>Create Daily Log</strong></h3>
            <label>Type:</label><br/>
            <select
                value={dailyLogType}
                onChange={(e) => setDailyLogType(e.target.value)}
            >
                <option value="">Select Log Type</option>
                <option value="Daily Log">Daily Log</option>
                <option value="Incident Report">Incident Report</option>
            </select><br/>

            <label>Client:</label>
            <select
                value = {clientId}
                onChange={(e) => setClientId(e.target.value)}
            >
                <option value= ''>Select Client</option>
                {
                    client.map((client) => (
                        <option key = {client._id} value = {client._id}>{client.firstName} {client.lastName}</option>
                    ))
                }
            </select>

            <label>Observation Summary:</label><br/>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
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
            <button className="create-btn">Create Observation</button>
            {error && <div>{error}</div>}

        </form>
    )
}

export default DailyLogForm