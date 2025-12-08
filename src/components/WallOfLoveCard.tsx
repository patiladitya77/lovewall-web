import React from "react";
import { Star, Heart } from "lucide-react";

const WallOfLoveCard = () => {
  return (
    <div className="border border-gray-300 rounded-lg shadow-sm p-3 w-80 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-medium text-gray-800">Carousel Slider</h2>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-gray-100 rounded" title="Edit">
            ✏️
          </button>
          <button className="p-1 hover:bg-gray-100 rounded" title="Copy">
            📋
          </button>
          <button
            className="p-1 hover:bg-red-100 text-red-600 rounded"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Meta info */}
      <div className="text-xs text-gray-500 mb-3">
        Created Oct 19, 2025{" "}
        <span className="ml-2 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[10px]">
          Carousel Slider
        </span>
      </div>

      {/* Testimonial card */}
      <div className="border-2 border-indigo-500 rounded-xl p-4 bg-white">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lexie"
              alt="Lexie avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-sm text-gray-800">Lexie</h3>
              <p className="text-xs text-gray-500">@lexxbarn</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">✖</button>
        </div>

        {/* Stars */}
        <div className="flex mt-2 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          ))}
        </div>

        {/* Review text */}
        <p className="text-sm text-gray-700">
          I have used <span className="text-blue-600">@Superhuman</span>
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-pink-500 fill-pink-500" />
            <span>9</span>
          </div>
          <span>Jan 26, 2022</span>
        </div>
      </div>
    </div>
  );
};

export default WallOfLoveCard;
