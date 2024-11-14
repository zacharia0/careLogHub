import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {DailyLogContextProvider} from "./context/DailyLogContext.jsx";
import {ClientContextProvider} from "./context/ClientContext.jsx";
import {EmployeeContextProvider} from "./context/EmployeeContext.jsx";
import {MedicationContextProvider} from "./context/MedicationContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <EmployeeContextProvider>
            <ClientContextProvider>
                <MedicationContextProvider>

                    <DailyLogContextProvider>
                        <App/>
                    </DailyLogContextProvider>
                </MedicationContextProvider>
            </ClientContextProvider>
        </EmployeeContextProvider>
    </StrictMode>,
)
