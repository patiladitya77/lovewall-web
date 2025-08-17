type VideoPreviewProps = {
  videoUrl: string;
  isExpanded: boolean;
  onExpand: (value: boolean) => void;
};

const VideoPreview = ({
  videoUrl,
  isExpanded,
  onExpand,
}: VideoPreviewProps) => {
  //   const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {!isExpanded ? (
        <div
          className="relative w-40 h-24 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => onExpand(true)}
        >
          <video src={videoUrl} muted className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <button className="bg-white p-3 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="blue"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 "
                style={{ color: "blue" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <video
          src={videoUrl}
          controls
          autoPlay
          className="rounded-lg shadow-lg max-w-full"
        />
      )}
    </div>
  );
};

export default VideoPreview;
