import  { useState } from "react";

const SignUpLoading = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setLoading(true);
    // Simulate sign-up process (e.g., waiting for API response)
    setTimeout(() => {
      setLoading(false); // Reset loading after process completion
      // Proceed with your other logic after sign-up is done
    }, 5000); // Simulate a delay for loading animation
  };

  return (
    <button
      onClick={handleSignUp}
      className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-500 focus:outline-none"
      disabled={loading}
    >
      <div className="flex items-center justify-center">
        {loading ? (
          <span className="flex space-x-1">
            <span className="animate-pulse">Signing Up</span>
            <span className="animate-pulse">.</span>
            <span className="animate-pulse">.</span>
            <span className="animate-pulse">.</span>
          </span>
        ) : (
          "Sign Up"
        )}
      </div>
    </button>
  );
};

export default SignUpLoading;
