import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BasicForm = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"basic" | "thankyou">("basic");

  const [spaceName, setSpaceName] = useState("");
  const [spaceLogoUrl, setSpaceLogoUrl] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const [questions, setQuestions] = useState([
    "Who are you / what are you working on?",
    "How has [our product / service] helped you?",
    "What is the best thing about [our product / service]",
  ]);

  const handleAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions([...questions, ""]);
    }
  };

  const handleChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const handleDelete = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };
  const { getToken } = useAuth();

  const handleCreateSpace = async () => {
    const token = await getToken();
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_BASE_URL + "api/space/createspace",
      {
        spaceName: spaceName,
        headerTitle: headerTitle,
        spaceLogo: spaceLogoUrl,
        customMessage: customMessage,
        questions: questions,
        thankyouMessage: "thank you",
        thankyouTitle: "thank you",
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    router.push("/workspace/" + res.data.savedSpace._id);
  };

  return (
    <div className="w-full p-6">
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("basic")}
          className={`px-4 py-2 ${
            activeTab === "basic"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-500"
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setActiveTab("thankyou")}
          className={`px-4 py-2 ${
            activeTab === "thankyou"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-500"
          }`}
        >
          Thank you page
        </button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Create a new space</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <p className="text-gray-400 mb-6">
        After the space is generated, it will create a new page for collecting
        testimonials.
      </p>

      {activeTab === "basic" && (
        <>
          <label className="block mb-1 font-medium">Space name</label>
          <input
            type="text"
            className="border border-gray-400 w-full p-2 rounded-md mb-4"
            onChange={(e) => setSpaceName(e.target.value)}
          />

          <label className="block mb-1 font-medium">Space logo</label>
          <input
            type="file"
            className="border border-gray-300 p-1 mb-4"
            onChange={(e) => setSpaceLogoUrl(e.target.value)}
          />

          <label className="block mb-1 font-medium">Header title</label>
          <input
            type="text"
            className="border border-gray-400 w-full p-2 rounded-md mb-4"
            onChange={(e) => setHeaderTitle(e.target.value)}
          />

          <label className="block mb-1 font-medium">Your custom message</label>
          <textarea
            className="border border-gray-400 w-full p-2 rounded-md mb-4"
            rows={3}
            onChange={(e) => setCustomMessage(e.target.value)}
          ></textarea>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <label className="font-medium">Questions</label>
              <span
                className="ml-1 text-gray-400 cursor-pointer"
                title="These questions will be shown on the testimonial page"
              >
                ⓘ
              </span>
            </div>
            {questions?.map((q, idx) => (
              <div
                key={idx}
                className="flex items-center border border-gray-300 rounded-md px-2 py-1 mb-2"
              >
                <span className="cursor-move text-gray-400 mr-2">⋮⋮</span>
                <input
                  type="text"
                  value={q}
                  maxLength={100}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  className="flex-1 p-1 outline-none"
                />
                <span className="text-gray-400 text-sm mx-2">
                  {q.length}/100
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
            {questions.length < 5 && (
              <button
                type="button"
                onClick={handleAddQuestion}
                className="text-blue-600 text-sm flex items-center mt-2"
              >
                ➕ Add one (up to 5)
              </button>
            )}
          </div>

          <button
            className="btn btn-primary w-full"
            onClick={handleCreateSpace}
          >
            Create new space
          </button>
        </>
      )}

      {activeTab === "thankyou" && (
        <div className="text-gray-500">
          Thank you page settings will go here.
        </div>
      )}
    </div>
  );
};

export default BasicForm;
