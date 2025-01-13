import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo */}
          <div className="text-xl flex justify-center md:justify-start font-bold mb-4 md:mb-0 w-full md:w-1/3">
            <Link to="/" className="text-primary">
              Dine
            </Link>
            Flow
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center space-x-6 text-sm md:text-base w-full md:w-1/3">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link
              to="/all-foods"
              className="hover:text-primary transition-colors"
            >
              All Foods
            </Link>
            <Link
              to="/gallery"
              className="hover:text-primary transition-colors"
            >
              Gallery
            </Link>
          </div>

          {/* Social Icons */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end ">
            <div className="flex space-x-4 mt-4 md:mt-0 ">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-primary transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-primary transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-400 hover:text-primary transition-colors"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} DineFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
