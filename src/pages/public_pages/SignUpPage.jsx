import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const { createUser, updateUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Pass verify
  const [passFocus, setPassFocus] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  const [role, setRole] = useState("employee");
  const [designation, setDesignation] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");

  const verifyPass = (e) => {
    const passValue = e.target.value;

    // Check Characters
    setHasUppercase(/[A-Z]/.test(passValue));
    setHasLowercase(/[a-z]/.test(passValue));
    setHasSymbol(/[!@#$%*]/.test(passValue));
    setIsLong(passValue.length >= 8);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;
    const photoUrl = form.photoUrl.value;
    const emailRegister = form.emailRegister.value;
    const passwordRegister = form.passwordRegister.value;

    if (isLong && hasSymbol && hasLowercase && hasUppercase) {
      createUser(emailRegister, passwordRegister)
        .then(() => {
          updateUser(fullName, photoUrl).then(() => {
            toast.success("User Register Successful!");
            navigate("/account");
          });
        })
        .catch((err) => {
          console.log(err.message);
          toast.error("User Register Failed!");
        });
    }
  };

  return (
    <div className="container mx-auto flex flex-col-reverse lg:flex-row py-20 max-w-screen-lg">
      {/* Left: Image Section */}
      <div
        className="lg:w-1/2 hidden lg:flex bg-cover bg-center rounded-lg"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg)",
        }}
      >
        {/* You can add any content you want inside here */}
      </div>

      {/* Right: Form Section */}
      <div className=" lg:w-1/2 w-full flex justify-center items-center lg:px-10 px-6 lg:py-20">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Register Your Account
          </h1>

          {/* Sign-Up Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                type="email"
                id="emailRegister"
                name="emailRegister"
                placeholder="Email address"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                type="password"
                id="passwordRegister"
                name="passwordRegister"
                placeholder="Password"
                onFocus={() => setPassFocus(true)}
                onChange={verifyPass}
                required
              />
            </div>

            {/* Password Validation Rules */}
            {passFocus && (
              <ul className="text-sm text-gray-500 mt-2">
                <li
                  className={`text-[12px] ${
                    hasUppercase ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Must have an uppercase letter.
                </li>
                <li
                  className={`text-[12px] ${
                    hasLowercase ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Must have a lowercase letter.
                </li>
                <li
                  className={`text-[12px] ${
                    hasSymbol ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Must have a symbol ! @ # $ % *.
                </li>
                <li
                  className={`text-[12px] ${
                    isLong ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Must be 8 characters long.
                </li>
              </ul>
            )}

            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="employee">Employee</option>
                <option value="hr_executive">HR Executive</option>
              </select>
            </div>

            {/* Show additional fields for Employee role */}
            {role === "employee" && (
              <>
                {/* Designation Field */}
                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <select
                    id="designation"
                    name="designation"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                    <option value="">Select Designation</option>
                    <option value="Sales Assistant">Sales Assistant</option>
                    <option value="Social Media Executive">
                      Social Media Executive
                    </option>
                    <option value="Digital Marketer">Digital Marketer</option>
                    <option value="Content Writer">Content Writer</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Admin Executive">Admin Executive</option>
                  </select>
                </div>

                {/* Bank Account Number Field */}
                <div>
                  <label
                    htmlFor="bankAccountNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bank Account No
                  </label>
                  <input
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    type="text"
                    id="bankAccountNo"
                    name="bankAccountNo"
                    placeholder="Enter Bank Account No"
                    value={bankAccountNo}
                    onChange={(e) => setBankAccountNo(e.target.value)}
                  />
                </div>

                {/* Salary Amount Field */}
                <div>
                  <label
                    htmlFor="salaryAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Salary Amount
                  </label>
                  <input
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    type="number"
                    id="salaryAmount"
                    name="salaryAmount"
                    placeholder="Enter Salary Amount"
                    value={salaryAmount}
                    onChange={(e) => setSalaryAmount(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primary/70 transition"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Link to Login Page */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-medium">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
