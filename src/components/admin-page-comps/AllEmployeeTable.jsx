import NothingToShow from "../shared/NothingToShow";
import Loading from "../shared/Loading";

import PropTypes from "prop-types";
import { FaShield } from "react-icons/fa6";
import { FaEye, FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API } from "../../api/API";
import { toast } from "react-toastify";
import Modal from "../dashboard/Modal";
// import UpdateWorkModal from "../employee-page-comps/UpdateWorkModal";
import { useState } from "react";

const AllEmployeeTable = ({ isLoading, error, data, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fireId, setFireId] = useState(false);
  const onClickFire = (id) => {
    setFireId(id);
    setIsModalOpen(true);
  };
  const handleFire = (id) => {
    console.log(id);
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
                  <button
                    onClick={() => onClickFire(item?._id)}
                    title="Fire Employee"
                    disabled={item?.isFired}
                    className={
                      item?.isFired
                        ? "text-gray-500"
                        : "text-orange-500 hover:text-orange-800"
                    }
                  >
                    <FaFire />
                  </button>
                  <button
                    title="verify"
                    className="ml-4 text-blue-400 hover:text-blue-700"
                  >
                    <FaShield />
                  </button>
                  <Link
                    to={`/dashboard/details/${item?._id}`}
                    className="ml-4 text-orange-400 hover:text-orange-700"
                  >
                    <FaEye />
                  </Link>
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
      {/* {isUpdateModalOpen && (
        <UpdateWorkModal
          workId={updateID}
          closeModal={closeModal}
          refetch={refetch}
        />
      )} */}
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
