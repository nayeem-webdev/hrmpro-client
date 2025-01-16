import PropTypes from "prop-types";
import React, { useState } from "react";

const DashboardTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    const sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string") {
          return aValue.toLowerCase() > bValue.toLowerCase()
            ? sortConfig.direction === "ascending"
              ? 1
              : -1
            : sortConfig.direction === "ascending"
            ? -1
            : 1;
        }

        if (typeof aValue === "number") {
          return sortConfig.direction === "ascending"
            ? aValue - bValue
            : bValue - aValue;
        }

        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // Render "Verified" or "Not Verified" badge
  const renderVerifiedBadge = (isVerified) => {
    return isVerified ? (
      <span className="bg-green-500 text-white py-1 px-3 rounded-full">
        Verified
      </span>
    ) : (
      <span className="bg-red-500 text-white py-1 px-3 rounded-full">
        Not Verified
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="border-b-2 border-gray-200">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-left font-bold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort(column.accessor)}
              >
                {column.Header}
                {sortConfig.key === column.accessor ? (
                  sortConfig.direction === "ascending" ? (
                    <span className="ml-2">🔼</span>
                  ) : (
                    <span className="ml-2">🔽</span>
                  )
                ) : (
                  <span className="ml-2">↕️</span>
                )}
              </th>
            ))}
            <th className="px-6 py-3 text-left font-bold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                >
                  {column.accessor === "isVerified"
                    ? renderVerifiedBadge(row[column.accessor])
                    : row[column.accessor]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <button className="text-blue-500 hover:text-blue-700">
                  Edit
                </button>
                <button className="ml-4 text-red-500 hover:text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DashboardTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  refatch: PropTypes.func,
};

export default DashboardTable;
