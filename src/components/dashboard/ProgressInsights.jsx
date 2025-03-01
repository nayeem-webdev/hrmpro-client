import PropTypes from "prop-types";
import {
  FaClipboardCheck,
  FaClock,
  FaDollarSign,
  FaHourglassHalf,
} from "react-icons/fa";

const ProgressInsights = ({
  totalWorkDone,
  totalWorkHours,
  totalPaymentSettled,
  totalPaymentPending,
}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
      {/* Work Done */}
      <div className="flex items-center bg-white shadow-sm rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
        <FaClipboardCheck className="text-green-500 text-3xl mr-4" />
        <div>
          <h4 className="text-sm font-semibold text-gray-600">
            Work Completed
          </h4>
          <p className="text-lg font-bold text-gray-800">{totalWorkDone}</p>
        </div>
      </div>

      {/* Work Hours */}
      <div className="flex items-center bg-white shadow-sm rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
        <FaClock className="text-blue-500 text-3xl mr-4" />
        <div>
          <h4 className="text-sm font-semibold text-gray-600">Work Hours</h4>
          <p className="text-lg font-bold text-gray-800">{totalWorkHours}</p>
        </div>
      </div>

      {/* Payment Settled */}
      <div className="flex items-center bg-white shadow-sm rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
        <FaDollarSign className="text-yellow-500 text-3xl mr-4" />
        <div>
          <h4 className="text-sm font-semibold text-gray-600">
            Payments Settled
          </h4>
          <p className="text-lg font-bold text-gray-800">
            {totalPaymentSettled}
          </p>
        </div>
      </div>

      {/* Payment Pending */}
      <div className="flex items-center bg-white shadow-sm rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
        <FaHourglassHalf className="text-red-500 text-3xl mr-4" />
        <div>
          <h4 className="text-sm font-semibold text-gray-600">
            Payments Pending
          </h4>
          <p className="text-lg font-bold text-gray-800">
            {totalPaymentPending}
          </p>
        </div>
      </div>
    </div>
  );
};

ProgressInsights.propTypes = {
  totalWorkDone: PropTypes.number,
  totalWorkHours: PropTypes.number,
  totalPaymentSettled: PropTypes.number,
  totalPaymentPending: PropTypes.number,
};

export default ProgressInsights;
