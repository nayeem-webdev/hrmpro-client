import { useEffect, useState } from "react";

const Loading = ({ bg }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <img src={bg} alt="image" />
        <div className="w-full h-2 bg-gray-300 rounded-full">
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-md font-semibold text-accent text-black">
          Loading {progress}%
        </p>
      </div>
    </div>
  );
};

export default Loading;
