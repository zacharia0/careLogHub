import {BrowserRouter, Route, Routes} from "react-router-dom";
import DailyLogList from "./pages/DailyLogList.jsx";
import LogForm from "./components/LogForm.jsx";
import ClientForm from "./components/ClientForm.jsx";

const App = () =>{

    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<DailyLogList/>}></Route>
                <Route path =  "/createDailyLog" element={<LogForm/>}></Route>
                <Route path = "/createClient" element = {<ClientForm/>} />
            </Routes>
        </BrowserRouter>
    )

}

export default App