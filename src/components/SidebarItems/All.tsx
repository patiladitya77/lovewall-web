import React from "react";
import TestimonialCard from "../TestimonialCard";

const All = () => {
  return (
    <div className="">
      <div className="w-3/4 mx-30  bg-base-100 rounded-lg my-4">
        <input
          type="text"
          placeholder="search for testimonials"
          className="w-full p-2"
        />
      </div>
      <div className="w-3/4 mx-30 my-4">
        <TestimonialCard />
        <TestimonialCard />
      </div>
    </div>
  );
};

export default All;
