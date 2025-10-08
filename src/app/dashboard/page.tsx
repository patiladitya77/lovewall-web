"use client";
import Navbar from "@/components/Navbar";
import OverView from "@/components/OverView";
import Spaces from "@/components/Spaces";
import { addSpaces } from "@/utils/spacesSlice";
import { addUser } from "@/utils/userSlice";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const { fullName, imageUrl, primaryEmailAddress } = user;

    const saveUser = async () => {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API_BASE_URL + "api/auth/saveuser",
          {
            name: fullName,
            photoURL: imageUrl,
            email: primaryEmailAddress?.emailAddress,
          },
          { withCredentials: true }
        );
        dispatch(addUser(res.data.savedUser[0]));
      } catch (err) {
        console.log(err);
      }
    };

    saveUser();
  }, [user]);
  const { getToken } = useAuth();

  const fetAllSpaces = async () => {
    const token = await getToken();
    const spacesData = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + "api/space/getallspaces",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(addSpaces(spacesData.data.spaces));
  };
  useEffect(() => {
    fetAllSpaces();
  }, []);

  return (
    <div className="bg-base-300">
      <div>
        <Navbar />
      </div>
      <OverView />
      <Spaces />
    </div>
  );
}
