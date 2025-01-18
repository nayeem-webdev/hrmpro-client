import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const WorkFilter = ({ setSortedData, initialData }) => {
  const [searchName, setSearchName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSelectChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filteredData = initialData;

      if (searchName) {
        filteredData = filteredData.filter((item) => item.name === searchName);
      }

      if (selectedDate) {
        filteredData = filteredData.filter(
          (item) => item.date.split("T")[0] === selectedDate
        );
      }

      if (searchQuery) {
        filteredData = filteredData.filter(
          (item) =>
            (item.work &&
              item.work.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.workDetails &&
              item.workDetails
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        );
      }

      setSortedData(filteredData);
    };

    applyFilters();
  }, [searchName, selectedDate, searchQuery, initialData, setSortedData]);

  return (
    <div className="p-4 mb-4 shadow bg-white rounded-lg">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="selectBox"
            className="text-sm font-medium text-gray-700 mb-2"
          >
            Select Employee
          </label>
          <select
            id="selectBox"
            className="bg-white w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            value={searchName}
            onChange={handleSelectChange}
          >
            <option value="">All Employees</option>
            {initialData &&
              [...new Set(initialData.map((item) => item.name))].map(
                (name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                )
              )}
          </select>
        </div>

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
            placeholder="Search work..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

WorkFilter.propTypes = {
  setSortedData: PropTypes.func.isRequired,
  initialData: PropTypes.array.isRequired,
};

export default WorkFilter;
