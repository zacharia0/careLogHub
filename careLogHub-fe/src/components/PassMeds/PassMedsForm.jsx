import {usePassMedsContext} from "../../hooks/usePassMedsContext.js";
import {useEffect, useState} from "react";

const PassMedsForm = ({filteredMeds, setActiveTab, clientInfo}) => {

    const statusMapping = {
        refuse: "Refuse",
        pass: "Pass",
        adverseReaction: "Adverse Reaction",
        otherReason: "Other"

    }

    const {dispatch} = usePassMedsContext()
    const [err, setErr] = useState("")
    const [administerMed, setAdministerMed] = useState({
        dosageGiven: "",
        medicationId: "",
        status: "",
        comment: "",
        clientId: ""
    })


    useEffect(() => {
        if(filteredMeds && filteredMeds.length > 0){
           setAdministerMed((prev) =>({
               ...prev,
               medicationId: filteredMeds[0]._id ,
               clientId: clientInfo,
               dosageGiven: filteredMeds[0].medDosage
           }))
        }
    }, [filteredMeds,clientInfo]);

    const handFormSubmit = async(e) => {
        e.preventDefault()
        const missingField = []
        if (!administerMed.dosageGiven) {
            missingField.push("Dosage ")
        }
        if (!administerMed.medication) {
            missingField.push("medication ")
        }
        if (!administerMed.status) {
            missingField.push("status ")
        }
        if (administerMed.status === "other" && !administerMed.comment) {
            missingField.push('Comment required for selecting "Other" ')
        }
        if (!administerMed.client) {
            missingField.push("client ")
        }
        if (missingField > 0) {
            setErr(`The following fields are required: ${missingField.join(" ")}`)
            return
        }

        console.log(clientInfo)
        if (filteredMeds) {

            console.log(filteredMeds)
            console.log(filteredMeds[0]._id)
        }


            const response = await fetch("http://localhost:4000/api/pass-meds", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(administerMed)
            })
            const json = await response.json()
            if (response.ok) {
                dispatch({type: "CREATE_PASS_MEDS", payload: json.data})
            } else {
                setErr(json.error)

            }



    }
    console.log(Object.entries(statusMapping).map(([statusKey, statusVal]) => statusVal))

    // const firstName = filteredMeds[0].clientFirstName
    // const lastName = filteredMeds[0].clientLastName


    return (
        <form onSubmit={handFormSubmit}>
            <div>

                {
                    filteredMeds && filteredMeds.length > 0 ? filteredMeds.map((med) => (
                        <div key={med._id}>
                            <label>Medication Name: </label>
                            <div className={"inline-flex ml-2 font-bold text-white text-2xl"}>
                                {med.medName}
                            </div>
                                <div className={"inline-flex  ml-1  "}>
                                    {med.medDosage}{med.dosageUnit}
                                </div>


                            <div>

                                {
                                    Object.entries(statusMapping).map(([statusKey, statusValue]) => (
                                        <div key={statusKey} className={"inline-flex"}>

                                            <button
                                                value={administerMed.status}
                                                onClick={(e) => setAdministerMed({...administerMed, status: statusKey})}
                                                type={"button"}
                                                key={statusKey}
                                                className={"inline-flex py-1 px-2 ml-1 border border-green-500 rounded bg-gray-200 hover:bg-blue-400 hover:text-white hover:border-blue-400 mt-2"}
                                                // onClick={() => setActiveTab()}
                                            >
                                                {statusValue}

                                            </button>


                                        </div>
                                    ))


                                }

                                <div className={"block mt-2"}>
                                    <label>Comment:</label>
                                    <input
                                        value={administerMed.comment}
                                        onChange={(e) => setAdministerMed({...administerMed, comment: e.target.value})}
                                        type="text"
                                        className={"input-form"}
                                    />
                                </div>

                            </div>


                        </div>
                    )) : (
                        <div>
                            {err || "No medications to pass at this time."}
                        </div>
                    )
                }

                {


                }

            </div>


            <div>

                <button type={"submit"}
                        className={" bg-green-600 hover:bg-green-700 font-medium rounded-2xl px-6 py-4 text-black mt-2 hover:border-green-100 hover:border-2"}>Administer
                </button>

            </div>

        </form>
    )
}

export default PassMedsForm