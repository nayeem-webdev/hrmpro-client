import { FaRegNewspaper } from "react-icons/fa";

const CompanyNews = () => {
  const news = [
    {
      title: "HRMPro Wins Best HR Software Award 🎉",
      date: "February 15, 2025",
      description:
        "HRMPro has been recognized as the best HR management software for 2025! Thanks to all our users for your support.",
    },
    {
      title: "New Remote Work Policy Announced",
      date: "February 10, 2025",
      description:
        "We have introduced a new hybrid work policy. Employees can now work remotely twice a week!",
    },
    {
      title: "Payroll Processing Deadline: March 5",
      date: "February 5, 2025",
      description:
        "Make sure to submit all timesheets before the deadline to ensure smooth payroll processing.",
    },
    {
      title: "Employee Wellness Program Launched 🌿",
      date: "February 1, 2025",
      description:
        "We're excited to introduce our new wellness program, offering meditation sessions, fitness classes, and mental health support.",
    },
    {
      title: "HRMPro Dashboard Revamp 🚀",
      date: "January 25, 2025",
      description:
        "A new and improved dashboard experience is here! Enjoy a more intuitive interface with enhanced reporting features.",
    },
    {
      title: "Upcoming Leadership Training",
      date: "January 20, 2025",
      description:
        "Boost your leadership skills! Register now for our upcoming training sessions designed for managers and team leads.",
    },
  ];

  return (
    <div className="container mx-auto px-5 py-24 md:py-36">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Company News & Company News & Announcements
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Keep yourself updated with whats going on the world business and
          industry.
        </p>
      </div>
      <div className="space-y-6">
        {news.map((item, index) => (
          <div key={index} className="border-l-4 border-blue-600 pl-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
              <FaRegNewspaper className="text-blue-600" />
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">{item.date}</p>
            <p className="text-gray-700 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyNews;
