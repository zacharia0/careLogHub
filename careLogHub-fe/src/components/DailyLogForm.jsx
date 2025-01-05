import { useState} from "react";
import {useDailyLogContext} from "../hooks/useDailyLogContext.js";
import {useClientContext} from "../hooks/useClientContext.js";

const DailyLogForm = ({onClose}) => {

    const {dispatch} = useDailyLogContext()
    //Client
    const {clients} = useClientContext()
    //Form
    const [clientId,setClientId] = useState("")

    const [error, setError] = useState('')
    const [dailyLogForm,setDailyLogForm] = useState({
        dailyLogType:"",
        body:"",
        date:"",
        clientFirstName:"",
        clientLastName:""
    })


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

        const missingFields = []
        if(!dailyLogForm.dailyLogType){
            missingFields.push("Daily Log Type")
        }
        if(!dailyLogForm.body){
            missingFields.push("Observation")
        }
        if(!dailyLogForm.date){
            missingFields.push("Date")
        }
        if(!dailyLogForm.clientFirstName){
            missingFields.push("Client")
        }
        // if(!dailyLogForm.clientLastName){
        //     missingFields.push("Client ")
        // }

        if(missingFields.length > 0){
            setError(`Missing the following field(s) ${missingFields.join(", ")}`)
        }


        const response = await fetch('http://localhost:4000/api/dailyLogs', {
            method: 'POST',
            body: JSON.stringify({...dailyLogForm,clientId}),
            headers: {
                'Content-Type': "application/json"
            }
        })

        const json = await response.json();
        if (!response.ok) {
            // setError(json.error)
        } else {
            setError('')
            setDailyLogForm({
                body: "",
                dailyLogType: "",
                date:"",
                clientFirstName: "",
                clientLastName: ""
            })
            setClientId("") //Reset Client selection
            dispatch({type: "CREATE_DAILY_LOG", payload: json.data})
            if(onClose){
                onClose()
            }
            console.log("New Observation added")
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6 overflow-auto max-h-[90vh]"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Create Daily Log</h3>
                <button
                    onClick={onClose}
                    type="button"
                    className="text-gray-500 text-xl hover:text-gray-800"
                    aria-label="Close modal"
                >
                    &times;
                </button>
            </div>

            {/* Log Type */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Type:</label>
                <select
                    value={dailyLogForm.dailyLogType}
                    onChange={(e) => setDailyLogForm({...dailyLogForm, dailyLogType: e.target.value})}
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                >
                    <option value="">Select Log Type</option>
                    <option value="Daily Log">Daily Log</option>
                    <option value="Incident Report">Incident Report</option>
                </select>
            </div>

            {/* Client Selection */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Client:</label>
                <select
                    value={clientId}
                    onChange={handleClientChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                        <option key={client._id} value={client._id}>
                            {client.firstName} {client.lastName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Observation Summary */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Observation Summary:</label>
                <textarea
                    value={dailyLogForm.body}
                    onChange={(e) => setDailyLogForm({...dailyLogForm, body: e.target.value})}
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    rows={4}
                    placeholder="Write your observation here..."
                />
            </div>

            {/* Date */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">Date:</label>
                <input
                    type="date"
                    value={dailyLogForm.date}
                    onChange={(e) => setDailyLogForm({...dailyLogForm, date: e.target.value})}
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-offset-2"
            >
                Create Observation
            </button>

            {/* Error Message */}
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>

    )
}

export default DailyLogForm