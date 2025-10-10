import React from "react";

const Shimmer = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-300">
      <span className="loading loading-spinner text-blue-500 w-16 h-16"></span>
    </div>
  );
};

export default Shimmer;
