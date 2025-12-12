import React, { useState } from "react";
import WallOfLoveCard from "./WallOfLoveCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/appStore";
import { Wall } from "@/utils/types";

import WallOfLoveChooseLayout from "../components/Dialogs/wallOfLoveChooseLayout";
import WallOfLoveCustomizeEmbeddings from "../components/Dialogs/wallOfLoveCustomizeEmbeddings";

interface WallOfLoveDialogProps {
  onClose: () => void;
}

const WallOfLoveDialog = ({ onClose }: WallOfLoveDialogProps) => {
  const existingWalls: Wall[] = useSelector((store: RootState) => store.wall);
  const [editingWallId, setEditingWallId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [selectedLayout, setSelectedLayout] = useState("");

  const [name, setName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const handleEditWall = (wall: Wall) => {
    setName(wall.name);
    setEditingWallId(wall._id);
    setSelectedLayout(wall.wallType);
    setDarkMode(wall.darkMode);
    setShowMore(wall.showMore);

    setStep(2);
  };

  const handleSaveWall = async () => {
    try {
      if (editingWallId) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/wall/updatewall/${editingWallId}`,
          {
            name,
            darkMode,
            showMore,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status == 200) onClose();
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/wall/createwall`,
          {
            name,
            wallType: selectedLayout,
            darkMode,
            showMore,
          },
          { withCredentials: true }
        );
        if (res.status == 200) onClose();
      }
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

        {/* -------- STEP 0 -------- */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center px-2 pb-6">
              {existingWalls.map((wall) => (
                <WallOfLoveCard
                  key={wall._id}
                  wall={wall}
                  onEdit={handleEditWall}
                />
              ))}
            </div>
          </>
        )}

        {/* -------- STEP 1 -------- */}
        {step === 1 && (
          <WallOfLoveChooseLayout
            selectedLayout={selectedLayout}
            setSelectedLayout={setSelectedLayout}
            goNext={() => setStep(2)}
            goBack={() => setStep(0)}
          />
        )}

        {/* -------- STEP 2 -------- */}
        {step === 2 && (
          <WallOfLoveCustomizeEmbeddings
            name={name}
            setName={setName}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            showMore={showMore}
            setShowMore={setShowMore}
            handleSaveWall={handleSaveWall}
            goBack={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
};

export default WallOfLoveDialog;
