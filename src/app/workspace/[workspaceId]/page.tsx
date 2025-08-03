"use client";
import WorkSpaceHeader from "@/components/WorkSpaceHeader";
import WorkSpaceSidebar from "@/components/WorkSpaceSidebar";
import { addCurrentSpace } from "@/utils/spacesSlice";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home({ params }) {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const getSpacesData = async () => {
    const workspaceId = (await params).workspaceId;
    const token = await getToken();
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        "api/space/getspacebyid/" +
        workspaceId,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data.space);
    dispatch(addCurrentSpace(res.data.space));
  };
  useEffect(() => {
    getSpacesData();
  }, []);

  return (
    <div className="bg-base-300">
      <div>
        <WorkSpaceHeader />
      </div>
      <div>
        <div>
          <WorkSpaceSidebar />
        </div>
      </div>
    </div>
  );
}
