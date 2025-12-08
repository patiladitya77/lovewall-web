import React, { useRef, useEffect } from "react";
import TestimonialCard from "../TestimonialCard";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { Testimonial } from "@/utils/types";

type AllProps = {
  testimonials: Testimonial[];
};

const All = ({ testimonials }: AllProps) => {
  const { getToken } = useAuth();
  const pendingLikesRef = useRef(new Map()); // stores {id: isLiked}
  // console.log(testimonials);

  // child calls this when heart toggled
  const handleLikeToggle = (id: string, newLikeState: boolean) => {
    pendingLikesRef.current.set(id, newLikeState);
  };

  //  periodically send pending likes in bulk
  useEffect(() => {
    const interval = setInterval(async () => {
      if (pendingLikesRef.current.size === 0) return;

      try {
        const token = await getToken();
        const updates = Array.from(pendingLikesRef.current.entries()).map(
          ([id, isLiked]) => ({ id, isLiked })
        );

        await axios.post(
          process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") +
            "/api/testimonial/liketestimonial",
          { updates },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //  clear after successful send
        pendingLikesRef.current.clear();
      } catch (error) {
        console.error("Bulk like update failed:", error);
      }
    }, 5000); // every 5 seconds

    // optional cleanup
    return () => clearInterval(interval);
  }, [getToken]);

  return (
    <div>
      <div className="w-3/4 mx-30 bg-base-100 rounded-lg my-4">
        <input
          type="text"
          placeholder="search for testimonials"
          className="w-full p-2"
        />
      </div>

      <div className="w-3/4 mx-30 my-4">
        {testimonials.map((t) => (
          <TestimonialCard
            key={t._id}
            testimonials={t}
            onLikeToggle={handleLikeToggle} //  pass down callback
          />
        ))}
      </div>
    </div>
  );
};

export default All;
