import {BrowserRouter, Route, Routes} from "react-router-dom";
import DailyLogList from "./pages/DailyLogList.jsx";
import DailyLogForm from "./components/DailyLogForm.jsx";
import ClientForm from "./components/ClientForm.jsx";
import ClientList from "./pages/ClientList.jsx";
import Navbar from "./pages/Navbar.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import MedicationForm from "./components/MedicationForm.jsx";
import MedicationList from "./pages/MedicationList.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const App = () =>{

    return (
        <BrowserRouter>
            <Navbar/>
            <div className = "py-2">
                <Routes >
                    <Route path = "/dashboard" element={<Dashboard/>}/>
                    <Route path="/" element={<DailyLogList/>}/>
                    <Route path="/all-employees" element ={<EmployeeList/>}/>
                    <Route path ="/all-daily-logs" element={<DailyLogList/>}></Route>
                    <Route path = "/all-clients" element = {<ClientList/>}/>
                    <Route path = "/all-medication" element ={<MedicationList/>}/>
                    <Route path =  "/create-dailyLog" element={<DailyLogForm/>}></Route>
                    <Route path = "/create-employee" element = {<EmployeeForm/> }/>
                    <Route path = "/create-medication" element={<MedicationForm/>}/>
                    <Route path = "/create-client" element = {<ClientForm/>} />

                </Routes>

            </div>
        </BrowserRouter>
    )

}

export default App