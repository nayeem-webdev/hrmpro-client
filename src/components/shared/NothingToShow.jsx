import { FaFrownOpen } from "react-icons/fa";

const NothingToShow = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-full py-16 px-6 ">
      <FaFrownOpen className="text-6xl text-primary" />{" "}
      <h2 className="text-2xl font-semibold text-accent">
        Oops! Nothing to Show
      </h2>
      <p className="text-sm text-gray-500">
        It seems like there&apos;s no data available right now. Try again later
        or check other options.
      </p>
    </div>
  );
};

export default NothingToShow;
