import React from "react";
const dummyQuestions = [
  "what is your name",
  "did you enjoy the couse",
  "would you suggest some imporivements",
];
const BasicForm = () => {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl my-4 mx-25">Create a new space</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 my-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <p className="text-gray-400 my-8 text-lg">
          After the space is geneated it will create a new page for collecting
          testimonials
        </p>
      </div>
      <div>
        <p>Space name</p>
        <input
          type="text"
          className="border border-gray-400 w-full p-2 rounded-md -mx-2"
        />
        <input type="file" className="border border-gray-300 my-3" />
        <p className="my-1">Header title</p>
        <input
          type="text "
          className="border border-gray-400 w-full p-2 rounded-md -mx-2"
        />
        <p className="my-1">Your Custom message</p>
        <textarea
          className="textarea bg-white border border-gray-400 w-full -mx-2"
          placeholder=""
        ></textarea>
        <p className="mt-6 flex ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 mx-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
          Questions
        </p>
        <div className="w-full flex my-2">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full "
            placeholder="how you doin"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 my-2 mx-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
        <button className="btn btn-primary my-3 w-full">
          Create new space
        </button>
      </div>
    </div>
  );
};

export default BasicForm;
