// import {BrowserRouter, Route, Routes} from "react-router-dom";
// import DailyLogList from "./pages/DailyLogList.jsx";
// import DailyLogForm from "./components/DailyLogForm.jsx";
// import ClientForm from "./components/ClientForm.jsx";
// import ClientList from "./pages/ClientList.jsx";
// import Navbar from "./pages/Navbar.jsx";
// import EmployeeForm from "./components/EmployeeForm.jsx";
// import EmployeeList from "./pages/EmployeeList.jsx";
// import MedicationForm from "./components/MedicationForm.jsx";
// import MedicationList from "./pages/MedicationList.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import ClientProfile from "./pages/ClientProfile.jsx";
// import AdministerMedForListClient from "./components/AdministerMedForListClient.jsx";
// import PassMedsList from "./components/PassMeds/PassMedsList.jsx";
// import UpdatePassMeds from "./components/PassMeds/UpdatePassMeds.jsx";
// // import PassMedsList from "./pages/PassMedsList2.jsx";
//
// const App = () =>{
//
//     return (
//         <BrowserRouter>
//             <Navbar/>
//             <div className = "py-2">
//                 <Routes >
//                     <Route path = "/dashboard" element={<Dashboard/>}/>
//                     {/*<Route path = "/administered" element={<PassMedsList/>}/>*/}
//                     {/*Daily Log*/}
//                     <Route path="/" element={<DailyLogList/>}/>
//                     <Route path ="/all-daily-logs" element={<DailyLogList/>}></Route>
//                     <Route path =  "/create-dailyLog" element={<DailyLogForm/>}></Route>
//                     {/*Employee*/}
//                     <Route path="/all-employees" element ={<EmployeeList/>}/>
//                     <Route path = "/create-employee" element = {<EmployeeForm/> }/>
//                     {/*Client*/}
//                     <Route path = "/all-clients" element = {<ClientList/>}/>
//                     <Route path = "/create-client" element = {<ClientForm/>} />
//                     <Route path = "/all-clients/:clientId" element={<ClientProfile/>}/>
//                     {/*Medication*/}
//                     <Route path = "/all-medication" element ={<MedicationList/>}/>
//                     <Route path = "/create-medication/:clientId" element={<MedicationForm/>}/>
//
//                 {/*    ADMINISTER MED */}
//                     <Route path = "/administer-med" element = {<AdministerMedForListClient/>}/>
//                     <Route path = "/pass-med-list/:clientId" element={<PassMedsList/>}/>
//
//                 {/*    PASSED MED*/}
//                     <Route path ="/update-pass-med" element={<UpdatePassMeds/>}/>
//
//
//
//                 </Routes>
//
//             </div>
//         </BrowserRouter>
//     )
//
// }
//
// export default App


//
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import DailyLogList from "./pages/DailyLogList.jsx";
// import DailyLogForm from "./components/DailyLogForm.jsx";
// import ClientForm from "./components/ClientForm.jsx";
// import ClientList from "./pages/ClientList.jsx";
// import Navbar from "./pages/Navbar.jsx";
// import EmployeeForm from "./components/EmployeeForm.jsx";
// import EmployeeList from "./pages/EmployeeList.jsx";
// import MedicationForm from "./components/MedicationForm.jsx";
// import MedicationList from "./pages/MedicationList.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import ClientProfile from "./pages/ClientProfile.jsx";
// import AdministerMedForListClient from "./components/AdministerMedForListClient.jsx";
// import PassMedsList from "./components/PassMeds/PassMedsList.jsx";
// import UpdatePassMeds from "./components/PassMeds/UpdatePassMeds.jsx";
//
// const App = () => {
//     return (
//         <BrowserRouter>
//             <div className="flex">
//                 {/* Left Sidebar (Navbar) */}
//                 <Navbar />
//
//                 {/* Main Content */}
//                 <div className="ml-64 py-2 w-full">
//                     <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         {/* Daily Log */}
//                         <Route path="/" element={<DailyLogList />} />
//                         <Route path="/all-daily-logs" element={<DailyLogList />} />
//                         <Route path="/create-dailyLog" element={<DailyLogForm />} />
//                         {/* Employee */}
//                         <Route path="/all-employees" element={<EmployeeList />} />
//                         <Route path="/create-employee" element={<EmployeeForm />} />
//                         {/* Client */}
//                         <Route path="/all-clients" element={<ClientList />} />
//                         <Route path="/create-client" element={<ClientForm />} />
//                         <Route path="/all-clients/:clientId" element={<ClientProfile />} />
//                         {/* Medication */}
//                         <Route path="/all-medication" element={<MedicationList />} />
//                         <Route path="/create-medication/:clientId" element={<MedicationForm />} />
//                         {/* Administer Med */}
//                         <Route path="/administer-med" element={<AdministerMedForListClient />} />
//                         <Route path="/pass-med-list/:clientId" element={<PassMedsList />} />
//                         {/* Passed Med */}
//                         <Route path="/update-pass-med" element={<UpdatePassMeds />} />
//                     </Routes>
//                 </div>
//             </div>
//         </BrowserRouter>
//     );
// };
//
// export default App;



// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import DailyLogList from "./pages/DailyLogList.jsx";
// import DailyLogForm from "./components/DailyLogForm.jsx";
// import ClientForm from "./components/ClientForm.jsx";
// import ClientList from "./pages/ClientList.jsx";
// import Navbar from "./pages/Navbar.jsx";
// import EmployeeForm from "./components/EmployeeForm.jsx";
// import EmployeeList from "./pages/EmployeeList.jsx";
// import MedicationForm from "./components/MedicationForm.jsx";
// import MedicationList from "./pages/MedicationList.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import ClientProfile from "./pages/ClientProfile.jsx";
// import AdministerMedForListClient from "./components/AdministerMedForListClient.jsx";
// import PassMedsList from "./components/PassMeds/PassMedsList.jsx";
// import UpdatePassMeds from "./components/PassMeds/UpdatePassMeds.jsx";

// const App = () => {
//     return (
//         <BrowserRouter>
//             <div className="flex flex-col lg:flex-row">
//                 {/* Left Sidebar (Navbar) */}
//                 <Navbar />
//
//                 {/* Main Content */}
//                 <div className="ml-0 lg:ml-64 py-2 w-full overflow-x-hidden">
//                     <Routes>
//                         <Route path="/dashboard" element={<Dashboard />} />
//                         {/* Daily Log */}
//                         <Route path="/" element={<DailyLogList />} />
//                         <Route path="/all-daily-logs" element={<DailyLogList />} />
//                         <Route path="/create-dailyLog" element={<DailyLogForm />} />
//                         {/* Employee */}
//                         <Route path="/all-employees" element={<EmployeeList />} />
//                         <Route path="/create-employee" element={<EmployeeForm />} />
//                         {/* Client */}
//                         <Route path="/all-clients" element={<ClientList />} />
//                         <Route path="/create-client" element={<ClientForm />} />
//                         <Route path="/all-clients/:clientId" element={<ClientProfile />} />
//                         {/* Medication */}
//                         <Route path="/all-medication" element={<MedicationList />} />
//                         <Route path="/create-medication/:clientId" element={<MedicationForm />} />
//                         {/* Administer Med */}
//                         <Route path="/administer-med" element={<AdministerMedForListClient />} />
//                         <Route path="/pass-med-list/:clientId" element={<PassMedsList />} />
//                         {/* Passed Med */}
//                         <Route path="/update-pass-med" element={<UpdatePassMeds />} />
//                     </Routes>
//                 </div>
//             </div>
//         </BrowserRouter>
//     );
// };
//
// export default App;
//

//
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Navbar from './pages/Navbar.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import DailyLogList from './pages/DailyLogList.jsx';
// import ClientList from './pages/ClientList.jsx';
// import MedicationList from './pages/MedicationList.jsx';
//
// import AdministerMedForListClient from "./pages/AdministerMedForListClient.jsx";
// import MedicationForm from "./components/MedicationForm.jsx";
// import ClientProfile from "./pages/ClientProfile.jsx";
// import ClientForm from "./components/ClientForm.jsx";
// import EmployeeForm from "./components/EmployeeForm.jsx";
// import EmployeeList from "./pages/EmployeeList.jsx";
// import DailyLogForm from "./components/DailyLogForm.jsx";
// import ClientMedicationList from "./pages/ClientMedicationList.jsx";
// import Login from "./pages/Login.jsx";
// import {Toaster} from "react-hot-toast";
//
// const App = () => {
//     return (
//         <div>
//             <Toaster position="top-right" reverseOrder={false}/>
//             <BrowserRouter>
//                 <div className="">
//                     {/* Sidebar */}
//                     <Navbar />
//
//                     {/* Main Content */}
//                     <div >
//                         <Routes>
//                             <Route path="/login" element={<Login/>}/>
//
//                             <Route path="/dashboard" element={<Dashboard />} />
//                             {/* Daily Log */}
//                             <Route path="/" element={<DailyLogList />} />
//                             <Route path="/all-daily-logs" element={<DailyLogList />} />
//                             <Route path="/create-dailyLog" element={<DailyLogForm />} />
//                             {/* Employee */}
//                             <Route path="/all-employees" element={<EmployeeList />} />
//                             <Route path="/create-employee" element={<EmployeeForm />} />
//                             {/* Client */}
//                             <Route path="/all-clients" element={<ClientList />} />
//                             <Route path="/create-client" element={<ClientForm />} />
//                             <Route path="/client-profile/:clientId" element={<ClientProfile />} />
//                             <Route path = "/client-medications/:clientId" element={<ClientMedicationList/>}/>
//                             {/* Medication */}
//                             <Route path="/all-medication" element={<MedicationList />} />
//                             <Route path="/create-medication/:clientId" element={<MedicationForm />} />
//                             {/* Administer Med */}
//                             <Route path="/administer-med" element={<AdministerMedForListClient />} />
//                             {/* Passed Med */}
//                         </Routes>
//                     </div>
//                 </div>
//             </BrowserRouter>
//         </div>
//     );
// };
//
// export default App;


