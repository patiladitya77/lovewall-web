import React from "react";

interface VideoTestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoPreviewUrl: string | null;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  rating: number;
  setRating: (rating: number) => void;
  hover: number;
  setHover: (hover: number) => void;
  loading: boolean;
  handleSendVideoTestimonial: () => void;
  setVideoFile: (file: File | null) => void;
}

const VideoTestimonialDialog: React.FC<VideoTestimonialDialogProps> = ({
  isOpen,
  onClose,
  videoPreviewUrl,
  name,
  setName,
  email,
  setEmail,
  rating,
  setRating,
  hover,
  setHover,
  loading,
  handleSendVideoTestimonial,
  setVideoFile,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black">
      <div className="bg-white w-[500px] p-8 rounded-2xl shadow-2xl relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-purple-100 p-4 rounded-full mb-4 text-2xl">📹</div>
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

        {/* Star Rating */}
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
            I give permission to use this testimonial across social channels and
            other marketing efforts.
          </span>
        </label>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            onClick={() => {
              setVideoFile(null);
              onClose();
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
  );
};

export default VideoTestimonialDialog;
