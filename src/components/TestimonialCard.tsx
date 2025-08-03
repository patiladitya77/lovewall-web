import React from "react";

const TestimonialCard = ({ testimonials }) => {
  console.log(testimonials);
  return (
    <div className="bg-base-100 rounded-md p-4 my-4 ">
      <div className="flex justify-between">
        <button className="bg-blue-100 rounded-lg p-1 text-blue-600 mx-3">
          {testimonials.feedbackType}
        </button>
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
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </div>
      <div className="my-2 mx-3">
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
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      </div>
      <div className="mx-3 my-3">
        <p>{testimonials.feedback}</p>
      </div>
      <div>
        <div className="flex justify-between ">
          <div className="mx-3">
            <h1>Name</h1>
            <p>{testimonials.name}</p>
          </div>
          <div className="mr-75">
            <h1>Email</h1>
            <p>{testimonials.senderEmail}</p>
          </div>
        </div>
        <div className="mx-3">
          <h1>submitted at</h1>
          <p>76 huky</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
