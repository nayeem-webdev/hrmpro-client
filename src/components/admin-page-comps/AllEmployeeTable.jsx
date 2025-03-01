import NothingToShow from "../shared/NothingToShow";
import Loading from "../shared/Loading";
import PropTypes from "prop-types";
import { FaEye, FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API } from "../../api/API";
import { toast } from "react-toastify";
import Modal from "../dashboard/Modal";
import { useState } from "react";
import UpdateUserModal from "./UpdateUserModal";
import { GrDocumentUpdate } from "react-icons/gr";

const AllEmployeeTable = ({ isLoading, error, data, refetch }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const onUpdateUser = (id) => {
    setUpdateId(id);
    setIsUpdateModalOpen(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fireId, setFireId] = useState("");
  const onClickFire = (id) => {
    setFireId(id);
    setIsModalOpen(true);
  };
  const handleFire = (id) => {
    const updates = { isFired: true };
    API.patch(`user/${id}`, updates)
      .then(() => {
        toast.success(
          "User Fired! He will be unable to use the service anymore!"
        );
        refetch();
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("error:", err.message);
        toast.error("Unable To process request! Please try again Later");
      });
  };

  if (error) {
    return <NothingToShow />;
  }
  if (isLoading) {
    return (
      <Loading bg="https://i.ibb.co.com/jb4bG4d/Employee-Grievances-Management.gif" />
    );
  }

  return (
    <>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Sl.
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Name
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Email
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Designation
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Account No
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Salary
              </th>
              <th className="px-6 py-3 font-bold text-gray-600 uppercase text-center tracking-wider cursor-pointer">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={item?._id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="py-2 px-4 ">{item?.displayName}</td>
                <td className="py-2 px-4">{item?.email}</td>
                <td className="py-2 px-4 text-center">
                  {item?.details?.designation}
                </td>
                <td className="py-2 px-4 text-center">
                  {item?.details?.bankAccount}
                </td>
                <td className="py-2 px-4 text-center">
                  ${item?.details?.salary} (Per hour)
                </td>
                <td className="py-2 px-4 text-center">
                  <div className="flex items-center mr-4 gap-4">
                    <button
                      onClick={() => onClickFire(item?._id)}
                      title="Fire Employee"
                      disabled={item?.isFired}
                      className={
                        item?.isFired
                          ? "text-gray-400"
                          : "text-orange-500 hover:text-orange-800"
                      }
                    >
                      <FaFire />
                    </button>
                    <Link
                      to={`/dashboard/details/${item._id}`}
                      className="text-orange-400 hover:text-orange-700"
                    >
                      <FaEye />
                    </Link>
                    <button
                      title="Update"
                      onClick={() => onUpdateUser(item?._id)}
                      className=" text-primary hover:text-blue-700"
                    >
                      <GrDocumentUpdate />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal
          headText="Fire User! Are you sure?"
          subText="This action cannot be undone."
          buttonText="Fire"
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleFire(fireId)}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateUserModal
          id={updateId}
          closeModal={() => setIsUpdateModalOpen(false)}
          refetch={refetch}
        />
      )}
    </>
  );
};

AllEmployeeTable.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.array.isRequired,
  refetch: PropTypes.func,
};
export default AllEmployeeTable;
