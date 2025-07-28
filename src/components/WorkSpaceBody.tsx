import React from "react";
import All from "./SidebarItems/All";
import Liked from "./SidebarItems/Liked";
import Video from "./SidebarItems/Video";
import Text from "./SidebarItems/Text";
import Archived from "./SidebarItems/Archived";
import WallOfLove from "./SidebarItems/WallOfLove";
import SingleTestimonial from "./SidebarItems/SingleTestimonial";
import RequestTestimonal from "./SidebarItems/RequestTestimonal";
import EditSpace from "./SidebarItems/EditSpace";
interface WorkSpaceBodyProps {
  selectedItem: string;
}

const WorkSpaceBody = ({ selectedItem }: WorkSpaceBodyProps) => {
  const componentToRender = () => {
    switch (selectedItem) {
      case "All":
        return <All />;
      case "Video":
        return <Video />;
      case "Text":
        return <Text />;
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
