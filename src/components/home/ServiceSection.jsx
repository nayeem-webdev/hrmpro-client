import React from "react";
import {
  FaUserPlus,
  FaTasks,
  FaChartLine,
  FaRegCreditCard,
  FaMoneyBillWave,
  FaUsersCog,
  FaChalkboardTeacher,
  FaChalkboard,
} from "react-icons/fa";

const ServiceSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-center mb-12 max-w-lg mx-auto">
          We Provide all kind of Employee Management Solution!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="service-item bg-white p-6 rounded-lg shadow-lg text-center">
            <FaUserPlus className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700">
              Employee Registration
            </h3>
            <p className="text-gray-500 mt-2">
              Simplify the employee onboarding process with efficient
              registration tools.
            </p>
          </div>

          <div className="service-item bg-white p-6 rounded-lg shadow-lg text-center">
            <FaTasks className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700">
              Workflow Tracking
            </h3>
            <p className="text-gray-500 mt-2">
              Seamlessly track workflow progress to ensure smooth project
              execution.
            </p>
          </div>

          <div className="service-item bg-white p-6 rounded-lg shadow-lg text-center">
            <FaChartLine className="text-yellow-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700">Stats</h3>
            <p className="text-gray-500 mt-2">
              Gain insights with powerful data analysis to guide business
              decisions.
            </p>
          </div>

          {/* Payment */}
          <div className="service-item bg-white p-6 rounded-lg shadow-lg text-center">
            <FaRegCreditCard className="text-purple-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700">Payment</h3>
            <p className="text-gray-500 mt-2">
              Simplify payment processes with fast, secure, and easy solutions.
            </p>
          </div>

          <div className="service-item bg-white p-6 rounded-lg shadow-lg text-center">
            <FaMoneyBillWave className="text-indigo-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700">Payroll</h3>
            <p className="text-gray-500 mt-2">
              Effortlessly manage employee payroll with automated calculations
              and easy payouts.
            </p>
          </div>

          <div className="service-item bg-white p-6 rounded-lg shadow-lg text-center">
            <FaUsersCog className="text-teal-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700">Admin Panel</h3>
            <p className="text-gray-500 mt-2">
              Manage your company's human resources with a powerful admin
              dashboard for full control.
            </p>
          </div>

          <div className="service-item bg-white p-6 rounded-lg shadow-lg text-center">
            <FaChalkboardTeacher className="text-orange-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700">
              Employee Dashboard
            </h3>
            <p className="text-gray-500 mt-2">
              Empower employees with a personal dashboard for tracking their
              performance and activities.
            </p>
          </div>

          <div className="service-item bg-white p-6 rounded-lg shadow-lg text-center">
            <FaChalkboard className="text-red-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-700">
              HR Dashboard
            </h3>
            <p className="text-gray-500 mt-2">
              A dedicated dashboard for HR teams to monitor employee metrics,
              manage HR tasks, and optimize HR operations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
