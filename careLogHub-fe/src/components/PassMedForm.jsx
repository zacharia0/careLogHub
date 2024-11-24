import { useMedicationContext } from "../hooks/useMedicationContext.js";
import { useContext, useState } from "react";
import { usePassMedsContext } from "../hooks/usePassMedsContext.js";
import { IoPersonCircleSharp } from "react-icons/io5";

const PassMedForm = () => {
    const statusLabels = {
        pass: "Pass",
        refuse: "Refuse",
        adverseReaction: "Adverse Reaction",
        otherReason: "Other Reason",
    };

    const { medications } = useMedicationContext();
    const { dispatch } = usePassMedsContext();
    const [error, setError] = useState({});
    const [administerMed, setAdministerMed] = useState({});
    const [statusDisplay, setStatusDisplay] = useState({}); // To track the displayed status

    const handlePassMed = (e, medId) => {
        const { name, value } = e.target;
        setAdministerMed((prevState) => ({
            ...prevState,
            [medId]: {
                ...prevState[medId],
                medicationId: medId,
                [name]: value,
            },
        }));
    };

    const handleFormSubmit = async (e, medId) => {
        e.preventDefault();
        const currentMed = administerMed[medId];

        setError((prev) => ({ ...prev, [medId]: "" }));

        // Validation for "otherReason" status
        if (currentMed.status === "otherReason" && !currentMed.comment) {
            setError((prev) => ({ ...prev, [medId]: "Reason required." }));
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/pass-meds", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(currentMed),
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({ type: "CREATE_PASS_MEDS", payload: json });
                setStatusDisplay((prev) => ({
                    ...prev,
                    [medId]: currentMed.status, // Update the status display for the medication
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    [medId]: json.error || "An error occurred.",
                }));
            }
        } catch (error) {
            setError((prev) => ({
                ...prev,
                [medId]: error.message || "Failed to submit. Please try again.",
            }));
        }
    };

    return (
        <div className="border-none">
            <div className="border-2 p-9 flex items-center justify-center">
                {medications &&
                    medications.map((med) => (
                        <div
                            className="border-2 py-7 mb-2 mr-2 rounded-2xl"
                            key={med._id}
                        >
                            {/* Check if status exists for this medication */}
                            {statusDisplay[med._id] ? (
                                // Display the user-friendly status if it exists
                                <div className="ml-2 text-xl font-bold px-4">
                                    Status: {statusLabels[statusDisplay[med._id]] || statusDisplay[med._id]}
                                </div>
                            ): (
                                // Show medication form if no status yet
                                <>
                                    <div className="ml-2 font-light">
                                        <IoPersonCircleSharp className="text-5xl inline-block mr-1 bg-gray-300" />
                                        {med.client.firstName + " " + med.client.lastName}
                                    </div>

                                    <div className="ml-2 text-2xl font-semibold py-2">
                                        {med.medName + med.medDosage + med.dosageUnit}
                                    </div>

                                    {/* BUTTONS */}
                                    <div className="font-semibold">
                                        {[
                                            { value: "pass", label: "Pass" },
                                            { value: "refuse", label: "Refuse" },
                                            { value: "adverseReaction", label: "Adverse Reaction" },
                                            { value: "otherReason", label: "Other Reason" },
                                        ].map(({ value, label }) => (
                                            <button
                                                key={value}
                                                className="ml-1 bg-teal-100 rounded hover:bg-teal-200 hp-1 px-2 border-2"
                                                type="button"
                                                name="status"
                                                value={value}
                                                onClick={(e) => handlePassMed(e, med._id)}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>


                                    {/* Display Error for this Medication */}
                                    {error[med._id] && (
                                        <p className="text-red-500">{error[med._id]}</p>
                                    )}

                                    {/* TEXTAREA */}
                                    <div className="ml-2">
                                        <label className="block">Comment:</label>
                                        <textarea
                                            placeholder="Add a comment: e.g., Dosage adjusted to 10mg due to patient request"
                                            className="textarea-form"
                                            type="text"
                                            name="comment"
                                            value={administerMed[med._id]?.comment || ""}
                                            onChange={(e) => handlePassMed(e, med._id)}
                                        />
                                        <hr className="border-1.5 pb-1 w-3/4" />
                                    </div>

                                    {/* Individual Form Submit Button */}
                                    <div className="flex items-center justify-center">
                                        <button
                                            className={`${
                                                !administerMed[med._id]?.status
                                                    ? "bg-gray-400 text-gray-600 cursor-not-allowed  font-semibold py-2 px-4 rounded shadow ml-2"
                                                    : "bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow ml-2"
                                            }`}
                                            type="button"
                                            onClick={(e) => handleFormSubmit(e, med._id)}
                                            disabled={!administerMed[med._id]?.status}
                                        >
                                            Administer
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PassMedForm;

