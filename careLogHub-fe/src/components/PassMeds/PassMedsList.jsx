const PassMedsList = () =>{

}


export default PassMedsList



























// // PassMedsList.jsx
// import {useState, useEffect, createContext, useContext} from "react";
// import { useParams } from "react-router-dom";
// import { useMedicationContext } from "../../hooks/useMedicationContext.js";
// import { useClientContext } from "../../hooks/useClientContext.js";
// import PassMedsForm from "./PassMedsForm.jsx";
// import {usePassMedsContext} from "../../hooks/usePassMedsContext.js";
//
//
//
// // GIMINI
// const ActiveTimeSlotContext = createContext()
// export const useActiveTimeSlot = () =>  useContext(ActiveTimeSlotContext)
//
//
//
// const PassMedsList = () => {
//     const { medicationByClient, dispatch } = useMedicationContext();
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState("morning");
//     const {dispatch:passMedsDispatch} = usePassMedsContext()
//     const { clientId } = useParams();
//     const { clients } = useClientContext();
//     const [err, setError] = useState("");
//     const [dummy,setDummy] =useState(0)
//
//     useEffect(() => {
//         const determineActiveTab = () => {
//             const currentHour = new Date().getHours();
//             if (currentHour >= 0 && currentHour < 12) return "morning";
//             if (currentHour >= 12 && currentHour < 16) return "afternoon";
//             if (currentHour >= 16 && currentHour < 20) return "evening";
//             return "bedtime";
//         };
//         setActiveTab(determineActiveTab());
//
//         const fetchMedicationByClientId = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(`http://localhost:4000/api/med/${clientId}`);
//                 const json = await response.json();
//                 if (response.ok) {
//                     dispatch({ type: "SET_MEDICATION_BY_CLIENT_ID", payload: json });
//                     setError("");
//                 } else {
//                     setError(json.error);
//                 }
//             } catch (error) {
//                 console.log("An error occurred:", error);
//                 setError("Failed to fetch medication. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchMedicationByClientId();
//     }, [dispatch, clientId]);
//
//     const handleMedicationSubmit = (updatedPassMeds) => {
//         passMedsDispatch({ type: "CREATE_PASS_MEDS", payload: updatedPassMeds });
//         setDummy(prevState => prevState + 1);  // Ensure it increments
//     };
//
//     if (loading) {
//         return <p>Loading Medications...</p>;
//     }
//
//     const findClient = clients.find((client) => client._id === clientId);
//     const filteredMeds = medicationByClient
//         .filter((med) => med.timeSlot.includes(activeTab));
//
//     const firstName = findClient?.firstName;
//     const lastName = findClient?.lastName;
//
//     return (
//         <ActiveTimeSlotContext.Provider value = {{activeTimeSlot:activeTab}}>
//
//             <div>
//                 <h1>Pass Meds</h1>
//                 <div className="ml-2 md:flex">
//                     <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 text-center">
//                         {["morning", "afternoon", "evening", "bedtime"].map((timeslot) => (
//                             <li key={timeslot}>
//                                 <button
//                                     type="button"
//                                     onClick={() => setActiveTab(timeslot)}
//                                     className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
//                                         activeTab === timeslot
//                                             ? "text-white bg-blue-700 dark:bg-blue-600 font-bold"
//                                             : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-300 font-normal"
//                                     }`}
//                                 >
//                                     {timeslot.charAt(0).toUpperCase() + timeslot.slice(1)}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//
//                     <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-700 rounded-lg w-full">
//                         <div>
//                             <label className="font-medium">Medication For: </label>
//                             <div className="inline-flex ml-3 font-bold text-white">{`${firstName} ${lastName}`}</div>
//                         </div>
//
//                         <PassMedsForm
//                             filteredMeds={filteredMeds}
//                             clientInfo={clientId}
//                             onMedicationSubmit={handleMedicationSubmit}
//                         />
//
//                     </div>
//                 </div>
//             </div>
//         </ActiveTimeSlotContext.Provider>
//     );
// };
//
// export default PassMedsList;





