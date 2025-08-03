import React, { useEffect } from "react";
import All from "./SidebarItems/All";
import Liked from "./SidebarItems/Liked";
import Video from "./SidebarItems/Video";
import Text from "./SidebarItems/Text";
import Archived from "./SidebarItems/Archived";
import WallOfLove from "./SidebarItems/WallOfLove";
import SingleTestimonial from "./SidebarItems/SingleTestimonial";
import RequestTestimonal from "./SidebarItems/RequestTestimonal";
import EditSpace from "./SidebarItems/EditSpace";
import useGetTestimonials from "@/hooks/useGetTestimonials";
import { useSelector } from "react-redux";

interface WorkSpaceBodyProps {
  selectedItem: string;
}

const WorkSpaceBody = ({ selectedItem }: WorkSpaceBodyProps) => {
  useGetTestimonials();
  const testimonials = useSelector((store) => store.testimonial) || [];
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
        return <Video testimonials={videoTestimonails} />;
      case "Text":
        return <Text testimonials={textTestimonails} />;
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
