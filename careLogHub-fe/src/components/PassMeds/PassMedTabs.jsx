const PassMedTabs = ({activeTab,setActiveTab}) =>{
    const tabs = ["morning","afternoon","evening","bedtime"]

    return(
        <ul className="flex-column space-y-4 text-sm font-medium text-gray-500 dar:text-gray-400 md:me-4 md:mb-0">
            {
                tabs.map((timeSlot) => (
                    <li key = {timeSlot}>
                        <button
                            type="button"
                            onClick={() => setActiveTab(timeSlot)}
                            className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                                activeTab === timeSlot
                                    ? "text-white bg-blue-700 dark:bg-blue-600"
                                    : "bg-gray-50 hover::bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500"
                            }`}
                        >
                            {timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1)}

                        </button>
                    </li>
                ))
            }

        </ul>
    )

}

export default  PassMedTabs