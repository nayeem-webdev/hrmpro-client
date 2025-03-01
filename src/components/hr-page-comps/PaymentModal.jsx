import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";
import { API } from "../../api/API";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const PaymentModal = ({ onClose, id, refetch }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    API.get(`/works?uid=${id}&paymentStatus=unpaid`)
      .then((res) => {
        const data = res.data;
        const result = data.reduce(
          (acc, item) => {
            acc.workIds.push(item._id);
            acc.totalPayment += item.totalPayment;
            acc.totalWorkHour += item.workHour;
            acc.name = item.name;
            acc.uid = item.uid;
            return acc;
          },
          { workIds: [], totalPayment: 0, totalWorkHour: 0, name: "", uid: "" }
        );
        setPaymentData(result);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("payment Failed");
        onClose();
      });
  }, [id, onClose]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    const currentYear = currentDate.getFullYear();
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const salaryData = {
      ...paymentData,
      trxId: "",
      isApproved: false,
      paymentDate: new Date(),
      payMonthAndYear: `${month} ${year}`,
    };
    API.post("/salaries", salaryData)
      .then(() => {
        API.patch("/update-status", {
          ids: salaryData.workIds,
          paymentStatus: "paid",
        })
          .then(() => {
            toast.success("Payment Request Successful");
            onClose();
            refetch();
          })
          .catch((err) => {
            console.log("Error:", err.message);
            toast.success("Payment Request Failed!");
            onClose();
          });
      })
      .catch((err) => {
        console.log("Error:", err.message);
        toast.success("Payment Request Failed!");
        onClose();
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Payment Details</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-gray-500 hover:text-black text-xl" />
          </button>
        </div>
        <hr className="my-4" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Salary
            </label>
            <div className="bg-gray-100 text-gray-800 p-2 rounded-md">
              ${paymentData.totalPayment}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Work Hour
            </label>
            <div className="bg-gray-100 text-gray-800 p-2 rounded-md flex items-center gap-1">
              <CiClock2 size={15} />
              {paymentData.totalWorkHour} hr.
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <label
                htmlFor="month"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Month
              </label>
              <input
                id="month"
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="Enter Month (e.g., January)"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Year
              </label>
              <input
                id="year"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Enter Year (e.g., 2025)"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Request Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

PaymentModal.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  refetch: PropTypes.func,
};

export default PaymentModal;
