// import {useState} from "react";
// import { GiCheckMark } from "react-icons/gi";
// import { FaLungsVirus } from "react-icons/fa";
// import { AiOutlineQuestionCircle } from "react-icons/ai";
// import { FcCancel } from "react-icons/fc";
//
// const PassMedsDetail = ({passMed,medicationId}) =>{
//
//     const [passMeds,setPassMeds] = useState({
//         pass:passMed?.pass,
//         refused:passMed?.refused,
//         adverseReaction:passMed?.adverseReaction,
//         otherReason:passMed?.otherReason
//     })
//
//
//     const handleButtonClick = (field) =>{
//         setPassMeds((prevState) =>({
//             ...prevState,
//             [field]:!prevState[field]
//         }))
//     }
//     const handleForm = async() =>{
//         const submitPassMeds = await fetch("http://localhost:4000/api/pass-meds",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body:JSON.stringify({...passMeds,medicationId})
//         })
//     }
//
//     return(
//         <div>
//             <p>Hellow from Pass med details</p>
//             <form onSubmit={handleForm}>
//
//                 <label>Medication Name: </label>
//                 {/*{passMed.medication?.medName}*/}
//
//
//                 <button
//                     type = "button"
//                     className="bg-gray-300 hover:bg-gray-600 rounded py-1 px-2 border-solid"
//                     onClick={() => handleButtonClick("pass")}
//                 >
//                     {passMed.pass? "Pass": <GiCheckMark/>}
//                 </button>
//
//
//                 <button
//                     className="bg-gray-300 hover:bg-gray-600 rounded py-1 px-2 border-solid"
//                     type = "button"
//                     onClick={() => handleButtonClick("refused")}
//                 >
//                     {passMed.refused? "Refuse": <FcCancel/>}
//                 </button>
//
//
//
//                 <button
//                     className="bg-gray-300 hover:bg-gray-600 rounded py-1 px-2 border-solid"
//                     type ="button"
//                     onClick={() => handleButtonClick("adverseReaction")}
//                 >
//                     {passMed.adverseReaction? "Adverse Reaction": <FaLungsVirus/>}
//                 </button>
//
//
//                 <button
//                     className="bg-gray-300 hover:bg-gray-600 rounded py-1 px-2 border-solid"
//                     type = "button"
//                     onClick={() => handleButtonClick("other")}
//                 >
//                     {passMed.otherReason? "Other": <AiOutlineQuestionCircle/>}
//                 </button>
//
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white py-1 px-4 rounded"
//                 >
//                     Submit
//                 </button>
//
//             </form>
//
//
//
//
//         </div>
//     )
//
// }
//
// export default PassMedsDetail


























