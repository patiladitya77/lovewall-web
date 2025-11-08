import React from "react";
import WallOfLoveCard from "./WallOfLoveCard";

const WallOfLoveDialog = ({ onClose }) => {
  return (
    // Full-screen overlay (prevents background scroll)
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Dialog box */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] overflow-y-auto p-10 text-black">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Wall of Love Manager
        </h2>

        {/* Description + Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4">
          <p className="text-gray-500 text-base md:text-lg leading-relaxed flex-1">
            Create and customize your{" "}
            <span className="font-semibold">Wall of Love</span> embeds. All
            changes automatically sync and update — no need to touch your code
            manually.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition-all whitespace-nowrap">
            + Create Wall of Love
          </button>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-300" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center px-2 pb-6">
          <WallOfLoveCard />
        </div>
      </div>
    </div>
  );
};

export default WallOfLoveDialog;
