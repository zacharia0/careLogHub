const EmployeeDetail = ({employees}) => {
    return (
        <div>
            <hr/>
            <div className="font-thin">
                <label>Name: </label>
                <span>
                    {employees.firstName}

                </span>
                <span>
                    {employees.lastName}

                </span>
                {employees.middleName}
                {employees.username}
            </div>

        </div>
    )
}

export default EmployeeDetail