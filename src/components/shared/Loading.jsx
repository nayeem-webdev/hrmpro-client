import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <FaSpinner
          className="animate-spin text-primary"
          style={{ fontSize: "4rem" }}
        />
        <p className="text-lg font-semibold text-accent">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default Loading;
