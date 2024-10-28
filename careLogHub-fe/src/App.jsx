import {BrowserRouter, Route, Routes} from "react-router-dom";
import DailyLogList from "./pages/DailyLogList.jsx";
import LogForm from "./components/LogForm.jsx";
import ClientForm from "./components/ClientForm.jsx";
import ClientList from "./pages/ClientList.jsx";

const App = () =>{

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DailyLogList/>}/>
                <Route path ="/all-daily-logs" element={<DailyLogList/>}></Route>
                <Route path =  "/create-dailyLog" element={<LogForm/>}></Route>
                <Route path = "/create-client" element = {<ClientForm/>} />
                <Route path = "/all-clients" element = {<ClientList/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App