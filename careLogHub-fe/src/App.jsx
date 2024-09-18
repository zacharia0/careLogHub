import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";

const App = () =>{

    return (
        <BrowserRouter>
            <Routes>
                <Route path ="/" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default App