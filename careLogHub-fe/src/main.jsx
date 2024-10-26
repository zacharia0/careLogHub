import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {DailyLogContextProvider} from "./context/DailyLogContext.jsx";
import {ClientContextProvider} from "./context/ClientContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ClientContextProvider>
            <DailyLogContextProvider>
                <App/>
            </DailyLogContextProvider>
        </ClientContextProvider>
    </StrictMode>,
)
