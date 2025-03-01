import { Helmet } from "react-helmet";
import {
  FaUsers,
  FaClock,
  FaHandshake,
  FaCreditCard,
  FaTasks,
} from "react-icons/fa";
import Title from "../../components/shared/Title";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div>
      <Helmet>
        <title>HRMPro | About</title>
      </Helmet>
      <Title
        pageName="About HRMPro"
        backgroundImage="https://i.ibb.co/HHWDWhy/pexels-photo-5827818.jpg"
        subHeading="The Ultimate Solution for Employee Management"
      />

      <section className="container mx-auto px-5 md:px-10 my-20">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What is HRMPro?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            HRMPro is a comprehensive employee management platform designed to
            help HR departments effectively manage employees, monitor workflows,
            track tasks, and automate payroll systems. With HRMPro, streamline
            all HR operations in one seamless, intuitive interface.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you are managing a team or a whole organization, HRMPro
            helps to ensure that the right tasks are being completed on time,
            employees are efficiently managed, and that payment requests are
            processed quickly and accurately. It&apos;s an all-in-one solution
            for increasing productivity, improving HR processes, and keeping
            employees satisfied and engaged.
          </p>
        </div>
      </section>

      <section className="py-10 mb-20 px-8">
        <div className="container mx-auto max-w-screen-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="flex flex-col items-center bg-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-6 rounded-lg">
              <FaUsers className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold">Employee Management</h3>
              <p className="text-lg text-gray-600 mt-2">
                Easily add, track, and manage employees with detailed profiles.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-6 rounded-lg">
              <FaClock className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold">Workflow Monitoring</h3>
              <p className="text-lg text-gray-600 mt-2">
                Monitor the progress of assigned tasks and workflow status.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-6 rounded-lg">
              <FaHandshake className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold">HR Task & Payroll</h3>
              <p className="text-lg text-gray-600 mt-2">
                Request and approve payroll, task assignments, and evaluations.
              </p>
            </div>
            <div className="flex flex-col items-center bg-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out p-6 rounded-lg">
              <FaCreditCard className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-bold">Payment Requests</h3>
              <p className="text-lg text-gray-600 mt-2">
                Process payment requests with just a few clicks for a smooth
                payroll experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-gray-200">
        <div className="container mx-auto max-w-screen-lg text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Ready to Improve Your HR Process?
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Let&apos;s connect and show you how HRMPro can transform your
            employee management.
          </p>

          <div className="flex justify-center space-x-8">
            <Link to={"/contact"} className="flex items-center space-x-2">
              <div className="flex items-center bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-200 px-6 py-3 rounded-md cursor-pointer shadow-md">
                <FaUsers className="text-3xl" />
                <span className="text-lg ml-2">Reach out to our team</span>
              </div>
            </Link>
            <Link to={"/register"} className="flex items-center space-x-2">
              <div className="flex items-center bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-200 px-6 py-3 rounded-md cursor-pointer shadow-md">
                <FaTasks className="text-3xl" />
                <span className="text-lg ml-2">Get started with HRMPro</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
