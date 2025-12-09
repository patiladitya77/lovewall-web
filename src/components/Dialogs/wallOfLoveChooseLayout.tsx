import React from "react";

interface Props {
  selectedLayout: string;
  setSelectedLayout: (layout: string) => void;
  goNext: () => void;
  goBack: () => void;
}

const layouts = [
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
];

const wallOfLoveChooseLayout = ({
  selectedLayout,
  setSelectedLayout,
  goNext,
  goBack,
}: Props) => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Step 1: Choose Layout</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
        {layouts.map((layout) => (
          <div
            key={layout.id}
            className={`border p-6 rounded-xl cursor-pointer hover:shadow-lg transition ${
              selectedLayout === layout.id
                ? "border-blue-600"
                : "border-gray-300"
            }`}
            onClick={() => {
              setSelectedLayout(layout.id);
              goNext();
            }}
          >
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
        onClick={goBack}
        className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
      >
        ← Back
      </button>
    </>
  );
};

export default wallOfLoveChooseLayout;