// import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
// import Navbar from './pages/Navbar.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import DailyLogList from './pages/DailyLogList.jsx';
// import ClientList from './pages/ClientList.jsx';
// import MedicationList from './pages/MedicationList.jsx';
// import AdministerMedForListClient from "./pages/AdministerMedForListClient.jsx";
// import MedicationForm from "./components/MedicationForm.jsx";
// import ClientProfile from "./pages/ClientProfile.jsx";
// import ClientForm from "./components/ClientForm.jsx";
// import EmployeeForm from "./components/EmployeeForm.jsx";
// import EmployeeList from "./pages/EmployeeList.jsx";
// import DailyLogForm from "./components/DailyLogForm.jsx";
// import ClientMedicationList from "./pages/ClientMedicationList.jsx";
// import Login from "./pages/Login.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { Toaster } from "react-hot-toast";
//
// const App = () => {
//     const location = useLocation();
//     const isLoginPage = location.pathname === "/login"
//     return (
//         <div>
//             <Toaster position="top-right" reverseOrder={false} />
//             <BrowserRouter>
//                 <div className="">
//                     {/* Sidebar */}
//                     {!isLoginPage && <Navbar />}
//
//                     {/* Main Content */}
//                     <div>
//                         <Routes>
//                             {/* Public Route */}
//                             <Route path="/login" element={<Login />} />
//
//                             {/* Protected Routes */}
//                             <Route
//                                 path="*"
//                                 element={
//                                     <ProtectedRoute>
//                                         <Routes>
//                                             <Route path="/dashboard" element={<Dashboard />} />
//                                             <Route path="/" element={<DailyLogList />} />
//                                             <Route path="/all-daily-logs" element={<DailyLogList />} />
//                                             <Route path="/create-dailyLog" element={<DailyLogForm />} />
//                                             <Route path="/all-employees" element={<EmployeeList />} />
//                                             <Route path="/create-employee" element={<EmployeeForm />} />
//                                             <Route path="/all-clients" element={<ClientList />} />
//                                             <Route path="/create-client" element={<ClientForm />} />
//                                             <Route path="/client-profile/:clientId" element={<ClientProfile />} />
//                                             <Route path="/client-medications/:clientId" element={<ClientMedicationList />} />
//                                             <Route path="/all-medication" element={<MedicationList />} />
//                                             <Route path="/create-medication/:clientId" element={<MedicationForm />} />
//                                             <Route path="/administer-med" element={<AdministerMedForListClient />} />
//                                         </Routes>
//                                     </ProtectedRoute>
//                                 }
//                             />
//                         </Routes>
//                     </div>
//                 </div>
//             </BrowserRouter>
//         </div>
//     );
// };
//
// export default App;
//


import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DailyLogList from './pages/DailyLogList.jsx';
import ClientList from './pages/ClientList.jsx';
import MedicationList from './pages/MedicationList.jsx';
import AdministerMedForListClient from "./pages/AdministerMedForListClient.jsx";
import MedicationForm from "./components/MedicationForm.jsx";
import ClientProfile from "./pages/ClientProfile.jsx";
import ClientForm from "./components/ClientForm.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import DailyLogForm from "./components/DailyLogForm.jsx";
import ClientMedicationList from "./pages/ClientMedicationList.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import EmployeeProfile from "./components/EmployeeProfile.jsx";

const MainLayout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <>
            {/* Render Navbar only if not on the login page */}
            {!isLoginPage && <Navbar />}
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                    path="*"
                    element={
                        <ProtectedRoute>
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/" element={<DailyLogList />} />
                                <Route path="/all-daily-logs" element={<DailyLogList />} />
                                <Route path="/create-dailyLog" element={<DailyLogForm />} />
                                <Route path="/all-employees" element={<EmployeeList />} />
                                <Route path="/create-employee" element={<EmployeeForm />} />
                                <Route path="/all-clients" element={<ClientList />} />
                                <Route path="/create-client" element={<ClientForm />} />
                                <Route path="/client-profile/:clientId" element={<ClientProfile />} />
                                <Route path="/client-medications/:clientId" element={<ClientMedicationList />} />
                                <Route path="/all-medication" element={<MedicationList />} />
                                <Route path="/create-medication/:clientId" element={<MedicationForm />} />
                                <Route path="/administer-med" element={<AdministerMedForListClient />} />
                                <Route path = "/employee-profile/:employeeId" element={<EmployeeProfile/>}/>
                            </Routes>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <div>
            <Toaster position="bottom-right" reverseOrder={false} />
            <BrowserRouter>
                <MainLayout />
            </BrowserRouter>
        </div>
    );
};

export default App;

