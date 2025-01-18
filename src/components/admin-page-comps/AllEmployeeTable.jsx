import NothingToShow from "../shared/NothingToShow";
import Loading from "../shared/Loading";

import PropTypes from "prop-types";
import { FaShield } from "react-icons/fa6";
import { FaEye, FaFire } from "react-icons/fa";

const AllEmployeeTable = ({ isPending, error, data }) => {
  if (error) {
    return <NothingToShow />;
  }
  if (isPending) {
    return (
      <Loading bg="https://i.ibb.co.com/jb4bG4d/Employee-Grievances-Management.gif" />
    );
  }

  return (
    <>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Sl.
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Name
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Email
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Designation
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Account No
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Salary
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="py-2 px-4 ">{item.displayName}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4 text-center">
                  {item.details.designation}
                </td>
                <td className="py-2 px-4 text-center">
                  {item.details.bankAccount}
                </td>
                <td className="py-2 px-4 text-center">
                  ${item.details.salary} (Per hour)
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    title="pay"
                    className="text-orange-500 hover:text-orange-800"
                  >
                    <FaFire />
                  </button>
                  <button
                    title="verify"
                    className="ml-4 text-blue-400 hover:text-blue-700"
                  >
                    <FaShield />
                  </button>
                  <button className="ml-4 text-orange-400 hover:text-orange-700">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

AllEmployeeTable.propTypes = {
  isPending: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.array.isRequired,
  refetch: PropTypes.func,
};
export default AllEmployeeTable;
