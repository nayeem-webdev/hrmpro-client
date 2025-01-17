import PropTypes from "prop-types";
import React, { useState } from "react";
import DisplayDate from "../shared/DisplayDate";
import { useLocation } from "react-router-dom";
import { API } from "../../api/API";
import { toast } from "react-toastify";
import Modal from "./Modal";
import UpdateWorkModal from "../employee-page-comps/UpdateWorkModal";

const DashboardTable = ({ data, columns, refetch }) => {
  const location = useLocation();
  console.log(location);
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

  const renderVerifiedBadge = (isVerified) => {
    return isVerified ? (
      <span className="bg-green-50 text-green-500 py-1 px-3 rounded-full">
        Verified
      </span>
    ) : (
      <span className="bg-red-50 text-red-500 py-1 px-3 rounded-full">
        Not Verified
      </span>
    );
  };
  const renderPaymentBadge = (paymentStatus) => {
    return paymentStatus === "paid" ? (
      <span className="bg-green-50 text-green-500 py-1 px-3 rounded-full">
        Paid
      </span>
    ) : (
      <span className="bg-red-50 text-red-500 py-1 px-3 rounded-full">
        Unpaid
      </span>
    );
  };

  // ?? Modal Func & State & delete func
  const [updateID, setUpdateId] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const onUpdateClick = (id) => {
    setUpdateId(id);
    setIsUpdateModalOpen(true);
  };
  // ?? Modal Func & State & delete func

  // ?? Modal Func & State & delete func
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteID, setDeleteId] = useState("");

  const onDeleteClick = (id) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDeleteWork = async (id) => {
    try {
      await API.delete(`/works/${id}`).then((res) => console.log(res.data));
      refetch();
      toast.success("Delete work successful!");
    } catch (error) {
      console.error("Error deleting the work:", error);
      toast.error("Failed to delete the work. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  const onConfirmModal = () => {
    handleDeleteWork(deleteID);
    setIsModalOpen(false);
  };
  // ?? Modal Func & State & delete func

  return (
    <>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="border-b-2 border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer"
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
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${
                      column.accessor !== "workDetails" &&
                      column.accessor !== "displayName"
                        ? "text-center"
                        : ""
                    } `}
                  >
                    {column.accessor === "isVerified" ? (
                      renderVerifiedBadge(row[column.accessor])
                    ) : column.accessor === "paymentStatus" ? (
                      renderPaymentBadge(row[column.accessor])
                    ) : column.accessor === "date" &&
                      location.pathname === "/dashboard/work-sheet" ? (
                      <DisplayDate date={row[column.accessor]} />
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
                {location.pathname === "/dashboard/work-sheet" && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button
                      onClick={() => onUpdateClick(row._id)}
                      className="text-blue-400 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteClick(row._id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                )}
                {location.pathname === "/dashboard/employee-list" && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <button
                      onClick={() => onUpdateClick(row._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => onDeleteClick(row._id)}
                      className="ml-4 text-blue-400 hover:text-blue-700"
                    >
                      Details
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {location.pathname === "/dashboard/work-sheet" && (
        <>
          {isModalOpen && (
            <Modal
              headText="Delete! Are you sure?"
              subText="This action cannot be undone."
              buttonText="Confirm"
              onClose={closeModal}
              onConfirm={onConfirmModal}
            />
          )}
          {isUpdateModalOpen && (
            <UpdateWorkModal
              workId={updateID}
              closeModal={closeModal}
              refetch={refetch}
            />
          )}
        </>
      )}
    </>
  );
};

DashboardTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  refetch: PropTypes.func,
};

export default DashboardTable;
