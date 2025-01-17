import { useState, useEffect } from "react";
import { API } from "../../api/API";

const WorkFilter = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      API.get(`/users/project?userRole=employee`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setError(err.message);
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="p-4 mb-4 shadow-lg rounded-lg">
      <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Employee Select */}
        <div className="flex flex-col">
          <label
            htmlFor="selectBox"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Select Employee
          </label>
          {isLoading ? (
            <p>Loading employees...</p>
          ) : isError ? (
            <p>Error loading data: {error}</p>
          ) : (
            <select
              id="selectBox"
              className="bg-white w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select an option
              </option>
              {data && data.length > 0 ? (
                data.map((employee) => (
                  <option key={employee.uid} value={employee.uid}>
                    {employee.name}
                  </option>
                ))
              ) : (
                <option disabled>No employees available</option>
              )}
            </select>
          )}
        </div>

        {/* Date Picker */}
        <div className="flex flex-col">
          <label
            htmlFor="datePicker"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Select Date
          </label>
          <input
            id="datePicker"
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        {/* Search Box */}
        <div className="flex flex-col">
          <label
            htmlFor="searchBox"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Search
          </label>
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkFilter;
