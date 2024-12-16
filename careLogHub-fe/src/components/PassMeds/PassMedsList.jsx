import {useMedicationContext} from "../../hooks/useMedicationContext.js";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useClientContext} from "../../hooks/useClientContext.js";
import TimeSlot from "./TimeSlot.jsx";
import {TIME_SLOTS,filterMedicationByTimeSlot,getCurrentTimeSlot} from "../../utils/timeSlotUtils.js";
import Tab from "./Tabs.jsx";

const PassMedsList = () =>{
    const {clients} = useClientContext()
    const {clientId} = useParams()
    const [loading,setLoading] = useState(false)
    const [isManualOverride, setIsManualOverride] = useState(false) // Track manual tab selection

    const {medicationByClientId,fetchMedicationByClientId} = useMedicationContext()
    const [activeTab,setActiveTab] = useState(getCurrentTimeSlot)

    useEffect(() =>{
        const interval = setInterval(() =>{
            if(!isManualOverride){
                setActiveTab(getCurrentTimeSlot)  // automatically update active tab based on current time

            }
        },60000) //update every minute

        return () => clearInterval(interval)
    },[isManualOverride])


    const handleTabClick = (tab) =>{
        setActiveTab(tab);
        setIsManualOverride(true)
    }


    useEffect(() => {
        if(clientId){
            setLoading(true)
            fetchMedicationByClientId(clientId).finally(() => setLoading(false))
            console.log(medicationByClientId)
        }

    }, [clientId]); // Fetch all medications only on mount
    const medications = medicationByClientId[clientId] || []

    const client = clients.find((client) => client._id === clientId)
    console.log(client)
    const firstName = client ? client.firstName : "Unknown"
    const lastName = client ? client.lastName : "Unknown"

    console.log(medications)

    if(loading){
        return <p>Loading Medication</p>
    }

    return(
        <div >

            {/*Tab navigation*/}
            <div >
                {Object.entries(TIME_SLOTS).map(([key, {label}]) =>  (

                    <div key = {key} className={"inline-flex "} >


                        <Tab

                            key={key}
                            label={label}
                            active={activeTab === key}
                            onClick={() => handleTabClick(key)}

                        />
                    </div>
            )) }
            </div>

            {<div className={"inline-flex mt-3"}>
                <label className={"font-light"}>Administrating Medication for:</label>
                <div className={"font-bold ml-1"}>
                    { firstName && `${firstName} ${lastName}`}

                </div>
            </div>}



            {/*    Medication for Active tab*/}
            <div>
                {
                    TIME_SLOTS[activeTab] ? (

                        <TimeSlot
                            label={ TIME_SLOTS[activeTab].label}
                            medications={filterMedicationByTimeSlot(medications, activeTab)}
                        />
                        ): (<p>No valid time slot selected.</p>)

            }
            </div>
        </div>
    )
}


export default PassMedsList






//
// Additional Considerations:
//
//     Time Slot Boundaries: You might need to add more robust logic to determine when a new time slot begins. Currently, it relies solely on the hour of the day. Consider adding logic to check the date as well, so that the "morning" time slot doesn't reset immediately after midnight, but rather at a specific time in the morning when you expect the new day's medications to be administered.
//
//     Error Handling: If the refetch of medicationByClient fails, you should display an appropriate error message to the user.
//
//     Optimistic Updates: If you want a faster UI response, consider implementing optimistic updates to the medicationByClient state in your context.