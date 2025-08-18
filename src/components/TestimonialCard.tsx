import React, { useState } from "react";
import VideoPreview from "./VideoPreview";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import Toast from "./Toast";
type Testimonial = {
  feedbackType: string;
  feedback: string;
  name: string;
  senderEmail: string;
  videoUrl: string;
  spaceId: string;
  starRating: number;
  _id: string;
};

type TestimonialCardProps = {
  testimonials: Testimonial;
};

const TestimonialCard = ({ testimonials }: TestimonialCardProps) => {
  console.log(testimonials);
  const [isExpanded, setIsExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { feedbackType, feedback, name, senderEmail, videoUrl, _id } =
    testimonials;
  const { getToken } = useAuth();
  const handleDeleteTestimonial = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await axios.delete(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          "api/testimonial/deleteTestimonial/" +
          _id,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setConfirmDelete(false);
        setShowToast(true);
      } else {
        setError("Error while deleting, try again");
      }
      console.log(res);
    } catch (error) {
      console.log("ERROR: " + error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {showToast && (
        <div>
          <Toast
            message={"Testimonial deleted Successfully"}
            duration={5000}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}

      <div className="bg-base-100 rounded-md p-4 my-4 ">
        <div className="flex justify-between">
          <button className="bg-blue-100 rounded-lg p-1 text-blue-600 mx-3">
            {feedbackType}
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
        {feedbackType === "text" ? (
          <div className="mx-3 my-3">
            <p>{feedback}</p>
          </div>
        ) : (
          <div className="m-3">
            <VideoPreview
              videoUrl={videoUrl}
              isExpanded={isExpanded}
              onExpand={() => setIsExpanded(true)}
            />
          </div>
        )}

        <div>
          <div className="flex justify-between ">
            <div className="mx-3">
              <h1>Name</h1>
              <p>{name}</p>
            </div>
            <div className="mr-75">
              <h1>Email</h1>
              <p>{senderEmail}</p>
            </div>
          </div>
          <div className="mx-3">
            <h1>submitted at</h1>
            <p>26 july</p>
          </div>
        </div>
        {isExpanded && (
          <>
            <div className="flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 my-2 mx-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>

              <button
                className="text-gray-200 text-md cursor-pointer"
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </button>
            </div>

            {/* Confirmation card */}
            {confirmDelete && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
                <div className="card w-96 bg-base-100 card-md shadow-sm">
                  <div className="card-body">
                    <h2 className="card-title">Are you sure?</h2>
                    <p>This action will permanently delete this testimonial.</p>
                    <div className="justify-end card-actions">
                      <button
                        className="btn btn-error"
                        onClick={handleDeleteTestimonial}
                      >
                        {loading ? "Deleting..." : "Confirm"}
                      </button>
                      <button
                        className="btn"
                        onClick={() => setConfirmDelete(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex justify-end">
          {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
