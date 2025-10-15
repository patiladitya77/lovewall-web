"use client";
import Shimmer from "@/components/Shimmer";
import WorkSpaceHeader from "@/components/WorkSpaceHeader";
import WorkSpaceSidebar from "@/components/WorkSpaceSidebar";
import { addCurrentSpace } from "@/utils/spacesSlice";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Home({ params }) {
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const getSpacesData = async () => {
    try {
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
      dispatch(addCurrentSpace(res.data.space));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpacesData();
  }, []);
  if (loading) return <Shimmer />;

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
