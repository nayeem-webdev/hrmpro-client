import React from "react";

const PricingPlansSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-center mb-4">
          Choose the Plan that Fits You
        </h2>
        <p className="text-center mb-12 max-w-lg mx-auto">
          Use coupon <strong>FIRSTBEE</strong> trial for first month free of
          cost. First try, then trust. We are great in this field.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col space-y-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Basic Plan
            </h3>
            <p className="text-gray-500 mb-4">For small businesses.</p>
            <p className="text-4xl font-bold text-gray-800 mb-4">$19/month</p>
            <ul className="text-left text-gray-600 mb-6 space-y-2">
              <li>Up to 20 users</li>
              <li>Basic Employee Management</li>
              <li>Basic Support</li>
              <li>Basic Reports</li>
            </ul>
            <button className="bg-primary text-white py-2 px-6 rounded-md">
              Start Free Trial
            </button>
          </div>

          <div className="bg-primary p-8 rounded-lg shadow-lg text-center flex flex-col space-y-6">
            <h3 className="text-2xl font-semibold text-white py-10">
              Professional Plan
            </h3>
            <p className="text-white/90 py-4">For growing businesses.</p>
            <p className="text-4xl font-bold text-white py-8">$49/month</p>
            <ul className="text-white/90 pb-10 space-y-2 mb-6 text-left">
              <li>Up to 100 users</li>
              <li>Advanced Workflow Automation</li>
              <li>Priority Support</li>
              <li>Custom Reports</li>
            </ul>
            <button className="bg-white text-primary py-2 px-6 rounded-md">
              Get Started
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col space-y-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Enterprise Plan
            </h3>
            <p className="text-gray-500 mb-4">For larger enterprises.</p>
            <p className="text-4xl font-bold text-gray-800 mb-4">$99/month</p>
            <ul className="text-left text-gray-600 mb-6 space-y-2">
              <li>Unlimited users</li>
              <li>Dedicated Account Manager</li>
              <li>Advanced Security Features</li>
              <li>Fully Customizable Features</li>
            </ul>
            <button className="bg-primary text-white py-2 px-6 rounded-md">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlansSection;
