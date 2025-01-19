import NothingToShow from "../shared/NothingToShow";
import Loading from "../shared/Loading";
import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import EmailModal from "./EmailModal";

const MailsTable = ({ isLoading, error, data, refetch }) => {
  const [mailID, setMailId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onMailClick = (id) => {
    setMailId(id);
    setIsModalOpen(true);
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
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-black/20">
              <th className="text-left px-4 py-2 w-1/4 md:w-1/6">
                Sender Name
              </th>
              <th className="text-left px-4 py-2 w-1/2 md:w-4/6">Subject</th>
              <th className="text-right px-4 pr-8 py-2 w-1/4 md:w-1/6">
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
                <td className="py-2 px-4">{item?.name}</td>
                <td className="py-2 px-4">
                  {item?.subject}{" "}
                  <span className="text-gray-400">
                    - {item?.message?.slice(0, 25)}
                    {item?.message?.length > 25 ? "..." : ""}
                  </span>
                </td>

                <td className="py-2 px-4 flex justify-end">
                  <button
                    onClick={() => onMailClick(item?._id)}
                    className="bg-orange-500 hover:bg-orange-800 text-white font-semibold flex gap-2 items-center justify-center px-2 py-1 rounded-lg"
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <EmailModal
            mailID={mailID}
            onClose={() => setIsModalOpen(false)}
            refetch={refetch}
          />
        )}
      </div>
    </>
  );
};

MailsTable.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.array.isRequired,
  refetch: PropTypes.func,
};
export default MailsTable;
