import PropTypes from "prop-types";
import { API } from "../../api/API";
import { useQuery } from "@tanstack/react-query";
import Loading from "../shared/Loading";
import { toast } from "react-toastify";
import { CgClose, CgMailReply } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";

const EmailModal = ({ mailID, onClose, refetch }) => {
  const {
    isLoading,
    error,
    data: emailData,
  } = useQuery({
    queryKey: ["emails", mailID],
    queryFn: async () => {
      const res = await API.get(`/mails/${mailID}`);
      if (res.data) {
        return res.data;
      }
      throw new Error("Failed to fetch email data");
    },
  });

  const onDelete = (id) => {
    API.delete(`/mails/${id}`)
      .then(() => {
        toast.success("Email Deleted");
        refetch();
        onClose();
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Delete Request Failed");
      });
  };

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Mail Details</h2>
          <p className="text-red-500">
            Failed to fetch email data. Please try again later.
          </p>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 mt-4"
          >
            <CgClose />
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Loading bg="https://i.ibb.co.com/Qjw41HP/First-dection-second-image.gif" />
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Mail Details</h2>

        <div className="mb-4">
          <p className="text-sm font-semibold">From:</p>
          <p className="text-gray-700">
            {emailData?.name} ({emailData?.email})
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold">Subject:</p>
          <p className="text-gray-700">{emailData?.subject}</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold">Message:</p>
          <p className="text-gray-700">{emailData?.message}</p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onDelete(mailID)} // Pass mailID to delete handler
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-800"
          >
            <AiOutlineDelete size={20} />
          </button>
          <a
            href={`mailto:${emailData?.email}`}
            className="bg-primary text-white p-2 rounded-lg hover:bg-blue-600"
          >
            <CgMailReply size={20} />
          </a>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 p-2 rounded-lg hover:bg-gray-300"
          >
            <CgClose size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

EmailModal.propTypes = {
  mailID: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  refetch: PropTypes.func,
};

export default EmailModal;
