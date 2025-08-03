import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const WorkSpaceHeader = () => {
  const spaceData = useSelector((store) => store.space.space);
  if (!spaceData) return null;
  const { spaceName } = spaceData;
  return (
    <div className=" ">
      <div className="border border-gray-700">
        <Navbar />
      </div>
      <div className="bg-base-300 w-full flex justify-between h-32 border border-gray-700">
        <div className="flex">
          <img
            alt="logo"
            className="h-23 w-23 "
            src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
          />
          <h1 className="font-bold text-3xl my-6">{spaceName}</h1>
        </div>
        <div className="flex p-5 mx-3">
          <div className="mx-3 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <div>
              <p className="flex ">Video credits</p>
              <p className="">2</p>
            </div>
          </div>
          <div className="mx-3 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <div>
              <p>Text credits</p>
              <p>10</p>
            </div>
          </div>
          <div className="mx-3">
            <button className="btn btn-primary bg-white text-black rounded-lg">
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceHeader;
