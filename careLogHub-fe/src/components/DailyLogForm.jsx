import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";
import {useClientContext} from "../hooks/useClientContext.js";

const DailyLogForm = () => {

    const {dispatch} = useDailyLogContext()
    //Client
    const {clients} = useClientContext()
    //Form
    const [clientId,setClientId] = useState("")

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const [dailyLogForm,setDailyLogForm] = useState({
        dailyLogType:"",
        body:"",
        date:"",
        clientFirstName:"",
        clientLastName:""
    })


    // useEffect(() => {
    //     const fetchClients = async () => {
    //         const response = await fetch("http://localhost:4000/api/client/all-clients")
    //         const json = await response.json()
    //         if(response.ok){
    //             setClient(json)
    //         }else{
    //             setError("Failed to fetch clients")
    //         }
    //     }
    //     fetchClients()
    // },[])



    const handleClientChange = (e) =>{
        const selectedId = e.target.value;
        setClientId(selectedId)

        const selectedClient = clients.find((client) => client._id === selectedId)
        if(selectedClient){
            setDailyLogForm({
                ...dailyLogForm,
                clientFirstName: selectedClient.firstName,
                clientLastName:selectedClient.lastName
            })
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault()
        // const dailyLogForm = {dailyLogType, body, date,clientId}

        const response = await fetch('http://localhost:4000/api/dailyLogs', {
            method: 'POST',
            body: JSON.stringify({...dailyLogForm,clientId}),
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
            // setBody('')
            // setDate('')
            // setDailyLogType('')
            setDailyLogForm({
                body: "",
                dailyLogType: "",
                clientFirstName: "",
                clientLastName: ""
            })
            dispatch({type: "CREATE_DAILY_LOG", payload: json.data})
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
                value={dailyLogForm.dailyLogType}
                onChange={(e) => setDailyLogForm({...dailyLogForm,dailyLogType:e.target.value})}
            >
                <option value="">Select Log Type</option>
                <option value="Daily Log">Daily Log</option>
                <option value="Incident Report">Incident Report</option>
            </select><br/>

            <label>Client:</label>
            <select
                value = {clientId}
                onChange={handleClientChange}
            >
                <option value= ''>Select Client</option>
                {
                    clients.map((client) => (
                        <option key = {client._id} value = {client._id}>{client.firstName} {client.lastName}</option>
                    ))
                }
            </select>

            <label>Observation Summary:</label><br/>
            <textarea
                value={dailyLogForm.body}
                onChange={(e) => setDailyLogForm({...dailyLogForm,body:e.target.value})}
            /><br/>

            <label>Date:</label><br/>
            <input
                type="date"
                value={dailyLogForm.date}
                onChange={(e) => {
                    setDailyLogForm({...dailyLogForm,date:e.target.value});
                    e.target.blur()
                }}
            /><br/>
            <button className="create-btn">Create Observation</button>
            {error && <div>{error}</div>}

        </form>
    )
}

export default DailyLogForm