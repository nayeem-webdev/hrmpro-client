import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaRegPaperPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { TbLocationPin } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Helmet } from "react-helmet";
import Title from "../../components/shared/Title";
import { API } from "../../api/API";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    API.post("/mails", formData)
      .then(() => {
        toast.success("We Have Received Your Mail!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
        toast.error("Failed to send email!");
      });
  };

  return (
    <>
      <Helmet>
        <title>HRMpro | Contact</title>
      </Helmet>
      <Title
        pageName="Contact Us"
        backgroundImage="https://i.ibb.co.com/HHWDWhy/pexels-photo-5827818.jpg"
        subHeading="let's Connect, Leave a massage"
      />
      <div className="container mx-auto px-5 md:px-10 my-20">
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* Right section: Address info */}
          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-8 space-y-2 justify-center text-black mt-10">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center hover:underline hover:text-primary">
                <FaRegPaperPlane />
                <a
                  href="mailto:nayeem.webdev@gmail.com"
                  target="_blank"
                  className="ml-4 text-lg "
                >
                  Shoot us an email
                </a>
              </div>
              <div className="flex items-center hover:underline hover:text-primary">
                <FaWhatsapp />
                <a
                  href="https://wa.me/+8801852503030"
                  target="_blank"
                  className="ml-4 text-lg "
                >
                  Catch us on WhatsApp
                </a>
              </div>
              <h2 className="text-xl font-medium pt-4">Give a Call</h2>
              <p className="text-black/50/50 pb-1">Sun-Thu from 10am to 7pm</p>
              <div className="flex items-center hover:underline hover:text-primary">
                <FiPhoneCall />
                <a
                  href="tel:+8801701048078"
                  target="_blank"
                  className="ml-4 text-lg "
                >
                  +88 01701 048078
                </a>
              </div>
              <div className="flex items-center hover:underline hover:text-primary">
                <FiPhoneCall />
                <a
                  href="tel:+8801852503030"
                  target="_blank"
                  className="ml-4 text-lg "
                >
                  +88 01852 503030
                </a>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl font-medium pt-4 pb-1 ">
                We are Located at
              </h2>
              <div className="flex items-center hover:underline hover:text-primary">
                <TbLocationPin />
                <a
                  href="https://www.google.com/maps/place/Chittagong/"
                  target="_blank"
                  className="ml-4 text-lg "
                >
                  Chittagong, Bangladesh
                </a>
              </div>

              <h2 className="text-xl font-medium pt-4 pb-1 ">Give a Watch</h2>

              <div className="flex items-center hover:underline hover:text-primary">
                <FaGithub />
                <a
                  href="https://github.com/nayeem-webdev"
                  target="_blank"
                  className="ml-4 text-lg "
                >
                  GitHub
                </a>
              </div>
              <div className="flex items-center hover:underline hover:text-primary">
                <FaLinkedinIn />
                <a
                  href="https://www.linkedin.com/in/nayeem33/"
                  target="_blank"
                  className="ml-4 text-lg "
                >
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center hover:underline hover:text-primary">
                <FaFacebookF />
                <a
                  href="https://www.facebook.com/nayeem33r/"
                  target="_blank"
                  className="ml-4 text-lg "
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-md text-black/80/80 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-black/5 border text-gray-800 focus:ring-2 focus:ring-primary "
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-md text-black/80/80 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-black/5 border text-gray-800 focus:ring-1 focus:ring-primary focus:ring-opacity-50"
                />
              </div>
              {/* subject Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-md text-black/80/80 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-black/5 border text-gray-800 focus:ring-1 focus:ring-primary focus:ring-opacity-50"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-md text-black/80/80 mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="3"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md bg-black/5 border text-gray-800 focus:ring-1 focus:ring-primary focus:ring-opacity-50"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold px-6 py-3 rounded-md hover:bg-primary/80 focus:ring-2 focus:ring-primary"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
