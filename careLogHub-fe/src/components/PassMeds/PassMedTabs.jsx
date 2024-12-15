const Tab = ({label,active,onClick}) =>{
    return(
        <button
            className={`tab ${active ? "active": ""}`}
            onClick={onClick}
        >{label}</button>
    )
}

export default Tab