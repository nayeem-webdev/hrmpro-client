import PropTypes from "prop-types";

const Modal = ({ headText, subText, buttonText, onClose, onConfirm }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-1/3 rounded-lg shadow-lg p-6">
        <div className="text-lg font-semibold mb-2">{headText}</div>

        <div className="text-sm text-gray-600 mb-4">{subText}</div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/70"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  headText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;

// const [isModalOpen, setIsModalOpen] = useState(false);

// const openModal = () => setIsModalOpen(true);
// const closeModal = () => setIsModalOpen(false);
// {
// {
/* <button
    onClick={openModal}
  >
    Open Modal
  </button>; */
// }
// }

// {
//   isModalOpen && (
//     <Modal
//       headText="Are you sure?"
//       subText="This action cannot be undone."
//       buttonText="Confirm"
//       onClose={closeModal}
//       onConfirm={handleConfirm}
//     />
//   );
// }
