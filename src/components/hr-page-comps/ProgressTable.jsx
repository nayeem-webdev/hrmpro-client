import NothingToShow from "../shared/NothingToShow";
import Loading from "../shared/Loading";
import DisplayDate from "../shared/DisplayDate";

import PropTypes from "prop-types";

const ProgressTable = ({ isPending, error, data }) => {
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
                Work Name
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Work Type
              </th>

              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Work Time(Hr.)
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Date
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Payment
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
                <td className="py-2 px-4 ">{item.name}</td>
                <td className="py-2 px-4">{item.workDetails}</td>
                <td className="py-2 px-4 text-center">{item.work}</td>
                <td className="py-2 px-4 text-center">{item.workHour}</td>
                <td className="py-2 px-4 text-center">
                  <DisplayDate date={item.date} />
                </td>
                <td className="py-2 px-4 text-center flex justify-center">
                  {item.paymentStatus === "paid" ? (
                    <p className="bg-green-50 text-green-500 py-1 px-3 rounded-full">
                      Paid
                    </p>
                  ) : (
                    <p className="bg-red-50 text-red-500 py-1 px-3 rounded-full">
                      Unpaid
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

ProgressTable.propTypes = {
  isPending: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.array.isRequired,
};
export default ProgressTable;
