import {useMedicationContext} from "../../hooks/useMedicationContext.js";

const PassMedsForm = () =>{

    const {medications} = useMedicationContext()
    const

}

export default PassMedsForm



































// import { useState, useEffect } from "react";
// import { usePassMedsContext } from "../../hooks/usePassMedsContext.js";
// import { useActiveTimeSlot } from "./PassMedsList.jsx"; // Make sure the path is correct
//
// const PassMedsForm = ({ filteredMeds = [], clientInfo, onMedicationSubmit }) => {
//     const { activeTimeSlot } = useActiveTimeSlot();
//     const { passMeds, dispatch: passMedsDispatch } = usePassMedsContext();
//     const [err, setErr] = useState("");
//     const [medicationsState, setMedicationsState] = useState([]);
//
//
//     console.log(passMeds)
//     useEffect(() => {
//
//         setErr("");
//         setMedicationsState((prevMedicationsState) =>
//             filteredMeds.map((med) => {
//                 const administeredMed = passMeds.find(
//                     (passMed) =>
//                         passMed?.medication &&
//                         passMed.medication._id === med._id &&
//                         passMed.timeSlot === activeTimeSlot
//                 );
//                 const prevMedState = prevMedicationsState.find(
//
//                     (m) => m.medicationId === med._id
//                 );
//                 const wasAdministered = prevMedState?.administered;
//                 const prevStatus = prevMedState?.status;
//
//                 if (
//                     wasAdministered !== !!administeredMed ||
//                     prevStatus !== (administeredMed ? administeredMed.status : "")
//                 ) {
//                     return {
//                         medicationId: med._id,
//                         dosageGiven: med.medDosage,
//                         status: administeredMed ? administeredMed.status : "",
//                         comment: administeredMed ? administeredMed.comment : "",
//                         clientId: clientInfo,
//                         administered: !!administeredMed,
//                     };
//                 } else {
//                     return prevMedState;
//                 }
//             })
//         );
//     }, [filteredMeds, clientInfo, passMeds, activeTimeSlot]);
//
//     const handleDosageUnitChange = (medicationId, medDosage) => {
//         setMedicationsState((prevState) =>
//             prevState.map((med) =>
//                 med._id === medicationId ? { ...med, medDosage } : med
//             )
//         );
//     };
//
//     const handleStatusChange = (medicationId, status) => {
//         setErr("");
//         setMedicationsState((prevState) =>
//             prevState.map((med) =>
//                 med.medicationId === medicationId
//                     ? {
//                         ...med,
//                         status: med.status === status ? "" : status,
//                         comment: status === "otherReason" ? "" : med.comment,
//                     }
//                     : med
//             )
//         );
//     };
//
//     const handleCommentChange = (medicationId, comment) => {
//         setMedicationsState((prevState) =>
//             prevState.map((med) =>
//                 med.medicationId === medicationId ? { ...med, comment } : med
//             )
//         );
//     };
//
//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//
//         const medicationsToSubmit = medicationsState
//             .filter((med) => med.status)
//             .map((med) => ({
//                 ...med,
//                 administeredTimeAndDate: new Date().toISOString(),
//                 timeSlot: activeTimeSlot,
//             }));
//
//         if (medicationsToSubmit.length === 0) {
//             setErr("Please select a status for at least one medication.");
//             return;
//         }
//
//         try {
//             const response = await fetch("http://localhost:4000/api/pass-meds", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ medications: medicationsToSubmit }),
//             });
//
//             const json = await response.json();
//
//             if (response.ok) {
//
//
//                 const updatedPassMeds = Array.isArray(json.data)
//                     ? [...passMeds, ...json.data]
//                     : [...passMeds, json.data];
//
//                 passMedsDispatch({
//                     type: "CREATE_PASS_MEDS",
//                     payload: json.data,
//                 });
//
//                 if (onMedicationSubmit) {
//                     onMedicationSubmit(updatedPassMeds);
//                 }
//
//                 setMedicationsState((prevState) => {
//                     const updatedState = prevState.map((med) => {
//                         const wasSubmitted = medicationsToSubmit.some(
//                             (submittedMed) =>
//                                 submittedMed.medicationId === med.medicationId &&
//                                 submittedMed.timeSlot === activeTimeSlot
//                         );
//
//                         if (wasSubmitted) {
//                             const submittedMed = medicationsToSubmit.find(
//                                 (submittedMed) =>
//                                     submittedMed.medicationId === med.medicationId &&
//                                     submittedMed.timeSlot === activeTimeSlot
//                             );
//                             return {
//                                 ...med,
//                                 administered: true,
//                                 status: submittedMed.status,
//                                 comment: submittedMed.comment
//                             };
//                         }
//                         return med;
//                     });
//                     return updatedState; // Return the new state to update state
//                 });
//
//                 setErr("");
//             } else {
//                 setErr(json.error || "Failed to administer medications");
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             setErr("An error occurred. Please try again.");
//         }
//     };
//
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const options = {
//             year: "numeric",
//             month: "2-digit",
//             day: "2-digit",
//             hour: "numeric",
//             minute: "2-digit",
//             hour12: true,
//         };
//         return date.toLocaleString("en-US", options);
//     };
//
//     return (
//         <form onSubmit={handleFormSubmit} className="space-y-4">
//             {filteredMeds.map((med) => {
//                 const currentMedState = medicationsState.find(
//                     (m) => m.medicationId === med._id
//                 );
//                 const isMedicationAdministered = currentMedState?.administered;
//
//                 return (
//                     <div
//                         key={med._id}
//                         className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
//                     >
//                         <div className="flex items-center justify-between mb-3">
//                             <div>
//                                 <span className="font-bold text-xl">{med.medName}</span>
//                                 <div className=" inline-flex ml-2 text-gray-600">
//                                     <input
//                                         className={"border-2 px-0 w-10"}
//                                         value={med.medDosage || ""}
//                                         onChange={(e) =>
//                                             handleDosageUnitChange(med._id, e.target.value)
//                                         }
//                                         type="text"
//                                     />
//                                     {med.dosageUnit}
//                                 </div>
//                             </div>
//                         </div>
//
//                         {isMedicationAdministered ? (
//                             <div className="flex items-center justify-center">
//                                 {currentMedState.status && (
//                                     <p className="text-lg font-semibold">
//                                         Status:{" "}
//                                         <span
//                                             className={
//                                                 currentMedState.status === "pass"
//                                                     ? "text-green-600"
//                                                     : currentMedState.status === "refuse"
//                                                         ? "text-red-600"
//                                                         : currentMedState.status === "adverseReaction"
//                                                             ? "text-yellow-600"
//                                                             : "text-blue-600"
//                                             }
//                                         >
//                       {currentMedState.status.toUpperCase()}
//                     </span>
//                                     </p>
//                                 )}
//                                 <p className="ml-4 text-lg">
//                                     Administered on:{" "}
//                                     <span className="font-semibold">
//                     {formatDate(
//                         passMeds.find(
//                             (passMed) =>
//                                 passMed?.medication &&
//                                 passMed.medication._id === med._id &&
//                                 passMed.timeSlot === activeTimeSlot
//                         )?.administeredTimeAndDate
//                     )}
//                   </span>
//                                 </p>
//                             </div>
//                         ) : (
//                             <div className="flex space-x-2 mb-3">
//                                 {Object.entries({
//                                     refuse: "Refuse",
//                                     pass: "Pass",
//                                     adverseReaction: "Adverse Reaction",
//                                     otherReason: "Other",
//                                 }).map(([statusKey, statusValue]) => (
//                                     <button
//                                         key={statusKey}
//                                         type="button"
//                                         onClick={() => handleStatusChange(med._id, statusKey)}
//                                         className={`flex-1 py-2 px-3 rounded-md transition-colors ${
//                                             currentMedState?.status === statusKey
//                                                 ? "bg-blue-500 text-white"
//                                                 : "bg-gray-200 hover:bg-blue-100"
//                                         }`}
//                                     >
//                                         {statusValue}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//
//                         {currentMedState?.status === "otherReason" && (
//                             <div className="mt-2">
//                                 <input
//                                     type="text"
//                                     placeholder="Please specify reason..."
//                                     value={currentMedState.comment || ""}
//                                     onChange={(e) => handleCommentChange(med._id, e.target.value)}
//                                     className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
//                                     required
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 );
//             })}
//
//             {err && (
//                 <div
//                     className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//                     role="alert"
//                 >
//                     {err}
//                 </div>
//             )}
//
//             <button
//                 type="submit"
//                 className="w-full py-3 rounded-lg text-white font-bold bg-green-600 hover:bg-green-700"
//             >
//                 Administer Selected Medications
//             </button>
//         </form>
//     );
// };
//
// export default PassMedsForm;
//
//
