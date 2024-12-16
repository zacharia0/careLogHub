// const Tab = ({label,active,onClick}) =>{
//     return(
//         <button
//             // className={`tab ${active ? "active": ""}`}
//             className={" ml-1 border-2 rounded-3xl px-3  py-4 bg-blue-900 text-white"}
//
//             onClick={onClick}
//         >{label}</button>
//     )
// }
//
// export default Tab


// const Tab = ({label,active,onClick}) =>{
//     return(
//
//
//
//         <button
//             className={" ml-1 border-2 rounded-3xl px-3  py-4 bg-blue-900 text-white"}
//
//             onClick={onClick}
//         >{label}</button>
//     )
// }
//
// export default Tab

const Tab = ({ label, active, onClick }) => {
    return (
        <button
            className={` border-2 rounded-xl px-16 py-4 ${
                active
                    ? "bg-blue-700 text-white border-blue-700"
                    : "bg-blue-200 border-amber-300 text-gray-700  hover:bg-gray-200"
            }`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default Tab;





