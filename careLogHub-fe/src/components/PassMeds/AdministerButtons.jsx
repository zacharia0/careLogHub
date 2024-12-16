// const AdministerButtons = () =>{
//     return(
//         <div>
//             {
//                 Object.entries({Pass:"pass",Refuse:"refuse",Other:"other_reason"}).map(([key,status]) =>(
//                     <div key = {status} className={"inline-flex"}>
//                         <button
//                             value = {status}>{key}
//                         </button>
//
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }
//
// export default AdministerButtons
//
//
//
//
// className={"ml-1 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 "}



//
// import React, { useState } from "react";
//
// const AdministerButtons = () => {
//     const [selected, setSelected] = useState(""); // Track the selected button
//
//     // Button options
//     const buttonOptions = {
//         Pass: "pass",
//         Refuse: "refuse",
//         Other: "other_reason",
//     };
//
//     return (
//         <div className="flex space-x-2">
//             {Object.entries(buttonOptions).map(([key, value]) => (
//                 <button
//                     key={key}
//                     className={`px-4 py-2 rounded-md border font-medium ${
//                         selected === value
//                             ? "bg-blue-700 text-white border-blue-700"
//                             : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                     }`}
//                     onClick={() => setSelected(value)}
//                 >
//                     {key}
//                 </button>
//             ))}
//         </div>
//     );
// };
//
// export default AdministerButtons;



import React, { useState } from 'react';

const AdministerButtons = () => {
    const [selectedStatus, setSelectedStatus] = useState(null);

    const handleStatusClick = (status) => {
        setSelectedStatus(selectedStatus === status ? null : status); // Toggle selection
    };


    // Simulating an enum for button options
    const ButtonOptions = Object.freeze({
        PASS: "pass",
        REFUSE: "refuse",
        OTHER: "other_reason",
    });

    return (
        <div className="inline-flex rounded-md shadow-sm" role="group">
            {Object.entries(ButtonOptions).map(([key, status]) => (
                <div  key = {key}>

                    <button
                        // key = {key}
                        type="button"
                        className={` px-6 py-2 text-sm font-medium rounded-l-md
                         ${
                            selectedStatus === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                        }
                         border border-gray-200
                         first:rounded-l-md last:rounded-r-md
                         focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        onClick={() => handleStatusClick(status)}
                    >
                        {key}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AdministerButtons;
