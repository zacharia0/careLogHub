import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {DailyLogContextProvider} from "./context/DailyLogContext.jsx";
import {ClientContextProvider} from "./context/ClientContext.jsx";
import {EmployeeContextProvider} from "./context/EmployeeContext.jsx";
import {MedicationContextProvider} from "./context/MedicationContext.jsx";
// import {PassMedsContextProvider} from "./context/PassMedsContext.jsx";

import Modal from 'react-modal';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ClientContextProvider>
            <MedicationContextProvider>
                    <DailyLogContextProvider>
                        <EmployeeContextProvider>
                            <App/>
                        </EmployeeContextProvider>
                    </DailyLogContextProvider>
            </MedicationContextProvider>
        </ClientContextProvider>
    </StrictMode>,
)
