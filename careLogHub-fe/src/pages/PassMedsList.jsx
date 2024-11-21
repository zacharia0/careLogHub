// import {usePassMedsContext} from "../hooks/usePassMedsContext.js";
// import {useEffect} from "react";
// import PassMedsDetail from "../components/PassMedsDetail.jsx";
//
// const PassMedsList = () =>{
//     const {passMeds,dispatch} = usePassMedsContext()
//
//     useEffect(() =>{
//         const fetchPassMeds = async() =>{
//             const response = await fetch("http://localhost:4000/api/pass-meds/all-pass-meds",{
//                 method:"GET"
//             })
//             const json = await response.json()
//
//             if(!response.ok){
//                 console.log("Cannot fetch pass Meds")
//             }
//             if(response)
//
//             dispatch({type:"SET_PASS_MEDS",payload:json})
//
//         }
//
//         fetchPassMeds()
//
//
//     },[dispatch])
//
//         console.log(passMeds)
//     return(
//
//         <div>
//             <p>Hello from passmeds list</p>
//             {
//
//                passMeds && passMeds.map((passMed) =>(
//                 <PassMedsDetail key = {passMed._id} passMed={passMed} medicationId ={passMed.medicationId}/>
//
//                ))
//             }
//         </div>
//
//
//     )
//
// }
//
// export default PassMedsList

























