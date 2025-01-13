import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-primary">
      <h1 className="text-5xl font-bold mb-4">ERROR</h1>
      <h1 className="text-9xl font-bold mb-4 text-accent">404</h1>
      <p className="text-2xl mb-6">
        Something went wrong. Please try again later.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => window.history.back()}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:bg-accent transition"
        >
          Go Back
        </button>
        <Link to="/">
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:bg-accent transition">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
