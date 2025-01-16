import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../context/AuthContext";
import { API } from "../../api/API";
import { toast } from "react-toastify";

const AddWorkForm = () => {
  const { user } = useContext(AuthContext);
  const [work, setWork] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWork = {
      work: work,
      workHour: hoursWorked,
      date: date,
      uid: user.uid,
      name: user.displayName,
      paymentStatus: "unpaid",
      paymentApprovedStatus: "not_approved",
    };
    API.post("/works", newWork)
      .then((res) => {
        console.log(res.data);
        toast.success("Work Added Successfully");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Failed To Add Work");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg shadow"
    >
      <div>
        <label
          htmlFor="uploadImage"
          className="block text-sm text-gray-700 mb-2"
        >
          work Type
        </label>
        <select
          value={work}
          onChange={(e) => setWork(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select type</option>
          <option value="sales">Sales</option>
          <option value="support">Support</option>
          <option value="content">Content</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="uploadImage"
          className="block text-sm text-gray-700 mb-2"
        >
          Work Hour
        </label>
        <input
          type="number"
          placeholder="Hours Worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label
          htmlFor="uploadImage"
          className="block text-sm text-gray-700 mb-2"
        >
          Work Hour
        </label>

        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          dateFormat="yyyy-MM-dd"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label
          htmlFor="uploadImage"
          className="block text-sm text-gray-700 mb-2"
        >
          Work Hour
        </label>

        <button
          type="submit"
          className="w-full  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Work
        </button>
      </div>
    </form>
  );
};

export default AddWorkForm;
