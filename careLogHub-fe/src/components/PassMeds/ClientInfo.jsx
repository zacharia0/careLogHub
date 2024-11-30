const ClientInfo = ({firstName,lastName}) =>(
    <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        <label className=" font-medium text-gray-300">Medication(s) For: </label>
        <div className={"inline-flex ml-3"}>
            {`${firstName} ${lastName}`}
        </div>
    </div>
)

export default ClientInfo