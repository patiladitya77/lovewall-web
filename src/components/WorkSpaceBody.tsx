import React from "react";
import All from "./SidebarItems/All";
import Liked from "./SidebarItems/Liked";
import Archived from "./SidebarItems/Archived";
import WallOfLove from "./SidebarItems/WallOfLove";
import SingleTestimonial from "./SidebarItems/SingleTestimonial";
import RequestTestimonal from "./SidebarItems/RequestTestimonal";
import EditSpace from "./SidebarItems/EditSpace";
import useGetTestimonials from "@/hooks/useGetTestimonials";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/appStore";

interface WorkSpaceBodyProps {
  selectedItem: string;
}

const WorkSpaceBody = ({ selectedItem }: WorkSpaceBodyProps) => {
  useGetTestimonials();
  const testimonials =
    useSelector((store: RootState) => store.testimonial) || [];
  const textTestimonails = testimonials.filter(
    (t) => t.feedbackType === "text"
  );
  const videoTestimonails = testimonials.filter(
    (t) => t.feedbackType === "video"
  );

  const componentToRender = () => {
    switch (selectedItem) {
      case "All":
        return <All testimonials={testimonials} />;
      case "Video":
        return <All testimonials={videoTestimonails} />;
      case "Text":
        return <All testimonials={textTestimonails} />;
      case "Liked":
        return <Liked />;

      case "Archived":
        return <Archived />;
      case "WallOfLove":
        return <WallOfLove />;
      case "SingleTestimonial":
        return <SingleTestimonial />;
      case "RequestTestimonial":
        return <RequestTestimonal />;
      case "EditTheSpace":
        return <EditSpace />;
    }
  };

  return <div>{componentToRender()}</div>;
};

export default WorkSpaceBody;
