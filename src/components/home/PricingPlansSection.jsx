import { FaTimes } from "react-icons/fa";
import { HiOutlineCheck } from "react-icons/hi";

const PricingSection = () => {
  return (
    <section className="py-16 bg-gray-50" id="pricing">
      <div className="container mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Our Pricing Plans
        </h1>
        <p className="text-lg text-gray-600">
          Choose the best plan for your business.
        </p>
      </div>
      <div className="flex justify-center gap-6 flex-wrap">
        {/* Card 1: Basic */}
        <div className="border-2 rounded-lg p-6 bg-white text-gray-900 border-gray-200 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Basic</h2>
          <div className="text-4xl font-bold mb-4">$99/month</div>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />1 User
              Account
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />
              Email Support
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />
              Basic Analytics
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />
              Basic report
            </li>
            <li className="flex items-center">
              <FaTimes className="text-sm mr-2 text-red-500" />
              No account Manager{" "}
            </li>
          </ul>
          <button className="w-full py-2 rounded-md font-semibold bg-primary text-white border-transparent">
            Select Plan
          </button>
        </div>

        {/* Card 2: Pro (Accent Card) */}
        <div className="border-2 rounded-lg p-6 bg-primary text-white border-primary transform transition-all hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Pro</h2>
          <div className="text-4xl font-bold mb-4">$199/month</div>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-white" />5 User
              Accounts
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-white" />
              24/7 Support
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-white" />
              Advanced Analytics
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-white" />
              Custom Reporting
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />
              Group Account Manager
            </li>
          </ul>
          <button className="w-full py-2 rounded-md font-semibold bg-white text-primary border-primary">
            Select Plan
          </button>
        </div>

        {/* Card 3: Enterprise */}
        <div className="border-2 rounded-lg p-6 bg-white text-gray-900 border-gray-200 transform transition-all hover:scale-105">
          <h2 className="text-2xl font-bold mb-4">Enterprise</h2>
          <div className="text-4xl font-bold mb-4">$299/month</div>
          <ul className="mb-6 space-y-2">
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />
              20+ User Accounts
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />
              Priority 24/7 Support
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />
              Unlimited Analytics
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />
              Dedicated Account Manager
            </li>
            <li className="flex items-center">
              <HiOutlineCheck className="text-sm mr-2 text-green-500" />
              Custom Integrations
            </li>
          </ul>
          <button className="w-full py-2 rounded-md font-semibold bg-primary text-white border-transparent">
            Select Plan
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
