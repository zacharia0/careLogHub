
import { useState, useMemo } from "react";

const PassMedsForm = ({ filteredMeds = [], clientInfo, onMedicationSubmit }) => {
    const [err, setErr] = useState("");

    const initialMedicationsState = useMemo(() =>
        filteredMeds.map((med) => ({
                medicationId: med._id,
                dosageGiven: med.medDosage,
                status: "",
                comment: "",
                clientId: clientInfo,
            }),
            [filteredMeds, clientInfo]
        ));

    const [medicationsState, setMedicationsState] = useState(initialMedicationsState);

    const handleStatusChange = (medicationId, status) => {
        setErr("");
        setMedicationsState((prevState) =>
            prevState.map((med) =>
                med.medicationId === medicationId
                    ? {
                        ...med,
                        status: med.status === status ? "" : status,
                        comment: status === "otherReason" ? "" : med.comment
                    }
                    : med
            )
        );
    };

    const handleCommentChange = (medicationId, comment) => {
        setMedicationsState((prevState) =>
            prevState.map((med) =>
                med.medicationId === medicationId
                    ? { ...med, comment }
                    : med
            )
        );
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const medicationsToSubmit = medicationsState.filter(med => med.status);

        if (medicationsToSubmit.length === 0) {
            setErr("Please select at least one medication to administer.");
            return;
        }

        const missingFields = medicationsToSubmit.filter(
            (med) =>
                !med.status ||
                (med.status === "otherReason" && !med.comment)
        );

        if (missingFields.length > 0) {
            setErr("Please provide a complete status for selected medications. 'Other' requires a comment.");
            return;
        }

        const submissionData = medicationsToSubmit.map(med => ({
            ...med,
            administeredTimeAndDate: new Date().toISOString()
        }));

        try {
            const response = await fetch("http://localhost:4000/api/pass-meds", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ medications: submissionData }),
            });
            const json = await response.json();

            if (response.ok) {
                if (onMedicationSubmit) {
                    onMedicationSubmit(json.data);
                }

                setMedicationsState(prevState =>
                    prevState.map(med =>
                        medicationsToSubmit.some(submittedMed =>
                            submittedMed.medicationId === med.medicationId
                        )
                            ? { ...med, status: "", comment: "" }
                            : med
                    )
                );
                setErr("");
            } else {
                setErr(json.error);
            }
        } catch (error) {
            console.error("Error submitting medications:", error);
            setErr("Failed to submit medications.");
        }
    };

    if (filteredMeds.length === 0) {
        return (
            <div className="text-center text-gray-500 py-4">
                No medications available to administer.
            </div>
        );
    }

    return (
        <form onSubmit={handleFormSubmit} className="space-y-4">
            {filteredMeds.map((med) => {
                const currentMedState = medicationsState.find(
                    (m) => m.medicationId === med._id
                );

                return (
                    <div key={med._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <span className="font-bold text-xl">{med.medName}</span>
                                <span className="ml-2 text-gray-600">
                                    {med.medDosage} {med.dosageUnit}
                                </span>
                            </div>
                        </div>

                        <div className="flex space-x-2 mb-3">
                            {Object.entries({
                                refuse: "Refuse",
                                pass: "Pass",
                                adverseReaction: "Adverse Reaction",
                                otherReason: "Other",
                            }).map(([statusKey, statusValue]) => (
                                <button
                                    key={statusKey}
                                    type="button"
                                    onClick={() => handleStatusChange(med._id, statusKey)}
                                    className={`
                                        flex-1 py-2 px-3 rounded-md transition-colors
                                        ${currentMedState?.status === statusKey
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 hover:bg-blue-100'
                                    }
                                    `}
                                >
                                    {statusValue}
                                </button>
                            ))}
                        </div>

                        {currentMedState?.status === "otherReason" && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Please specify reason..."
                                    value={currentMedState.comment || ""}
                                    onChange={(e) =>
                                        handleCommentChange(med._id, e.target.value)
                                    }
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300"
                                    required
                                />
                            </div>
                        )}
                    </div>
                );
            })}

            {err && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    {err}
                </div>
            )}

            <button
                type="submit"
                className="w-full py-3 rounded-lg text-white font-bold bg-green-600 hover:bg-green-700"
            >
                Administer Selected Medications
            </button>
        </form>
    );
};

export default PassMedsForm;