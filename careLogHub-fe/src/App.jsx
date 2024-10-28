import {BrowserRouter, Route, Routes} from "react-router-dom";
import DailyLogList from "./pages/DailyLogList.jsx";
import DailyLogForm from "./components/DailyLogForm.jsx";
import ClientForm from "./components/ClientForm.jsx";
import ClientList from "./pages/ClientList.jsx";
import Navbar from "./pages/Navbar.jsx";

const App = () =>{

    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<DailyLogList/>}/>
                <Route path ="/all-daily-logs" element={<DailyLogList/>}></Route>
                <Route path =  "/create-dailyLog" element={<DailyLogForm/>}></Route>
                <Route path = "/create-client" element = {<ClientForm/>} />
                <Route path = "/all-clients" element = {<ClientList/>}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App