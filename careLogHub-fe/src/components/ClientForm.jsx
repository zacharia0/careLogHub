import {useState} from "react";
import {useClientContext} from "../hooks/useClientContext.js";
import {Link} from "react-router-dom";

const ClientForm = ({onClose}) => {
    const {dispatch} = useClientContext()

    const [error, setError] = useState("")
    const [clientData, setClientData] = useState({
        firstName: "",
        lastName: "",
        middleName:"",
        dateOfBirth: "",
        diagnoses: "",
        moveInDate: "",
        roomNumber:"",
        foodAllergy:"",
        medicalAllergy:"",
        emergencyContact:"",
        primaryMedicalContact:"",
        guardian:""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Adding new client")
        setError("")
        let formError = []
        if (!clientData.firstName) {
            formError.push("First Name")
        }
        if (!clientData.lastName) {
            formError.push("Last Name")
        }
        if (!clientData.dateOfBirth) {
            formError.push("Date of birth")
        }
        if (!clientData.moveInDate) {
            formError.push("Move in date")
        }
        if (!clientData.diagnoses) {
            formError.push("diagnoses")
        }
        if (formError.length > 0) {
            setError(`The following fields are required ${formError.join(", ")}`)
        }


        const response = await fetch("http://localhost:4000/api/client", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(clientData)
        })

        const json = await response.json()
        if (response.ok) {
            setError("")
            console.log("New Client Created.")
            dispatch({type: "CREATE_CLIENT", payload: json.data})
            onClose(false)
            setClientData(
                {
                    firstName: "",
                    middleName:"",
                    lastName: "",
                    moveInDate: "",
                    diagnoses: "",
                    dateOfBirth: "",
                    roomNumber:"",
                    foodAllergy:"",
                    medicalAllergy:"",
                    emergencyContact:"",
                    primaryMedicalContact:"",
                    guardian:""
                }
            )

        }
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6 overflow-auto max-h-[90vh]"
        >
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold text-gray-800">New Client</h1>
                <button
                    onClick={onClose}
                    className="text-gray-500 text-xl hover:text-gray-800"
                    aria-label="Close modal"
                    type="button"

                >
                    &times;
                </button>

            </div>


            <div>
                <label className="block text-gray-700 font-medium mb-1">First Name:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={clientData.firstName}
                    onChange={(e) => setClientData({...clientData, firstName: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Middle Name:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={clientData.middleName}
                    onChange={(e) => setClientData({...clientData, middleName: e.target.value})}
                />
            </div>

            <div>

                <label className="block text-gray-700 font-medium mb-1">Last Name:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={clientData.lastName}
                    onChange={(e) => setClientData({...clientData, lastName: e.target.value})}
                />
            </div>

            <div>

                <label className="block text-gray-700 font-medium mb-1">Date Of Birth</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="date"
                    value={clientData.dateOfBirth}
                    onChange={(e) => setClientData({...clientData, dateOfBirth: e.target.value})}
                />

            </div>

            <div>

                <label className="block text-gray-700 font-medium mb-1">Move-In Date</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="date"
                    value={clientData.moveInDate}
                    onChange={(e) => setClientData({...clientData, moveInDate: e.target.value})}
                />

            </div>

            <div>
                <label>Diagnoses</label>
                <textarea
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"

                    value={clientData.diagnoses}
                    onChange={(e) => setClientData({...clientData, diagnoses: e.target.value})}
                >
                </textarea>
            </div>


            <div>
                <label className="block text-gray-700 font-medium mb-1">Room Number:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={clientData.roomNumber}
                    onChange={(e) => setClientData({...clientData, roomNumber: e.target.value})}
                />
            </div>


            <div>
                <label className="block text-gray-700 font-medium mb-1">Food Allergy:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={clientData.foodAllergy}
                    onChange={(e) => setClientData({...clientData, foodAllergy: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Medical Allergy:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={clientData.medicalAllergy}
                    onChange={(e) => setClientData({...clientData, medicalAllergy: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Emergency Contact:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={clientData.emergencyContact}
                    onChange={(e) => setClientData({...clientData, emergencyContact: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-gray-700 font-medium mb-1">Primary Medical Contact:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={clientData.primaryMedicalContact}
                    onChange={(e) => setClientData({...clientData, primaryMedicalContact: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-1">Guardian:</label>
                <input
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 px-3 py-2"
                    type="text"
                    value={clientData.guardian}
                    onChange={(e) => setClientData({...clientData, guardian: e.target.value})}
                />
            </div>


            <button
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 focus:ring-offset-2"
                type="submit">Add Client
            </button>
            <div>
                {error && <div>{error}</div>}
            </div>
        </form>
    )
}

export default ClientForm