
// PassMedsForm.jsx
import { useState, useEffect } from "react";

const PassMedsForm = ({ filteredMeds = [], clientInfo, onMedicationSubmit }) => {
    const [err, setErr] = useState("");
    const [medicationsState, setMedicationsState] = useState([]);

    useEffect(() => {
        setErr("")
        const initialMedicationsState = filteredMeds.map((med) => ({
            medicationId: med._id,
            dosageGiven: med.medDosage,
            status: "",
            comment: "",
            clientId: clientInfo,
        }));
        setMedicationsState(initialMedicationsState);
    }, [filteredMeds,clientInfo]);



    const handleStatusChange = (medicationId, status) => {
        setErr("");
        setMedicationsState((prevState) =>
            prevState.map((med) =>
                med.medicationId === medicationId
                    ? {
                        ...med,
                        status: med.status === status ? "" : status,
                        comment: status === "otherReason" ? "" : med.comment,
                    }
                    : med
            )
        );
    };

    // console.log("MEDICATION STATE:", medicationsState)



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

        const medicationsToSubmit = medicationsState
            .filter(med => med.status)
            .map(med => ({
                ...med,
                administeredTimeAndDate: new Date().toISOString()
            }));
        console.log("medicationsToSubmit",medicationsToSubmit)


        if (medicationsToSubmit.length === 0) {
            setErr("Please select a status for at least one medication.");
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/api/pass-meds", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ medications: medicationsToSubmit }),
            });

            const json = await response.json();

            if (response.ok) {
                if (onMedicationSubmit) {
                    onMedicationSubmit(json);
                }

                setMedicationsState(prevState =>
                    prevState.map(med => ({
                        ...med,
                        status: "",
                        comment: ""
                    }))
                );
                setErr("");
            } else {
                setErr(json.error || "Failed to administer medications");
            }
        } catch (error) {
            console.error("Submission error:", error);
            setErr("An error occurred. Please try again.");
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
