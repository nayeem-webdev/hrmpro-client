import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API } from "../../api/API";
import { toast } from "react-toastify";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const UserDetailsModal = ({ closeModal, userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    API.get(`user/id/${userId}`)
      .then((res) => {
        res.data;
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Failed to show data");
        closeModal();
      });
  }, [userId, closeModal]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden max-h-screen">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-lg font-bold text-gray-800">User Details</h3>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* User Profile Picture */}
          <div className="flex gap-3 items-center mb-4">
            <div className="flex justify-center border-r-2 pr-3">
              <img
                src={user?.photoURL}
                alt="User"
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
            </div>
            <div>
              <p className="text-gray-700 text-xl font-semibold flex items-center gap-1">
                {user?.displayName}
                {user?.isVerified && (
                  <span>
                    <RiVerifiedBadgeFill className="text-lg text-primary" />
                  </span>
                )}
              </p>
              <p className="text-gray-700">
                {user?.userRole === "employee"
                  ? "Employee"
                  : user?.userRole === "admin"
                  ? "Admin"
                  : user?.userRole === "hr_executive"
                  ? "HR Executive"
                  : user?.userRole}
              </p>
            </div>
          </div>

          {/* User Info in a Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500 font-medium">Salary:</span>
              <p className="text-gray-700">${user?.details?.salary}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500 font-medium">
                Bank Account:
              </span>
              <p className="text-gray-700">
                {user?.details?.bankAccount || "N/A"}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500 font-medium">
                Designation:
              </span>
              <p className="text-gray-700">
                {user?.details?.designation || "N/A"}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500 font-medium">Fired:</span>
              <p className="text-gray-700">{user?.isFired ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={closeModal}
            className="w-full py-2 text-sm text-white bg-primary rounded hover:bg-primary/70 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

UserDetailsModal.propTypes = {
  userId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default UserDetailsModal;
