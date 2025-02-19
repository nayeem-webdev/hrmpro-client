import { FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const SalesPromotion = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Why Businesses Love HRMPro
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Join thousands of companies that trust HRMPro to simplify employee
          management and enhance productivity.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <img
            src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg"
            alt="HRMPro Dashboard"
            className="w-full max-w-md md:max-w-lg lg:max-w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md flex flex-col relative">
            <FaQuoteLeft className="text-3xl md:text-4xl text-blue-500 absolute -top-4 -left-4" />
            <p className="text-gray-700 text-base md:text-lg">
              &quot;HRMPro transformed our HR processes. Payroll is seamless,
              and employee management has never been easier!&quot;
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-4">
              John Doe
            </h3>
            <p className="text-gray-500">HR Manager, TechCorp</p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md flex flex-col relative">
            <FaQuoteLeft className="text-3xl md:text-4xl text-blue-500 absolute -top-4 -left-4" />
            <p className="text-gray-700 text-base md:text-lg">
              &quot;The analytics feature provides us with valuable insights,
              making workforce planning much more efficient.&quot;
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-4">
              Sarah Williams
            </h3>
            <p className="text-gray-500">Operations Head, FinTech Solutions</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          to="/login"
          className="text-blue-600 font-semibold text-lg flex items-center justify-center hover:underline"
        >
          Get Started with HRMPro <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default SalesPromotion;
