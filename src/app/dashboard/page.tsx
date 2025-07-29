"use client";
import Navbar from "@/components/Navbar";
import OverView from "@/components/OverView";
import Spaces from "@/components/Spaces";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const { user, isSignedIn } = useUser();

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
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    saveUser();
  }, [user]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <OverView />
      <Spaces />
    </div>
  );
}
