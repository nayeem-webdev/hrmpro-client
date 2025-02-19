import { FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
  return (
    <div className="bg-primary text-white py-20 px-6 md:px-36">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg text-gray-200 mt-2 max-w-xl mx-auto">
          Stay updated with the latest HR trends, employee management tips, and
          exclusive insights from HRMPro.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full py-3 pl-12 pr-4 rounded-lg text-gray-800 focus:ring-2 focus:ring-white outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