//
// import { useState, useEffect, createContext, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { useMedicationContext } from "../../hooks/useMedicationContext.js";
// import { useClientContext } from "../../hooks/useClientContext.js";
// import { usePassMedsContext } from "../../hooks/usePassMedsContext.js";
// import PassMedsForm from "./PassMedsForm.jsx";
//
// const ActiveTimeSlotContext = createContext();
// export const useActiveTimeSlot = () => useContext(ActiveTimeSlotContext);
//
// const PassMedsList = () => {
//     const { medicationByClient, dispatch: medicationDispatch } = useMedicationContext();
//     const {passMeds,dispatch:passMedsDispatch} = usePassMedsContext()
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState("morning");
//     const { clientId } = useParams();
//     const { clients } = useClientContext();
//     const [err, setError] = useState("");
//
//     const [dummy,setDummy] =useState(0)
//
//
//     useEffect(() => {
//         const determineActiveTab = () => {
//             const currentHour = new Date().getHours();
//             if (currentHour >= 0 && currentHour < 12) return "morning";
//             if (currentHour >= 12 && currentHour < 16) return "afternoon";
//             if (currentHour >= 16 && currentHour < 20) return "evening";
//             return "bedtime";
//         };
//         setActiveTab(determineActiveTab());
//
//         const fetchMedicationByClientId = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch(
//                     `http://localhost:4000/api/med/${clientId}`
//                 );
//                 const json = await response.json();
//                 if (response.ok) {
//                     medicationDispatch({
//                         type: "SET_MEDICATION_BY_CLIENT_ID",
//                         payload: json,
//                     });
//                     setError("");
//                 } else {
//                     setError(json.error);
//                 }
//             } catch (error) {
//                 console.log("An error occurred:", error);
//                 setError("Failed to fetch medication. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchMedicationByClientId();
//     }, [medicationDispatch, clientId]);
//
//     // const handleMedicationSubmit = (updatedPassMeds) => {
//     //     // passMedsDispatch({type:"CREATE_PASS_MEDS",payload:updatedPassMeds})
//     //     passMedsDispatch({ type: "CREATE_PASS_MEDS", payload: updatedPassMeds });
//     //     setDummy(prevState => + 1 )
//     //
//     // };
//     const handleMedicationSubmit = (updatedPassMeds) => {
//         passMedsDispatch({ type: "CREATE_PASS_MEDS", payload: updatedPassMeds });
//         setDummy(prevState => prevState + 1);  // Ensure it increments
//     };
//
//     if (loading) {
//         return <p>Loading Medications...</p>;
//     }
//
//     const findClient = clients.find((client) => client._id === clientId);
//     const filteredMeds = medicationByClient.filter((med) =>
//         med.timeSlot.includes(activeTab)
//     );
//
//     const firstName = findClient?.firstName;
//     const lastName = findClient?.lastName;
//
//     return (
//         <ActiveTimeSlotContext.Provider value={{ activeTimeSlot: activeTab }}>
//             <div>
//                 <h1>Pass Meds</h1>
//                 <div className="ml-2 md:flex">
//                     <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 text-center">
//                         {["morning", "afternoon", "evening", "bedtime"].map((timeslot) => (
//                             <li key={timeslot}>
//                                 <button
//                                     type="button"
//                                     onClick={() => setActiveTab(timeslot)}
//                                     className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
//                                         activeTab === timeslot
//                                             ? "text-white bg-blue-700 dark:bg-blue-600 font-bold"
//                                             : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-300 font-normal"
//                                     }`}
//                                 >
//                                     {timeslot.charAt(0).toUpperCase() + timeslot.slice(1)}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//
//                     <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-700 rounded-lg w-full">
//                         <div>
//                             <label className="font-medium">Medication For: </label>
//                             <div className="inline-flex ml-3 font-bold text-white">{`${firstName} ${lastName}`}</div>
//                         </div>
//
//                         <PassMedsForm
//                             filteredMeds={filteredMeds}
//                             clientInfo={clientId}
//                             onMedicationSubmit={handleMedicationSubmit}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </ActiveTimeSlotContext.Provider>
//     );
// };
//
// export default PassMedsList;







//
// Additional Considerations:
//
//     Time Slot Boundaries: You might need to add more robust logic to determine when a new time slot begins. Currently, it relies solely on the hour of the day. Consider adding logic to check the date as well, so that the "morning" time slot doesn't reset immediately after midnight, but rather at a specific time in the morning when you expect the new day's medications to be administered.
//
//     Error Handling: If the refetch of medicationByClient fails, you should display an appropriate error message to the user.
//
//     Optimistic Updates: If you want a faster UI response, consider implementing optimistic updates to the medicationByClient state in your context.