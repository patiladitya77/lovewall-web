import React from "react";

interface Props {
  name: string;
  setName: (v: string) => void;

  darkMode: boolean;
  setDarkMode: (v: boolean) => void;

  showMore: boolean;
  setShowMore: (v: boolean) => void;

  handleSaveWall: () => void;
  goBack: () => void;
}

const wallOfLoveCustomizeEmbeddings = ({
  name,
  setName,
  darkMode,
  setDarkMode,
  showMore,
  setShowMore,
  handleSaveWall,
  goBack,
}: Props) => {
  return (
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
          onClick={goBack}
          className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          ← Back
        </button>

        <button
          onClick={handleSaveWall}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save and continue
        </button>
      </div>
    </>
  );
};

export default wallOfLoveCustomizeEmbeddings;
