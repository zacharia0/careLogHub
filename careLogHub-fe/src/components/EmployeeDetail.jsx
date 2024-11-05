const EmployeeDetail = ({employees}) =>{
    return(
        <div>

            <label>First Name:</label>
            <div className= "font-thin">
                {employees.firstName}
            </div>
            <label>First Last:</label>
            <div className= "font-thin">
                {employees.lastName}
            </div>
            <label>First Middle:</label>
            <div className= "font-thin">
                {employees.middleName}
            </div>
            <label>Username:</label>
            <div className= "font-thin">
                {employees.username}
            </div>

        </div>
    )
}

export default EmployeeDetail