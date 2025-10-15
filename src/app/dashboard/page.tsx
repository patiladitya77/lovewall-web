"use client";
import Navbar from "@/components/Navbar";
import OverView from "@/components/OverView";
import Shimmer from "@/components/Shimmer";
import Spaces from "@/components/Spaces";
import { addSpaces } from "@/utils/spacesSlice";
import { addUser } from "@/utils/userSlice";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const { user } = useUser();
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
        dispatch(addSpaces(res.data.spaces));
      } catch (err) {
        console.log(err);
      }
    };

    saveUser();
  }, [user]);

  return !user ? (
    <Shimmer />
  ) : (
    <div className="bg-base-300">
      <Navbar />
      <OverView />
      <Spaces />
    </div>
  );
}
