import { useState, useContext, useEffect } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../api/API";
import auth from "../firebase/firebase.init";
 
const imageHostApi = `https://api.imgbb.com/1/upload?key${
  import.meta.env.VITE_IMG_HOST_KEY
}`;

const SignUpPage = () => {
  const { createUser, loading, setUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [passFocus, setPassFocus] = useState(false);
  const [isLong, setIsLong] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("");
  const [designation, setDesignation] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");

  // Password validation logic
  const verifyPass = (e) => {
    const passValue = e.target.value;
    setHasUppercase(/[A-Z]/.test(passValue));
    setHasLowercase(/[a-z]/.test(passValue));
    setHasSymbol(/[!@#$%*]/.test(passValue));
    setIsLong(passValue.length >= 8);
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    const imageFile = { image: e.target.elements.uploadImage.files[0] };

    if (isLong && hasSymbol && hasLowercase && hasUppercase) {
      setLoading(true);
      try {
        const userCredential = await createUser(email, pass);
        const currentUser = userCredential.user;

        const res = await API.post(imageHostApi, imageFile, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const photoURL = res.data.data.display_url;

        await updateProfile(currentUser, {
          displayName: name,
          photoURL: photoURL,
        });

        const newUser = {
          email: email,
          displayName: name,
          photoURL: photoURL,
          uid: currentUser.uid,
          userRole: role,
          isVerified: false,
          isFired: false,
          details: {
            bankAccount: bankAccountNo,
            salary: parseFloat(salaryAmount),
            designation: designation,
          },
        };

        setUser(newUser);
        toast.success("User Register Successful!");
        navigate("/dashboard");
      } catch (err) {
        console.error(err.message);
        toast.error("User Register Failed!");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Password does not meet the requirements.");
    }
  };

  // Handle password input changes
  const passOnChange = (e) => {
    verifyPass(e);
    setPass(e.target.value);
  };

  // Sync Firebase user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth, setUser, setLoading]);

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
      <div className="lg:w-1/2 w-full flex justify-center items-center lg:px-10 px-6 lg:py-20">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center mb-6">Register Your Account</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
                onFocus={() => setPassFocus(true)}
                onBlur={() => setPassFocus(false)}
                required
                onChange={passOnChange}
              />
              {passFocus && (
                <ul className="text-sm text-gray-500 mt-2">
                  <li className={hasUppercase ? "text-green-600" : "text-red-600"}>
                    Must have an uppercase letter.
                  </li>
                  <li className={hasLowercase ? "text-green-600" : "text-red-600"}>
                    Must have a lowercase letter.
                  </li>
                  <li className={hasSymbol ? "text-green-600" : "text-red-600"}>
                    Must have a symbol (!@#$%*).
                  </li>
                  <li className={isLong ? "text-green-600" : "text-red-600"}>
                    Must be at least 8 characters long.
                  </li>
                </ul>
              )}
            </div>
            {/* Role and additional fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role <span className="text-red-600">*</span>
              </label>
              <select
                name="role"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
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
            {role === "employee" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Designation <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="designation"
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Account No <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankAccountNo"
                    placeholder="Bank Account No"
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    onChange={(e) => setBankAccountNo(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Salary Amount <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="salaryAmount"
                    placeholder="Salary Amount"
                    className="mt-1 block w-full px-4 py-2 border rounded-md"
                    onChange={(e) => setSalaryAmount(e.target.value)}
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Image <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                name="uploadImage"
                accept="image/*"
                className="block w-full text-gray-600"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-primary text-white py-2 rounded-md font-medium"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
