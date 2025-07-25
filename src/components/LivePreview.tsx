import React from "react";

const LivePreview = () => {
  return (
    <div className="w-1/2 p-10 py-20">
      <div className="card w-[400px] bg-white text-gray-600 shadow-sm border border-gray-300 ">
        <div className="card-body">
          {/* <span className="badge badge-xs badge-warning">
            Live Preview - Testimonial Page
          </span> */}
          <div className="">
            <img
              className="h-23 w-23 mx-30"
              src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
            />
            <h2 className="text-3xl font-bold mx-6 my-4">Header goes here</h2>
            <p className="mx-6 my-4 text-xl">Your custom messsage goes here</p>
          </div>
          <div>
            <p className="text-lg font-bold mx-6">QUESTIONS</p>
            <ul className="mx-6 my-3 text-lg">
              <li>what do you want</li>
              <li>Rate me</li>
            </ul>
          </div>

          <div className="mt-6">
            <button className="btn btn-primary btn-block my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              Send a text
            </button>
            <button className="btn btn-secondary btn-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              Record a video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
