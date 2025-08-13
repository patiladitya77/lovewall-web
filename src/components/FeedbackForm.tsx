"use client";
import React, { useState } from "react";

const FeedbackForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="w-full p-10 py-20">
      <div className="card w-[400px] bg-white text-gray-600">
        <div className="card-body">
          <div>
            <img
              className="h-23 w-23 mx-30"
              src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
              alt="logo"
            />
            <h2 className="text-3xl font-bold mx-6 my-4">Header goes here</h2>
            <p className="mx-6 my-4 text-xl">Your custom message goes here</p>
          </div>

          <div>
            <p className="text-lg font-bold mx-6">QUESTIONS</p>
            <ul className="mx-6 my-3 text-lg">
              <li>what do you want</li>
              <li>Rate me</li>
            </ul>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              className="btn btn-primary my-3 mx-3 w-[60%]"
              onClick={() => setIsDialogOpen(true)}
            >
              Send a text
            </button>
            <button className="btn btn-secondary mx-3 my-3 w-[60%]">
              Record a video
            </button>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
          <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setIsDialogOpen(false)}
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">Write text testimonial</h2>
            <p className="mb-2 text-sm text-gray-600">
              What is the best thing about our product/service?
            </p>
            <div className="flex text-yellow-500 text-2xl mb-3">★★★★★</div>
            <textarea
              className="border p-2 w-full rounded mb-3"
              placeholder="Type your feedback..."
              rows={4}
            ></textarea>
            {/* <label className="block mb-2">Attach Image(s)</label>
            <input type="file" className="mb-4" /> */}
            <input
              type="text"
              placeholder="Your Name *"
              className="border p-2 w-full rounded mb-3"
            />
            <input
              type="email"
              placeholder="Your Email *"
              className="border p-2 w-full rounded mb-3"
            />
            <div className="flex justify-end">
              <button
                className="bg-white text-black border cursor-pointer border-gray-200 shadow-sm rounded-md w-15 h-8 mx-2"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button className="bg-blue-500 rounded-md cursor-pointer text-white w-15 h-8 mx-2">
                send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
