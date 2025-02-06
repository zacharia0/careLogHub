
import { useClientContext } from "../hooks/useClientContext.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const ClientDetail = ({ clients }) => {
    const { dispatch } = useClientContext();

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toISOString().split("T")[0];
    };

    const [isEditing, setIsEditing] = useState(false);
    const [updateClient, setUpdateClient] = useState({
        firstName: clients.firstName || "",
        lastName: clients.lastName || "",
        moveInDate: formatDate(clients.moveInDate),
        dateOfBirth: formatDate(clients.dateOfBirth),
        diagnoses: clients.diagnoses || "",
    });

    return (
        <>
                <tr className="border-b hover:bg-gray-100 transition duration-150">
                    <td className="py-4 px-4">{clients.firstName} {clients.lastName}</td>
                    <td className="py-4 px-4">{formatDate(clients.dateOfBirth)}</td>
                    <td className="py-4 px-4">{formatDate(clients.moveInDate)}</td>
                    <td className="py-4 px-4">{clients.diagnoses}</td>
                    <td className="py-4 px-4 flex space-x-3">
                        <Link
                            to={`/client-profile/${clients._id}`}
                            className="text-green-600 hover:underline"
                        >
                            Detail
                        </Link>
                    </td>
                </tr>
        </>
    );
};

export default ClientDetail;
