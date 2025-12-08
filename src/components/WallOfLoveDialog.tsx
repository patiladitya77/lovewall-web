import React, { useState } from "react";
import WallOfLoveCard from "./WallOfLoveCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/appStore";
import { Wall } from "@/utils/types";

interface WallOfLoveDialogProps {
  onClose: () => void;
}
const WallOfLoveDialog = ({ onClose }: WallOfLoveDialogProps) => {
  const existingWalls: Wall[] = useSelector((store: RootState) => store.wall);
  const [step, setStep] = useState(0);
  const [selectedLayout, setSelectedLayout] = useState("");

  const [name, setName] = useState("");
  const [darkMode, setDarkMode] = useState(Boolean);
  const [showMore, setShowMore] = useState(Boolean);

  const handleCreateWall = async () => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "api/wall/createwall",
        {
          name: name,
          wallType: selectedLayout,
          darkMode: darkMode,
          showMore: showMore,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] overflow-y-auto p-10 text-black">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">
          Wall of Love Manager
        </h2>

        {/* --------------------- STEP 0 (Default View) --------------------- */}
        {step === 0 && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed flex-1">
                Create and customize your{" "}
                <span className="font-semibold">Wall of Love</span> embeds.
              </p>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition-all"
                onClick={() => setStep(1)}
              >
                + Create Wall of Love
              </button>
            </div>

            <hr className="my-8 border-gray-300" />

            {/* Existing Walls */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center px-2 pb-6">
              {existingWalls.map((wall) => (
                <WallOfLoveCard key={wall._id} wall={wall} />
              ))}
            </div>
          </>
        )}

        {/* --------------------- STEP 1 --------------------- */}
        {step === 1 && (
          <>
            <h3 className="text-xl font-semibold mb-4">
              Step 1: Choose Layout
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
              {[
                {
                  id: "masonry-animated",
                  img: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fanimated-demo.gif?alt=media&token=08b0e0d6-5290-4441-a309-942e074c7b77",
                },
                {
                  id: "masonry-fixed",
                  img: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Ffixed-masonry-grid.png?alt=media&token=c75b8785-344a-4bd8-96dd-79592466d78e",
                },
                {
                  id: "carousel-slider",
                  img: "https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/assets%2Fcarousel-animated.gif?alt=media&token=7a42bb1a-0b98-45e9-acbf-37f8a9f36a4e",
                },
              ].map((layout) => (
                <div
                  key={layout.id}
                  className={`border p-6 rounded-xl cursor-pointer hover:shadow-lg transition ${
                    selectedLayout === layout.id
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setSelectedLayout(layout.id);
                    setStep(2);
                  }}
                >
                  {/* IMAGE FROM URL */}
                  <img
                    src={layout.img}
                    alt={layout.id}
                    className="h-32 w-full object-cover rounded mb-3"
                  />

                  <p className="text-center capitalize font-medium">
                    {layout.id} layout
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(0)}
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              ← Back
            </button>
          </>
        )}

        {/* --------------------- STEP 2 --------------------- */}
        {step === 2 && (
          <>
            <h3 className="text-xl font-semibold mb-4">
              Step 2: Customize Embedding
            </h3>

            <label className="font-medium text-gray-700">Wall Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter wall name..."
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
            />

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <span>Enable Dark Mode</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="showMore"
                  checked={showMore}
                  onChange={(e) => setShowMore(e.target.checked)}
                />
                <span>Enable Show More button</span>
              </label>
            </div>

            <div className="flex justify-between mt-10">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                ← Back
              </button>

              <button
                onClick={handleCreateWall}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save and continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WallOfLoveDialog;
