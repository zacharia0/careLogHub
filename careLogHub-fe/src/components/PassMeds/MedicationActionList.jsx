// import MedicationButtonActions from "./MedicationButtonActions.jsx";
//
// const MedicationActionList = ({medications,handleActionClick,handleSubmitForm,err}) =>(
//     <form onSubmit={handleSubmitForm}>
//         {
//             medications && medications.length > 0  ? (
//                 medications.map((med) => (
//                     <MedicationButtonActions
//                         key = {med._id}
//                         filteredMeds={med}
//                         actions={["Pass","Refuse","Adverse Reaction", "Other"]}
//                     />
//                 ))
//
//             ):(
//                 <div>{err || "No medications to pass for this client"}</div>
//             )
//         }
//
//         {medications && medications.length > 0 &&(
//
//             <button
//                 type={"submit"}
//                 className={"bg-green-500 hover:bg-green-700 rounded px-5 py-3 text-white"}
//             >Administer</button>
//         )}
//
//     </form>
// )
//
// export default MedicationActionList