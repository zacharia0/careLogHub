import {BrowserRouter, Route, Routes} from "react-router-dom";
import DailyLogList from "./pages/DailyLogList.jsx";
import DailyLogForm from "./components/DailyLogForm.jsx";
import ClientForm from "./components/ClientForm.jsx";
import ClientList from "./pages/ClientList.jsx";
import Navbar from "./pages/Navbar.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";

const App = () =>{

    return (
        <BrowserRouter>
            <Navbar/>
            <div className = "py-2">
                <Routes >
                    <Route path="/" element={<DailyLogList/>}/>
                    <Route path ="/all-daily-logs" element={<DailyLogList/>}></Route>
                    <Route path =  "/create-dailyLog" element={<DailyLogForm/>}></Route>
                    <Route path = "/create-client" element = {<ClientForm/>} />
                    <Route path = "/create-employee" element = {<EmployeeForm/> }/>
                    <Route path = "/all-clients" element = {<ClientList/>}/>
                </Routes>

            </div>
        </BrowserRouter>
    )

}

export default App