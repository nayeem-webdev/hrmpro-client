import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../api/API";

const imageHostApi = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMG_HOST_KEY
}`;

const SignUpPage = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //$$ Pass Verify
  const [passFocus, setPassFocus] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);

  const verifyPass = (e) => {
    const passValue = e.target.value;
    setHasUppercase(/[A-Z]/.test(passValue));
    setHasLowercase(/[a-z]/.test(passValue));
    setHasSymbol(/[!@#$%*]/.test(passValue));
    setIsLong(passValue.length >= 8);
  };
  //$$ Pass Verify

  //$$ Form Values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("");
  const [designation, setDesignation] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLong && hasSymbol && hasLowercase && hasUppercase) {
      createUser(email, pass)
        .then(async (res) => {
          const uid = res.user.uid;
          // ?? image
          const fileInput = e.target.elements.uploadImage.files[0];
          if (!fileInput) {
            toast.error("Choose A valid Image File");
            setLoading(false);
            return;
          }
          const formData = new FormData();
          formData.append("image", fileInput);
          try {
            const response = await API.post(imageHostApi, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            const PhotoURL = response.data.data.display_url;
            updateUser(name, PhotoURL).then(() => {
              const newUser = {
                email: email,
                displayName: name,
                photoURL: PhotoURL,
                uid: uid,
                userRole: role,
                isVerified: false,
                isFired: false,
                details: {
                  bankAccount: bankAccountNo,
                  salary: parseFloat(salaryAmount),
                  designation: designation,
                },
              };
              API.post("/user", newUser)
                .then((res) => {
                  console.log(res.data);
                  setLoading(false);
                  navigate("/dashboard");
                  toast.success("User Register Successful!");
                })
                .catch((err) => {
                  setLoading(false);
                  console.error("Error Creating Item:", err.message);
                  toast.error("Failed to Add User!");
                });
            });
          } catch (err) {
            setLoading(false);
            console.error("Upload Error:", err);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.message);
          toast.error("User Register Failed!");
        });
    }
  };

  const passOnChange = (e) => {
    verifyPass(e);
    setPass(e.target.value);
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
      ></div>

      {/* Right: Form Section */}
      <div className=" lg:w-1/2 w-full flex justify-center items-center lg:px-10 px-6 lg:py-20">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-6">
            Register Your Account
          </h1>

          {/* SignUp Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-600">*</span>
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <input
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
                required
                onChange={passOnChange}
              />

              {/* Password */}
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
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role <span className="text-red-600">*</span>
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                defaultValue=""
                required
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" disabled>
                  Select Role
                </option>

                <option value="employee">Employee</option>
                <option value="hr_executive">HR Executive</option>
              </select>
            </div>

            {/* additional fields for Employee */}
            {role === "employee" && (
              <>
                {/* Designation Field */}
                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="designation"
                    name="designation"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    defaultValue=""
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Designation
                    </option>
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

                {/* Bank Account */}
                <div>
                  <label
                    htmlFor="bankAccountNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bank Account No <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    type="number"
                    id="bankAccountNo"
                    name="bankAccountNo"
                    placeholder="Enter Bank Account No"
                    onChange={(e) => setBankAccountNo(e.target.value)}
                  />
                </div>

                {/* Salary Amount */}
                <div>
                  <label
                    htmlFor="salaryAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Salary Amount <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    type="number"
                    id="salaryAmount"
                    name="salaryAmount"
                    placeholder="Enter Salary Amount"
                    onChange={(e) => setSalaryAmount(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Img Upload */}
            <div className="flex flex-col items-start">
              <label
                htmlFor="uploadImage"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image <span className="text-red-600">*</span>
              </label>

              <input
                type="file"
                id="uploadImage"
                name="uploadImage"
                accept="image/*"
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                required
              />

              <p className="mt-2 text-sm text-gray-500">
                Supported formats: JPG, PNG, GIF (Max: 5MB).
              </p>
            </div>

            {/* SignUp Button */}
            <button
              type="submit"
              className="mt-4 w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-primary/70 transition"
              disabled={loading}
            >
              <div className="flex items-center justify-center">
                {loading ? (
                  <span className="flex space-x-1">
                    <span className="animate-pulse">Signing Up . . . </span>
                  </span>
                ) : (
                  "Sign Up"
                )}
              </div>
            </button>
          </form>

          {/* Link Login Page */}
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
