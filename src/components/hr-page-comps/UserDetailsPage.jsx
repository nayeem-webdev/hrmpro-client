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
  Line,
  ComposedChart,
} from "recharts";
import { useParams } from "react-router-dom";

const UserDetailsPage = () => {
  const userId = useParams();
  console.log(userId);
  const [user, setUser] = useState({});
  const [earningsData, setEarningsData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [userResponse, earningsResponse, paidResponse] =
          await Promise.all([
            API.get(`/user/id/${userId?.id}`),
            API.get(`/stats/earnings/${user?.uid}`),
            API.get(`/stats/paid/${user?.uid}`),
          ]);
        setUser(userResponse.data);
        setEarningsData(earningsResponse.data);
        setPaymentData(paidResponse.data);
      } catch (err) {
        console.error(err.message);
        toast.error("Failed to fetch user data");
      }
    };
    fetchAllData();
  }, [user?.uid, userId.id]);

  console.log(user.uid);
  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 tracking-wide">
        User Details
      </h1>

      {/* User Profile */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6 ">
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
            Earnings by Date
          </h4>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalPayments" fill="#1e90ff" />
                <Line
                  dataKey="totalWorkHours"
                  stroke="#21409a"
                  strokeWidth={3}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full">
          <h4 className="text-lg font-bold text-gray-800 mb-4">
            Payment Status
          </h4>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={paymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis hide type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="paymentReceived" fill="#5cb85c" />
                <Bar dataKey="paymentPending" fill="#f7cb73" />
                <Bar dataKey="waitingForPayment" fill="#D9512C" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsPage;
