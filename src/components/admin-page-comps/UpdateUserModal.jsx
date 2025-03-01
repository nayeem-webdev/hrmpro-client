import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { API } from "../../api/API";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const UpdateUserModal = ({ id, closeModal, refetch }) => {
  const [userRole, setUserRole] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState(0);
  const [bank, setBank] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    API.get(`/user?id=${id}`)
      .then((res) => {
        const data = res.data;
        setUserRole(data?.userRole || "");
        setDesignation(data?.details?.designation || "");
        setSalary(data?.details?.salary || 1);
        setBank(data?.details?.bankAccount || 1);
        setUser(data);
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Failed to fetch work data");
        closeModal();
      });
  }, [id, closeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = {
      userRole: userRole,
      details: {
        salary: parseFloat(salary),
        designation: designation,
        bankAccount: bank,
      },
    };

    API.patch(`/user/${id}`, updates)
      .then(() => {
        toast.success("User updated successfully");
        refetch();
        closeModal();
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Failed to update User");
        closeModal();
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-full md:w-3/4 lg:w-1/2 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Update {user?.displayName}&apos;s Data
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-full">
            <label
              htmlFor="userRole"
              className="block text-sm text-gray-700 mb-2"
            >
              User Role
            </label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select Designation
              </option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="hr_executive">HR Executive</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="designation"
              className="block text-sm text-gray-700 mb-2"
            >
              Designation
            </label>
            <select
              id="designation"
              name="designation"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            >
              <option value="" disabled>
                Select Designation
              </option>
              <option value="Sales Assistant">Sales Assistant</option>
              <option value="Social Media Executive">
                Social Media Executive
              </option>
              <option value="Digital Marketer">Digital Marketer</option>
              <option value="Content Writer">Content Writer</option>
              <option value="Customer Support">Customer Support</option>
              <option value="Admin Executive">Admin Executive</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="salary"
              className="block text-sm text-gray-700 mb-2"
            >
              Salary
            </label>
            <input
              type="number"
              placeholder="Salary (P.H.)"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Update User
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

UpdateUserModal.propTypes = {
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
  refetch: PropTypes.func,
};

export default UpdateUserModal;
