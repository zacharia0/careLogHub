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
import ClientProfile from "./pages/ClientProfile.jsx";
import AdministerMed from "./components/AdministerMed.jsx";
import PassMedsList from "./pages/PassMedsList.jsx";
// import PassMedsList from "./pages/PassMedsList.jsx";

const App = () =>{

    return (
        <BrowserRouter>
            <Navbar/>
            <div className = "py-2">
                <Routes >
                    <Route path = "/dashboard" element={<Dashboard/>}/>
                    {/*<Route path = "/administered" element={<PassMedsList/>}/>*/}
                    {/*Daily Log*/}
                    <Route path="/" element={<DailyLogList/>}/>
                    <Route path ="/all-daily-logs" element={<DailyLogList/>}></Route>
                    <Route path =  "/create-dailyLog" element={<DailyLogForm/>}></Route>
                    {/*Employee*/}
                    <Route path="/all-employees" element ={<EmployeeList/>}/>
                    <Route path = "/create-employee" element = {<EmployeeForm/> }/>
                    {/*Client*/}
                    <Route path = "/all-clients" element = {<ClientList/>}/>
                    <Route path = "/create-client" element = {<ClientForm/>} />
                    <Route path = "/all-clients/:clientId" element={<ClientProfile/>}/>
                    {/*Medication*/}
                    <Route path = "/all-medication" element ={<MedicationList/>}/>
                    <Route path = "/create-medication/:clientId" element={<MedicationForm/>}/>

                {/*    ADMINISTER MED */}
                    <Route path = "/administer-med" element = {<AdministerMed/>}/>

                    <Route path = "/pass-med-list/:clientId" element={<PassMedsList/>}/>



                </Routes>

            </div>
        </BrowserRouter>
    )

}

export default App