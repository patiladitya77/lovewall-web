import React from "react";
import LivePreview from "./LivePreview";
import BasicForm from "./BasicForm";

const CreateSpaceForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="bg-white w-[77%] mx-50 absolute z-20 flex text-black  -my-75 rounded-lg">
      <div>
        <LivePreview />
      </div>
      <div className="items-center">
        <BasicForm onClose={onClose} />
      </div>
    </div>
  );
};

export default CreateSpaceForm;
