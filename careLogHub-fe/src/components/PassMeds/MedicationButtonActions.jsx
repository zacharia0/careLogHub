const MedicationButtonActions = ({filteredMeds,actions,handleActionClick}) =>(
    <div className="mb-4">
        <div className={"inline-flex"}>
            <label>Medication Name: </label>
            <div className={"ml-1 text-3xl text-white"}>{filteredMeds.medName}</div>
        </div>

        <div className={"flex space-x-2 mt-2"}>
            {
                actions.map((action) =>(
                    <button
                        key ={action}
                        type ="button"
                        className={`px-4 py-2 rounded border-1 bg-white text-gray  hover:bg-blue-400 hover:text-white `}
                    >
                        {action}
                    </button>
                ))
            }

        </div>
    </div>
)

export default MedicationButtonActions




