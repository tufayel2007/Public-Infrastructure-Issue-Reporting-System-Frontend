import React from "react";
import { Link, useNavigate } from "react-router-dom";
import error from "../assets/error-404.png";

const Error = () => {
  const navigate = useNavigate();

  const backgroundStyle = {
    background: "linear-gradient(135deg, #1f2937 0%, #000000 100%)",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={backgroundStyle}
    >
      <div className="flex flex-col items-center text-center max-w-xl w-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-700/50">
        <div className="mb-10 w-full max-w-xs sm:max-w-sm lg:max-w-md animate-bounce-slow">
          {" "}
          <img
            src={error}
            alt="404 Page Not Found Illustration"
            className="w-full h-auto object-contain drop-shadow-2xl"
            onError={(e) => {
              e.target.onerror = null;
            }}
          />
        </div>

        <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 tracking-tight">
          404 - Lost in Space 🚀
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-4">
          PAGE NOT FOUND!
        </h2>
        <p className="text-gray-300 text-md sm:text-lg mb-8 max-w-md">
          We're sorry, the address you're looking for no longer exists or was
          misspelled.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <button
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ring-2 ring-purple-400"
              aria-label="Go to the Homepage"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.95-8.95c.38-.38 1.02-.38 1.4 0L21.75 12"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21.75v-9m-4.5 4.5h9"
                />
              </svg>
              <span>Return to home page</span>
            </button>
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 bg-transparent border-2 border-gray-400 text-gray-300 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-white/10"
            aria-label="Go back to the previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <span>Go back to the previous page.</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-16">
          If you think this is an error, please contact our support team.
        </p>
      </div>
    </div>
  );
};

export default Error;
