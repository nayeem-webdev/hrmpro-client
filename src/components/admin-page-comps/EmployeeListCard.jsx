import PropTypes from "prop-types";
import { useState } from "react";
import { FaFire, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../api/API";
import Modal from "../dashboard/Modal";

const EmployeeListCard = ({ item, refetch }) => {
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

  return (
    <div className="border rounded-tl-[60px] border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-all bg-white">
      {/* Photo and Info */}
      <div className="flex gap-3 items-center">
        <div className="flex justify-center mb-4">
          <img
            src={item.photoURL}
            alt={item.displayName}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        </div>

        <div className="mb-4 border-l-2 p-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {item.displayName}
          </h3>
          <p className="text-gray-600">{item.details.designation}</p>
        </div>
      </div>

      <div className="flex gap-3 items-end justify-between">
        <div>
          <p className="text-sm text-gray-500">
            <strong>Email: </strong>
            {item.email}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Account No: </strong>
            {item.details.bankAccount}
            <p className="text-sm text-gray-500">
              <strong>Salary: </strong>${item.details.salary} (ph.)
            </p>
          </p>
        </div>

        <div className="flex flex-col mr-4 gap-4">
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
          <Link
            to={`/dashboard/details/${item._id}`}
            className="ml-4 text-orange-400 hover:text-orange-700"
          >
            <FaEye />
          </Link>
        </div>
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
    </div>
  );
};
EmployeeListCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default EmployeeListCard;
