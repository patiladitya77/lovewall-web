"use client";
import React, { useState } from "react";
import WorkSpaceBody from "./WorkSpaceBody";
import WallOfLoveDialog from "./WallOfLoveDialog";

const WorkSpaceSidebar = () => {
  const [selectedItem, setSelectedItem] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="grid grid-cols-[1fr_3fr] h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="bg-base-300 p-10 py-14 col-span-1 overflow-y-auto">
        <h1 className="text-2xl font-semibold">Inbox</h1>
        <ul className="m-4 text-xl">
          {[
            { name: "All", icon: "inbox" },
            { name: "Video", icon: "video" },
            { name: "Text", icon: "text" },
            { name: "Liked", icon: "heart" },
            { name: "Archived", icon: "archive" },
          ].map((item) => (
            <li
              key={item.name}
              className={`my-3 cursor-pointer ${
                selectedItem === item.name ? "font-bold text-primary" : ""
              }`}
              onClick={() => setSelectedItem(item.name)}
            >
              <div className="flex items-center">
                <span className="mx-2 text-lg">•</span>
                <p>{item.name}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Accordion Sections */}
        <div className="join join-vertical bg-base-300">
          {/* Embedded Widgets */}
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold text-xl">
              Embedded widgets
            </div>
            <div className="collapse-content text-sm space-y-2">
              <div
                className="p-2 mx-3 text-lg rounded bg-base-200 cursor-pointer hover:bg-base-100 transition"
                onClick={() => setIsDialogOpen(true)}
              >
                ❤️ Wall of Love
              </div>
              <div
                className="p-2 mx-3 text-lg rounded bg-base-200 cursor-pointer hover:bg-base-100 transition"
                onClick={() => setSelectedItem("SingleTestimonial")}
              >
                💬 Single Testimonial
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold text-xl">Pages</div>
            <div className="collapse-content text-sm space-y-2">
              <div
                className="p-2 mx-3 text-lg rounded bg-base-200 cursor-pointer hover:bg-base-100 transition"
                onClick={() => setSelectedItem("RequestTestimonial")}
              >
                📤 Request Testimonial
              </div>
              <div
                className="p-2 mx-3 text-lg rounded bg-base-200 cursor-pointer hover:bg-base-100 transition"
                onClick={() => setSelectedItem("WallOfLove")}
              >
                ❤️ Wall of Love
              </div>
            </div>
          </div>

          {/* Space Settings */}
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold text-xl">
              Space settings
            </div>
            <div className="collapse-content text-sm space-y-2">
              <div
                className="p-2 mx-3 text-lg rounded bg-base-200 cursor-pointer hover:bg-base-100 transition"
                onClick={() => setSelectedItem("EditTheSpace")}
              >
                ✏️ Edit the Space
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="overflow-auto">
        <WorkSpaceBody selectedItem={selectedItem} />
      </div>

      {/* Wall of Love Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsDialogOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[100%] max-w-7xl flex items-center justify-center"
          >
            <WallOfLoveDialog onClose={() => setIsDialogOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkSpaceSidebar;
