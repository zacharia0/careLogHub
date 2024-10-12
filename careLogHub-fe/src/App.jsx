import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import LogForm from "./components/LogForm.jsx";
import Sidebar from "./pages/Sidebar.jsx";

const App = () =>{

    return (
        <BrowserRouter>
            <div>
                <Sidebar/>
            </div>
            <Routes>
                <Route path ="/" element={<Home/>}></Route>
                <Route path =  "/createDailyLog" element={<LogForm/>}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App