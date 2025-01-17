import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API } from "../../api/API";
import { toast } from "react-toastify";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UserDetailsPage = ({ userId = "6787f30e3fd281a4c48917ab" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    API.get(`user/id/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Failed to fetch user data");
      });
  }, [userId]);

  // Fake data for charts
  const earningsData = [
    { month: "January", earnings: 4000 },
    { month: "February", earnings: 3500 },
    { month: "March", earnings: 5000 },
    { month: "April", earnings: 4700 },
    { month: "May", earnings: 5300 },
    { month: "June", earnings: 4800 },
  ];

  const ordersData = [
    { month: "January", orders: 50 },
    { month: "February", orders: 40 },
    { month: "March", orders: 60 },
    { month: "April", orders: 70 },
    { month: "May", orders: 75 },
    { month: "June", orders: 65 },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 tracking-wide">
        User Details
      </h1>

      {/* User Profile */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="flex justify-center md:border-r-2 md:pr-4">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-md"
          />
        </div>
        <div className="text-center md:text-left">
          <p className="text-gray-700 text-lg md:text-xl font-semibold flex items-center justify-center md:justify-start gap-1">
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

      {/* User Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <span className="text-sm text-gray-500 font-medium">Salary:</span>
          <p className="text-gray-700">${user?.details?.salary}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500 font-medium">
            Bank Account:
          </span>
          <p className="text-gray-700">{user?.details?.bankAccount || "N/A"}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500 font-medium">
            Designation:
          </span>
          <p className="text-gray-700">{user?.details?.designation || "N/A"}</p>
        </div>

        <div>
          <span className="text-sm text-gray-500 font-medium">Fired:</span>
          <p className="text-gray-700">{user?.isFired ? "Yes" : "No"}</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full">
          <h4 className="text-lg font-bold text-gray-800 mb-4">
            Earnings by Month
          </h4>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="w-full">
          <h4 className="text-lg font-bold text-gray-800 mb-4">
            Orders Completed by Month
          </h4>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

UserDetailsPage.propTypes = {
  userId: PropTypes.string.isRequired,
  navigateBack: PropTypes.func.isRequired,
};

export default UserDetailsPage;
