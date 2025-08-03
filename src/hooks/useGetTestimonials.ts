import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { addTestimonials } from "@/utils/testimonailSlice";
import { useEffect } from "react";

const useGetTestimonials = () => {
  const dispatch = useDispatch();
  const currentSpace = useSelector((store) => store?.space?.space);
  const _id = currentSpace?._id;
  const { getToken } = useAuth();
  const getTestimonials = async () => {
    const token = await getToken();
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        "api/testimonial/gettestimonials/" +
        _id,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data.feedback);
    dispatch(addTestimonials(res.data.feedback));
  };
  useEffect(() => {
    if (_id) getTestimonials();
  }, [_id]);
};

export default useGetTestimonials;
