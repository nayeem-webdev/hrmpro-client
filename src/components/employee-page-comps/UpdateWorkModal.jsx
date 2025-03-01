import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API } from "../../api/API";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const UpdateWorkModal = ({ workId, closeModal, refetch }) => {
  const [workDetails, setWorkDetails] = useState("");
  const [work, setWork] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [hourRate, setHourRate] = useState(0);

  useEffect(() => {
    API.get(`/work/${workId}`)
      .then((res) => {
        const data = res.data;
        setWorkDetails(data?.workDetails || "");
        setWork(data?.work || "");
        setHoursWorked(data?.workHour || "");
        setHourRate(
          data?.hourRate || data?.totalPayment / (data?.workHour || 1)
        );
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Failed to fetch work data");
        closeModal();
      });
  }, [workId, closeModal]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 30) {
      setWorkDetails(inputValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedWork = {
      work: work,
      workDetails: workDetails,
      workHour: parseFloat(hoursWorked),
      totalPayment: hourRate * parseFloat(hoursWorked),
    };

    API.patch(`/work/${workId}`, updatedWork)
      .then(() => {
        toast.success("Work updated successfully");
        refetch();
        closeModal();
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Failed to update work");
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-full md:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Update Work</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-full">
            <label
              htmlFor="workDetails"
              className="block text-sm text-gray-700 mb-2"
            >
              Work Details
            </label>
            <input
              type="text"
              id="workDetails"
              placeholder="Enter Work Details"
              value={workDetails}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p className="text-xs text-gray-500 absolute bottom-2 right-3">
              {workDetails?.length}/30
            </p>
          </div>
          <div>
            <label
              htmlFor="workType"
              className="block text-sm text-gray-700 mb-2"
            >
              Work Type
            </label>
            <select
              value={work}
              onChange={(e) => setWork(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select type</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
              <option value="content">Content</option>
              <option value="content">Administration</option>
              <option value="content">Copy Writing</option>
              <option value="content">Administration</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="workHour"
              className="block text-sm text-gray-700 mb-2"
            >
              Work Hour
            </label>
            <input
              type="number"
              placeholder="Hours Worked"
              value={hoursWorked}
              onChange={(e) => setHoursWorked(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Update Work
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

UpdateWorkModal.propTypes = {
  workId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default UpdateWorkModal;
