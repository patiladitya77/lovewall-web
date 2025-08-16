"use client";
import { useState } from "react";
import WorkspaceCard from "./WorkspaceCard";
import CreateSpaceForm from "./CreateSpaceForm";
import { useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "../utils/appStore";

const Spaces = () => {
  const [createSpaceForm, setCreateSpaceForm] = useState(false);
  const spacesData = useSelector((store: RootState) => store.space.spaces);

  return (
    <>
      {createSpaceForm && (
        <CreateSpaceForm onClose={() => setCreateSpaceForm(false)} />
      )}
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl mx-25 my-4 p-2">Spaces</h1>
        {spacesData.length !== 0 && (
          <button
            className="btn btn-primary my-5 mr-35 rounded-lg"
            onClick={() => setCreateSpaceForm(true)}
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create new space
          </button>
        )}
      </div>
      {spacesData.length === 0 ? (
        <div>
          <div className="flex">
            <div className="card w-[83%] bg-base-100 card-xl shadow-sm mx-32 ">
              <div className="card-body items-center text-center">
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
                    d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>

                <h2 className="card-title justify-center ">No spaces yet</h2>
                <p className="flex justify-center md-2">
                  Create your first space
                </p>
                <div className=" card-actions">
                  <button className="btn btn-primary my-2 rounded-lg items-center">
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Create new space
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mx-33">
            <input
              className="bg-base-100 w-full h-10 p-2 my-5"
              placeholder="Search"
            />

            {spacesData.map((card) => (
              <div key={card._id}>
                <WorkspaceCard
                  cardId={card._id}
                  workspaceName={card.spaceName}
                  videos={card.videos}
                  text={card.text}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Spaces;
