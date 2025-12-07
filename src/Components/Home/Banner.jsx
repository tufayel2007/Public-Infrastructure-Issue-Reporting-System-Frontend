import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="bg-blue-500 text-white py-16 px-4 md:px-12 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Public Infrastructure Issue Reporting System
      </h1>
      <p className="text-lg md:text-2xl mb-6">
        A platform to report and track public infrastructure issues. Be a part
        of the solution.
      </p>
      <Link
        to="/reprotAnIssue"
        className="bg-yellow-400 text-black py-2 px-6 rounded-lg font-semibold text-lg transition duration-300 hover:bg-yellow-500"
      >
        Report an Issue
      </Link>
    </div>
  );
};

export default Banner;
