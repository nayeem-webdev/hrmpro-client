import { useContext, useEffect, useState } from "react";
import {
  FaCamera,
  FaCoins,
  FaDollarSign,
  FaRegEdit,
  FaUserAlt,
  FaUserTie,
} from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext";
import { API } from "../../api/API";
import { useQuery } from "@tanstack/react-query";
import NothingToShow from "../../components/shared/NothingToShow";
import Loading from "../../components/shared/Loading";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userData", user?.uid],
    queryFn: async () => {
      const res = await API.get(`/user?uid=${user?.uid}`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch user data");
    },
  });

  //   Open Close Update Form
  const [designationUpdate, setDesignationUpdate] = useState(false);
  const [roleUpdate, setRoleUpdate] = useState(false);
  const [salaryUpdate, setSalaryUpdate] = useState(false);
  const [accountUpdate, setAccountUpdate] = useState(false);

  const [photoURL, setPhotoURL] = useState("https://via.placeholder.com/150");
  const [salary, setSalary] = useState("");
  const [designation, setDesignation] = useState("");
  const [role, setRole] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  useEffect(() => {
    if (userData) {
      setPhotoURL(userData?.photoURL);
      setSalary(userData?.details?.salary);
      setDesignation(userData?.details?.designation);
      setRole(userData?.userRole);
      setBankAccount(userData?.details?.bankAccount);
    }
  }, [userData]);

  const handleUpdate = (field, value) => {
    const updateData = {
      [field]: value,
    };
    API.patch(`/user/${userData?._id}`, updateData)
      .then(() => {
        toast.success(`updated to ${value}  successfully!`);
        setRoleUpdate(false);
        setSalaryUpdate(false);
        setAccountUpdate(false);
        setDesignationUpdate(false);
        refetch();
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(`Failed to update ${field}`);
      });
  };

  if (error) {
    return <NothingToShow />;
  }
  if (isLoading) {
    return (
      <Loading bg="https://i.ibb.co.com/SrX98Xj/Employee-Management.gif" />
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Profile Header */}
      <header className="w-full bg-primary text-white py-8 px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={photoURL}
              alt="Profile"
              className="bg-white w-full h-full object-cover rounded-full border-4 border-white"
            />
            <button className="absolute bottom-2 right-2 bg-white text-primary p-2 rounded-full shadow hover:bg-gray-200">
              <FaCamera />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <h1 className="text-xl lg:text-3xl font-bold">
              {userData?.displayName}{" "}
            </h1>
            {userData?.isVerified && (
              <span>
                <RiVerifiedBadgeFill className="text-xl" />
              </span>
            )}
          </div>
          <p className="text-base lg:text-xl mt-2">{userData?.email}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex flex-col items-center py-4">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Salary div */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-medium mb-4 flex items-center text-black">
              <FaUserAlt className="text-primary mr-2" />
              User Role
            </h2>
            <div className="flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <span className="text-gray-700">
                  {role === "hr_executive"
                    ? "HR Executive"
                    : role === "employee"
                    ? "Employee"
                    : role === "admin"
                    ? "Admin"
                    : "Not Assigned"}
                </span>
                <FaRegEdit
                  onClick={() => setRoleUpdate(!roleUpdate)}
                  className="text-primary mr-2 text-xl"
                />
              </div>
              {roleUpdate && (
                <div className="w-full flex">
                  <select
                    id="role"
                    name="role"
                    className="p-2 border rounded-tl-md rounded-bl-md w-full text-gray-700"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">
                      Select Role
                    </option>
                    <option value="employee">Employee</option>
                    <option value="hr_executive">HR Executive</option>
                  </select>
                  <button
                    onClick={() => handleUpdate("userRole", role)}
                    className="bg-primary text-white px-4 py-2 rounded-tr-md rounded-br-md hover:bg-primary/80"
                  >
                    <GrDocumentUpdate />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Designation div */}

          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-medium mb-4 flex items-center text-black">
              <FaUserTie className="text-primary mr-2" />
              Designation
            </h2>
            <div className="flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <span className="text-gray-700">
                  {designation || "Not Assigned"}
                </span>
                <FaRegEdit
                  onClick={() => setDesignationUpdate(!designationUpdate)}
                  className="text-primary mr-2 text-xl"
                />
              </div>
              {designationUpdate && (
                <div className="w-full flex">
                  <select
                    id="designation"
                    name="designation"
                    className="p-2 border rounded-tl-md rounded-bl-md w-full text-gray-700"
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
                  <button
                    onClick={() =>
                      handleUpdate("details.designation", designation)
                    }
                    className="bg-primary text-white px-4 py-2 rounded-tr-md rounded-br-md hover:bg-primary/80"
                  >
                    <GrDocumentUpdate />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Salary div */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-medium mb-4 flex items-center text-black">
              <FaDollarSign className="text-primary mr-2" />
              Salary (per hour)
            </h2>
            <div className="flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <span className="text-gray-700">{salary || "Not Set"}</span>
                <FaRegEdit
                  onClick={() => setSalaryUpdate(!salaryUpdate)}
                  className="text-primary mr-2 text-xl"
                />
              </div>
              {salaryUpdate && (
                <div className="w-full flex">
                  <input
                    type="number"
                    placeholder="Enter Salary (Per Hour)"
                    className="p-2 border rounded-tl-md rounded-bl-md w-full text-gray-700"
                    onChange={(e) => setSalary(e.target.value)}
                  />
                  <button
                    onClick={() => handleUpdate("details.salary", salary)}
                    className="bg-primary text-white px-4 py-2 rounded-tr-md rounded-br-md hover:bg-primary/80"
                  >
                    <GrDocumentUpdate />
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Account div */}
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-medium mb-4 flex items-center text-black">
              <FaCoins className="text-primary mr-2" />
              Bank Account
            </h2>
            <div className="flex flex-col gap-4">
              <div className="w-full flex justify-between">
                <span className="text-gray-700">
                  {bankAccount || "Need To Update"}
                </span>
                <FaRegEdit
                  onClick={() => setAccountUpdate(!accountUpdate)}
                  className="text-primary mr-2 text-xl"
                />
              </div>
              {accountUpdate && (
                <div className="w-full flex">
                  <input
                    type="number"
                    placeholder="Enter Account No"
                    className="p-2 border rounded-tl-md rounded-bl-md w-full text-gray-700"
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      handleUpdate("details.bankAccount", bankAccount)
                    }
                    className="bg-primary text-white px-4 py-2 rounded-tr-md rounded-br-md hover:bg-primary/80"
                  >
                    <GrDocumentUpdate />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
