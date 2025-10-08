import React from "react";

interface TextFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  rating: number;
  hover: number;
  feedback: string;
  name: string;
  email: string;
  loading: boolean;
  setRating: (value: number) => void;
  setHover: (value: number) => void;
  setFeedback: (value: string) => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  handleSendTextTestimonial: () => void;
}

const TextTestimonialDialog: React.FC<TextFeedbackModalProps> = ({
  isOpen,
  onClose,
  rating,
  hover,
  feedback,
  name,
  email,
  loading,
  setRating,
  setHover,
  setFeedback,
  setName,
  setEmail,
  handleSendTextTestimonial,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] max-w-full p-6 rounded-2xl shadow-2xl relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
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
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Name */}
        <input
          type="text"
          placeholder="Your Name *"
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 w-full rounded-lg mb-4 text-sm text-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Your Email *"
          className="border border-gray-300 focus:ring-2 focus:ring-blue-400 p-3 w-full rounded-lg mb-6 text-sm text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            onClick={onClose}
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
  );
};

export default TextTestimonialDialog;
