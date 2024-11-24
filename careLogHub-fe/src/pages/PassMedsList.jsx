import {usePassMedsContext} from "../hooks/usePassMedsContext.js";
import {useEffect} from "react";

const PassMedsList = () => {

    const {passMeds,dispatch} = usePassMedsContext()

    useEffect(() =>{

        const fetchPassMeds = async () =>{
            const response = await fetch("http://localhost:4000/api/pass-meds")
            const json = await response.json()
            if(response.ok){
                dispatch({type:"SET_PASS_MEDS",payload:json})
            }else{
                console.log("Failed to fetch passed meds.")
            }

        }
        fetchPassMeds()

    },[dispatch])

    return(
        <div>
            {/*{passMeds && passMeds.map((passMed) =>(*/}

            {/*))}*/}
        </div>
    )

}

export default PassMedsList