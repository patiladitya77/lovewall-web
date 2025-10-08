import React from "react";

interface VideoUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  videoFile: File | null;
  setVideoFile: (file: File | null) => void;
  uploadError: string;
  setUploadError: (msg: string) => void;
  uploadProgress: number;
  loading: boolean;
  setIsReviewOpen: (val: boolean) => void;
}

const VideoUploadDialog: React.FC<VideoUploadDialogProps> = ({
  isOpen,
  onClose,
  videoFile,
  setVideoFile,
  uploadError,
  setUploadError,
  uploadProgress,
  loading,
  setIsReviewOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-black">
      <div className="bg-white w-[500px] p-6 rounded-2xl shadow-xl relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
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

        {/* Progress Bar */}
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
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              if (!videoFile) {
                setUploadError("⚠️ Please upload a video before sending.");
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
  );
};

export default VideoUploadDialog;
