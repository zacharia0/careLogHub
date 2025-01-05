
import {Link, } from "react-router-dom";

const EmployeeDetail = ({employees}) => {

    return (


        <tr className="border-b hover:bg-gray-100 transition duration-150">

            <td className="py-4 px-4">{employees?.firstName}</td>
            <td className="py-4 px-4">{employees?.lastName}</td>
            {/*<td className="py-4 px-4">{employees?.middleName}</td>*/}
            <td className="py-4 px-4">{employees?.username}</td>
            <td className='py-4 px-4 flex space-x-3'>
                <Link
                    to={`/employee-profile/${employees?._id}`}
                    className={"text-green-600 hover:underline"}
                >
                    Detail
                </Link>
            </td>


        </tr>
    )
}

export default EmployeeDetail