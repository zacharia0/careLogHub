import {useState,useEffect} from "react";

const Home = () =>{
    const [dailyLogs,setDailyLogs] = useState('')
    console.log("Entering")

    useEffect(() =>{
        const fetchDailyLogs = async() =>{
            const response = await fetch("/api/dailyLogs")
            const json = await response.json()
            console.log(json)
            if(response.ok){
                setDailyLogs(json)
            }
        }
        fetchDailyLogs()

    },[])
    return(
        <div className="home">

            <div className="workouts">
                {dailyLogs && dailyLogs.map((logs) => (
                    <div key={logs._id} >
                        <h3>{logs.dailyLogType}</h3>
                        <p>{logs.body}</p>
                        <small>{logs.date}</small>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Home