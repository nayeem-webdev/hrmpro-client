import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "react-tooltip";
import ProgressInsights from "../../components/dashboard/ProgressInsights";

const DashboardStats = () => {
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
    <>
      <ProgressInsights />
      <div className="flex flex-col gap-6 lg:flex-row">
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
              <BarChart layout="vertical" data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardStats;
