"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Toast from "./Toast";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addPublicSpaces } from "@/utils/publicSpaceSlice";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const { getToken } = useAuth();
  const { workspaceId } = useParams();
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [err, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();

  const spaceDetails = useSelector((store) => store.publicspace.publicSpace);
  console.log(spaceDetails);
  const { headerTitle, questions, customMessage } = spaceDetails;

  const handleSendTextTestimonial = async () => {
    if (!email || !name || feedback || rating) {
      setToastMessage("Please fill the required fields");
      setShowToast(true);
      return;
    }
    const token = await getToken();
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          "api/testimonial/sendtexttestimonial/" +
          workspaceId,
        {
          starRating: rating,
          type: "text",
          email: email,
          name: name,
          feedback: feedback,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsDialogOpen(false);
        setToastMessage("Your Testimonial was recorded successfully");
        setShowToast(true);
      } else {
        setError("Error while sending");
        setToastMessage("Error, something went wrong");
        setShowToast(true);
      }
    } catch (error) {
      console.log("ERROR: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendVideoTestimonial = async () => {
    if (!videoFile || !rating || !name || !email) {
      setToastMessage("Please fill the required fields");
      setShowToast(true);
      return;
    }
    setLoading(true);
    try {
      // Get upload auth from backend
      const { data: auth } = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + "api/upload-auth"
      );

      //  Upload to ImageKit
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("fileName", videoFile.name);
      formData.append("token", auth.token);
      formData.append("expire", auth.expire);
      formData.append("signature", auth.signature);
      formData.append("publicKey", auth.publicKey);

      const uploadRes = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData
      );
      const videoUrl = uploadRes.data.url;

      // Save testimonial to backend
      // const token = await getToken();
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          "api/testimonial/sendvideotestimonial/" +
          workspaceId,
        {
          starRating: rating,
          type: "video",
          email: email,
          name: name,
          videoUrl,
        }
      );
      if (res.status === 200) {
        setIsReviewOpen(false);
        setIsVideoDialogOpen(false);
        setToastMessage("Your Testimonial was recorded successfully");
        setShowToast(true);
        setVideoFile(null);
      } else {
        setError("Error while sending testimonial");
        setToastMessage("Error, something went wrong");
        setShowToast(true);
      }
    } catch (error) {
      console.log("error while uploading file", error);
    } finally {
      setLoading(false);
    }
  };

  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url); // cleanup when file changes/unmount
      };
    }
  }, [videoFile]);
  useEffect(() => {
    getWorkSpaceById();
  }, []);
  const getWorkSpaceById = async () => {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          "api/space/getspaceforuserbyid/" +
          workspaceId
      );
      // console.log(res.data.space);
      dispatch(addPublicSpaces(res.data.space));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showToast && (
        <div>
          <Toast
            duration={5000}
            message={toastMessage}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
      <div className="w-full p-10 py-20">
        <div className="card w-[400px] bg-white text-gray-600">
          <div className="card-body">
            <div>
              <Image
                src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
                alt="logo"
                width={92}
                height={92}
                className="mx-auto"
              />
              <h2 className="text-3xl font-bold mx-6 my-4">{headerTitle}</h2>
              {customMessage && (
                <p className="mx-6 my-4 text-xl">{customMessage}</p>
              )}
            </div>

            <div>
              <p className="text-lg font-bold mx-6">QUESTIONS</p>
              <ul className="mx-6 my-3 text-lg list-disc list-inside">
                {questions.map((q: string, index: number) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                className="btn btn-primary w-full sm:w-1/2"
                onClick={() => setIsDialogOpen(true)}
              >
                Send a Text
              </button>
              <button
                className="btn btn-secondary w-full sm:w-1/2"
                onClick={() => setIsVideoDialogOpen(true)}
              >
                Record a Video
              </button>
            </div>
          </div>
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[500px] max-w-full p-6 rounded-2xl shadow-2xl relative animate-fadeIn">
              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
                onClick={() => setIsDialogOpen(false)}
              >
                ✕
              </button>

              {/* Heading */}
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                Share your feedback ✨
              </h2>
              <p className="mb-5 text-sm text-gray-500">
                What’s the best thing about our product/service?
              </p>

              {/* Rating */}
              <div className="flex gap-1 text-2xl mb-5 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="focus:outline-none transition transform hover:scale-110"
                  >
                    <span
                      className={`${
                        star <= (hover || rating)
                          ? hover
                            ? "text-yellow-300"
                            : "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>

              {/* Feedback */}
              <textarea
                className="border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 w-full rounded-lg mb-4 resize-none text-sm text-gray-700"
                placeholder="Type your feedback..."
                rows={4}
                onChange={(e) => setFeedback(e.target.value)}
              />

              {/* Name */}
              <input
                type="text"
                placeholder="Your Name *"
                className="border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 w-full rounded-lg mb-4 text-sm text-gray-700"
                onChange={(e) => setName(e.target.value)}
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Your Email *"
                className="border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 w-full rounded-lg mb-6 text-sm text-gray-700"
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
                  onClick={handleSendTextTestimonial}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        )}

        {isVideoDialogOpen && !isReviewOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black">
            <div className="bg-white w-[500px] p-6 rounded-2xl shadow-xl relative animate-fadeIn">
              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
                onClick={() => setIsVideoDialogOpen(false)}
              >
                ✕
              </button>

              {/* Heading */}
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                🎥 Upload Video
              </h2>

              {/* Upload Box */}
              <div className="bg-gray-100 border border-dashed border-gray-400 w-full h-64 flex items-center justify-center rounded-lg mb-4 relative">
                {!videoFile ? (
                  <label className="bg-white px-5 py-2 rounded-md cursor-pointer shadow hover:bg-gray-50 transition">
                    Choose File
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        setUploadError("");
                        setVideoFile(e.target.files?.[0] || null);
                      }}
                    />
                  </label>
                ) : (
                  <p className="text-sm text-gray-600">{videoFile.name}</p>
                )}
              </div>

              {/* Error Message */}
              {uploadError && (
                <p className="text-red-500 text-sm mb-3">{uploadError}</p>
              )}

              {/* Progress Bar (only when uploading) */}
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                  onClick={() => setIsVideoDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    if (!videoFile) {
                      setUploadError(
                        "⚠️ Please upload a video before sending."
                      );
                      return;
                    }
                    setIsReviewOpen(true);
                  }}
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        )}

        {isReviewOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black">
            <div className="bg-white w-[500px] p-8 rounded-2xl shadow-2xl relative animate-fadeIn">
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                onClick={() => setIsReviewOpen(false)}
              >
                ✕
              </button>

              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4 text-2xl">
                  📹
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Review Your Video
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Please complete all fields before submitting.
                </p>
              </div>

              {/* Video Preview */}
              {videoPreviewUrl && (
                <video
                  src={videoPreviewUrl}
                  controls
                  className="w-full mt-5 rounded-lg shadow-md"
                />
              )}

              {/* ⭐ Star Rating */}
              <div className="flex justify-center my-4 text-3xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="focus:outline-none"
                  >
                    <span
                      className={`${
                        star <= (hover || rating)
                          ? hover
                            ? "text-yellow-300"
                            : "text-yellow-500"
                          : "text-gray-300"
                      } transition-colors duration-150`}
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>

              {/* Form Fields */}
              <div className="space-y-3 mt-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-start mt-4 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 mt-1 rounded border-gray-300 focus:ring-blue-500"
                />
                <span>
                  I give permission to use this testimonial across social
                  channels and other marketing efforts.
                </span>
              </label>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                  onClick={() => {
                    setIsReviewOpen(false);
                    setVideoFile(null);
                  }}
                >
                  Upload Again
                </button>
                <button
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSendVideoTestimonial}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Confirm to Send"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackForm;
