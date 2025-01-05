
import { format, parseISO } from "date-fns";
import { useDailyLogContext } from "../hooks/useDailyLogContext.js";
import { useState } from "react";
import Modal from "react-modal";

import { GrEdit } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";


const DailyLogDetail = ({ dailyLog }) => {

    const parseDate = parseISO(dailyLog.date);
    const { dispatch } = useDailyLogContext();
    const formattedDate = format(parseDate, "yyyy-MM-dd'T'HH:mm");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateDailyLog, setUpdateDailyLog] = useState({
        dailyLogType: dailyLog.dailyLogType,
        body: dailyLog.body,
        date:formattedDate
    });
    const [error, setError] = useState("");

    const handleDelete = async () => {
        const response = await fetch("http://localhost:4000/api/dailyLogs/" + dailyLog._id, {
            method: "DELETE",
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: "DELETE_DAILY_LOG", payload: json });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!updateDailyLog.dailyLogType || !updateDailyLog.body || !updateDailyLog.date) {
            setError("All fields are required");
            return;
        }
        const response = await fetch(
            "http://localhost:4000/api/dailyLogs/update/" + dailyLog._id,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateDailyLog),
            }
        );
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: "UPDATE_DAILY_LOG", payload: json });
            setIsModalOpen(false);
        } else {
            setError("Failed to update");
        }
    };

    return (
        <>

            <tr className="border-b hover:bg-gray-100 transition duration-150">
                <td className="border px-4 py-2">{dailyLog.dailyLogType}</td>
                <td className="border px-4 py-2">{dailyLog.body}</td>
                <td className="border px-4 py-2">
                    {format(parseDate, "MMMM dd, yyyy h:mm a")}
                </td>
                <td className="border px-4 py-2">
                    {dailyLog.clientFirstName} {dailyLog.clientLastName}
                </td>
                <td className="border px-0 py-2">
                    <button
                        className="text-blue-500 hover:underline ml-10"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <GrEdit/>
                    </button>
                    <div className={" inline-block ml-10 mr-0"}>
                        <button
                            className="text-red-500 hover:underline "
                            onClick={handleDelete}
                        >
                            <FaTrashAlt/>
                        </button>

                    </div>
                </td>
            </tr>

            {/* React Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Edit Daily Log"
                className="relative bg-white p-6 rounded-lg shadow-md w-[800px] mx-auto my-16"
                overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-70 flex justify-center items-center"

            >
                <h2 className="text-xl font-bold mb-4">Edit Daily Log</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Type</label>
                        <select
                            value={updateDailyLog.dailyLogType}
                            onChange={(e) =>
                                setUpdateDailyLog({
                                    ...updateDailyLog,
                                    dailyLogType: e.target.value,
                                })
                            }
                            className="border w-full p-3 rounded"
                        >
                            <option value="Daily Log">Daily Log</option>
                            <option value="Incident Report">Incident Report</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Observation</label>
                        <textarea
                            value={updateDailyLog.body}
                            onChange={(e) =>
                                setUpdateDailyLog({
                                    ...updateDailyLog,
                                    body: e.target.value,
                                })
                            }
                            className="border w-full px-2 rounded"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Date</label>
                        <input
                            type="datetime-local"
                            value={updateDailyLog.date}
                            onChange={(e) =>
                                setUpdateDailyLog({
                                    ...updateDailyLog,
                                    date: e.target.value,
                                })
                            }
                            className="border w-full p-2 rounded"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            type="submit"
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className={"absolute top-3 right-3 text-gray-500 hover:text-gray-900"}
                            onClick={() => setIsModalOpen(false)}
                        > &times; </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default DailyLogDetail;
