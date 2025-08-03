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
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
interface WorkSpaceBodyProps {
  selectedItem: string;
}

const WorkSpaceBody = ({ selectedItem }: WorkSpaceBodyProps) => {
  const { getToken } = useAuth();
  const getTestimonials = async () => {
    const token = await getToken();
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        "api/testimonial/gettestimonials/688ba3bcef3abfa1a14b699c",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
  };
  useEffect(() => {
    getTestimonials();
  }, []);
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
