import NothingToShow from "../shared/NothingToShow";
import Loading from "../shared/Loading";
import PropTypes from "prop-types";
import DisplayDate from "../shared/DisplayDate";

const PaymentHistoryTable = ({ isLoading, error, data }) => {
  if (error) {
    return <NothingToShow />;
  }
  if (isLoading) {
    return (
      <Loading bg="https://i.ibb.co.com/jb4bG4d/Employee-Grievances-Management.gif" />
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-black/20">
              <th className="text-left px-4 py-2">Payment Date</th>
              <th className="px-4 py-2 w-2/4">Month/Year</th>
              <th className="px-4 pr-8 py-2">Amount</th>
              <th className="px-4 pr-8 py-2">Status</th>
              <th className="px-4 pr-8 py-2">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={item?._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-2 px-4">
                  <DisplayDate date={item?.paymentDate} />
                </td>
                <td className="py-2 px-4">{item?.payMonthAndYear}</td>
                <td className="py-2 px-4 text-center">{item?.totalPayment}</td>
                <td className="py-2 px-4 text-center">
                  {item?.isApproved ? (
                    <p className="bg-green-200 text-green-700 rounded-full py-1 px-2 text-sm">
                      Approved
                    </p>
                  ) : (
                    <p className="bg-yellow-100 text-yellow-700 rounded-full py-1 px-2 text-sm">
                      Pending
                    </p>
                  )}
                </td>
                <td className="py-2 px-4 text-center">
                  {item?.trxId || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

PaymentHistoryTable.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.array.isRequired,
};
export default PaymentHistoryTable;
