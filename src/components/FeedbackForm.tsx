"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Toast from "./Toast";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addPublicSpaces } from "@/utils/publicSpaceSlice";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import TextTestimonialDialog from "./TextTestimonialDialog";
import VideoUploadDialog from "./VideouploadDialog";
import VideoTestimonialDialog from "./VideoTestimonialDialog";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [err, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
  const [loadingFFmpeg, setLoadingFFmpeg] = useState(true);

  const { getToken } = useAuth();
  const { workspaceId } = useParams();
  const dispatch = useDispatch();

  const spaceDetails = useSelector(
    (store: any) => store.publicspace.publicSpace
  );
  const { headerTitle, questions, customMessage } = spaceDetails || {};

  // Load FFmpeg client-side only
  useEffect(() => {
    const loadFfmpeg = async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const ffmpegInstance = new FFmpeg();
      await ffmpegInstance.load();
      setFfmpeg(ffmpegInstance);
      setLoadingFFmpeg(false);
    };

    loadFfmpeg();
  }, []);

  const compressVideo = async (file: File): Promise<File> => {
    if (!ffmpeg) throw new Error("FFmpeg not loaded yet");

    await ffmpeg.writeFile("input.mp4", await fetchFile(file));
    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-vcodec",
      "libx264",
      "-crf",
      "28",
      "-preset",
      "veryfast",
      "-acodec",
      "aac",
      "-b:a",
      "128k",
      "output.mp4",
    ]);

    const data = await ffmpeg.readFile("output.mp4");
    return new File([data.buffer], `compressed_${file.name}`, {
      type: "video/mp4",
    });
  };

  const handleSendTextTestimonial = async () => {
    if (!email || !name || !feedback || !rating) {
      setToastMessage("Please fill the required fields");
      setShowToast(true);
      return;
    }

    const token = await getToken();
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/testimonial/sendtexttestimonial/${workspaceId}`,
        { starRating: rating, type: "text", email, name, feedback },
        { headers: { Authorization: `Bearer ${token}` } }
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
      console.error(error);
      setToastMessage("Error, something went wrong");
      setShowToast(true);
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

    if (loadingFFmpeg) {
      setToastMessage("Video processor is still loading, please wait...");
      setShowToast(true);
      return;
    }

    setLoading(true);
    setUploadError("");
    setUploadProgress(0);

    try {
      const compressed = await compressVideo(videoFile);

      const { data: auth } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/upload-auth`
      );

      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("fileName", compressed.name);
      formData.append("token", auth.token);
      formData.append("expire", auth.expire);
      formData.append("signature", auth.signature);
      formData.append("publicKey", auth.publicKey);

      const uploadRes = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
            );
            setUploadProgress(percent);
          },
        }
      );

      const videoUrl = uploadRes.data.url;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/testimonial/sendvideotestimonial/${workspaceId}`,
        { starRating: rating, type: "video", email, name, videoUrl }
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
      console.error("Error uploading video", error);
      setToastMessage("Error uploading video. Try again.");
      setShowToast(true);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // Video preview URL
  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile]);

  // Load space details
  useEffect(() => {
    const getWorkSpaceById = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}api/space/getspaceforuserbyid/${workspaceId}`
        );
        dispatch(addPublicSpaces(res.data.space));
      } catch (error) {
        console.error(error);
      }
    };

    getWorkSpaceById();
  }, [workspaceId, dispatch]);

  return (
    <>
      {showToast && (
        <Toast
          duration={5000}
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="w-full p-10 py-20 flex justify-center">
        <div className="card w-full max-w-lg bg-white text-gray-600 shadow-lg rounded-lg">
          <div className="card-body p-6">
            <div className="text-center">
              <Image
                src="https://testimonial.to/static/media/just-logo.040f4fd2.svg"
                alt="logo"
                width={92}
                height={92}
                className="mx-auto"
              />
              {headerTitle && (
                <h2 className="text-3xl font-bold mt-4">{headerTitle}</h2>
              )}
              {customMessage && (
                <p className="mt-2 text-xl text-gray-500">{customMessage}</p>
              )}
            </div>

            <div className="mt-6">
              <p className="text-lg font-bold">QUESTIONS</p>
              <ul className="mt-2 text-lg list-disc list-inside">
                {questions?.map((q: string, i: number) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                className="btn btn-primary w-full sm:w-1/2 bg-blue-600 text-white py-2 rounded-lg"
                onClick={() => setIsDialogOpen(true)}
              >
                Send a Text
              </button>
              <button
                className="btn btn-secondary w-full sm:w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg"
                onClick={() => setIsVideoDialogOpen(true)}
              >
                Record a Video
              </button>
            </div>

            {isDialogOpen && (
              <div>
                <TextTestimonialDialog
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  rating={rating}
                  hover={hover}
                  feedback={feedback}
                  name={name}
                  email={email}
                  loading={loading}
                  setRating={setRating}
                  setHover={setHover}
                  setFeedback={setFeedback}
                  setName={setName}
                  setEmail={setEmail}
                  handleSendTextTestimonial={handleSendTextTestimonial}
                />
              </div>
            )}

            {isVideoDialogOpen && !isReviewOpen && (
              <div>
                <VideoUploadDialog
                  isOpen={isVideoDialogOpen}
                  onClose={() => setIsVideoDialogOpen(false)}
                  videoFile={videoFile}
                  setVideoFile={setVideoFile}
                  uploadError={uploadError}
                  setUploadError={setUploadError}
                  uploadProgress={uploadProgress}
                  loading={loading}
                  setIsReviewOpen={setIsReviewOpen}
                />
              </div>
            )}

            {isReviewOpen && (
              <div>
                <VideoTestimonialDialog
                  isOpen={isReviewOpen}
                  onClose={() => setIsReviewOpen(false)}
                  videoPreviewUrl={videoPreviewUrl}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  rating={rating}
                  setRating={setRating}
                  hover={hover}
                  setHover={setHover}
                  loading={loading}
                  handleSendVideoTestimonial={handleSendVideoTestimonial}
                  setVideoFile={setVideoFile}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
