import { FaUsers, FaCogs, FaChartBar, FaRegClipboard } from "react-icons/fa";

const HowItWorksSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-center mb-4">How We Work? </h2>
        <p className="text-center mb-12 max-w-lg mx-auto">
          Know more about our workflow. and try us first month for free.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          <div className="w-full text-center bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="bg-blue-600 w-16 h-16 rounded-full mx-auto mb-6 flex justify-center items-center">
              <FaUsers className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Step 1: Onboarding
            </h3>
            <p className="text-gray-600">
              Easily onboard new employees by capturing essential data in a
              simple interface.
            </p>
          </div>

          <div className="w-full text-center bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="bg-teal-500 w-16 h-16 rounded-full mx-auto mb-6 flex justify-center items-center">
              <FaCogs className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Step 2: Manage Employee Data
            </h3>
            <p className="text-gray-600">
              Store and manage all employee information with quick access to
              essential details.
            </p>
          </div>

          <div className="w-full text-center bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="bg-yellow-500 w-16 h-16 rounded-full mx-auto mb-6 flex justify-center items-center">
              <FaChartBar className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Step 3: Automate Workflow
            </h3>
            <p className="text-gray-600">
              Streamline HR tasks such as approvals and feedback with automated
              workflows.
            </p>
          </div>

          <div className="w-full text-center bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="bg-indigo-600 w-16 h-16 rounded-full mx-auto mb-6 flex justify-center items-center">
              <FaRegClipboard className="text-white text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Step 4: Insights & Reports
            </h3>
            <p className="text-gray-600">
              Leverage powerful reporting and analytics tools to track
              performance and progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
